const cloudinary = require("cloudinary");

module.exports = () => {
  cloudinary.v2.config({
    cloud_name: process.env.COUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
