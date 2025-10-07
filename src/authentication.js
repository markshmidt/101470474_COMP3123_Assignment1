const jwt = require("jsonwebtoken"); //protect routes so only requests with a valid JWT can access them
const SECRET = process.env.JWT_SECRET || "dev";

function auth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ status: false, message: "Missing token" });
  try {
    req.user = jwt.verify(token, SECRET); //checks the token’s signature, valid -> decodes the payload
    next();
  } catch {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
}

module.exports = auth;
