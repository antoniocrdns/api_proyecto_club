exports.getAllEventos = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM eventos', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

exports.getEventoById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM eventos WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

exports.createEvento = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO eventos SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Evento creado',
                producto: { id: result.insertId, ...data }
            });
        });
    });
};

exports.updateEvento = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE eventos SET ? WHERE id = ?', [data, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            res.status(200).json({ message: 'Evento actualizado' });
        });
    });
};

exports.deleteEvento = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM eventos WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            res.status(200).json({ message: 'Evento eliminado' });
        });
    });
};
