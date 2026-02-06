# 📊 บันทึกผลการทดลอง - Workshop 13 Level 2 (Library System)

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา: 68543210082-2
- วันที่: February 1, 2026

---

## 📖 เกี่ยวกับโปรเจค

**Library System (ระบบห้องสมุด)** - ระบบจัดการห้องสมุดที่มีการเชื่อมโยงข้อมูลหลายตาราง

### Database Schema

โปรเจคนี้ใช้ 3 tables ที่เชื่อมโยงกัน:

**1. books (หนังสือ)**
```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  available INTEGER DEFAULT 1,  -- 0 = ถูกยืม, 1 = ว่าง
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**2. members (สมาชิก)**
```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**3. borrowings (การยืม)**
```sql
CREATE TABLE borrowings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER NOT NULL,
  member_id INTEGER NOT NULL,
  borrow_date TEXT DEFAULT CURRENT_TIMESTAMP,
  return_date TEXT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```

### ความสัมพันธ์ระหว่างตาราง (Relationships)

- **books ↔ borrowings**: หนังสือ 1 เล่มสามารถถูกยืมได้หลายครั้ง (one-to-many)
- **members ↔ borrowings**: สมาชิก 1 คนสามารถยืมได้หลายครั้ง (one-to-many)
- ใช้ **Foreign Keys** เชื่อมโยง: `book_id` และ `member_id`

---

## 🚀 การรันโปรแกรม

**คำสั่งที่ใช้:**
```bash
node index.js
```

---

## 📋 ผลการทดลอง

### 1️⃣ หนังสือทั้งหมด (All Books)

**Query:**
```sql
SELECT * FROM books
```

**ผลลัพธ์:**
```
┌─────────┬────┬──────────────────────┬──────────────────┬───────────┬───────────────────────┐
│ (index) │ id │ title                │ author           │ available │ created_at            │
├─────────┼────┼──────────────────────┼──────────────────┼───────────┼───────────────────────┤
│ 0       │ 1  │ 'Harry Potter'       │ 'J.K. Rowling'   │ 0         │ '2026-02-05 15:52:18' │
│ 1       │ 2  │ 'The Hobbit'         │ 'J.R.R. Tolkien' │ 1         │ '2026-02-05 15:52:18' │
│ 2       │ 3  │ '1984'               │ 'George Orwell'  │ 0         │ '2026-02-05 15:52:18' │
│ 3       │ 4  │ 'Python Programming' │ 'John Doe'       │ 1         │ '2026-02-05 15:52:18' │
│ 4       │ 5  │ 'Web Development'    │ 'Jane Smith'     │ 1         │ '2026-02-05 15:52:18' │
└─────────┴────┴──────────────────────┴──────────────────┴───────────┴───────────────────────┘
```

**สังเกต:**
- มีหนังสือ 5 เล่ม
- หนังสือ 2 เล่ม (Harry Potter, 1984) ถูกยืมไปแล้ว (available = 0)
- หนังสือ 3 เล่มว่าง (available = 1)

---

### 2️⃣ สมาชิกทั้งหมด (All Members)

**Query:**
```sql
SELECT * FROM members
```

**ผลลัพธ์:**
```
┌─────────┬────┬────────────────┬───────────────────────┬──────────────┬───────────────────────┐
│ (index) │ id │ name           │ email                 │ phone        │ created_at            │
├─────────┼────┼────────────────┼───────────────────────┼──────────────┼───────────────────────┤
│ 0       │ 1  │ 'สมชาย ใจดี'    │ 'somchai@email.com'   │ '0812345678' │ '2026-02-05 15:52:18' │
│ 1       │ 2  │ 'สมหญิง รักเรียน' │ 'somying@email.com'   │ '0823456789' │ '2026-02-05 15:52:18' │
│ 2       │ 3  │ 'ชาติชาย มั่นคง'  │ 'chatichai@email.com' │ '0834567890' │ '2026-02-05 15:52:18' │
└─────────┴────┴────────────────┴───────────────────────┴──────────────┴───────────────────────┘
```

**สังเกต:**
- มีสมาชิก 3 คน
- แต่ละคนมี email และเบอร์โทรศัพท์
- email ต้อง UNIQUE (ไม่ซ้ำกัน)

---

### 3️⃣ หนังสือที่ว่าง (Available Books)

**Query:**
```sql
SELECT * FROM books WHERE available = 1
```

**ผลลัพธ์:**
```
┌─────────┬────┬──────────────────────┬──────────────────┬───────────┬───────────────────────┐
│ (index) │ id │ title                │ author           │ available │ created_at            │
├─────────┼────┼──────────────────────┼──────────────────┼───────────┼───────────────────────┤
│ 0       │ 2  │ 'The Hobbit'         │ 'J.R.R. Tolkien' │ 1         │ '2026-02-05 15:52:18' │
│ 1       │ 4  │ 'Python Programming' │ 'John Doe'       │ 1         │ '2026-02-05 15:52:18' │
│ 2       │ 5  │ 'Web Development'    │ 'Jane Smith'     │ 1         │ '2026-02-05 15:52:18' │
└─────────┴────┴──────────────────────┴──────────────────┴───────────┴───────────────────────┘
```

**สังเกต:**
- กรองเฉพาะหนังสือที่ available = 1
- พบ 3 เล่มที่พร้อมยืม

---

### 4️⃣ ยืมหนังสือสำเร็จ (Borrow a Book)

**Operation:**
```javascript
Borrowing.borrow(2, 3); // ชาติชาย (member #3) ยืม The Hobbit (book #2)
```

**Process:**
1. ตรวจสอบว่าหนังสือว่างหรือไม่
2. เพิ่มรายการยืมใน `borrowings` table
3. อัพเดท `books.available = 0`

**ผลลัพธ์:**
```
✅ Book #2 borrowed by Member #3
```

**SQL ที่ทำงานภายใน:**
```sql
-- 1. ตรวจสอบ
SELECT available FROM books WHERE id = 2

-- 2. เพิ่มรายการยืม
INSERT INTO borrowings (book_id, member_id) VALUES (2, 3)

-- 3. อัพเดทสถานะ
UPDATE books SET available = 0 WHERE id = 2
```

---

### 5️⃣ รายการยืมทั้งหมด (All Borrowings)

**Query (JOIN 2 tables):**
```sql
SELECT 
  borrowings.id,
  books.title as book,
  members.name as member,
  borrowings.borrow_date,
  borrowings.return_date,
  CASE 
    WHEN borrowings.return_date IS NULL THEN 'ยังไม่คืน'
    ELSE 'คืนแล้ว'
  END as status
FROM borrowings
JOIN books ON borrowings.book_id = books.id
JOIN members ON borrowings.member_id = members.id
ORDER BY borrowings.borrow_date DESC
```

**ผลลัพธ์:**
```
┌─────────┬────┬────────────────┬────────────────┬───────────────────────┬─────────────┬──────────┐
│ (index) │ id │ book           │ member         │ borrow_date           │ return_date │ status   │
├─────────┼────┼────────────────┼────────────────┼───────────────────────┼─────────────┼──────────┤
│ 0       │ 1  │ 'Harry Potter' │ 'สมชาย ใจดี'    │ '2026-02-05 15:52:18' │ null        │ 'ยังไม่คืน' │
│ 1       │ 2  │ '1984'         │ 'สมหญิง รักเรียน' │ '2026-02-05 15:52:18' │ null        │ 'ยังไม่คืน' │
│ 2       │ 3  │ 'The Hobbit'   │ 'ชาติชาย มั่นคง'  │ '2026-02-05 15:52:18' │ null        │ 'ยังไม่คืน' │
└─────────┴────┴────────────────┴────────────────┴───────────────────────┴─────────────┴──────────┘
```

**สังเกต:**
- ใช้ **JOIN** เชื่อมโยง 3 ตารางเพื่อแสดงข้อมูลที่สมบูรณ์
- ใช้ **CASE WHEN** เพื่อแสดงสถานะ
- หนังสือทั้ง 3 เล่มยังไม่คืน (return_date = null)

---

### 6️⃣ หนังสือที่สมาชิกยืม (Books Borrowed by Member)

**Query:**
```sql
SELECT 
  books.title,
  books.author,
  borrowings.borrow_date,
  borrowings.id as borrowing_id
FROM borrowings
JOIN books ON borrowings.book_id = books.id
WHERE borrowings.member_id = 1 
  AND borrowings.return_date IS NULL
```

**ผลลัพธ์ (สมาชิก #1 - สมชาย):**
```
┌─────────┬────────────────┬────────────────┬───────────────────────┬──────────────┐
│ (index) │ title          │ author         │ borrow_date           │ borrowing_id │
├─────────┼────────────────┼────────────────┼───────────────────────┼──────────────┤
│ 0       │ 'Harry Potter' │ 'J.K. Rowling' │ '2026-02-05 15:52:18' │ 1            │
└─────────┴────────────────┴────────────────┴───────────────────────┴──────────────┘
```

**สังเกต:**
- สมชายกำลังยืม Harry Potter
- ยังไม่คืน (return_date IS NULL)

---

### 7️⃣ คืนหนังสือสำเร็จ (Return a Book)

**Operation:**
```javascript
Borrowing.returnBook(1); // คืนหนังสือรายการที่ 1
```

**Process:**
1. หา book_id จากรายการยืม
2. อัพเดท `return_date = CURRENT_TIMESTAMP`
3. อัพเดท `books.available = 1`

**ผลลัพธ์:**
```
✅ Book returned (Borrowing #1)
```

**SQL ที่ทำงานภายใน:**
```sql
-- 1. หาข้อมูล
SELECT book_id, return_date FROM borrowings WHERE id = 1

-- 2. อัพเดทการคืน
UPDATE borrowings SET return_date = CURRENT_TIMESTAMP WHERE id = 1

-- 3. อัพเดทสถานะหนังสือ
UPDATE books SET available = 1 WHERE id = (book_id)
```

---

### 8️⃣ หนังสือที่ว่าง (อัพเดทหลังคืน)

**Query:**
```sql
SELECT * FROM books WHERE available = 1
```

**ผลลัพธ์:**
```
┌─────────┬────┬──────────────────────┬────────────────┬───────────┬───────────────────────┐
│ (index) │ id │ title                │ author         │ available │ created_at            │
├─────────┼────┼──────────────────────┼────────────────┼───────────┼───────────────────────┤
│ 0       │ 1  │ 'Harry Potter'       │ 'J.K. Rowling' │ 1         │ '2026-02-05 15:52:18' │
│ 1       │ 4  │ 'Python Programming' │ 'John Doe'     │ 1         │ '2026-02-05 15:52:18' │
│ 2       │ 5  │ 'Web Development'    │ 'Jane Smith'   │ 1         │ '2026-02-05 15:52:18' │
└─────────┴────┴──────────────────────┴────────────────┴───────────┴───────────────────────┘
```

**สังเกต:**
- **Harry Potter คืนแล้ว!** กลับมาเป็น available = 1
- ตอนนี้มีหนังสือว่าง 3 เล่ม (เพิ่มจาก 2 เล่ม)
- **The Hobbit หายไปจากรายการ** เพราะถูกยืมใน step 4

---

## 🎓 สิ่งที่ได้เรียนรู้

### ✅ 1. การออกแบบ Database หลายตาราง
- เข้าใจการแบ่ง entities เป็นตารางแยก (books, members, borrowings)
- เรียนรู้การออกแบบ schema ที่มีความสัมพันธ์กัน
- เข้าใจว่าเมื่อไหร่ควรแยกตาราง vs. รวมตาราง

### ✅ 2. Foreign Keys และ Relationships
- เข้าใจการใช้ Foreign Key เชื่อมโยงตาราง
```sql
FOREIGN KEY (book_id) REFERENCES books(id)
FOREIGN KEY (member_id) REFERENCES members(id)
```
- เรียนรู้ความสัมพันธ์แบบ one-to-many
- เข้าใจการใช้ `book_id` และ `member_id` เป็นตัวเชื่อม

### ✅ 3. การ JOIN ข้อมูลจากหลาย Tables
- เรียนรู้การใช้ **INNER JOIN** เพื่อรวมข้อมูล
- เข้าใจ syntax:
```sql
FROM borrowings
JOIN books ON borrowings.book_id = books.id
JOIN members ON borrowings.member_id = members.id
```
- เรียนรู้การ alias columns (`books.title as book`)
- เข้าใจการใช้ **CASE WHEN** สำหรับ conditional output

### ✅ 4. Transactions พื้นฐาน
- เข้าใจว่าการยืม/คืนหนังสือต้องทำหลายขั้นตอนพร้อมกัน:
  - **ยืมหนังสือ:**
    1. ตรวจสอบสถานะ
    2. INSERT borrowing
    3. UPDATE book availability
  - **คืนหนังสือ:**
    1. ตรวจสอบรายการยืม
    2. UPDATE return_date
    3. UPDATE book availability
- เรียนรู้ว่าถ้า operation ใดล้มเหลว ต้อง rollback ทั้งหมด

### ✅ 5. Business Logic ใน Database
- เรียนรู้การใช้ `available` flag เพื่อจัดการสถานะ
- เข้าใจการใช้ `return_date IS NULL` เพื่อเช็คว่ายังไม่คืน
- เรียนรู้การใช้ DEFAULT values (CURRENT_TIMESTAMP)
- เข้าใจการใช้ UNIQUE constraint (email)

---

## 💡 Concepts เพิ่มเติม

### 1. CASE WHEN (Conditional Logic)
```sql
CASE 
  WHEN borrowings.return_date IS NULL THEN 'ยังไม่คืน'
  ELSE 'คืนแล้ว'
END as status
```
- ใช้สำหรับแสดงผลแบบมีเงื่อนไข
- คล้าย if-else ใน SQL

### 2. IS NULL vs = NULL
```sql
-- ✅ ถูกต้อง
WHERE return_date IS NULL

-- ❌ ผิด
WHERE return_date = NULL
```
- ใช้ `IS NULL` และ `IS NOT NULL` เท่านั้น

### 3. Foreign Key Constraints
- ป้องกันการลบข้อมูลที่มี relationship
- ถ้าลบ book ที่มีคนยืม จะเกิด error (referential integrity)

### 4. Order of Operations
```sql
FROM borrowings          -- 1. เลือกตารางหลัก
JOIN books ...           -- 2. JOIN ตารางอื่น
WHERE ...                -- 3. กรองข้อมูล
ORDER BY ...             -- 4. เรียงลำดับ
```

---

## 🔧 Models และ Methods

### Book Model
```javascript
Book.getAll()          // ดึงหนังสือทั้งหมด
Book.getAvailable()    // ดึงหนังสือที่ว่าง
Book.search(keyword)   // ค้นหาหนังสือ
Book.add(title, author) // เพิ่มหนังสือใหม่
```

### Member Model
```javascript
Member.getAll()              // ดึงสมาชิกทั้งหมด
Member.getBorrowedBooks(id)  // ดูหนังสือที่สมาชิกยืม
```

### Borrowing Model
```javascript
Borrowing.getAll()           // ดูการยืมทั้งหมด
Borrowing.borrow(bookId, memberId)  // ยืมหนังสือ
Borrowing.returnBook(id)     // คืนหนังสือ
Borrowing.getUnreturned()    // ดูหนังสือที่ยังไม่คืน
```

---

## 📝 สรุปการทำงาน

1. **Database ถูก reset** ทุกครั้งที่รัน (schema.sql + seed.sql)
2. **มีข้อมูลเริ่มต้น:**
   - หนังสือ 5 เล่ม (2 เล่มถูกยืมแล้ว)
   - สมาชิก 3 คน
   - การยืม 2 รายการ (ยังไม่คืน)
3. **ทดสอบ use cases:**
   - ดูข้อมูลทั้งหมด
   - กรองหนังสือว่าง
   - ยืมหนังสือใหม่
   - คืนหนังสือ
   - ดูข้อมูลหลัง transaction

---
