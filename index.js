const express = require('express');
const app = express();
const configureDatabase = require('./config/database');
const cors  = require('cors');
app.use(cors());


// Rutas
const authRoutes = require('./routes/auth.routes');
const eventosRoutes = require('./routes/eventos.routes');
const inventarioRoutes = require('./routes/inventario.routes');
const productosRoutes = require('./routes/productos.routes');
const ticketsRoutes = require('./routes/tickets.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const rolesRoutes =  require('./routes/roles.routes');

// Middleware
app.use(express.json()); 

configureDatabase(app);

app.use('/api/auth', authRoutes);
// app.use('/api/eventos', eventosRoutes);
// app.use('/api/inventario', inventarioRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/roles', rolesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
