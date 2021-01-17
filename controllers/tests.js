const Post = require("../models/Post");
const checkAuth = require("../utils/auth");
const { cloudinary } = require("../utils/cloudinary");

module.exports.uploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {upload_preset: "postimages"});
        res.status(200).json({ "url": uploadedResponse.url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "error while uploading", error })
    }
}

module.exports.getImages = async (req, res) => {
    const { resources } = await cloudinary.search
        .expression("folder:postimages")
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();
        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
}