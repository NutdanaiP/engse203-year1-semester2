// models/Book.js - COMPLETE SOLUTION
const { db } = require('../db');

class Book {
  /**
   * ดึงหนังสือทั้งหมด (ให้มาครบแล้ว)
   */
  static getAll() {
    const sql = 'SELECT * FROM books';
    return db.prepare(sql).all();
  }

  /**
   * ดึงหนังสือที่ว่าง (available = 1)
   * 🔨 นักศึกษาต้องเขียนเอง
   */
  static getAvailable() {
    const sql = 'SELECT * FROM books WHERE available = 1';
    return db.prepare(sql).all();
  }

  /**
   * ค้นหาหนังสือ
   * 🔨 นักศึกษาต้องเขียนเอง
   */
  static search(keyword) {
    const sql = `
      SELECT * FROM books 
      WHERE title LIKE ? OR author LIKE ?
    `;
    const pattern = `%${keyword}%`;
    return db.prepare(sql).all(pattern, pattern);
  }

  /**
   * เพิ่มหนังสือใหม่
   * 🔨 นักศึกษาต้องเขียนเอง
   */
  static add(title, author) {
    const sql = `
      INSERT INTO books (title, author)
      VALUES (?, ?)
    `;
    const result = db.prepare(sql).run(title, author);
    
    // Return หนังสือที่เพิ่ม
    return db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid);
  }

  /**
   * ดึงหนังสือตาม ID (เพิ่มเติม - ไม่บังคับ)
   */
  static getById(id) {
    const sql = 'SELECT * FROM books WHERE id = ?';
    return db.prepare(sql).get(id);
  }
}

module.exports = Book;