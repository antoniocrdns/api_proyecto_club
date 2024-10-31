exports.login = (req, res) => {
    const { usuario, contraseña } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
        conn.query(query, [usuario, contraseña], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const user = results[0];

            res.status(200).json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    usuario: user.usuario,
                    rol_id: user.rol_id
                }
            });
        });
    });
};
