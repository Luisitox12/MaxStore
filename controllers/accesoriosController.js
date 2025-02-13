const db = require('../database');


exports.listarAccesorios = (req, res) => {
    db.all(`SELECT p.* FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Accesorios'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
        res.render('accesorios', { productos });
    });
};
