import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

console.log("cloud_name:", JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME));
console.log("api_key set:", !!process.env.CLOUDINARY_API_KEY);
console.log("api_secret set:", !!process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: "b0czwdmf",
  api_key: "791412545226723",
  api_secret: "SjuivaPCFkSGaRXAluQo15bcpyA",
});

try {
  const res = await cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    { folder: "test" }
  );
  console.log("✅ Upload worked:", res.secure_url);
} catch (err) {
  console.error("❌ Upload failed:", err);
}