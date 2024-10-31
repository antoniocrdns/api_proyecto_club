// Obtener todos los roles
exports.getAllRoles = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM roles', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

// Obtener un rol por ID
exports.getRolById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM roles WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Rol no encontrado o eliminado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

// Crear un nuevo rol
exports.createRol = (req, res) => {
    const data = { ...req.body };

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO roles SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Rol creado',
                rol: { id: result.insertId, ...data }
            });
        });
    });
};

// Eliminar un rol
exports.deleteRol = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM roles WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Rol no encontrado o ya eliminado' });
            }

            res.status(200).json({ message: 'Rol eliminado' });
        });
    });
};
