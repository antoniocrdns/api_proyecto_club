drop database if exists aapi_proyecto_puticlub;
create database api_proyecto_puticlub;
use api_proyecto_puticlub;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    permisos VARCHAR(255)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    contraseña VARCHAR(255),
    usuario VARCHAR(255),
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE estado_global (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255)
);

CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    numero_tel INT,
    correo VARCHAR(255)
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(255),
    proveedor_id INT,
    categoria VARCHAR(255),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    capacidad_personas INT,
    esta_disponible BOOLEAN
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo_de_cliente VARCHAR(255),
    numero_tel VARCHAR(20),
    correo VARCHAR(255)
);

CREATE TABLE bloque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    mesas_id INT,
    disponibilidad BOOLEAN,
    en_donde_es_rentado INT,
    FOREIGN KEY (mesas_id) REFERENCES mesas(id)
);

CREATE TABLE precio_bloque_evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_de_bloque VARCHAR(255),
    precio DECIMAL(10, 2),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado_global_id INT,
    FOREIGN KEY (estado_global_id) REFERENCES estado_global(id)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATETIME,
    fecha_final DATETIME,
    pago_renta BOOLEAN,
    observaciones TEXT,
    bloque_id INT,
    precio_bloque_id INT,
    cliente_rentador_id INT,
    FOREIGN KEY (bloque_id) REFERENCES bloque(id),
    FOREIGN KEY (precio_bloque_id) REFERENCES precio_bloque_evento(id),
    FOREIGN KEY (cliente_rentador_id) REFERENCES cliente(id)
);

CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    tipo_movimiento VARCHAR(255),
    fecha_movimiento DATE,
    usuario_responsable_id INT,
    observaciones TEXT,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_responsable_id) REFERENCES usuarios(id)
);

CREATE TABLE orden_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT,
    producto_id INT,
    fecha DATE,
    mesa_id INT,
    usuario_responsable_id INT,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    FOREIGN KEY (usuario_responsable_id) REFERENCES usuarios(id)
);

CREATE TABLE corte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_apertura DATETIME,
    fecha_cierre DATETIME,
    usuario_responsable_id INT,
    dinero_caja_inicio DECIMAL(10, 2),
    dinero_caja_final DECIMAL(10, 2),
    observaciones TEXT,
    FOREIGN KEY (usuario_responsable_id) REFERENCES usuarios(id)
);

CREATE TABLE ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10, 2),
    fecha DATETIME
);

CREATE TABLE cancelaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT,
    fecha_de_cancelacion DATE,
    motivo_de_cancelacion TEXT,
    usuario_responsable_id INT,
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (usuario_responsable_id) REFERENCES usuarios(id)
);

CREATE TABLE ganancias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10, 2),
    fecha DATE
);

-- Relacion Many to Many
CREATE TABLE productos_tickets (
    producto_id INT,
    ticket_id INT,
    PRIMARY KEY (producto_id, ticket_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);
