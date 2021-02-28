const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "strack",
    api_key: "your_api_key",
    api_secret: "your_api_secret"
});

module.exports = { cloudinary };
