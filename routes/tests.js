const express = require("express");
const router = express.Router();

const { getImages, uploadImage } = require("../controllers/tests");

router.post("/upload", uploadImage);
router.get("/getimages", getImages);

module.exports = router;

