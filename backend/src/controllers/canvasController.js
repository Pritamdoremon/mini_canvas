import Canvas from "../models/Canvas.js";

const validateCanvas = (body) => {
  if (!body.name || !body.name.trim()) return "Canvas name is required.";
  if (body.elements && !Array.isArray(body.elements)) return "Elements must be an array.";
  return null;
};

export const getCanvases = async (req, res, next) => {
  try {
    const canvases = await Canvas.find().sort({ updatedAt: -1 });
    res.json(canvases);
  } catch (error) {
    next(error);
  }
};

export const getCanvas = async (req, res, next) => {
  try {
    const canvas = await Canvas.findById(req.params.id);
    if (!canvas) return res.status(404).json({ message: "Canvas not found." });
    res.json(canvas);
  } catch (error) {
    next(error);
  }
};

export const createCanvas = async (req, res, next) => {
  try {
    const validationError = validateCanvas(req.body);
    if (validationError) return res.status(400).json({ message: validationError });
    const canvas = await Canvas.create({ name: req.body.name, elements: req.body.elements || [] });
    res.status(201).json(canvas);
  } catch (error) {
    next(error);
  }
};

export const updateCanvas = async (req, res, next) => {
  try {
    const validationError = validateCanvas(req.body);
    if (validationError) return res.status(400).json({ message: validationError });
    const canvas = await Canvas.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, elements: req.body.elements || [] },
      { new: true, runValidators: true }
    );
    if (!canvas) return res.status(404).json({ message: "Canvas not found." });
    res.json(canvas);
  } catch (error) {
    next(error);
  }
};

export const deleteCanvas = async (req, res, next) => {
  try {
    const canvas = await Canvas.findByIdAndDelete(req.params.id);
    if (!canvas) return res.status(404).json({ message: "Canvas not found." });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
