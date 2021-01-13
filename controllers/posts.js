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

module.exports.getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: "Post not Found", error });
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
                res.status(200).json(post);
                // res.status(200).json({message: "Disliked"})
            } else {
                post.likes.push({
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                res.status(200).json(post);
                // res.status(200).json({message: "Liked"})
            }
            await post.save();
            return post;
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports.commentPost = async (req, res) => {
    const authHeader = req.headers.authorization;
    const user = checkAuth(authHeader);
    //-----Need to check auth error handler
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        post.comments.unshift({
            body: req.body.body,
            username: user.username,
            createdAt: new Date().toISOString()
        })
        await post.save();
        res.status(200).json(post);
        return post;
    } catch (error) {
        res.status(404).json({ message: "Post not found", error});
    }
}