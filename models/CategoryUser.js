const db = require("../config/db");

class CategoryUser {
  static async createCategoryUser(name, description) {
    const [result] = await db.execute(
      `INSERT INTO category_user (name, description) VALUES (?, ?)`,
      [name, description]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM category_user WHERE id = ?`,
      [id]
    );
    return rows[0];
  }
  static async updateCategoryUser(id, name, description) {
    const [result] = await db.execute(
      `UPDATE category_user SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    );
    return result;
  }

  static async deleteCategoryUser(id) {
    const [result] = await db.execute(
      `DELETE FROM category_user WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = CategoryUser;
