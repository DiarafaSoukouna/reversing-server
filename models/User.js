const db = require("../config/db");

class User {
  static async createUser(nom, prenom, email, categoryId) {
    const [result] = await db.execute(
      `INSERT INTO utilisateurs (nom, prenom, email, category_id) VALUES (?, ?, ?, ?)`,
      [nom, prenom, email, categoryId]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM utilisateurs WHERE email = ?`,
      [email]
    );
    return rows[0];
  }
  static async updateUser(id, nom, prenom, email, categoryId) {
    const [result] = await db.execute(
      `UPDATE utilisateurs SET nom = ?, prenom = ?, email = ?, category_id = ? WHERE id = ?`,
      [nom, prenom, email, categoryId, id]
    );
    return result;
  }
  static async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM utilisateurs WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }
  static async deleteUser(id) {
    const [result] = await db.execute(`DELETE FROM utilisateurs WHERE id = ?`, [
      id,
    ]);
    return result;
  }
}

module.exports = User;
