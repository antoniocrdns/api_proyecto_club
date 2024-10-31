// Obtener todas las ventas con productos
exports.getAllTickets = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const query = `
            SELECT 
                v.id AS ticket_id, 
                v.total, 
                v.fecha, 
                v.cancelada, 
                dv.producto_id, 
                p.nombre
            FROM 
                ventas v
            JOIN 
                detalle_venta dv ON v.id = dv.venta_id
            JOIN 
                productos p ON dv.producto_id = p.id
            ORDER BY 
                v.id;
        `;

        conn.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            // Agrupar los resultados por ticket
            const tickets = results.reduce((acc, row) => {
                const { ticket_id, total, fecha, cancelada, producto_id, nombre } = row;

                let ticket = acc.find(t => t.ticket_id === ticket_id);
                if (!ticket) {
                    ticket = {
                        ticket_id,
                        total,
                        fecha,
                        cancelada,
                        productos: []
                    };
                    acc.push(ticket);
                }

                // Agregar el producto al ticket
                ticket.productos.push({ producto_id, nombre });
                return acc;
            }, []);

            res.status(200).json(tickets);
        });
    });
};

// Obtener una venta específica por ID
exports.getTicketById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const query = `
            SELECT
                v.id AS ticket_id,
                v.total,
                v.fecha,
                v.cancelada,
                dv.producto_id,
                p.nombre
            FROM
                ventas v
            JOIN
                detalle_venta dv ON v.id = dv.venta_id
            JOIN
                productos p ON dv.producto_id = p.id
            WHERE v.id = ?;
        `;

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }

            const ticket = {
                ticket_id: results[0].ticket_id,
                total: results[0].total,
                fecha: results[0].fecha,
                cancelada: results[0].cancelada,
                productos: results.map(row => ({
                    producto_id: row.producto_id,
                    nombre: row.nombre
                }))
            };

            res.status(200).json(ticket);
        });
    });
};

// Crear un nuevo ticket (venta)
exports.createTicket = (req, res) => {
    const { total, productos } = req.body;
    const fecha = new Date();

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        // Inicia una transacción
        conn.beginTransaction((err) => {
            if (err) return res.status(500).json({ error: err });

            // Insertar el nuevo ticket
            const ticketQuery = 'INSERT INTO ventas (total, fecha) VALUES (?, ?)';
            conn.query(ticketQuery, [total, fecha], (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        res.status(500).json({ error: err });
                    });
                }

                const ticketId = result.insertId;

                // Insertar los productos relacionados en detalle_venta
                const detalleVentaQuery = `
                    INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) VALUES ?
                `;
                const values = productos.map(p => [ticketId, p.producto_id, p.cantidad, p.precio_unitario]);

                conn.query(detalleVentaQuery, [values], (err) => {
                    if (err) {
                        return conn.rollback(() => {
                            res.status(500).json({ error: err });
                        });
                    }

                    // Actualizar la cantidad de cada producto en inventario
                    const updateInventarioQueries = productos.map(p => {
                        return new Promise((resolve, reject) => {
                            const updateQuery = `
                                UPDATE productos SET cantidad = cantidad - ? WHERE id = ? AND cantidad >= ?
                            `;
                            conn.query(updateQuery, [p.cantidad, p.producto_id, p.cantidad], (err, result) => {
                                if (err || result.affectedRows === 0) {
                                    reject('Error al actualizar inventario o cantidad insuficiente');
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });

                    // Ejecutar todas las actualizaciones y finalizar la transacción
                    Promise.all(updateInventarioQueries)
                        .then(() => {
                            conn.commit((err) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        res.status(500).json({ error: err });
                                    });
                                }
                                res.status(201).json({ message: 'Venta creada e inventario actualizado', ticket_id: ticketId });
                            });
                        })
                        .catch(errorMsg => {
                            conn.rollback(() => {
                                res.status(400).json({ error: errorMsg });
                            });
                        });
                });
            });
        });
    });
};

// Cancelar una venta (en lugar de eliminarla)
exports.deleteTicket = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const cancelTicketQuery = 'UPDATE ventas SET cancelada = TRUE WHERE id = ?';
        conn.query(cancelTicketQuery, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }

            res.status(200).json({ message: 'Venta cancelada con éxito' });
        });
    });
};
