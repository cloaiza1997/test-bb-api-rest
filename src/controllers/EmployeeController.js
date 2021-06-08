const pool = require("../../database/pool");
const Employee = require("../models/Employee");

class EmployeeController {
  async delete(req, res) {
    const { id } = req.params;

    const employee = new Employee();
    const response = await employee.delete(id);

    res.json(response);
  }

  async index(req, res) {
    const response = await pool.query("SELECT * FROM employees ORDER BY id");

    res.json(response.rows);
  }

  async store(req, res) {
    const { document_number, fullname, employee_function, boss_id } = req.body;

    const employee = new Employee();

    employee.document_number = document_number || null;
    employee.fullname = fullname || null;
    employee.employee_function = employee_function || null;
    employee.boss_id = boss_id || null;

    const response = await employee.store();

    res.json({
      status: true,
      ...response,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const employee = new Employee();
    await employee.find(id);

    res.json({
      status: true,
      message: !employee.id ? "Employee not found" : undefined,
      body: {
        employee,
      },
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { document_number, fullname, employee_function, boss_id } = req.body;

    const employee = new Employee();
    await employee.find(id);

    if (!employee.id) {
      res.json({
        status: false,
        message: "Employee not found",
      });
    } else {
      employee.document_number = document_number;
      employee.fullname = fullname;
      employee.employee_function = employee_function;
      employee.boss_id = boss_id || null;

      const response = await employee.update();

      res.json({
        status: true,
        ...response,
      });
    }
  }
}

module.exports = EmployeeController;
