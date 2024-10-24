exports.getAllusuarios = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM usuarios', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

exports.getUsuariobyId = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

exports.createUsuario = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO usuarios SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Usuario creado',
                producto: { id: result.insertId, ...data }
            });
        });
    });
};

exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE usuarios SET ? WHERE id = ?', [data, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Usuario actualizado' });
        });
    });
};

exports.deleteUsuario = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Usuario eliminado' });
        });
    });
};
