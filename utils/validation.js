module.exports.validateRegisterInput = (input) => {
    const errors = {};

    if (input.firstName.trim() === "") {
        errors.firstName = "Debe ingresar un nombre.";
    }
    if (input.lastName.trim() === "") {
        errors.lastName = "Debe ingresar un apellido.";
    }
    if (input.username.trim() === "") {
        errors.username = "Debe ingresar un nombre de usuario.";
    }
    if (input.email.trim() === "") {
        errors.email = "Debe ingresar un correo electronico.";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!input.email.match(regEx)) {
            errors.email = "Debe ingresar un correo electronico valido."
        }
    }
    if (input.password.trim() === "") {
        errors.password = "Debe ingresar una Contraseña";
    } else if (input.password !== input.confirmPassword) {
        errors.confirmPassword = "Las contraseñas deben coincidir."
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (input) => {
    const errors = {}

    if (input.email.trim() === "") {
        errors.email = "Debe ingresar un correo electronico."
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!input.email.match(regEx)) {
            errors.email = "Debe ingresar un correo electronico valido."
        }
    }
    if (input.password.trim() === "") {
        errors.password = "Debe ingresar una contraseña"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}