// สร้้างไฟล์ src/db.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class DatabaseManager {
  constructor() {
    this.dbPath = process.env.DB_PATH || './database/database.db';
    this.db = null;
  }

  /**
   * เชื่อมต่อ database
   */
  connect() {
    try {
      // สร้างโฟลเดอร์ถ้ายังไม่มี
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // เชื่อมต่อ database
      this.db = new Database(this.dbPath, {
        verbose: process.env.NODE_ENV === 'development' ? console.log : null
      });

      // เปิด foreign keys (ถ้ามี)
      this.db.pragma('foreign_keys = ON');

      console.log('✅ Connected to database');
      return this.db;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * รัน SQL script
   */
  runScript(scriptPath) {
    try {
      const fullPath = path.join(__dirname, '..', scriptPath);
      const sql = fs.readFileSync(fullPath, 'utf-8');
      this.db.exec(sql);
      console.log(`✅ Executed: ${path.basename(scriptPath)}`);
    } catch (error) {
      console.error(`❌ Script failed: ${scriptPath}`, error);
      throw error;
    }
  }

  /**
   * สร้าง schema
   */
  createSchema() {
    this.runScript('database/schema.sql');
  }

  /**
   * เพิ่มข้อมูลตัวอย่าง
   */
  seedData() {
    this.runScript('database/seed.sql');
  }

  /**
   * Reset database
   */
  reset() {
    console.log('🔄 Resetting database...');
    this.createSchema();
    this.seedData();
    console.log('✅ Database reset complete');
  }

  /**
   * ปิดการเชื่อมต่อ
   */
  close() {
    if (this.db) {
      this.db.close();
      console.log('👋 Database closed');
    }
  }

  /**
   * ดึง database instance
   */
  getDb() {
    if (!this.db) {
      this.connect();
    }
    return this.db;
  }
}

// Singleton instance
const dbManager = new DatabaseManager();

// ถ้ารันไฟล์นี้โดยตรง
if (require.main === module) {
  const args = process.argv.slice(2);
  
  dbManager.connect();
  
  if (args.includes('--reset')) {
    dbManager.reset();
  } else {
    dbManager.createSchema();
  }
  
  dbManager.close();
  process.exit(0);
}

module.exports = dbManager;