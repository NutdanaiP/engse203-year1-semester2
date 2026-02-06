# 📊 บันทึกผลการทดลอง - Workshop 14 Level 1 (Todo API)

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา: 68543210082-2
- วันที่: February 1, 2026

---

### Project Structure
```
todo-api/
├── server.js              # Entry point
├── .env                   # Environment variables
├── database/
│   └── todos.db          # SQLite database
└── src/
    ├── app.js            # Express app configuration
    ├── db.js             # Database connection manager
    ├── controllers/      # Business logic
    │   └── todoController.js
    ├── models/           # Data access layer
    │   └── Todo.js
    ├── routes/           # API routes
    │   └── todoRoutes.js
    └── middleware/       # Custom middleware
        └── errorHandler.js
```

---

## 🚀 การเริ่มต้น Server

**คำสั่งที่ใช้:**
```bash
npm start
# หรือ
npm run dev  # (สำหรับ development mode with nodemon)
```

**ผลลัพธ์:**
```
✅ Connected to database
🚀 Server running on http://localhost:3000
📚 API docs: http://localhost:3000/api/todos
```

**สังเกต:**
- Database connection สำเร็จ
- Server รันที่ port 3000
- พร้อมรับ HTTP requests

---

## 🧪 การทดสอบ API Endpoints

### 1️⃣ GET All Todos (ดึงข้อมูลทั้งหมด)

**Request:**
```http
GET http://localhost:3000/api/todos
```

**cURL Command:**
```bash
curl http://localhost:3000/api/todos
```

**Response (200 OK):**
```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  },
  "data": [
    {
      "id": 1,
      "task": "ซื้อของที่ตลาด",
      "done": 0,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    },
    {
      "id": 2,
      "task": "ทำการบ้านคณิตศาสตร์",
      "done": 1,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    },
    {
      "id": 3,
      "task": "ออกกำลังกาย",
      "done": 0,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    },
    {
      "id": 4,
      "task": "อ่านหนังสือ",
      "done": 0,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    },
    {
      "id": 5,
      "task": "ทำความสะอาดห้อง",
      "done": 1,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    }
  ]
}
```

**SQL ที่ทำงาน:**
```sql
SELECT COUNT(*) as total FROM todos WHERE 1=1
SELECT * FROM todos WHERE 1=1 ORDER BY created_at DESC LIMIT 10 OFFSET 0
```

**สังเกต:**
- มี pagination อัตโนมัติ (default: page=1, limit=10)
- เรียงลำดับจากใหม่สุดก่อน (created_at DESC)
- done = 0 (ยังไม่เสร็จ), done = 1 (เสร็จแล้ว)

---

### 2️⃣ POST Create Todo (สร้างรายการใหม่)

**Request:**
```http
POST http://localhost:3000/api/todos
Content-Type: application/json

{
  "task": "เรียน MongoDB"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"task":"เรียน MongoDB"}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "task": "เรียน MongoDB",
    "done": 0,
    "created_at": "2026-02-05 16:30:00",
    "updated_at": "2026-02-05 16:30:00"
  }
}
```

**SQL ที่ทำงาน:**
```sql
INSERT INTO todos (task) VALUES ('เรียน MongoDB')
SELECT * FROM todos WHERE id = 6
```

**Validation Rules:**
- `task` ต้องมีค่า (required)
- `task` ต้องไม่เป็นช่องว่าง
- `task` ต้องมีความยาวไม่เกิน 200 ตัวอักษร

**Error Examples:**
```json
// ไม่ส่ง task
{
  "success": false,
  "error": {
    "message": "Task is required",
    "code": "VALIDATION_ERROR"
  }
}

// task ยาวเกินไป
{
  "success": false,
  "error": {
    "message": "Task must be less than 200 characters",
    "code": "VALIDATION_ERROR"
  }
}
```

---

### 3️⃣ PATCH Update Status (อัพเดทสถานะ)

**Request:**
```http
PATCH http://localhost:3000/api/todos/1
Content-Type: application/json

{
  "done": true
}
```

**cURL Command:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "task": "ซื้อของที่ตลาด",
    "done": 1,
    "created_at": "2026-02-01 09:37:27",
    "updated_at": "2026-02-05 16:30:28"
  }
}
```

**SQL ที่ทำงาน:**
```sql
UPDATE todos SET done = 1 WHERE id = 1
SELECT * FROM todos WHERE id = 1
```

**สังเกต:**
- รับค่า `done` เป็น boolean (true/false) หรือ number (0/1)
- `updated_at` ถูกอัพเดทอัตโนมัติ
- ถ้าไม่พบ id จะ return 404

**Error (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Todo not found",
    "code": "TODO_NOT_FOUND"
  }
}
```

---

### 4️⃣ DELETE Todo (ลบรายการ)

**Request:**
```http
DELETE http://localhost:3000/api/todos/6
```

**cURL Command:**
```bash
curl -X DELETE http://localhost:3000/api/todos/6
```

**Response (204 No Content):**
```
(No response body)
```

**SQL ที่ทำงาน:**
```sql
DELETE FROM todos WHERE id = 6
```

**สังเกต:**
- ลบสำเร็จ return status 204 (No Content)
- ไม่มี response body
- ถ้าไม่พบ id จะ return 404

---

### 5️⃣ GET Stats (ดูสถิติ)

**Request:**
```http
GET http://localhost:3000/api/todos/stats
```

**cURL Command:**
```bash
curl http://localhost:3000/api/todos/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "completed": 3,
    "pending": 2
  }
}
```

**SQL ที่ทำงาน:**
```sql
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) as pending
FROM todos
```

**สังเกต:**
- ใช้ `SUM` กับ `CASE WHEN` เพื่อนับตามเงื่อนไข
- คำนวณทั้งหมด (total), เสร็จแล้ว (completed), ยังไม่เสร็จ (pending)

---

## 🎯 Challenge Features (เพิ่มเติม)

### Challenge 1: Filter by Status

**Request:**
```http
GET http://localhost:3000/api/todos?done=true
```

**cURL Command:**
```bash
curl "http://localhost:3000/api/todos?done=true"
```

**Response:**
```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  },
  "data": [
    {
      "id": 1,
      "task": "ซื้อของที่ตลาด",
      "done": 1,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-05 16:30:28"
    },
    {
      "id": 2,
      "task": "ทำการบ้านคณิตศาสตร์",
      "done": 1,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    },
    {
      "id": 5,
      "task": "ทำความสะอาดห้อง",
      "done": 1,
      "created_at": "2026-02-01 09:37:27",
      "updated_at": "2026-02-01 09:37:27"
    }
  ]
}
```

**Usage:**
- `?done=true` → แสดงเฉพาะงานที่เสร็จแล้ว
- `?done=false` → แสดงเฉพาะงานที่ยังไม่เสร็จ

---

### Challenge 2: Search

**Request:**
```http
GET http://localhost:3000/api/todos?search=ซื้อ
```

**cURL Command:**
```bash
curl "http://localhost:3000/api/todos?search=ซื้อ"
```

**SQL ที่ทำงาน:**
```sql
SELECT * FROM todos WHERE 1=1 AND task LIKE '%ซื้อ%' 
ORDER BY created_at DESC LIMIT 10 OFFSET 0
```

**Usage:**
- ค้นหาใน `task` field
- ใช้ LIKE '%keyword%' สำหรับ partial match

---

### Challenge 3: Pagination

**Request:**
```http
GET http://localhost:3000/api/todos?page=1&limit=3
```

**cURL Command:**
```bash
curl "http://localhost:3000/api/todos?page=1&limit=3"
```

**Response:**
```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 3,
    "total": 5,
    "totalPages": 2
  },
  "data": [
    // แสดง 3 รายการแรก
  ]
}
```

**Usage:**
- `?page=1&limit=3` → หน้า 1 แสดง 3 รายการ
- `?page=2&limit=3` → หน้า 2 แสดง 3 รายการ
- Default: page=1, limit=10

---

### รวม Challenges ทั้ง 3

**Request:**
```http
GET http://localhost:3000/api/todos?done=false&search=ห&page=1&limit=5
```

**ผลลัพธ์:**
- กรองเฉพาะงานที่ยังไม่เสร็จ (done=false)
- ค้นหา "ห" ในชื่องาน
- แสดงหน้า 1 จำนวน 5 รายการ

---

## 📊 Database Schema

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  done INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_timestamp 
AFTER UPDATE ON todos
BEGIN
  UPDATE todos SET updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
END;
```

**Columns:**
- `id`: Primary key, auto-increment
- `task`: ข้อความงาน (NOT NULL)
- `done`: สถานะ (0 = ยังไม่เสร็จ, 1 = เสร็จแล้ว)
- `created_at`: วันเวลาที่สร้าง (อัตโนมัติ)
- `updated_at`: วันเวลาที่แก้ไข (อัตโนมัติ)

**Trigger:**
- อัพเดท `updated_at` อัตโนมัติเมื่อมีการแก้ไข

---

## 🏗️ MVC Architecture

### Model (Todo.js)
```javascript
class Todo {
  getAll(options)        // ดึงทั้งหมด + filters
  getById(id)            // ดึงตาม ID
  create(task)           // สร้างใหม่
  updateStatus(id, done) // อัพเดทสถานะ
  delete(id)             // ลบ
  getStats()             // สถิติ
}
```

**หน้าที่:**
- จัดการ data access
- เขียน SQL queries
- ใช้ prepared statements

---

### Controller (todoController.js)
```javascript
exports.getAll        // GET /api/todos
exports.getById       // GET /api/todos/:id
exports.create        // POST /api/todos
exports.updateStatus  // PATCH /api/todos/:id
exports.delete        // DELETE /api/todos/:id
exports.getStats      // GET /api/todos/stats
```

**หน้าที่:**
- รับ request จาก routes
- validate input
- เรียกใช้ model
- format response
- error handling

---

### Routes (todoRoutes.js)
```javascript
router.get('/',        todoController.getAll);
router.get('/stats',   todoController.getStats);
router.get('/:id',     todoController.getById);
router.post('/',       todoController.create);
router.patch('/:id',   todoController.updateStatus);
router.delete('/:id',  todoController.delete);
```

**หน้าที่:**
- กำหนด API endpoints
- เชื่อม URL กับ controllers

---

## 🔒 Security Features

### 1. Prepared Statements
```javascript
// ✅ ปลอดภัย - ใช้ prepared statements
const sql = 'SELECT * FROM todos WHERE id = ?';
db.prepare(sql).get(id);

// ❌ อันตราย - SQL Injection
const sql = `SELECT * FROM todos WHERE id = ${id}`;
```

**ป้องกัน:**
- SQL Injection attacks
- XSS (Cross-Site Scripting)

---

### 2. Input Validation
```javascript
// ตรวจสอบ task
if (!task || task.trim() === '') {
  return res.status(400).json({ error: 'Task is required' });
}

// ตรวจสอบความยาว
if (task.length > 200) {
  return res.status(400).json({ error: 'Task too long' });
}

// ตรวจสอบ type
if (typeof done !== 'boolean' && done !== 0 && done !== 1) {
  return res.status(400).json({ error: 'Invalid done value' });
}
```

---

### 3. Error Handling
```javascript
try {
  // Business logic
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      details: error.message
    }
  });
}
```

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "message": "Human readable message",
    "code": "ERROR_CODE",
    "details": "Technical details"
  }
}
```

---

## 🎓 สิ่งที่ได้เรียนรู้

### ✅ 1. เชื่อมต่อ SQLite กับ Express
- ใช้ `better-sqlite3` สำหรับ SQLite
- สร้าง database connection manager
- Graceful shutdown (ปิด connection เมื่อหยุด server)

**Code Example:**
```javascript
const Database = require('better-sqlite3');
const db = new Database('./database/todos.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
```

---

### ✅ 2. MVC Pattern (Model-View-Controller)
- **Model:** จัดการข้อมูลกับ database
- **Controller:** ประมวลผล business logic
- **Routes:** จัดการ HTTP requests

**ข้อดี:**
- แยก concerns ชัดเจน
- ง่ายต่อการ maintain
- Test ได้ทีละส่วน
- Reusable code

---

### ✅ 3. RESTful API Design
```
GET    /api/todos        → List all
GET    /api/todos/:id    → Get one
POST   /api/todos        → Create
PATCH  /api/todos/:id    → Update
DELETE /api/todos/:id    → Delete
GET    /api/todos/stats  → Statistics
```

**Principles:**
- ใช้ HTTP methods ตามมาตรฐาน
- URL เป็น resource-based
- Status codes ที่เหมาะสม (200, 201, 204, 404, 500)
- Response format สม่ำเสมอ

---

### ✅ 4. Error Handling
- Try-catch blocks
- Proper status codes
- Consistent error format
- User-friendly messages
- Debug details (development only)

---

### ✅ 5. Input Validation
- Required field checks
- Type validation
- Length validation
- Sanitization (trim whitespace)
- Early return pattern

---

### ✅ 6. Prepared Statements (Security)
**ทำไมสำคัญ:**
```javascript
// ❌ SQL Injection vulnerability
const sql = `SELECT * FROM todos WHERE id = ${req.params.id}`;
// ถ้า id = "1 OR 1=1" จะ return ทุกแถว!

// ✅ ปลอดภัย
const sql = 'SELECT * FROM todos WHERE id = ?';
db.prepare(sql).get(req.params.id);
```

---

### ✅ 7. Testing with cURL/Postman
- ทดสอบทุก endpoint
- ตรวจสอบ response format
- ทดสอบ error cases
- ทดสอบ edge cases

**cURL Examples:**
```bash
# GET
curl http://localhost:3000/api/todos

# POST with data
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"task":"New task"}'

# PATCH
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# DELETE
curl -X DELETE http://localhost:3000/api/todos/1
```

---

## 💡 Best Practices

### 1. Database Connection
```javascript
// ✅ Singleton pattern
class DatabaseManager {
  constructor() {
    if (!DatabaseManager.instance) {
      this.db = new Database('./database/todos.db');
      DatabaseManager.instance = this;
    }
    return DatabaseManager.instance;
  }
}
```

### 2. Error Messages
```javascript
// ✅ Clear and specific
{ error: 'Task is required' }

// ❌ Generic
{ error: 'Invalid input' }
```

### 3. Status Codes
- 200: Success (GET, PATCH)
- 201: Created (POST)
- 204: No Content (DELETE)
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Internal Server Error

### 4. Response Format
```javascript
// ✅ Consistent structure
{
  "success": true/false,
  "data": {},      // on success
  "error": {}      // on failure
}
```

---

## 🚀 Next Steps

### Potential Improvements:
1. **Authentication & Authorization**
   - User accounts
   - JWT tokens
   - Protected routes

2. **Advanced Queries**
   - Sort by multiple fields
   - Date range filtering
   - Full-text search

3. **Database Migrations**
   - Version control for schema
   - Rollback support

4. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - API tests (Supertest)

5. **Documentation**
   - Swagger/OpenAPI
   - API documentation

6. **Production Ready**
   - Environment variables
   - Logging (Winston)
   - Rate limiting
   - CORS configuration
   - Compression

---

## 📁 ไฟล์สำคัญ

| File | Purpose |
|------|---------|
| `server.js` | Entry point, start server |
| `src/app.js` | Express configuration |
| `src/db.js` | Database manager |
| `src/models/Todo.js` | Data access layer |
| `src/controllers/todoController.js` | Business logic |
| `src/routes/todoRoutes.js` | API routes |
| `src/middleware/errorHandler.js` | Global error handler |
| `.env` | Environment variables |
| `database/todos.db` | SQLite database file |

---
