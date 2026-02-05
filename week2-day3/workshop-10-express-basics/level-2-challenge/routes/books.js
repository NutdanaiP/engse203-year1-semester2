// routes/books.js
const express = require('express');
const router = express.Router();
const dataStore = require('../data/dataStore');
const { validateBook } = require('../middleware/validate');

/**
 * GET /api/books - Get all books
 * Query: ?genre=Fantasy&page=1&limit=10
 */
router.get('/', (req, res) => {
  // TODO: ดึง books ทั้งหมด
  // TODO: กรองตาม genre ถ้ามี
  // TODO: เพิ่ม pagination (page, limit)
  // TODO: เพิ่มข้อมูล author ใน response
  
  // YOUR CODE HERE
  let books = dataStore.getAllBooks();
  
  // Filter by genre
  const { genre, page = 1, limit = 10 } = req.query;
  if (genre) {
    books = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  }
  
  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedBooks = books.slice(startIndex, endIndex);
  
  // เพิ่มข้อมูล author
  const booksWithAuthor = paginatedBooks.map(book => {
    const author = dataStore.getAuthorById(book.authorId);
    return {
      ...book,
      author: author
    };
  });
  
  res.json({
    success: true,
    count: booksWithAuthor.length,
    total: books.length,
    page: pageNum,
    totalPages: Math.ceil(books.length / limitNum),
    data: booksWithAuthor
  });
});

/**
 * GET /api/books/search - Search books
 * Query: ?q=harry
 */
router.get('/search', (req, res) => {
  // TODO: ค้นหา books จาก title
  // TODO: ส่ง results
  
  // YOUR CODE HERE
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Search query parameter "q" is required'
      }
    });
  }
  
  const books = dataStore.getAllBooks();
  const searchResults = books.filter(book => 
    book.title.toLowerCase().includes(q.toLowerCase())
  );
  
  // เพิ่มข้อมูล author
  const resultsWithAuthor = searchResults.map(book => {
    const author = dataStore.getAuthorById(book.authorId);
    return {
      ...book,
      author: author
    };
  });
  
  res.json({
    success: true,
    count: resultsWithAuthor.length,
    query: q,
    data: resultsWithAuthor
  });
});

/**
 * GET /api/books/:id - Get book by ID
 */
router.get('/:id', (req, res, next) => {
  // TODO: หา book
  // TODO: เพิ่มข้อมูล author
  // TODO: ส่ง response
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  
  const book = dataStore.getBookById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Book not found'
      }
    });
  }
  
  const author = dataStore.getAuthorById(book.authorId);
  
  res.json({
    success: true,
    data: {
      ...book,
      author: author
    }
  });
});

/**
 * POST /api/books - Create new book
 */
router.post('/', validateBook, (req, res, next) => {
  // TODO: ตรวจสอบว่า authorId มีอยู่จริง
  // TODO: สร้าง book ใหม่
  // TODO: ส่ง response status 201
  
  // YOUR CODE HERE
  const { title, authorId, year, genre, isbn } = req.body;
  
  // ตรวจสอบว่า author มีอยู่จริง
  const author = dataStore.getAuthorById(authorId);
  if (!author) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Author not found with the provided authorId'
      }
    });
  }
  
  const newBook = dataStore.addBook({ title, authorId, year, genre, isbn });
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: {
      ...newBook,
      author: author
    }
  });
});

/**
 * PUT /api/books/:id - Update book
 */
router.put('/:id', validateBook, (req, res, next) => {
  // TODO: อัพเดท book
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  const { title, authorId, year, genre, isbn } = req.body;
  
  // ตรวจสอบว่า author มีอยู่จริง
  const author = dataStore.getAuthorById(authorId);
  if (!author) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Author not found with the provided authorId'
      }
    });
  }
  
  const updatedBook = dataStore.updateBook(id, { title, authorId, year, genre, isbn });
  
  if (!updatedBook) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Book not found'
      }
    });
  }
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: {
      ...updatedBook,
      author: author
    }
  });
});

/**
 * DELETE /api/books/:id - Delete book
 */
router.delete('/:id', (req, res, next) => {
  // TODO: ลบ book
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  
  const book = dataStore.getBookById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Book not found'
      }
    });
  }
  
  dataStore.deleteBook(id);
  
  res.json({
    success: true,
    message: 'Book deleted successfully'
  });
});

module.exports = router;