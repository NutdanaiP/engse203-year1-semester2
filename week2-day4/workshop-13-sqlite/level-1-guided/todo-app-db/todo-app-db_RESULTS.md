# 📊 บันทึกผลการทดลอง - Workshop 13 Level 1

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา : 68543210082-2
- วันที่: February 1, 2026

---

## ส่วนที่ 1: สร้าง Table
**คำสั่งที่ใช้:**
```bash
node 1-create-table.js
```

**ผลลัพธ์:**
- ✅ สร้าง table สำเร็จ
- ใช้คำสั่ง `CREATE TABLE IF NOT EXISTS todos` เพื่อป้องกันการสร้างซ้ำ
- สร้างไฟล์ `database.db` ในโฟลเดอร์โปรเจค
- ตาราง todos มี 4 columns: id, task, done, created_at

**โครงสร้างตาราง (Table Structure):**
```
┌─────────┬─────┬──────────────┬───────────┬─────────┬─────────────────────┬────┐
│ (index) │ cid │ name         │ type      │ notnull │ dflt_value          │ pk │
├─────────┼─────┼──────────────┼───────────┼─────────┼─────────────────────┼────┤
│ 0       │ 0   │ 'id'         │ 'INTEGER' │ 0       │ null                │ 1  │
│ 1       │ 1   │ 'task'       │ 'TEXT'    │ 1       │ null                │ 0  │
│ 2       │ 2   │ 'done'       │ 'INTEGER' │ 0       │ '0'                 │ 0  │
│ 3       │ 3   │ 'created_at' │ 'TEXT'    │ 0       │ 'CURRENT_TIMESTAMP' │ 0  │
└─────────┴─────┴──────────────┴───────────┴─────────┴─────────────────────┴────┘
```

**คำอธิบาย Columns:**
- **id**: INTEGER, PRIMARY KEY (pk=1), AUTOINCREMENT - รหัสอัตโนมัติ
- **task**: TEXT, NOT NULL (notnull=1) - ข้อความงานที่ต้องทำ (ต้องมีค่า)
- **done**: INTEGER, DEFAULT 0 - สถานะการทำงาน (0=ยังไม่เสร็จ, 1=เสร็จแล้ว)
- **created_at**: TEXT, DEFAULT CURRENT_TIMESTAMP - วันเวลาที่สร้าง (อัตโนมัติ)

**สิ่งที่สังเกต:**
- SQLite ใช้ `INTEGER` สำหรับ boolean (0 = false, 1 = true)
- `IF NOT EXISTS` ทำให้รันซ้ำได้โดยไม่เกิด error
- ใช้ `db.pragma('table_info(todos)')` เพื่อดูโครงสร้างตาราง
- ต้อง `db.close()` เพื่อปิดการเชื่อมต่อหลังใช้งานเสร็จ

---

## ส่วนที่ 2: เพิ่มข้อมูล
**คำสั่งที่ใช้:**
```bash
node 2-insert-data.js
```

**ทดลองเพิ่ม:**
- เพิ่ม 5 todos:
  1. ซื้อของที่ตลาด
  2. ทำการบ้านคณิตศาสตร์
  3. ออกกำลังกาย
  4. อ่านหนังสือ
  5. ทำความสะอาดห้อง

**ผลลัพธ์:**
- ✅ เพิ่มข้อมูลสำเร็จ 5 รายการ
- ใช้คำสั่ง `INSERT INTO todos (task) VALUES (?)` กับ prepared statement
- ข้อมูลถูกบันทึกใน database.db พร้อม id ที่ auto-increment
- แต่ละรายการมี created_at timestamp อัตโนมัติ

**ตาราง todos หลังเพิ่มข้อมูล:**
```
┌─────────┬────┬─────────────────────────┬──────┬───────────────────────┐
│ (index) │ id │ task                    │ done │ created_at            │
├─────────┼────┼─────────────────────────┼──────┼───────────────────────┤
│ 0       │ 1  │ 'ซื้อของที่ตลาดและร้านขายยา' │ 1    │ '2026-02-01 07:58:49' │
│ 1       │ 2  │ 'ทำการบ้านคณิตศาสตร์'      │ 1    │ '2026-02-01 07:58:49' │
│ 2       │ 3  │ 'ออกกำลังกาย'            │ 1    │ '2026-02-01 07:58:49' │
│ 3       │ 4  │ 'อ่านหนังสือ'              │ 0    │ '2026-02-01 07:58:49' │
│ 4       │ 6  │ 'ซื้อของที่ตลาด'            │ 0    │ '2026-02-05 15:32:04' │
│ 5       │ 7  │ 'ทำการบ้านคณิตศาสตร์'      │ 0    │ '2026-02-05 15:32:04' │
│ 6       │ 8  │ 'ออกกำลังกาย'            │ 0    │ '2026-02-05 15:32:04' │
│ 7       │ 9  │ 'อ่านหนังสือ'              │ 0    │ '2026-02-05 15:32:04' │
│ 8       │ 10 │ 'ทำความสะอาดห้อง'        │ 0    │ '2026-02-05 15:32:05' │
└─────────┴────┴─────────────────────────┴──────┴───────────────────────┘
```

---

## ส่วนที่ 3: Query ข้อมูล
**คำสั่งที่ใช้:**
```bash
node 3-select-data.js
```

**SQL ที่ทดสอบ:**
```sql
-- 1. ดึงข้อมูลทั้งหมด
SELECT * FROM todos

-- 2. ดึงเฉพาะที่ยังไม่เสร็จ (done = 0)
SELECT * FROM todos WHERE done = 0

-- 3. ดึงตาม id
SELECT * FROM todos WHERE id = 1

-- 4. นับจำนวน
SELECT COUNT(*) as total FROM todos

-- 5. ดึงเฉพาะ columns ที่ต้องการ
SELECT id, task, done FROM todos
```

**ผลลัพธ์:**

**1. ดึงข้อมูลทั้งหมด:**
- พบ 9 todos ทั้งหมด
- แสดงทุก column: id, task, done, created_at

**2. Pending todos (done = 0):**
- พบ 6 รายการที่ยังไม่เสร็จ
```
┌─────────┬────┬────────────────────┬──────┬───────────────────────┐
│ (index) │ id │ task               │ done │ created_at            │
├─────────┼────┼────────────────────┼──────┼───────────────────────┤
│ 0       │ 4  │ 'อ่านหนังสือ'         │ 0    │ '2026-02-01 07:58:49' │
│ 1       │ 6  │ 'ซื้อของที่ตลาด'       │ 0    │ '2026-02-05 15:32:04' │
│ 2       │ 7  │ 'ทำการบ้านคณิตศาสตร์' │ 0    │ '2026-02-05 15:32:04' │
│ 3       │ 8  │ 'ออกกำลังกาย'       │ 0    │ '2026-02-05 15:32:04' │
│ 4       │ 9  │ 'อ่านหนังสือ'         │ 0    │ '2026-02-05 15:32:04' │
│ 5       │ 10 │ 'ทำความสะอาดห้อง'   │ 0    │ '2026-02-05 15:32:05' │
└─────────┴────┴────────────────────┴──────┴───────────────────────┘
```

**3. Todo ที่มี id = 1:**
```javascript
{
  id: 1,
  task: 'ซื้อของที่ตลาดและร้านขายยา',
  done: 1,
  created_at: '2026-02-01 07:58:49'
}
```

**4. นับจำนวน todos:**
- Total todos: 9 รายการ

**5. ดึงเฉพาะ columns (id, task, done):**
- ดึงได้สำเร็จโดยไม่แสดง created_at
- ช่วยลดข้อมูลที่ไม่จำเป็น

**สังเกต:**
- `.all()` ใช้สำหรับดึงหลายแถว (returns array)
- `.get()` ใช้สำหรับดึงแถวเดียว (returns object)
- WHERE clause ช่วยกรองข้อมูลได้แม่นยำ
- COUNT(*) ใช้นับจำนวนแถวได้

---

## Challenge ที่ทำเพิ่ม
- [✅] Challenge 1: ค้นหา (`searchTodos`)
- [✅] Challenge 2: แก้ไข (`updateTask`)
- [✅] Challenge 3: ลบทั้งหมด (`clearCompleted`)
- [✅] Challenge 4: เรียงลำดับ (`showByDate`)

---

## สรุปสิ่งที่ได้เรียนรู้

**สิ่งที่เรียนรู้:**
- เข้าใจการทำงานของ SQLite database และวิธีเชื่อมต่อกับ Node.js
- เรียนรู้การใช้ better-sqlite3 library สำหรับจัดการฐานข้อมูล
- เข้าใจคำสั่ง SQL พื้นฐาน: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE
- เรียนรู้การใช้ WHERE clause สำหรับกรองข้อมูล (WHERE done = 0, done = 1)
- เข้าใจการใช้ LIKE '%keyword%' สำหรับค้นหาข้อมูล
- เรียนรู้การเรียงลำดับข้อมูลด้วย ORDER BY DESC
- เข้าใจการสร้าง class และ method ใน JavaScript สำหรับจัดการฐานข้อมูล
- เรียนรู้การใช้ prepared statements เพื่อป้องกัน SQL injection
- เข้าใจการใช้ PRIMARY KEY AUTOINCREMENT สำหรับสร้าง ID อัตโนมัติ
- เรียนรู้การใช้ DATETIME DEFAULT CURRENT_TIMESTAMP สำหรับบันทึกเวลา

**ปัญหาที่พบและแก้ไข:**
- ตอนแรกอาจลืม close database connection ทำให้ไฟล์ database ถูก lock
  - แก้ไข: เพิ่ม db.close() ตอนจบโปรแกรม
- อาจพบปัญหาเวลาใช้ LIKE โดยไม่ใส่ % ทำให้ค้นหาไม่เจอ
  - แก้ไข: ใช้ `%${keyword}%` เพื่อค้นหาแบบ partial match
- อาจสับสนระหว่าง .run(), .get(), และ .all()
  - .run() = execute (INSERT, UPDATE, DELETE)
  - .get() = ดึงแถวเดียว
  - .all() = ดึงทุกแถว

**คำถามที่ยังสงสัย:**
- จะทำ pagination (แบ่งหน้า) สำหรับข้อมูลจำนวนมากได้อย่างไร?
- จะสร้าง relationship ระหว่างหลาย table ได้ไหม (Foreign Key)?
- จะ backup และ restore database ได้อย่างไร?
- จะทำ transaction เพื่อให้หลายคำสั่งทำพร้อมกันได้อย่างไร?
- ถ้าต้องการใช้งาน database จริงๆ ควรใช้ SQLite หรือเปลี่ยนเป็น MySQL/PostgreSQL ดีกว่า?

---

## 🎓 สิ่งที่ได้เรียนรู้

✅ Database และ Table คืออะไร  
✅ สร้าง table ด้วย CREATE TABLE  
✅ เพิ่มข้อมูลด้วย INSERT  
✅ ดึงข้อมูลด้วย SELECT  
✅ แก้ไขด้วย UPDATE  
✅ ลบด้วย DELETE  
✅ เชื่อมต่อ SQLite กับ Node.js  
✅ ใช้ better-sqlite3  

---

## 📝 ตัวอย่างคำสั่ง SQL ที่ใช้

### สร้าง Table
```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  done INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### เพิ่มข้อมูล
```sql
INSERT INTO todos (task) VALUES ('Learn JavaScript')
```

### ดึงข้อมูล
```sql
SELECT * FROM todos
SELECT * FROM todos WHERE done = 0
SELECT * FROM todos WHERE done = 1
```

### แก้ไขข้อมูล
```sql
UPDATE todos SET done = 1 WHERE id = 1
UPDATE todos SET task = 'New Task' WHERE id = 1
```

### ลบข้อมูล
```sql
DELETE FROM todos WHERE id = 1
DELETE FROM todos WHERE done = 1
```

### ค้นหา
```sql
SELECT * FROM todos WHERE task LIKE '%keyword%'
```

### เรียงลำดับ
```sql
SELECT * FROM todos ORDER BY created_at DESC
```

---

## 🎯 Challenge Features ที่สร้าง

### 1. searchTodos(keyword)
ค้นหา todos ที่มี keyword ในข้อความ
```javascript
searchTodos(keyword) {
  const todos = db.prepare('SELECT * FROM todos WHERE task LIKE ?').all(`%${keyword}%`);
  console.table(todos);
}
```

### 2. updateTask(id, newTask)
แก้ไขข้อความของ todo
```javascript
updateTask(id, newTask) {
  const update = db.prepare('UPDATE todos SET task = ? WHERE id = ?');
  update.run(newTask, id);
}
```

### 3. clearCompleted()
ลบ todos ที่เสร็จแล้วทั้งหมด
```javascript
clearCompleted() {
  const del = db.prepare('DELETE FROM todos WHERE done = 1');
  del.run();
}
```

### 4. showByDate()
แสดง todos เรียงตามวันที่สร้าง (ใหม่สุดก่อน)
```javascript
showByDate() {
  const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
  console.table(todos);
}
```
