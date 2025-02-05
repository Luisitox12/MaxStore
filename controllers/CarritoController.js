const db = require('../database');

// Agregar un producto al carrito
exports.agregarProducto = (req, res) => {
    const { usuario_id, producto_id, cantidad } = req.body;

    // Verificar si el carrito ya existe para el usuario
    db.get('SELECT * FROM carritos WHERE usuario_id = ?', [usuario_id], (err, carrito) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (!carrito) {
            // Crear un nuevo carrito si no existe
            db.run('INSERT INTO carritos (usuario_id) VALUES (?)', [usuario_id], function(err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                const carrito_id = this.lastID;
                db.run('INSERT INTO productos_carrito (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [carrito_id, producto_id, cantidad], (err) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.send('Producto agregado al carrito');
                });
            });
        } else {
            // Agregar el producto al carrito existente
            db.run('INSERT INTO productos_carrito (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [carrito.id, producto_id, cantidad], (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.send('Producto agregado al carrito');
            });
        }
    });
};

// Eliminar un producto del carrito
exports.eliminarProducto = (req, res) => {
    const { carrito_id, producto_id } = req.body;

    db.run('DELETE FROM productos_carrito WHERE carrito_id = ? AND producto_id = ?', [carrito_id, producto_id], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Producto eliminado del carrito');
    });
};

// Ver el carrito
exports.verCarrito = (req, res) => {
    const { usuario_id } = req.query;

    db.get('SELECT * FROM carritos WHERE usuario_id = ?', [usuario_id], (err, carrito) => {
        if (err || !carrito) {
            return res.status(404).send('Carrito no encontrado');
        }

        db.all('SELECT * FROM productos_carrito WHERE carrito_id = ?', [carrito.id], (err, productos) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.render('carrito', { title: 'Carrito de Compras', carrito, productos });
        });
    });
};
