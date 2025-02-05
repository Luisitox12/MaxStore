const db = require('../database');
const bcrypt = require('bcrypt');

// Registrar un nuevo usuario
exports.registerUser = (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    db.run('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, hashedPassword], function(err) {
        if (err) {
            console.error('Error al registrar el usuario:', err); // Registro del error en la consola
            return res.status(500).send(err.message);
        }
        res.status(201).send('Usuario registrado con éxito');
    });
};

// Iniciar sesión
exports.loginUser = (req, res) => {
    const { email, contraseña } = req.body;

    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send('Credenciales inválidas');
        }

        if (bcrypt.compareSync(contraseña, user.contraseña)) {
            // Aquí se puede establecer una sesión o token
            res.redirect('/');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
};

// Cerrar sesión
exports.logoutUser = (req, res) => {
    // Aquí se puede manejar la lógica de cierre de sesión
    // Por ejemplo, eliminar la sesión o el token
    res.redirect('/'); // Redirigir al inicio después de cerrar sesión
};
