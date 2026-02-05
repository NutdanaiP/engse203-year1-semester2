// routes/authors.js
const express = require('express');
const router = express.Router();
const dataStore = require('../data/dataStore');
const { validateAuthor } = require('../middleware/validate');

/**
 * GET /api/authors - Get all authors
 * Query: ?country=UK
 */
router.get('/', (req, res) => {
  // TODO: ดึง authors ทั้งหมด
  // TODO: ถ้ามี query param 'country' ให้กรองตาม country
  // TODO: ส่ง response พร้อม count และ data
  
  // YOUR CODE HERE
  let authors = dataStore.getAllAuthors();
  
  const { country } = req.query;
  if (country) {
    authors = authors.filter(a => a.country === country);
  }
  
  res.json({
    success: true,
    count: authors.length,
    data: authors
  });  
});

/**
 * GET /api/authors/:id - Get author by ID
 */
router.get('/:id', (req, res, next) => {
  // TODO: แปลง id เป็น number
  // TODO: หา author จาก dataStore
  // TODO: ถ้าไม่เจอ ส่ง 404
  // TODO: ถ้าเจอ ส่ง author พร้อม books ของ author
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  
  const author = dataStore.getAuthorById(id);
  if (!author) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Author not found'
      }
    });
  }
  
  const books = dataStore.getBooksByAuthor(id);
  
  res.json({
    success: true,
    data: {
      ...author,
      books: books
    }
  });
});

/**
 * POST /api/authors - Create new author
 */
router.post('/', validateAuthor, (req, res) => {
  // TODO: สร้าง author ใหม่
  // TODO: ส่ง response status 201
  // { id: 1, name: 'J.K. Rowling', country: 'UK', birthYear: 1965 },
  // YOUR CODE HERE
  const newAuthor = dataStore.addAuthor(req.body);

  res.status(201).json({
    success: true,
    message: 'Author created successfully',
    data: newAuthor
  });
});

/**
 * PUT /api/authors/:id - Update author
 */
router.put('/:id', validateAuthor, (req, res, next) => {
  // TODO: อัพเดท author
  // TODO: ถ้าไม่เจอ ส่ง 404
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  const { name, country, birthYear } = req.body;
  
  const updatedAuthor = dataStore.updateAuthor(id, { name, country, birthYear });
  
  if (!updatedAuthor) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Author not found'
      }
    });
  }
  
  res.json({
    success: true,
    message: 'Author updated successfully',
    data: updatedAuthor
  });
});

/**
 * DELETE /api/authors/:id - Delete author
 */
router.delete('/:id', (req, res, next) => {
  // TODO: ลบ author
  // TODO: ตรวจสอบว่า author มี books หรือไม่
  // TODO: ถ้ามี books ไม่ให้ลบ (ส่ง 400)
  
  // YOUR CODE HERE
  const id = parseInt(req.params.id);
  
  const author = dataStore.getAuthorById(id);
  if (!author) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Author not found'
      }
    });
  }
  
  const authorBooks = dataStore.getBooksByAuthor(id);
  if (authorBooks.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Cannot delete author with existing books',
        bookCount: authorBooks.length
      }
    });
  }
  
  dataStore.deleteAuthor(id);
  
  res.json({
    success: true,
    message: 'Author deleted successfully'
  });
});

module.exports = router;