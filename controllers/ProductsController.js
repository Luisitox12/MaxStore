// controllers/productosController.js
const db = require('../database');

exports.listarProductos = (req, res) => {
  db.all('SELECT * FROM productos', [], (err, productos) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.render('productos', { title: 'MaxStore', productos });
  });
};

// Crear producto
exports.crearProducto = (req, res) => {
  const { nombre, precio } = req.body;
  db.run('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/productos');
  });
};

// Actualizar producto
exports.actualizarProducto = (req, res) => {
  const { id, nombre, precio } = req.body;
  db.run('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/productos');
  });
};

// Eliminar producto
exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM productos WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/productos');
  });
};