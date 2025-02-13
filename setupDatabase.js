const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL
  )`);

  
  db.run(`CREATE TABLE IF NOT EXISTS carritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`);

  
  db.run(`CREATE TABLE IF NOT EXISTS productos_carrito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carrito_id INTEGER,
    producto_id INTEGER,
    cantidad INTEGER,
    FOREIGN KEY (carrito_id) REFERENCES carritos(id)
  )`);

  
  const adminName = 'Admin';
  const adminEmail = 'admin@example.com';
  const adminPassword = bcrypt.hashSync('admin123', 10); 

  db.run(`INSERT OR IGNORE INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)`, [adminName, adminEmail, adminPassword]);

  
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
    } else {
      console.log('Usuarios en la base de datos:', rows);
    }
  });
});

db.close();
