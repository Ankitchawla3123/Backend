// reusable
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // it is the file system of node js
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      //   public_id: "shoes",
      resource_type: "auto",
    });
    console.log("file upload succesfull");
    console.log(response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(fileURLToPath); // in sync manner not async/ back ground must remove before move ahead
    // remove the locally saved file as the file upload failed

    return null;
  }
};

export { uploadOnCloudinary };
