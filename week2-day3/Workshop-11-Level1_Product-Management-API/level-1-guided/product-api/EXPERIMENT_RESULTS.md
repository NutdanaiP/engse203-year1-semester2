# Product Management API - Experiment Results

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา : 68543210082-2
- Email : nutdanai@live.rmutl.ac.th
- วันที่: February 1, 2026

## 🚀 API Endpoints Documentation

### 1. Get All Products (with Filters, Sorting & Pagination)

**Endpoint:** `GET /api/products`

**Description:** ดึงข้อมูลสินค้าทั้งหมด พร้อมฟีเจอร์กรอง, เรียงลำดับ และแบ่งหน้า

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `category` | string | กรองตามหมวดหมู่ | `Electronics` |
| `minPrice` | number | ราคาต่ำสุด | `10000` |
| `maxPrice` | number | ราคาสูงสุด | `50000` |
| `search` | string | ค้นหาจากชื่อหรือคำอธิบาย | `iPhone` |
| `inStock` | boolean | กรองสินค้าที่มีสต็อก/หมดสต็อก | `true`, `false` |
| `sort` | string | เรียงลำดับตามฟิลด์ | `price`, `name`, `stock` |
| `order` | string | ลำดับการเรียง | `asc`, `desc` |
| `page` | number | หน้าที่ต้องการ (default: 1) | `1`, `2`, `3` |
| `limit` | number | จำนวนรายการต่อหน้า (default: 10) | `10`, `20`, `50` |

**Example Requests:**

```bash
# ดึงสินค้าทั้งหมด
GET http://localhost:3000/api/products

# กรองตามหมวดหมู่
GET http://localhost:3000/api/products?category=Electronics

# กรองตามช่วงราคา
GET http://localhost:3000/api/products?minPrice=10000&maxPrice=50000

# ค้นหาสินค้า
GET http://localhost:3000/api/products?search=iPhone

# Challenge 2: กรองสินค้าที่มีสต็อก
GET http://localhost:3000/api/products?inStock=true

# Challenge 2: กรองสินค้าหมดสต็อก
GET http://localhost:3000/api/products?inStock=false

# Challenge 1: เรียงลำดับตามราคา (ถูก -> แพง)
GET http://localhost:3000/api/products?sort=price&order=asc

# Challenge 1: เรียงลำดับตามชื่อ (Z -> A)
GET http://localhost:3000/api/products?sort=name&order=desc

# รวมหลายเงื่อนไข
GET http://localhost:3000/api/products?category=Electronics&inStock=true&sort=price&order=asc&page=1&limit=10
```

**Response Example:**

```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  },
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone with A17 Pro chip",
      "price": 42900,
      "category": "Electronics",
      "stock": 50,
      "createdAt": "2026-02-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "MacBook Pro M3",
      "description": "14-inch MacBook Pro with M3 chip",
      "price": 59900,
      "category": "Electronics",
      "stock": 30,
      "createdAt": "2026-02-05T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Product by ID

**Endpoint:** `GET /api/products/:id`

**Description:** ดึงข้อมูลสินค้าตาม ID

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | รหัสสินค้า |

**Example Request:**

```bash
GET http://localhost:3000/api/products/1
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip",
    "price": 42900,
    "category": "Electronics",
    "stock": 50,
    "createdAt": "2026-02-05T10:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 999 not found"
  }
}
```

---

### 3. Create New Product

**Endpoint:** `POST /api/products`

**Description:** สร้างสินค้าใหม่

**Request Body:**

```json
{
  "name": "iPad Air",
  "description": "10.9-inch iPad Air with M1 chip",
  "price": 24900,
  "category": "Electronics",
  "stock": 75
}
```

**Required Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | ชื่อสินค้า |
| `description` | string | No | คำอธิบายสินค้า |
| `price` | number | Yes | ราคา (ต้องเป็นค่าบวก) |
| `category` | string | Yes | หมวดหมู่ |
| `stock` | integer | Yes | จำนวนสินค้าในสต็อก |

**Example Request:**

```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "iPad Air",
  "description": "10.9-inch iPad Air with M1 chip",
  "price": 24900,
  "category": "Electronics",
  "stock": 75
}
```

**Response Example (201 Created):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 4,
    "name": "iPad Air",
    "description": "10.9-inch iPad Air with M1 chip",
    "price": 24900,
    "category": "Electronics",
    "stock": 75,
    "createdAt": "2026-02-05T12:00:00.000Z"
  }
}
```

---

### 4. Update Product (Full Replacement)

**Endpoint:** `PUT /api/products/:id`

**Description:** แก้ไขข้อมูลสินค้าทั้งหมด (ต้องส่งข้อมูลครบทุกฟิลด์)

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | รหัสสินค้า |

**Request Body:**

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Latest iPhone with A17 Pro chip - Updated",
  "price": 48900,
  "category": "Electronics",
  "stock": 40
}
```

**Example Request:**

```bash
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro Max",
  "description": "Latest iPhone with A17 Pro chip - Updated",
  "price": 48900,
  "category": "Electronics",
  "stock": 40
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "description": "Latest iPhone with A17 Pro chip - Updated",
    "price": 48900,
    "category": "Electronics",
    "stock": 40,
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T14:00:00.000Z"
  }
}
```

---

### 5. Partial Update Product

**Endpoint:** `PATCH /api/products/:id`

**Description:** แก้ไขข้อมูลสินค้าบางส่วน (ส่งเฉพาะฟิลด์ที่ต้องการแก้ไข)

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | รหัสสินค้า |

**Request Body (Example):**

```json
{
  "price": 39900,
  "stock": 45
}
```

**Example Requests:**

```bash
# แก้ไขเฉพาะราคา
PATCH http://localhost:3000/api/products/1
Content-Type: application/json

{
  "price": 39900
}

# แก้ไขหลายฟิลด์
PATCH http://localhost:3000/api/products/1
Content-Type: application/json

{
  "price": 39900,
  "stock": 45,
  "category": "Premium Electronics"
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip",
    "price": 39900,
    "category": "Premium Electronics",
    "stock": 45,
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T15:00:00.000Z"
  }
}
```

---

### 6. Delete Product

**Endpoint:** `DELETE /api/products/:id`

**Description:** ลบสินค้า

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | รหัสสินค้า |

**Example Request:**

```bash
DELETE http://localhost:3000/api/products/1
```

**Response (204 No Content):**

No response body (status code 204 indicates successful deletion)

**Error Response (404):**

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 999 not found"
  }
}
```

---

### 7. Bulk Update Products (Challenge 3)

**Endpoint:** `PATCH /api/products/bulk`

**Description:** อัพเดทหลายสินค้าพร้อมกัน

**Request Body:**

```json
{
  "ids": [1, 2, 3],
  "updates": {
    "category": "Sale",
    "stock": 100
  }
}
```

**Required Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ids` | array | Yes | Array ของ Product IDs ที่ต้องการอัพเดท |
| `updates` | object | Yes | Object ที่มีฟิลด์ที่ต้องการแก้ไข |

**Example Requests:**

```bash
# อัพเดทหมวดหมู่หลายสินค้า
PATCH http://localhost:3000/api/products/bulk
Content-Type: application/json

{
  "ids": [1, 2, 3],
  "updates": {
    "category": "Sale"
  }
}

# อัพเดทหลายฟิลด์
PATCH http://localhost:3000/api/products/bulk
Content-Type: application/json

{
  "ids": [1, 2],
  "updates": {
    "category": "Premium",
    "price": 99999,
    "stock": 5
  }
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Updated 3 of 3 products",
  "data": {
    "successful": [
      {
        "id": 1,
        "name": "iPhone 15 Pro",
        "description": "Latest iPhone with A17 Pro chip",
        "price": 42900,
        "category": "Sale",
        "stock": 50,
        "createdAt": "2026-02-05T10:30:00.000Z",
        "updatedAt": "2026-02-05T16:00:00.000Z"
      },
      {
        "id": 2,
        "name": "MacBook Pro M3",
        "description": "14-inch MacBook Pro with M3 chip",
        "price": 59900,
        "category": "Sale",
        "stock": 30,
        "createdAt": "2026-02-05T10:30:00.000Z",
        "updatedAt": "2026-02-05T16:00:00.000Z"
      }
    ],
    "failed": [
      {
        "id": 999,
        "reason": "Product not found"
      }
    ],
    "summary": {
      "total": 3,
      "successCount": 2,
      "failedCount": 1
    }
  }
}
```

---

## 🎯 Challenge Features

### ✅ Challenge 1: Sorting

เพิ่มความสามารถในการเรียงลำดับสินค้า

**การใช้งาน:**
- `sort`: ฟิลด์ที่ต้องการเรียง (price, name, stock, category, etc.)
- `order`: ลำดับการเรียง (asc = น้อย→มาก, desc = มาก→น้อย)

**ตัวอย่าง:**
```bash
# เรียงตามราคา (ถูก → แพง)
GET /api/products?sort=price&order=asc

# เรียงตามชื่อ (Z → A)
GET /api/products?sort=name&order=desc

# เรียงตามสต็อก (มาก → น้อย)
GET /api/products?sort=stock&order=desc
```

---

### ✅ Challenge 2: Stock Status Filter

เพิ่มฟิลเตอร์สำหรับสินค้าที่มีสต็อก/หมดสต็อก

**การใช้งาน:**
- `inStock=true`: แสดงเฉพาะสินค้าที่มีสต็อก (stock > 0)
- `inStock=false`: แสดงเฉพาะสินค้าที่หมดสต็อก (stock = 0)

**ตัวอย่าง:**
```bash
# สินค้าที่มีสต็อก
GET /api/products?inStock=true

# สินค้าหมดสต็อก
GET /api/products?inStock=false

# รวมกับ filter อื่นๆ
GET /api/products?category=Electronics&inStock=true&sort=price&order=asc
```

---

### ✅ Challenge 3: Bulk Operations

เพิ่ม endpoint สำหรับอัพเดทหลายรายการพร้อมกัน

**การใช้งาน:**
```bash
PATCH /api/products/bulk
Content-Type: application/json

{
  "ids": [1, 2, 3],
  "updates": {
    "category": "Sale",
    "price": 999
  }
}
```

**คุณสมบัติ:**
- อัพเดทหลาย products พร้อมกัน
- รายงานผลสำเร็จและล้มเหลวแยกกัน
- แสดง summary สรุปผลการอัพเดท

---

## 🧪 Testing Examples

### Using cURL

```bash
# 1. Get all products
curl http://localhost:3000/api/products

# 2. Get products with filters
curl "http://localhost:3000/api/products?category=Electronics&inStock=true&sort=price&order=asc"

# 3. Get product by ID
curl http://localhost:3000/api/products/1

# 4. Create new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Apple Watch",
    "description": "Series 9",
    "price": 13900,
    "category": "Electronics",
    "stock": 50
  }'

# 5. Update product (PUT)
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro Max",
    "description": "Updated",
    "price": 48900,
    "category": "Electronics",
    "stock": 40
  }'

# 6. Partial update (PATCH)
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39900
  }'

# 7. Bulk update
curl -X PATCH http://localhost:3000/api/products/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3],
    "updates": {
      "category": "Sale"
    }
  }'

# 8. Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

---

## 📊 Error Handling

API ใช้ HTTP Status Codes มาตรฐาน:

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request สำเร็จ |
| 201 Created | สร้างข้อมูลสำเร็จ |
| 204 No Content | ลบข้อมูลสำเร็จ |
| 400 Bad Request | ข้อมูลที่ส่งมาไม่ถูกต้อง |
| 404 Not Found | ไม่พบข้อมูล |
| 500 Internal Server Error | เกิดข้อผิดพลาดในเซิร์ฟเวอร์ |

**Error Response Format:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details"
  }
}
```

---

## 🚦 Getting Started

### 1. Installation

```bash
cd /home/nutdanai/class/engse203/week2-day3/Workshop-11-Level1_Product-Management-API/level-1-guided/product-api
npm install
```

### 2. Start Server

```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```

### 3. Access API

- **Base URL:** http://localhost:3000
- **API Endpoints:** http://localhost:3000/api/products
- **Root Info:** http://localhost:3000

---

## 📝 Notes

1. ⚠️ **In-Memory Storage:** ข้อมูลจะหายเมื่อ restart server (ไม่ได้ใช้ database จริง)
2. 🔐 **No Authentication:** API นี้ไม่มี authentication/authorization
3. 🎓 **For Learning:** สร้างเพื่อการเรียนรู้และทดสอบ ไม่เหมาะสำหรับ production
4. 🚀 **Bulk Endpoint Position:** `/bulk` route ต้องอยู่ก่อน `/:id` เพื่อป้องกัน route conflict

---

## 🎓 Learning Outcomes

✅ สร้าง RESTful API ตามหลักการ
✅ ใช้ express-validator ตรวจสอบ input
✅ CRUD operations ครบถ้วน
✅ HTTP methods และ status codes ถูกต้อง
✅ CORS และ Security headers
✅ Error handling ครบถ้วน
✅ Filtering และ Pagination

---
