import dotenv from "dotenv";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary using credentials provided through environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Skip the upload when no temporary local file was created.
    if (!localFilePath) return null;
    console.log(process.env.CLOUDINARY_API_KEY);

    // Upload the file and let Cloudinary detect its resource type.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // fs.unlinkSync(localFilePath);
    // Remove the temporary file after a successful upload.
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    // Log the upload failure, clean up the temporary file, and preserve the error.
    console.error("Cloudinary Upload Error:", error);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error; // remove the locally saved temporary file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
