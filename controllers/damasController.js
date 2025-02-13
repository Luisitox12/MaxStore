const db = require('../database');


exports.listarDamas = (req, res) => {
    db.all(`SELECT p.* FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Ropa Dama'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
        res.render('ropadamas', { productos });
    });
};