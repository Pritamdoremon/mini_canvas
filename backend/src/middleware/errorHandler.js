export const errorHandler = (error, req, res, next) => {
  console.error(error);
  const invalidId = error.name === "CastError";
  res.status(invalidId ? 400 : 500).json({
    message: invalidId ? "Invalid canvas id." : "Something went wrong on the server."
  });
};
