# 📚 Book Library API Documentation

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา : 68543210082-2
- Email : nutdanai@live.rmutl.ac.th
- วันที่: February 1, 2026

## Base URL
```
http://localhost:3000
```

## API Version
v1.0.0

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": "Optional additional details"
  }
}
```

---

## Error Handling

### HTTP Status Codes
- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Invalid input)
- `404` - Not Found (Resource not found)
- `429` - Too Many Requests (Rate limit exceeded)
- `500` - Internal Server Error

### Common Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      "\"name\" is required",
      "\"email\" must be a valid email"
    ]
  }
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Author not found"
  }
}
```

---

## Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 100 requests per IP
- **Response:** 429 Too Many Requests

```json
{
  "success": false,
  "error": {
    "message": "Too many requests, please try again later"
  }
}
```

---

## Authors Endpoints

### 1. Get All Authors

**Endpoint:** `GET /api/authors`

**Description:** ดึงรายการ authors ทั้งหมด

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| country | string | No | กรอง authors ตามประเทศ |

**Request Example:**
```bash
# ดึง authors ทั้งหมด
curl http://localhost:3000/api/authors

# กรองตามประเทศ
curl http://localhost:3000/api/authors?country=UK
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "J.K. Rowling",
      "country": "UK",
      "birthYear": 1965
    },
    {
      "id": 2,
      "name": "George R.R. Martin",
      "country": "USA",
      "birthYear": 1948
    },
    {
      "id": 3,
      "name": "J.R.R. Tolkien",
      "country": "UK",
      "birthYear": 1892
    }
  ]
}
```

---

### 2. Get Author by ID

**Endpoint:** `GET /api/authors/:id`

**Description:** ดึงข้อมูล author ตาม ID พร้อมกับ books ของ author

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Author ID |

**Request Example:**
```bash
curl http://localhost:3000/api/authors/1
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "J.K. Rowling",
    "country": "UK",
    "birthYear": 1965,
    "books": [
      {
        "id": 1,
        "title": "Harry Potter and the Philosopher's Stone",
        "authorId": 1,
        "year": 1997,
        "genre": "Fantasy",
        "isbn": "978-0-7475-3269-9"
      },
      {
        "id": 2,
        "title": "Harry Potter and the Chamber of Secrets",
        "authorId": 1,
        "year": 1998,
        "genre": "Fantasy",
        "isbn": "978-0-7475-3849-3"
      }
    ]
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Author not found"
  }
}
```

---

### 3. Create New Author

**Endpoint:** `POST /api/authors`

**Description:** สร้าง author ใหม่

**Request Body:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | 2-100 characters |
| country | string | Yes | 2-50 characters |
| birthYear | number | Yes | 1000 - current year |

**Request Example:**
```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Stephen King",
    "country": "USA",
    "birthYear": 1947
  }'
```

**Response Example (201 Created):**
```json
{
  "success": true,
  "message": "Author created successfully",
  "data": {
    "id": 4,
    "name": "Stephen King",
    "country": "USA",
    "birthYear": 1947
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      "\"name\" is required",
      "\"birthYear\" must be less than or equal to 2026"
    ]
  }
}
```

---

### 4. Update Author

**Endpoint:** `PUT /api/authors/:id`

**Description:** แก้ไขข้อมูล author

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Author ID |

**Request Body:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | 2-100 characters |
| country | string | Yes | 2-50 characters |
| birthYear | number | Yes | 1000 - current year |

**Request Example:**
```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J.K. Rowling",
    "country": "United Kingdom",
    "birthYear": 1965
  }'
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Author updated successfully",
  "data": {
    "id": 1,
    "name": "J.K. Rowling",
    "country": "United Kingdom",
    "birthYear": 1965
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Author not found"
  }
}
```

---

### 5. Delete Author

**Endpoint:** `DELETE /api/authors/:id`

**Description:** ลบ author (ต้องไม่มี books ที่เชื่อมโยงอยู่)

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Author ID |

**Request Example:**
```bash
curl -X DELETE http://localhost:3000/api/authors/4
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Author deleted successfully"
}
```

**Error Response (400 Bad Request - มี books อยู่):**
```json
{
  "success": false,
  "error": {
    "message": "Cannot delete author with existing books",
    "bookCount": 5
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Author not found"
  }
}
```

---

## Books Endpoints

### 1. Get All Books

**Endpoint:** `GET /api/books`

**Description:** ดึงรายการ books ทั้งหมด พร้อมข้อมูล author

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| genre | string | No | กรอง books ตามประเภท (case-insensitive) |
| page | number | No | หน้าที่ต้องการ (default: 1) |
| limit | number | No | จำนวน items ต่อหน้า (default: 10) |

**Request Example:**
```bash
# ดึง books ทั้งหมด
curl http://localhost:3000/api/books

# กรองตาม genre
curl http://localhost:3000/api/books?genre=Fantasy

# Pagination
curl http://localhost:3000/api/books?page=1&limit=5

# รวมทั้งหมด
curl http://localhost:3000/api/books?genre=Fantasy&page=1&limit=2
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "total": 5,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "authorId": 1,
      "year": 1997,
      "genre": "Fantasy",
      "isbn": "978-0-7475-3269-9",
      "author": {
        "id": 1,
        "name": "J.K. Rowling",
        "country": "UK",
        "birthYear": 1965
      }
    },
    {
      "id": 2,
      "title": "Harry Potter and the Chamber of Secrets",
      "authorId": 1,
      "year": 1998,
      "genre": "Fantasy",
      "isbn": "978-0-7475-3849-3",
      "author": {
        "id": 1,
        "name": "J.K. Rowling",
        "country": "UK",
        "birthYear": 1965
      }
    }
  ]
}
```

---

### 2. Search Books

**Endpoint:** `GET /api/books/search`

**Description:** ค้นหา books จาก title (case-insensitive)

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | คำค้นหา (search ใน title) |

**Request Example:**
```bash
curl http://localhost:3000/api/books/search?q=harry
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "query": "harry",
  "data": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "authorId": 1,
      "year": 1997,
      "genre": "Fantasy",
      "isbn": "978-0-7475-3269-9",
      "author": {
        "id": 1,
        "name": "J.K. Rowling",
        "country": "UK",
        "birthYear": 1965
      }
    }
  ]
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Search query parameter \"q\" is required"
  }
}
```

---

### 3. Get Book by ID

**Endpoint:** `GET /api/books/:id`

**Description:** ดึงข้อมูล book ตาม ID พร้อมข้อมูล author

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Book ID |

**Request Example:**
```bash
curl http://localhost:3000/api/books/1
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone",
    "authorId": 1,
    "year": 1997,
    "genre": "Fantasy",
    "isbn": "978-0-7475-3269-9",
    "author": {
      "id": 1,
      "name": "J.K. Rowling",
      "country": "UK",
      "birthYear": 1965
    }
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Book not found"
  }
}
```

---

### 4. Create New Book

**Endpoint:** `POST /api/books`

**Description:** สร้าง book ใหม่

**Request Body:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | 1-200 characters |
| authorId | number | Yes | Must be existing author ID |
| year | number | Yes | 1000 - current year |
| genre | string | Yes | 2-50 characters |
| isbn | string | Yes | Format: numbers and hyphens only |

**Request Example:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "authorId": 3,
    "year": 1937,
    "genre": "Fantasy",
    "isbn": "978-0-618-00221-3"
  }'
```

**Response Example (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 6,
    "title": "The Hobbit",
    "authorId": 3,
    "year": 1937,
    "genre": "Fantasy",
    "isbn": "978-0-618-00221-3",
    "author": {
      "id": 3,
      "name": "J.R.R. Tolkien",
      "country": "UK",
      "birthYear": 1892
    }
  }
}
```

**Error Response (400 Bad Request - Invalid authorId):**
```json
{
  "success": false,
  "error": {
    "message": "Author not found with the provided authorId"
  }
}
```

**Error Response (400 Bad Request - Validation):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      "\"title\" is required",
      "\"isbn\" with value \"invalid\" fails to match the required pattern: /^[0-9-]+$/"
    ]
  }
}
```

---

### 5. Update Book

**Endpoint:** `PUT /api/books/:id`

**Description:** แก้ไขข้อมูล book

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Book ID |

**Request Body:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | 1-200 characters |
| authorId | number | Yes | Must be existing author ID |
| year | number | Yes | 1000 - current year |
| genre | string | Yes | 2-50 characters |
| isbn | string | Yes | Format: numbers and hyphens only |

**Request Example:**
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher'\''s Stone (Updated)",
    "authorId": 1,
    "year": 1997,
    "genre": "Fantasy",
    "isbn": "978-0-7475-3269-9"
  }'
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone (Updated)",
    "authorId": 1,
    "year": 1997,
    "genre": "Fantasy",
    "isbn": "978-0-7475-3269-9",
    "author": {
      "id": 1,
      "name": "J.K. Rowling",
      "country": "UK",
      "birthYear": 1965
    }
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Book not found"
  }
}
```

**Error Response (400 Bad Request - Invalid authorId):**
```json
{
  "success": false,
  "error": {
    "message": "Author not found with the provided authorId"
  }
}
```

---

### 6. Delete Book

**Endpoint:** `DELETE /api/books/:id`

**Description:** ลบ book

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Book ID |

**Request Example:**
```bash
curl -X DELETE http://localhost:3000/api/books/6
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Book not found"
  }
}
```

---

## Testing with cURL

### Complete Testing Flow

```bash
# 1. Get all authors
curl http://localhost:3000/api/authors

# 2. Get specific author with books
curl http://localhost:3000/api/authors/1

# 3. Create new author
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "Agatha Christie", "country": "UK", "birthYear": 1890}'

# 4. Get all books with pagination
curl http://localhost:3000/api/books?page=1&limit=5

# 5. Filter books by genre
curl http://localhost:3000/api/books?genre=Fantasy

# 6. Search books
curl http://localhost:3000/api/books/search?q=harry

# 7. Create new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Murder on the Orient Express",
    "authorId": 4,
    "year": 1934,
    "genre": "Mystery",
    "isbn": "978-0-00-816941-2"
  }'

# 8. Update book
curl -X PUT http://localhost:3000/api/books/7 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Murder on the Orient Express (Revised)",
    "authorId": 4,
    "year": 1934,
    "genre": "Mystery",
    "isbn": "978-0-00-816941-2"
  }'

# 9. Delete book
curl -X DELETE http://localhost:3000/api/books/7

# 10. Try to delete author with books (should fail)
curl -X DELETE http://localhost:3000/api/authors/1

# 11. Delete author without books
curl -X DELETE http://localhost:3000/api/authors/4
```

---

## Testing with Postman/Insomnia

### Import Collection

Create a collection with the following requests:

1. **Authors Collection**
   - GET All Authors
   - GET Author by ID
   - POST Create Author
   - PUT Update Author
   - DELETE Delete Author

2. **Books Collection**
   - GET All Books
   - GET Books with Pagination
   - GET Filter Books by Genre
   - GET Search Books
   - GET Book by ID
   - POST Create Book
   - PUT Update Book
   - DELETE Delete Book

### Environment Variables
```json
{
  "baseUrl": "http://localhost:3000",
  "apiVersion": "v1.0.0"
}
```

---

## Data Models

### Author Model
```typescript
{
  id: number,
  name: string,        // 2-100 characters
  country: string,     // 2-50 characters
  birthYear: number    // 1000 - current year
}
```

### Book Model
```typescript
{
  id: number,
  title: string,       // 1-200 characters
  authorId: number,    // Must reference existing author
  year: number,        // 1000 - current year
  genre: string,       // 2-50 characters
  isbn: string         // Pattern: /^[0-9-]+$/
}
```
