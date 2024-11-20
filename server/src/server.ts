import { app } from "./app";
import { config } from "dotenv";
import connectDB from "./utils/db";
import {v2 as cloudinary} from "cloudinary";

config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const PORT = process.env.PORT || 7500;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
