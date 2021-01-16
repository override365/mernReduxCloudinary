const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "strack",
    api_key: "424938889491363",
    api_secret: "vjZ0U4t4mZsKgKtuGYz8CMUw_3U"
});

module.exports = { cloudinary };