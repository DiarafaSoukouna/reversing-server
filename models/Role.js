// models/Role.js
const db = require("../config/db");

class Role {
  static async createRole(nom) {
    const [result] = await db.execute(`INSERT INTO roles (nom) VALUES (?)`, [
      nom,
    ]);
    return result.insertId;
  }

  static async updateRole(id, nom) {
    const [result] = await db.execute(
      `UPDATE roles SET nom = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?`,
      [nom, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteRole(id) {
    const [result] = await db.execute(`DELETE FROM roles WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }

  static async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM roles WHERE id = ?`, [id]);
    return rows[0];
  }
}

module.exports = Role;
