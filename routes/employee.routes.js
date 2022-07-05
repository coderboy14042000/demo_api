let express = require("express");
let router = express.Router();
const connection = require("../db/db.connection");

let employeeController = require("../controller/employee.controller");
let employeeValidator=require('../validation/employee.validation');
let Authentication=require('../helper/auth.helper');

/* GET employee router listing. */
router.post("/registration",employeeValidator.validate('registration') ,employeeController.registration);
router.post("/login",employeeValidator.validate('login') ,employeeController.login);
router.get("/getAllEmployee",Authentication.ensure,employeeController.getAllEmployee);
router.get("/getEmployeeById/:id",Authentication.ensure,employeeController.getEmployeeById);
router.put("/updateEmployeeById/:id",Authentication.ensure,employeeValidator.validate('updateEmployee'),employeeController.updateEmployeeById);
router.delete("/deleteEmployeeById/:id",Authentication.ensure ,employeeController.deleteEmployeeById);

module.exports = router;

