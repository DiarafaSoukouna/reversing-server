const db = require("../config/db");

class Account {
  static async createAccount(username, passwordHash, roleId, userId, validity) {
    const [result] = await db.execute(
      `INSERT INTO comptes (username, password, role_id, user_id, validity) VALUES (?, ?, ?, ?, ?)`,
      [username, passwordHash, roleId, userId, validity]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute(
      `SELECT * FROM comptes WHERE username = ?`,
      [username]
    );
    return rows[0];
  }
  static async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM comptes WHERE id = ?`, [id]);
    return rows[0];
  }
  static async updateAccount(id, username, passwordHash, roleId, validity) {
    const [result] = await db.execute(
      `UPDATE comptes SET username = ?, password = ?, role_id = ?, validity = ? WHERE id = ?`,
      [username, passwordHash, roleId, validity, id]
    );
    return result;
  }

  static async deleteAccount(id) {
    const [result] = await db.execute(`DELETE FROM comptes WHERE id = ?`, [id]);
    return result;
  }
}

module.exports = Account;
