// src/models/Todo.js
const dbManager = require('../db');

class Todo {
  constructor() {
    this.db = dbManager.getDb();
  }

  /**
   * ดึง todos ทั้งหมด
   * Challenge 1: Filter by Status
   * Challenge 2: Search
   * Challenge 3: Pagination
   */
  getAll(options = {}) {
    const { done, search, page = 1, limit = 10 } = options;
    
    let sql = `SELECT * FROM todos WHERE 1=1`;
    const params = [];
    
    // Challenge 1: Filter by Status
    if (done !== undefined) {
      const doneValue = done === 'true' || done === true ? 1 : 0;
      sql += ` AND done = ?`;
      params.push(doneValue);
    }
    
    // Challenge 2: Search
    if (search) {
      sql += ` AND task LIKE ?`;
      params.push(`%${search}%`);
    }
    
    // Count total for pagination
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    const { total } = this.db.prepare(countSql).get(...params);
    
    // Challenge 3: Pagination
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const offset = (page - 1) * limit;
    params.push(limit, offset);
    
    const todos = this.db.prepare(sql).all(...params);
    
    return {
      todos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * ดึง todo ตาม ID
   */
  getById(id) {
    const sql = `SELECT * FROM todos WHERE id = ?`;
    return this.db.prepare(sql).get(id);
  }

  /**
   * สร้าง todo ใหม่
   */
  create(task) {
    const sql = `
      INSERT INTO todos (task)
      VALUES (?)
    `;
    const result = this.db.prepare(sql).run(task);
    return this.getById(result.lastInsertRowid);
  }

  /**
   * อัพเดทสถานะ
   */
  updateStatus(id, done) {
    const sql = `
      UPDATE todos
      SET done = ?
      WHERE id = ?
    `;
    const result = this.db.prepare(sql).run(done, id);
    
    if (result.changes === 0) {
      return null;
    }
    
    return this.getById(id);
  }

  /**
   * ลบ todo
   */
  delete(id) {
    const sql = `DELETE FROM todos WHERE id = ?`;
    const result = this.db.prepare(sql).run(id);
    return result.changes > 0;
  }

  /**
   * ดูสถิติ
   */
  getStats() {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) as pending
      FROM todos
    `;
    return this.db.prepare(sql).get();
  }
}

module.exports = new Todo();