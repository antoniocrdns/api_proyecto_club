exports.getAllRoles = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM roles', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};