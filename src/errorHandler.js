// src/errorHandler.js
const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: false, errors: errors.array() });
  next();
};

exports.notFound = (_req, res, _next) =>
  res.status(404).json({ status: false, message: "Route not found" });

exports.onError = (err, _req, res, _next) => {
  console.error(err);
  if (res.headersSent) return;
  res.status(err.status || 500).json({ status: false, message: err.message || "Server error" });
};
