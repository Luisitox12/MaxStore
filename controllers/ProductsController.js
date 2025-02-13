const db = require('../database');

exports.listarProductos = (req, res) => {
   
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        
        db.all(`SELECT p.*, c.nombre AS categoria_nombre FROM productos p
                LEFT JOIN categorias c ON p.categoria_id = c.id`, [], (err, productos) => {
            if (err) {
                return res.status(500).send(err.message);
            }

           
            productos.forEach(producto => {
                if (producto.categoria_nombre === 'FC Barcelona' || producto.categoria_nombre === 'Real Madrid') {
                    producto.precio *= 0.5; 
                }
            });

            
            res.render('productos', { title: 'MaxStore', productos, categorias });
        });
    });
};


exports.crearProducto = (req, res) => {
    const { nombre, precio, categoria_id, imagen } = req.body; 
    db.run('INSERT INTO productos (nombre, precio, categoria_id, imagen) VALUES (?, ?, ?, ?)', [nombre, precio, categoria_id, imagen], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos');
    });
};


exports.actualizarProducto = (req, res) => {
    const { id, nombre, precio, categoria_id, imagen } = req.body; 
    db.run('UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, imagen = ? WHERE id = ?', [nombre, precio, categoria_id, imagen, id], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos');
    });
};


exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM productos WHERE id = ?', id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/productos');
    });
};