import mongoose from "mongoose";

const elementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ["rectangle", "circle", "text"], required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: Number,
    height: Number,
    radius: Number,
    fill: { type: String, default: "#3b82f6" },
    rotation: { type: Number, default: 0 },
    text: String,
    fontSize: Number
  },
  { _id: false }
);

const canvasSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    elements: { type: [elementSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Canvas", canvasSchema);
