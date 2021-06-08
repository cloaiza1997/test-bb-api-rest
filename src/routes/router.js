const { Router } = require("express");
const router = Router();

const EmployeeController = require("../controllers/EmployeeController");
const employee = new EmployeeController();

router.get("/employees", employee.index);
router.get("/employees/:id", employee.show);
router.post("/employees", employee.store);
router.put("/employees/:id", employee.update);
router.delete("/employees/:id", employee.delete);

module.exports = router;
