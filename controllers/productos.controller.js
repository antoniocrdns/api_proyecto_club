// Obtener todos los productos activos en el inventario
exports.getAllProductos = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM productos WHERE activo = TRUE', (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.status(200).json(results);
        });
    });
};

// Obtener un producto por ID, solo si está activo
exports.getProductoById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('SELECT * FROM productos WHERE id = ? AND activo = TRUE', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado o dado de baja' });
            }

            res.status(200).json(results[0]);
        });
    });
};

// Crear un nuevo producto en el inventario
exports.createProducto = (req, res) => {
    const data = { ...req.body, activo: true };  // Por defecto, el producto está activo

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

// Actualizar los detalles de un producto
exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE productos SET ? WHERE id = ? AND activo = TRUE', [data, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado o dado de baja' });
            }

            res.status(200).json({ message: 'Producto actualizado' });
        });
    });
};

// Dar de baja un producto (marcarlo como inactivo en lugar de eliminarlo)
exports.deleteProducto = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Error de conexión' });

        conn.query('UPDATE productos SET activo = FALSE WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado o ya dado de baja' });
            }

            res.status(200).json({ message: 'Producto dado de baja' });
        });
    });
};
