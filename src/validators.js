// src/validators.js
const { body, param, query, validationResult } = require("express-validator");

// expose a validate middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: false, errors: errors.array() });
  next();
};

// users
exports.signupValidation = [
  body("username").isString().trim().notEmpty(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 6 })
];

exports.loginValidation = [
  body("password").isString().notEmpty(),
  body("email").optional().isEmail(),
  body("username").optional().isString().notEmpty()
];

// employees
exports.createEmployeeValidation = [
  body("first_name").isString().notEmpty(),
  body("last_name").isString().notEmpty(),
  body("email").isEmail(),
  body("position").isString().notEmpty(),
  body("salary").isNumeric(),
  body("date_of_joining").isISO8601().toDate(),
  body("department").isString().notEmpty()
];

exports.updateEmployeeValidation = [
  param("eid").isMongoId(),
  body("first_name").optional().isString().notEmpty(),
  body("last_name").optional().isString().notEmpty(),
  body("email").optional().isEmail(),
  body("position").optional().isString().notEmpty(),
  body("salary").optional().isNumeric(),
  body("date_of_joining").optional().isISO8601().toDate(),
  body("department").optional().isString().notEmpty()
];

exports.getByIdValidation = [ param("eid").isMongoId() ];
exports.deleteValidation = [ query("eid").isMongoId() ];
