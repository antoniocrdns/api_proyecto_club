exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', username, password);

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
        conn.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }

            console.log('Resultados de la consulta:', results);

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
