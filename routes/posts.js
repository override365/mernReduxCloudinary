const express = require("express");
const router = express.Router();

const { addPost, getPost, getPosts, likePost, commentPost } = require("../controllers/posts");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.patch("/:id", likePost);
router.patch("/:id/comment", commentPost);

module.exports = router;