const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/keys");

module.exports = (header) => {
    const authHeader = header;
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                const user = jwt.verify(token, secretOrKey);
                return user;
            } catch (error) {
                throw new Error("Invalid/expired token");
            }
        }
        throw new Error("Authentication token must be \"Bearer [token]");
    }
    throw new Error("Authorization header must be provided");;
}