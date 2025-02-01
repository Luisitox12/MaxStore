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

// Listar categorías (opcional, si necesitas una función para listar)
exports.listarCategorias = (req, res) => {
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.render('categorias', { title: 'Categorías', categorias });
    });
};