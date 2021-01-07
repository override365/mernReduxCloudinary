const { json } = require("body-parser");
const mongoose = require("mongoose");

const Post = require("../models/Post");
const checkAuth = require("../utils/auth");

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports.addPost = async (req, res) => {
    const authHeader = req.headers.authorization;
    const user = checkAuth(authHeader);
    const newPost = new Post({
        body: req.body.body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

module.exports.likePost = async (req, res) => {
    const authHeader = req.headers.authorization;
    const user = checkAuth(authHeader);
    const { id } = req.params;
    const post = await Post.findById(id);

    try {
        if (post) {
            if (post.likes.find(like => like.username === user.username)) {
                post.likes = post.likes.filter(like => like.username !== user.username);
                res.status(200).json({message: "Disliked"})
                // res.status(200).json({ message: "Post already liked, unliking it", userLogged: user.username, post  })
            } else {
                post.likes.push({
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                res.status(200).json({message: "Liked"})
                // res.status(200).json({ message: "Post Liked", userLogged: user.username, post })
            }
            await post.save();
            return post;
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}