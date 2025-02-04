const db = require('../database');

// Crear categoría
exports.crearCategoria = (req, res) => {
    const { nombre } = req.body;
    db.run('INSERT INTO categorias (nombre) VALUES (?)', [nombre], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos'); // Redirigir a la página de productos
    });
};

// Eliminar categoría
exports.eliminarCategoria = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM categorias WHERE id = ?', id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos'); // Redirigir a la página de productos
    });
};

exports.listarCategorias = (req, res) => {
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.render('categorias', { title: 'Categorías', categorias });
    });
};