import dotenv from "dotenv";
import mongoose from "mongoose";
// The shared environment file lives at the project root.
dotenv.config({ path: "../.env" });

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is missing. Add it to backend/.env.");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);
  const { default: app } = await import("./app.js");
  app.listen(port, () => console.log(`API running on port ${port}`));
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}
