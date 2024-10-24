exports.getAllTickets = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const query = `
            SELECT 
                t.id AS ticket_id, 
                t.total, 
                t.fecha, 
                pt.producto_id, 
                p.nombre_producto
            FROM 
                ticket t
            JOIN 
                productos_tickets pt ON t.id = pt.ticket_id
            JOIN 
                productos p ON pt.producto_id = p.id
            ORDER BY 
                t.id;
        `;

        conn.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            // Agrupar los resultados por ticket
            const tickets = results.reduce((acc, row) => {
                const { ticket_id, total, fecha, producto_id, nombre_producto } = row;

                // Verificar si el ticket ya existe en el acumulador
                let ticket = acc.find(t => t.ticket_id === ticket_id);
                if (!ticket) {
                    ticket = {
                        ticket_id,
                        total,
                        fecha,
                        productos: []
                    };
                    acc.push(ticket);
                }

                // Agregar el producto al ticket
                ticket.productos.push({ producto_id, nombre_producto });
                return acc;
            }, []);

            res.status(200).json(tickets);
        });
    });
};


exports.getTicketById = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const { id } = req.params;

        const query = `
            SELECT
                t.id AS ticket_id,
                t.total,
                t.fecha,
                pt.producto_id,
                p.nombre_producto
            FROM
                ticket t
            JOIN
                productos_tickets pt ON t.id = pt.ticket_id
            JOIN
                productos p ON pt.producto_id = p.id
            WHERE t.id = ?;
        `;

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            // Agrupar los resultados por ticket
            const tickets = results.reduce((acc, row) => {
                const { ticket_id, total, fecha, producto_id, nombre_producto } = row;

                // Verificar si el ticket ya existe en el acumulador
                let ticket = acc.find(t => t.ticket_id === ticket_id);
                if (!ticket) {
                    ticket = {
                        ticket_id,
                        total,
                        fecha,
                        productos: []
                    };
                    acc.push(ticket);
                }

                // Agregar el producto al ticket
                ticket.productos.push({ producto_id, nombre_producto });
                return acc;
            }, []);

            res.status(200).json(tickets);
        });
    });
};

exports.createTicket = (req, res) => {
    const { total, productos } = req.body;
    const fecha = new Date();

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        // Insertar el nuevo ticket
        const ticketQuery = 'INSERT INTO ticket (total, fecha) VALUES (?, ?)';
        conn.query(ticketQuery, [total, fecha], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            const ticketId = result.insertId;

            // Insertar los productos relacionados en productos_tickets
            const productosTicketsQuery = `
                INSERT INTO productos_tickets (ticket_id, producto_id) VALUES ?
            `;
            const values = productos.map(p => [ticketId, p.producto_id]);

            conn.query(productosTicketsQuery, [values], (err) => {
                if (err) return res.status(500).json({ error: err });

                res.status(201).json({ message: 'Ticket creado', ticket_id: ticketId });
            });
        });
    });
};


exports.deleteTicket = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const deleteProductosQuery = 'DELETE FROM productos_tickets WHERE ticket_id = ?';
        conn.query(deleteProductosQuery, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            const deleteTicketQuery = 'DELETE FROM ticket WHERE id = ?';
            conn.query(deleteTicketQuery, [id], (err, result) => {
                if (err) return res.status(500).json({ error: err });

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Ticket no encontrado' });
                }

                res.status(200).json({ message: 'Ticket eliminado con éxito' });
            });
        });
    });
};

