const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateRegisterInput = (input) => {
    const errors = {};

    input.firstName = !isEmpty(input.firstName) ? input.firstName : "";
    input.lastName = !isEmpty(input.lastName) ? input.lastName : "";
    input.username = !isEmpty(input.username) ? input.username : "";
    input.email = !isEmpty(input.email) ? input.email : "";
    input.password = !isEmpty(input.password) ? input.password : "";
    input.confirmPassword = !isEmpty(input.confirmPassword) ? input.confirmPassword : "";


    if (Validator.isEmpty(input.firstName)) {
        errors.firstName = "Debe ingresar un nombre.";
    }
    if (Validator.isEmpty(input.lastName)) {
        errors.lastName = "Debe ingresar un apellido.";
    }
    if (Validator.isEmpty(input.username)) {
        errors.username = "Debe ingresar un nombre de usuario.";
    }
    if (Validator.isEmpty(input.email)) {
        errors.email = "Debe ingresar un correo electronico.";
    } else if (!Validator.isEmail(input.email)) {
            errors.email = "Debe ingresar un correo electronico valido."
        }
    if (Validator.isEmpty(input.password)) {
        errors.password = "Debe ingresar una Contraseña";
    } 
    if (Validator.isEmpty(input.confirmPassword)) {
        errors.confirmPassword = "Debe confirmar su contraseña";
    }
    if (!Validator.isLength(input.password, { min: 6, max: 30 })) {
        errors.password = "Su contraseña debe tener al menos 6 caracteres";
    }
    if (!Validator.equals(input.password, input.confirmPassword)) {
        errors.confirmPassword = "Las contraseñas deben coincidir";
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}

module.exports.validateLoginInput = (input) => {
    const errors = {};

    input.email = !isEmpty(input.email) ? input.email : "";
    input.password = !isEmpty(input.password) ? input.password : "";

    if (Validator.isEmpty(input.email)) {
        errors.email = "Debe ingresar un correo electronico."
    } else if (!Validator.isEmail(input.email)) {
            errors.email = "Debe ingresar un correo electronico valido."
        }
    
    if (Validator.isEmpty(input.password)) {
        errors.password = "Debe ingresar una contraseña"
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}