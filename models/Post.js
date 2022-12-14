const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: String,
    imageUrl: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = Post = mongoose.model("posts", postSchema);