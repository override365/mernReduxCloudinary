const express = require("express");
const { registerUser, loginUser, getUser, getUsers } = require("../controllers/users");

const router = express.Router();

router.get("/", getUsers);
router.get("/:username", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser)

module.exports = router;