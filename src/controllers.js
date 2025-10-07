// src/controllers.js
const bcrypt = require("bcryptjs");      
const jwt = require("jsonwebtoken");   
const User = require("../models/User");      
const Employee = require("../models/Employee");

const SECRET = process.env.JWT_SECRET || "dev";


// POST /api/v1/user/signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // avoid duplicates
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res
        .status(409)
        .json({ status: false, message: "Username or email already exists" });
    }

    // hash psswrd
    const hash = await bcrypt.hash(password, 10);

    // create and save the user doc
    const user = await User.create({ username, email, password: hash });

    res
      .status(201)
      .json({ message: "User created successfully.", user_id: user._id.toString() });
  } catch (e) {
    next(e);
  }
};

// POST /api/v1/user/login
exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // find user by username or email
    const user = await User.findOne(username ? { username } : { email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Username and password" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Username and password" });
    }

    // token 
    const jwt_token = jwt.sign(
      { sub: user._id.toString(), username: user.username },
      SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Login successful.", jwt_token });
  } catch (e) {
    next(e);
  }
};


// GET /api/v1/emp/employees
exports.list = async (_req, res, next) => {
  try {
    const docs = await Employee.find().lean();
    const out = docs.map(d => ({
      employee_id: d._id.toString(),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
    }));
    res.status(200).json(out);
  } catch (e) {
    next(e);
  }
};

// POST /api/v1/emp/employees
exports.create = async (req, res, next) => {
  try {
    const created = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: created._id.toString(),
    });
  } catch (e) {
    next(e);
  }
};

// GET /api/v1/emp/employees/:eid
exports.getById = async (req, res, next) => {
  try {
    const d = await Employee.findById(req.params.eid).lean();
    if (!d) return res.status(404).json({ status: false, message: "Employee not found" });

    res.status(200).json({
      employee_id: d._id.toString(),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
    });
  } catch (e) {
    next(e);
  }
};

// PUT /api/v1/emp/employees/:eid
exports.update = async (req, res, next) => {
  try {
    const d = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!d) return res.status(404).json({ status: false, message: "Employee not found" });
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (e) {
    next(e);
  }
};

// DELETE /api/v1/emp/employees?eid=xxx
exports.remove = async (req, res, next) => {
  try {
    const d = await Employee.findByIdAndDelete(req.query.eid);
    if (!d) return res.status(404).json({ status: false, message: "Employee not found" });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
