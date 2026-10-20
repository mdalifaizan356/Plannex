require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadFile = async (files) => {
    const fileArray = Object.values(files);
    console.log(fileArray);
    const results = [];

    for (const file of fileArray) {
        try {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        reject(error);
                        }
                        resolve(result);
                    }
                ).end(file.data)
            })
            results.push(result)

        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return results;
};