const { cloudinary } = require("../utils/cloudinary");

module.exports.uploadImage = async (req, res) => {
    try {
        const fileString = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileString, { upload_preset: "postimages" });
        res.status(200).json({ "url": uploadedResponse.url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while uploading", error });
    }
}