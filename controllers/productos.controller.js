exports.getAllProductos = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM productos', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

exports.getProductoById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json(results[0]);
        });
    });
};

exports.createProducto = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('INSERT INTO productos SET ?', [data], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                message: 'Producto creado',
                producto: { id: result.insertId, ...data }
            });
        });
    });
};

exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE productos SET ? WHERE id = ?', [data, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json({ message: 'Producto actualizado' });
        });
    });
};

exports.deleteProducto = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json({ message: 'Producto eliminado' });
        });
    });
};
