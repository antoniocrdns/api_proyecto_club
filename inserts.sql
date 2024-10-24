-- Inserts para roles
INSERT INTO roles (descripcion, permisos) VALUES ('Administrador', 'all');
INSERT INTO roles (descripcion, permisos) VALUES ('Mesero', 'read,write');
INSERT INTO roles (descripcion, permisos) VALUES ('Cajero', 'read,write,delete');
INSERT INTO roles (descripcion, permisos) VALUES ('Gerente', 'read,write,update');
INSERT INTO roles (descripcion, permisos) VALUES ('Supervisor', 'read');

-- Inserts para usuarios
INSERT INTO usuarios (nombre, contraseña, usuario, rol_id) VALUES ('Juan Pérez', 'hash123', 'jperez', 1);
INSERT INTO usuarios (nombre, contraseña, usuario, rol_id) VALUES ('María García', 'hash456', 'mgarcia', 2);
INSERT INTO usuarios (nombre, contraseña, usuario, rol_id) VALUES ('Carlos López', 'hash789', 'clopez', 3);
INSERT INTO usuarios (nombre, contraseña, usuario, rol_id) VALUES ('Ana Martínez', 'hash101', 'amartinez', 4);
INSERT INTO usuarios (nombre, contraseña, usuario, rol_id) VALUES ('Pedro Sánchez', 'hash102', 'psanchez', 5);

-- Inserts para estado_global
INSERT INTO estado_global (descripcion) VALUES ('Activo');
INSERT INTO estado_global (descripcion) VALUES ('Inactivo');
INSERT INTO estado_global (descripcion) VALUES ('En mantenimiento');
INSERT INTO estado_global (descripcion) VALUES ('Reservado');
INSERT INTO estado_global (descripcion) VALUES ('Cancelado');

-- Inserts para proveedores
INSERT INTO proveedores (nombre, numero_tel, correo) VALUES ('Distribuidora XYZ', 555123456, 'xyz@mail.com');
INSERT INTO proveedores (nombre, numero_tel, correo) VALUES ('Bebidas SA', 555234567, 'bebidas@mail.com');
INSERT INTO proveedores (nombre, numero_tel, correo) VALUES ('Licores del Norte', 555345678, 'licores@mail.com');
INSERT INTO proveedores (nombre, numero_tel, correo) VALUES ('Snacks y Más', 555456789, 'snacks@mail.com');
INSERT INTO proveedores (nombre, numero_tel, correo) VALUES ('Importadora ABC', 555567890, 'abc@mail.com');

-- Inserts para productos
INSERT INTO productos (nombre_producto, proveedor_id, categoria) VALUES ('Cerveza Premium', 1, 'Bebidas');
INSERT INTO productos (nombre_producto, proveedor_id, categoria) VALUES ('Whisky 12 años', 3, 'Licores');
INSERT INTO productos (nombre_producto, proveedor_id, categoria) VALUES ('Botana Mixta', 4, 'Snacks');
INSERT INTO productos (nombre_producto, proveedor_id, categoria) VALUES ('Tequila Reposado', 3, 'Licores');
INSERT INTO productos (nombre_producto, proveedor_id, categoria) VALUES ('Agua Mineral', 2, 'Bebidas');

-- Inserts para mesas
INSERT INTO mesas (descripcion, capacidad_personas, esta_disponible) VALUES ('Mesa VIP 1', 6, true);
INSERT INTO mesas (descripcion, capacidad_personas, esta_disponible) VALUES ('Mesa Regular 1', 4, true);
INSERT INTO mesas (descripcion, capacidad_personas, esta_disponible) VALUES ('Mesa Exterior 1', 8, true);
INSERT INTO mesas (descripcion, capacidad_personas, esta_disponible) VALUES ('Mesa Bar 1', 2, true);
INSERT INTO mesas (descripcion, capacidad_personas, esta_disponible) VALUES ('Mesa VIP 2', 6, false);

-- Inserts para cliente
INSERT INTO cliente (nombre, tipo_de_cliente, numero_tel, correo) VALUES ('Roberto Gómez', 'VIP', '555111222', 'rgomez@mail.com');
INSERT INTO cliente (nombre, tipo_de_cliente, numero_tel, correo) VALUES ('Laura Torres', 'Regular', '555222333', 'ltorres@mail.com');
INSERT INTO cliente (nombre, tipo_de_cliente, numero_tel, correo) VALUES ('Miguel Ángel', 'Premium', '555333444', 'mangel@mail.com');
INSERT INTO cliente (nombre, tipo_de_cliente, numero_tel, correo) VALUES ('Sofía Ruiz', 'VIP', '555444555', 'sruiz@mail.com');
INSERT INTO cliente (nombre, tipo_de_cliente, numero_tel, correo) VALUES ('Diego Castro', 'Regular', '555555666', 'dcastro@mail.com');

-- Inserts para bloque
INSERT INTO bloque (descripcion, mesas_id, disponibilidad, en_donde_es_rentado) VALUES ('Bloque VIP', 1, true, 1);
INSERT INTO bloque (descripcion, mesas_id, disponibilidad, en_donde_es_rentado) VALUES ('Bloque Regular', 2, true, 2);
INSERT INTO bloque (descripcion, mesas_id, disponibilidad, en_donde_es_rentado) VALUES ('Bloque Exterior', 3, true, 3);
INSERT INTO bloque (descripcion, mesas_id, disponibilidad, en_donde_es_rentado) VALUES ('Bloque Bar', 4, false, 4);
INSERT INTO bloque (descripcion, mesas_id, disponibilidad, en_donde_es_rentado) VALUES ('Bloque VIP 2', 5, true, 5);

-- Inserts para precio_bloque_evento
INSERT INTO precio_bloque_evento (tipo_de_bloque, precio, fecha_inicio, fecha_fin, estado_global_id) 
VALUES ('VIP', 1000.00, '2024-01-01', '2024-12-31', 1);
INSERT INTO precio_bloque_evento (tipo_de_bloque, precio, fecha_inicio, fecha_fin, estado_global_id) 
VALUES ('Regular', 500.00, '2024-01-01', '2024-12-31', 1);
INSERT INTO precio_bloque_evento (tipo_de_bloque, precio, fecha_inicio, fecha_fin, estado_global_id) 
VALUES ('Premium', 750.00, '2024-01-01', '2024-12-31', 1);
INSERT INTO precio_bloque_evento (tipo_de_bloque, precio, fecha_inicio, fecha_fin, estado_global_id) 
VALUES ('Exterior', 300.00, '2024-01-01', '2024-12-31', 1);
INSERT INTO precio_bloque_evento (tipo_de_bloque, precio, fecha_inicio, fecha_fin, estado_global_id) 
VALUES ('Bar', 200.00, '2024-01-01', '2024-12-31', 1);

-- Inserts para eventos
INSERT INTO eventos (fecha_inicio, fecha_final, pago_renta, observaciones, bloque_id, precio_bloque_id, cliente_rentador_id)
VALUES ('2024-01-01 20:00:00', '2024-01-02 02:00:00', true, 'Evento VIP', 1, 1, 1);
INSERT INTO eventos (fecha_inicio, fecha_final, pago_renta, observaciones, bloque_id, precio_bloque_id, cliente_rentador_id)
VALUES ('2024-01-02 21:00:00', '2024-01-03 03:00:00', true, 'Fiesta regular', 2, 2, 2);
INSERT INTO eventos (fecha_inicio, fecha_final, pago_renta, observaciones, bloque_id, precio_bloque_id, cliente_rentador_id)
VALUES ('2024-01-03 19:00:00', '2024-01-04 01:00:00', false, 'Evento exterior', 3, 4, 3);
INSERT INTO eventos (fecha_inicio, fecha_final, pago_renta, observaciones, bloque_id, precio_bloque_id, cliente_rentador_id)
VALUES ('2024-01-04 22:00:00', '2024-01-05 04:00:00', true, 'Evento bar', 4, 5, 4);
INSERT INTO eventos (fecha_inicio, fecha_final, pago_renta, observaciones, bloque_id, precio_bloque_id, cliente_rentador_id)
VALUES ('2024-01-05 20:00:00', '2024-01-06 02:00:00', true, 'Evento premium', 5, 3, 5);

-- Inserts para inventario
INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, fecha_movimiento, usuario_responsable_id, observaciones)
VALUES (1, 100, 'Entrada', '2024-01-01', 1, 'Compra inicial');
INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, fecha_movimiento, usuario_responsable_id, observaciones)
VALUES (2, 50, 'Entrada', '2024-01-01', 1, 'Compra inicial');
INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, fecha_movimiento, usuario_responsable_id, observaciones)
VALUES (3, 200, 'Entrada', '2024-01-01', 2, 'Compra inicial');
INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, fecha_movimiento, usuario_responsable_id, observaciones)
VALUES (4, 75, 'Entrada', '2024-01-01', 2, 'Compra inicial');
INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, fecha_movimiento, usuario_responsable_id, observaciones)
VALUES (5, 150, 'Entrada', '2024-01-01', 3, 'Compra inicial');

-- Inserts para orden_compra
INSERT INTO orden_compra (cantidad, producto_id, fecha, mesa_id, usuario_responsable_id)
VALUES (2, 1, '2024-01-01', 1, 2);
INSERT INTO orden_compra (cantidad, producto_id, fecha, mesa_id, usuario_responsable_id)
VALUES (1, 2, '2024-01-01', 2, 2);
INSERT INTO orden_compra (cantidad, producto_id, fecha, mesa_id, usuario_responsable_id)
VALUES (3, 3, '2024-01-01', 3, 2);
INSERT INTO orden_compra (cantidad, producto_id, fecha, mesa_id, usuario_responsable_id)
VALUES (1, 4, '2024-01-01', 4, 3);
INSERT INTO orden_compra (cantidad, producto_id, fecha, mesa_id, usuario_responsable_id)
VALUES (2, 5, '2024-01-01', 5, 3);

-- Inserts para corte
INSERT INTO corte (fecha_apertura, fecha_cierre, usuario_responsable_id, dinero_caja_inicio, dinero_caja_final, observaciones)
VALUES ('2024-01-01 15:00:00', '2024-01-02 03:00:00', 3, 1000.00, 5000.00, 'Corte normal');
INSERT INTO corte (fecha_apertura, fecha_cierre, usuario_responsable_id, dinero_caja_inicio, dinero_caja_final, observaciones)
VALUES ('2024-01-02 15:00:00', '2024-01-03 03:00:00', 3, 1000.00, 4500.00, 'Corte normal');
INSERT INTO corte (fecha_apertura, fecha_cierre, usuario_responsable_id, dinero_caja_inicio, dinero_caja_final, observaciones)
VALUES ('2024-01-03 15:00:00', '2024-01-04 03:00:00', 3, 1000.00, 6000.00, 'Corte normal');
INSERT INTO corte (fecha_apertura, fecha_cierre, usuario_responsable_id, dinero_caja_inicio, dinero_caja_final, observaciones)
VALUES ('2024-01-04 15:00:00', '2024-01-05 03:00:00', 3, 1000.00, 5500.00, 'Corte normal');
INSERT INTO corte (fecha_apertura, fecha_cierre, usuario_responsable_id, dinero_caja_inicio, dinero_caja_final, observaciones)
VALUES ('2024-01-05 15:00:00', '2024-01-06 03:00:00', 3, 1000.00, 4800.00, 'Corte normal');

-- Inserts para ticket
INSERT INTO ticket (total, fecha) VALUES (150.00, '2024-01-01 21:00:00');
INSERT INTO ticket (total, fecha) VALUES (280.00, '2024-01-01 22:30:00');
INSERT INTO ticket (total, fecha) VALUES (95.00, '2024-01-01 23:45:00');
INSERT INTO ticket (total, fecha) VALUES (320.00, '2024-01-02 00:15:00');
INSERT INTO ticket (total, fecha) VALUES (175.00, '2024-01-02 01:30:00');

-- Inserts para cancelaciones
INSERT INTO cancelaciones (evento_id, fecha_de_cancelacion, motivo_de_cancelacion, usuario_responsable_id)
VALUES (1, '2024-01-01', 'Cliente no se presentó', 1);
INSERT INTO cancelaciones (evento_id, fecha_de_cancelacion, motivo_de_cancelacion, usuario_responsable_id)
VALUES (2, '2024-01-02', 'Cambio de fecha', 1);
INSERT INTO cancelaciones (evento_id, fecha_de_cancelacion, motivo_de_cancelacion, usuario_responsable_id)
VALUES (3, '2024-01-03', 'Mal clima', 2);
INSERT INTO cancelaciones (evento_id, fecha_de_cancelacion, motivo_de_cancelacion, usuario_responsable_id)
VALUES (4, '2024-01-04', 'Problemas técnicos', 2);
INSERT INTO cancelaciones (evento_id, fecha_de_cancelacion, motivo_de_cancelacion, usuario_responsable_id)
VALUES (5, '2024-01-05', 'Cancelación por cliente', 3);

-- Inserts para ganancias
INSERT INTO ganancias (total, fecha) VALUES (5000.00, '2024-01-01');
INSERT INTO ganancias (total, fecha) VALUES (4500.00, '2024-01-02');
INSERT INTO ganancias (total, fecha) VALUES (6000.00, '2024-01-03');
INSERT INTO ganancias (total, fecha) VALUES (5500.00, '2024-01-04');
INSERT INTO ganancias (total, fecha) VALUES (4800.00, '2024-01-05');

-- Inserts para productos_tickets (tabla de relación many-to-many)
INSERT INTO productos_tickets (producto_id, ticket_id) VALUES (1, 1);
INSERT INTO productos_tickets (producto_id, ticket_id) VALUES (2, 1);
INSERT INTO productos_tickets (producto_id, ticket_id) VALUES (3, 2);
-- INSERT INTO productos_tickets (producto_id, ticket_id) VALUES (4, 3);