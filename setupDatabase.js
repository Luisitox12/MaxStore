const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Crear tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL
  )`);

  // Crear tabla de carritos
  db.run(`CREATE TABLE IF NOT EXISTS carritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`);

  // Crear tabla de productos en el carrito
  db.run(`CREATE TABLE IF NOT EXISTS productos_carrito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carrito_id INTEGER,
    producto_id INTEGER,
    cantidad INTEGER,
    FOREIGN KEY (carrito_id) REFERENCES carritos(id)
  )`);
});

db.close();
