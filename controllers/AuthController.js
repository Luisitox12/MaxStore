const db = require('../database');
const bcrypt = require('bcrypt');


exports.registerUser = (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    db.run('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, hashedPassword], function(err) {
        if (err) {
            console.error('Error al registrar el usuario:', err); 
            return res.status(500).send(err.message);
        }
        res.status(201).send('Usuario registrado con éxito');
    });
};


exports.loginUser = (req, res) => {
    const { email, contraseña } = req.body;

    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send('Credenciales inválidas');
        }

        if (bcrypt.compareSync(contraseña, user.contraseña)) {
            
            req.session.userEmail = user.email; 
            
            
            if (user.email === 'admin@example.com') {
                res.redirect('/productos'); 
            } else {
                res.redirect('/'); 
            }
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
};


exports.logoutUser = (req, res) => {
    
    req.session.destroy(); 
    res.redirect('/'); 
};
