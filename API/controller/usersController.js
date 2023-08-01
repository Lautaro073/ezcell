const User = require('../models/usuario.js');  // Asumiendo que tienes un modelo llamado User
const bcrypt = require('bcrypt');
const generateAccessToken = require("../generateAccessToken.js");

exports.createUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role || 'cliente'; // Toma el rol de cliente por defecto si no se especifica

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Verificar si el usuario o el email ya existen
        const existingUserByUsername = await User.findOne({ where: { username: username } });
        const existingUserByEmail = await User.findOne({ where: { email: email } });

        if (existingUserByUsername) {
            return res.status(409).send('Username already exists'); // Usuario ya existe
        }

        if (existingUserByEmail) {
            return res.status(409).send('Email already exists'); // Email ya registrado
        }

        await User.create({ username: username, email: email, password: hashedPassword, role: role });
        res.sendStatus(201); // Usuario creado
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Error del servidor
    }
};
exports.login = async (req, res) => {
    const username = req.body.username;  // Cambio de name a username
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ where: { username: username } });
        
        if (!foundUser) {
            return res.sendStatus(404); // Usuario no encontrado
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.send("Password incorrect!");
        }

        const token = generateAccessToken({ username: username });  // Cambio de user a username
        res.json({ accessToken: token });

    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Error del servidor
    }
};
