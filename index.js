// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// use your single routes file:
const apiRoutes = require("./src/routes");

// your error handler is at src/errorHandler.js (not middleware/)
const { notFound, onError } = require("./src/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// simple health
app.get("/", (_req, res) => res.json({ status: "ok" }));

// mount all assignment endpoints under /api/v1
app.use("/api/v1", apiRoutes);

// DB health (nice to have)
app.get("/health/db", async (_req, res) => {
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    const s = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({ ok: true, state: s[mongoose.connection.readyState], db: mongoose.connection.name });
  } catch (e) {
    const s = ["disconnected", "connected", "connecting", "disconnecting"];
    res.status(500).json({ ok: false, state: s[mongoose.connection.readyState], error: e.message });
  }
});

// 404 + error
app.use(notFound);
app.use(onError);

// boot
const PORT = process.env.PORT || 3000;
const URI = (process.env.MONGODB_URI || "").trim();

(async () => {
  try {
    if (URI) {
      mongoose.set("strictQuery", true);
      await mongoose.connect(URI, { autoIndex: true });
      console.log("✅ MongoDB connected");
    } else {
      console.warn("⚠️  MONGODB_URI not set; starting without DB");
    }
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (e) {
    console.error("❌ Failed to start:", e.message);
    process.exit(1);
  }
})();
