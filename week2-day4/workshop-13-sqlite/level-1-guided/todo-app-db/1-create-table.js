// 1-สร้างไฟล์ create-table.js
const Database = require('better-sqlite3');

// เชื่อมต่อ database (ถ้าไม่มีจะสร้างใหม่)
const db = new Database('database.db');

console.log('📁 Creating todos table...');

// สร้าง table
const createTable = `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createTable);

console.log('✅ Table created successfully!');
console.log('');

// ดู structure ของ table
const tableInfo = db.pragma('table_info(todos)');
console.log('📋 Table structure:');
console.table(tableInfo);

// ปิดการเชื่อมต่อ
db.close();