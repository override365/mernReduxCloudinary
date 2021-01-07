const express = require("express");
const router = express.Router();

const { addPost, getPosts, likePost } = require("../controllers/posts");

router.get("/", getPosts);
router.post("/", addPost);
router.patch("/:id", likePost);

module.exports = router;