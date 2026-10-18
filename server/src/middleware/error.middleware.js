export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(". ") });
  }

  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    const field = fields[0] || "field";
    const label = field === "email" ? "Email" : field === "rollNumber" ? "Roll number" : field;
    return res.status(409).json({ success: false, message: `${label} already exists.` });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid identifier format." });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
}
