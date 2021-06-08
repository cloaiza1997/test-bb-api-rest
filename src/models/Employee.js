const pool = require("../../database/pool");

class Employee {
  id = null;
  document_number = null;
  fullname = "";
  employee_function = "";
  boss_id = null;
  boss = null;

  async delete(employeeId = null) {
    const response = await pool.query(
      `SELECT * FROM employees WHERE boss_id=$1`,
      [employeeId]
    );

    if (response.rowCount === 0) {
      const deleted = await pool.query(`DELETE FROM employees WHERE id=$1`, [
        employeeId,
      ]);

      if (deleted.rowCount === 0) {
        return { message: "Employee no exists", status: false };
      } else {
        return { message: "Employee deleted successfully", status: true };
      }
    } else {
      return { message: "Employee is boss", status: false };
    }
  }

  async find(employeeId = null) {
    const response = await pool.query(`SELECT * FROM employees WHERE id=$1`, [
      employeeId,
    ]);

    const employee = response?.rows[0];
    console.log(employee);
    if (employee) {
      const { id, document_number, fullname, employee_function, boss_id } =
        employee || {};

      this.id = id;
      this.document_number = document_number;
      this.fullname = fullname;
      this.employee_function = employee_function;
      this.boss_id = boss_id;

      if (boss_id && boss_id !== this.id) {
        const boss = new Employee();
        await boss.find(boss_id);

        this.boss = boss;
      }
    }
  }

  async store() {
    // Validation employee exists
    const validation = await pool.query(
      `SELECT * FROM employees WHERE document_number=$1`,
      [this.document_number]
    );

    if (validation?.rows[0]) {
      return { message: "Employee already exists", status: false };
    }

    // Validation boss
    const boss = new Employee();
    await boss.find(this.boss_id);

    if (this.boss_id && !boss.id) {
      return { message: "Boss no exists", status: false };
    }

    // Store employee
    await pool.query(
      `INSERT INTO employees (document_number, fullname, employee_function, boss_id) VALUES ($1, $2, $3, $4)`,
      [
        this.document_number || null,
        this.fullname || null,
        this.employee_function || null,
        this.boss_id || null,
      ]
    );

    const response = await pool.query(
      "SELECT * FROM employees ORDER BY id DESC LIMIT 1"
    );
    const employee = response?.rows[0] || false;

    if (employee) {
      return { message: "Employee added succesfully", employee, status: true };
    } else {
      return { message: "Error creating an employee", status: false };
    }
  }

  async update() {
    // Validation employee exists
    const validation = await pool.query(
      `SELECT * FROM employees WHERE document_number=$1 AND id!=$2`,
      [this.document_number, this.id]
    );

    if (validation?.rows[0]) {
      return { message: "Employee already exists", status: false };
    }

    // Validation boss
    const boss = new Employee();
    await boss.find(this.boss_id);

    // + Boss no exists | - Employee same boss
    if (this.boss_id && !boss.id) {
      return { message: "Boss no exists", status: false };
    } else if (this.id === boss.id) {
      return { message: "Boss is the same employee", status: false };
    } else if (this.id === boss.boss_id) {
      return { message: "Employee is boss of the boss", status: false };
    }

    // Update employee
    await pool.query(
      `UPDATE employees SET document_number=$1, fullname=$2, employee_function=$3, boss_id=$4 WHERE id=$5`,
      [
        this.document_number || null,
        this.fullname || null,
        this.employee_function || null,
        this.boss_id || null,
        this.id,
      ]
    );

    return {
      message: "Employee updated succesfully",
      employee: {
        id: this.id,
        document_number: this.document_number,
        fullname: this.fullname,
        employee_function: this.employee_function,
        boss_id: boss.id,
      },
      status: true,
    };
  }
}

module.exports = Employee;
