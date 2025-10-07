const express = require("express");
const router = express.Router();

const ctrl = require("./controllers");
const v = require("./validators");
const { validate } = require("./errorHandler");

// user roots
router.post("/user/signup", v.signupValidation, validate, ctrl.signup);
router.post("/user/login",  v.loginValidation,  validate, ctrl.login);

//employees roots
router.get("/emp/employees", ctrl.list);
router.post("/emp/employees",  v.createEmployeeValidation, validate, ctrl.create);
router.get("/emp/employees/:eid", v.getByIdValidation, validate, ctrl.getById);
router.put("/emp/employees/:eid", v.updateEmployeeValidation, validate, ctrl.update);
router.delete("/emp/employees",  v.deleteValidation, validate, ctrl.remove);

module.exports = router;
