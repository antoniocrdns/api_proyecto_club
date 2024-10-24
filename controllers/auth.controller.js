exports.getAllInventario = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM inventario', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

exports.getInventarioById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM inventario WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

exports.login = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO inventario SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Inventario creado',
                producto: { id: result.insertId, ...data }
            });
        });
    });
};

exports.logout = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE inventario SET ? WHERE id = ?', [data, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }

            res.status(200).json({ message: 'Inventario actualizado' });
        });
    });
};

exports.deleteInventario = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM inventario WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }

            res.status(200).json({ message: 'Inventario eliminado' });
        });
    });
};
