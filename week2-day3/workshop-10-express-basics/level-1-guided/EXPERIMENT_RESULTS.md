# 📊 ผลการทดลอง - Workshop 10 Level 1

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา : 68543210082-2
- วันที่: January 31, 2026

## การทดสอบ Endpoints

### 1. GET /api/users (Get All Users)
**Request:**
```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [บันทึกสิ่งที่สังเกตเห็น]
- [จำนวน users ที่ได้]
- [โครงสร้างข้อมูลที่ return]

---

### 2. GET /api/users?role=admin (Filter by Role)
**Request:**
```bash
curl http://localhost:3000/api/users?role=admin
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [ผลการกรองตาม role]
- [จำนวนผลลัพธ์]

---

### 3. GET /api/users?page=1&limit=2 (Pagination)
**Request:**
```bash
curl http://localhost:3000/api/users?page=1&limit=2
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [การทำงานของ pagination]
- [ข้อมูล metadata ที่ได้: page, totalPages, total, count]

---

### 4. GET /api/users/search?q=john (Search Users)
**Request:**
```bash
curl http://localhost:3000/api/users/search?q=john
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [ผลการค้นหา]
- [ค้นหาจาก field ใดบ้าง: name, email]

---

### 5. GET /api/users/:id (Get User by ID)
**Request:**
```bash
curl http://localhost:3000/api/users/1
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [ข้อมูล user ที่ได้]
- [กรณีไม่พบ user: status code และ error message]

---

### 6. POST /api/users (Create New User)
**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Brown",
    "email": "alice@example.com",
    "role": "user"
  }'
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [user ที่ถูกสร้างขึ้น]
- [ID ที่ถูก assign]
- [การทำงานของ validateUser middleware]

---

### 7. POST /api/users (Validation Error)
**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email"
  }'
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [error message ที่ได้]
- [status code: 400]
- [validation ที่ถูกตรวจสอบ: name length, email format]

---

### 8. PUT /api/users/:id (Update User)
**Request:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }'
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [ข้อมูลที่ถูก update]
- [ข้อมูลเดิมที่ไม่ได้แก้ไข]

---

### 9. DELETE /api/users/:id (Delete User)
**Request:**
```bash
curl -X DELETE http://localhost:3000/api/users/3
```

**Response:**
```json
[บันทึก response]
```

**สังเกต:**
- [message ยืนยันการลบ]
- [ตรวจสอบว่า user ถูกลบจริง: GET /api/users]

---

## การทดสอบ Middleware

### 1. Logger Middleware
**สังเกต:**
- [บันทึก log ที่ปรากฏใน console]
- [ข้อมูลที่ถูก log: method, URL, status code]
- [รูปแบบ log message]

**ตัวอย่าง Log:**
```
[บันทึก log จาก terminal]
```

---

### 2. Request Timer Middleware
**สังเกต:**
- [response header ที่เพิ่มเข้ามา: X-Response-Time]
- [เวลาที่ใช้ในการประมวลผล request]
- [วิธีดู response headers: curl -i]

**คำสั่งทดสอบ:**
```bash
curl -i http://localhost:3000/api/users
```

**ผลลัพธ์:**
```
[บันทึก headers]
```

---

### 3. Validate User Middleware
**ทดสอบกรณีต่างๆ:**

#### ✅ Valid Data
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Valid User", "email": "valid@example.com", "role": "user"}'
```
**ผล:** [บันทึกผล]

#### ❌ Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "No Email"}'
```
**ผล:** [บันทึก error message]

#### ❌ Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Bad Email", "email": "not-an-email"}'
```
**ผล:** [บันทึก error message]

#### ❌ Name Too Short
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "A", "email": "short@example.com"}'
```
**ผล:** [บันทึก error message]

#### ❌ Invalid Role
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Wrong Role", "email": "role@example.com", "role": "superuser"}'
```
**ผล:** [บันทึก error message]

---

### 4. Error Handler Middleware
**ทดสอบด้วย Invalid Endpoint:**
```bash
curl http://localhost:3000/api/invalid-endpoint
```

**Response:**
```json
[บันทึก error response]
```

**สังเกต:**
- [status code: 404]
- [error message format]
- [ข้อมูลที่มีใน error response]

---

## Challenge Features

### Challenge 1: Search Endpoint ✅
**การทดสอบ:**
```bash
# ค้นหาด้วย keyword ต่างๆ
curl http://localhost:3000/api/users/search?q=john
curl http://localhost:3000/api/users/search?q=@example.com
curl http://localhost:3000/api/users/search?q=smith
```

**ผลการทดสอบ:**
- [ค้นหาจาก name ได้: ✅/❌]
- [ค้นหาจาก email ได้: ✅/❌]
- [Case-insensitive search: ✅/❌]
- [แสดง error เมื่อไม่มี query parameter: ✅/❌]

---

### Challenge 2: Pagination ✅
**การทดสอบ:**
```bash
# ทดสอบ pagination ต่างๆ
curl http://localhost:3000/api/users?page=1&limit=2
curl http://localhost:3000/api/users?page=2&limit=2
curl http://localhost:3000/api/users?limit=1
```

**ผลการทดสอบ:**
- [แบ่งหน้าได้ถูกต้อง: ✅/❌]
- [คำนวณ totalPages ถูกต้อง: ✅/❌]
- [Default values ทำงาน (page=1, limit=10): ✅/❌]
- [Metadata ครบถ้วน (total, page, totalPages, count): ✅/❌]

---

### Challenge 3: Validation Middleware ✅
**การทดสอบ:**
- [Validate required fields: ✅/❌]
- [Validate email format: ✅/❌]
- [Validate name length: ✅/❌]
- [Validate role values: ✅/❌]
- [Error messages ชัดเจน: ✅/❌]

**สรุปการทำงาน:**
[บันทึกสรุปการทำงานของ validation middleware]

---

## สรุปการเรียนรู้

### สิ่งที่ได้เรียนรู้:
1. **Express Routing**
   - [บันทึกสิ่งที่เรียนรู้เกี่ยวกับ routing]
   - [การใช้ route parameters และ query parameters]

2. **Middleware**
   - [บันทึกความเข้าใจเกี่ยวกับ middleware chain]
   - [ลำดับการทำงานของ middleware]
   - [การส่งต่อไปยัง next middleware]

3. **HTTP Methods (CRUD)**
   - GET: [บันทึกการใช้งาน]
   - POST: [บันทึกการใช้งาน]
   - PUT: [บันทึกการใช้งาน]
   - DELETE: [บันทึกการใช้งาน]

4. **Error Handling**
   - [วิธีการจัดการ error]
   - [การส่ง status code ที่เหมาะสม]
   - [รูปแบบ error response]

5. **Validation**
   - [ความสำคัญของ input validation]
   - [การใช้ regex สำหรับ validate email]
   - [การ validate ประเภทข้อมูลต่างๆ]
