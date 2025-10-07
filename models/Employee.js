const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name:  { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    position:   { type: String, required: true, trim: true },
    salary:     { type: Number, required: true, min: 0 },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// ✅ IMPORTANT: default export of the model
module.exports = mongoose.model("Employee", employeeSchema);
