// controllers/productosController.js
const db = require('../database');

// Listar productos con sus categorías
exports.listarProductos = (req, res) => {
    // Obtener categorías
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        // Obtener productos con sus categorías
        db.all(`SELECT p.*, c.nombre AS categoria_nombre FROM productos p
                LEFT JOIN categorias c ON p.categoria_id = c.id`, [], (err, productos) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            // Renderizar la vista con productos y categorías
            res.render('productos', { title: 'MaxStore', productos, categorias });
        });
    });
};

// Crear producto
exports.crearProducto = (req, res) => {
    const { nombre, precio, categoria_id, imagen } = req.body; // Asegúrate de que el formulario incluya imagen
    db.run('INSERT INTO productos (nombre, precio, categoria_id, imagen) VALUES (?, ?, ?, ?)', [nombre, precio, categoria_id, imagen], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos');
    });
};

// Actualizar producto
exports.actualizarProducto = (req, res) => {
    const { id, nombre, precio, categoria_id, imagen } = req.body; // Asegúrate de que el formulario incluya imagen
    db.run('UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, imagen = ? WHERE id = ?', [nombre, precio, categoria_id, imagen, id], function(err) {
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