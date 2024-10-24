exports.getAllTickets = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const query = `
            SELECT t.id AS ticket_id, t.total, t.fecha, 
            pt.producto_id, p.nombre_producto, pt.cantidad 
            FROM ticket t
            JOIN productos_tickets pt ON t.id = pt.ticket_id
            JOIN productos p ON pt.producto_id = p.id
            ORDER BY t.id;
        `;

        conn.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            // Agrupar los resultados por ticket
            const tickets = results.reduce((acc, row) => {
                const { ticket_id, total, fecha, producto_id, nombre_producto, cantidad } = row;

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
                ticket.productos.push({ producto_id, nombre_producto, cantidad });
                return acc;
            }, []);

            res.status(200).json(tickets);
        });
    });
};


exports.getTicketById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM productos_ticket WHERE ticket_id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Ticket no encontrado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

exports.createTicket = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO ticket SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Ticket creado',
                ticket: { id: result.insertId, ...data }
            });
        });
    });
};


exports.deleteTicket = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM ticket WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Ticket no encontrado' });
            }

            res.status(200).json({ message: 'Ticket eliminado' });
        });
    });
};
