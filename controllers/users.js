const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegisterInput, validateLoginInput } = require("../utils/validation");
const User = require("../models/User");
const { secretOrKey } =require("../config/keys");

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: "No users were found", error });
    }
}

module.exports.getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({username});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found", error });
    }
}

module.exports.registerUser = (req, res) => {

    const { errors, valid } = validateRegisterInput(req.body);

    if (!valid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Este correo ya se encuentra en uso." });
            } else {
                const newUser = User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName, 
                    username: req.body.username, 
                    password: req.body.password,
                    email: req.body.email,                    
                    createdAt: new Date().toISOString()
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        try {
                            newUser.password = hash;
                            newUser.save();
                            res.status(201).json(newUser);
                        } catch (error) {
                            res.status(400).json({ message: error.message });
                        }
                    });
                });
            }
        });
}

module.exports.loginUser = (req, res) => {
    const { errors, valid } = validateLoginInput(req.body);

    if (!valid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ emailNotFound: "Correo no encontrado." });
            }

            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        const payload = {
                            id: user.id,
                            username: user.username
                        };
                        jwt.sign(payload, secretOrKey, {}, (err, token) => {
                            try {
                                res.json({ success: true, token: "Bearer " + token });
                            } catch (error) {
                                res.json({ message: error.message });
                            }
                        });
                    } else {
                        res.status(400).json({ wrongPassword: "Contraseña incorrecta." })
                    }
                })
        })
}