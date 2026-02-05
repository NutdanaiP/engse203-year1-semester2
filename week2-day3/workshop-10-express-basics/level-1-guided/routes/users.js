// routes/users.js
const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');

// Dummy data (จะใช้ database ในภายหลัง)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

/**
 * GET /api/users - Get all users
 * Query params: ?role=admin&page=1&limit=10
 */
router.get('/', (req, res) => {
  console.log('GET /api/users - Query params:', req.query);
  
  // ตรวจสอบ query parameter
  const { role, page, limit } = req.query;

  let filteredUsers = users;

  // กรองตาม role ถ้ามี
  if (role) {
    filteredUsers = users.filter(u => u.role === role);
  }

  // Pagination
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  console.log(`Returning ${paginatedUsers.length} of ${filteredUsers.length} users (page ${pageNum})`);

  res.json({
    success: true,
    count: paginatedUsers.length,
    total: filteredUsers.length,
    page: pageNum,
    totalPages: Math.ceil(filteredUsers.length / limitNum),
    data: paginatedUsers
  });
});

 //เพิ่ม endpoint สำหรับค้นหา users
 //TODO: ค้นหา users ที่มี name หรือ email ตรงกับ query
router.get('/search', (req, res) => {
  console.log('GET /api/users/search - Query:', req.query);
  
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Search query parameter "q" is required'
      }
    });
  }

  // ค้นหา users ที่มี name หรือ email ตรงกับ query
  const searchQuery = q.toLowerCase();
  const searchResults = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery) || 
    user.email.toLowerCase().includes(searchQuery)
  );
  
  console.log(`Search "${q}" found ${searchResults.length} results`);

  res.json({
    success: true,
    count: searchResults.length,
    query: q,
    data: searchResults
  });
});

 //เพิ่ม pagination สำหรับ users
 //// TODO: เพิ่ม pagination logic
router.get('/:id', (req, res) => {
  console.log('GET /api/users/:id - ID:', req.params.id);
  
  // แปลง id จาก string เป็น number
  const id = parseInt(req.params.id);

  // หา user
  const user = users.find(u => u.id === id);

  if (!user) {
    console.log(`User with ID ${id} not found`);
    return res.status(404).json({
      success: false,
      error: {
        message: `User with ID ${id} not found`
      }
    });
  }
  
  console.log('User found:', user);

  res.json({
    success: true,
    data: user
  });
});

/**
 * POST /api/users - Create new user
 * Body: { name, email, role }
 */
router.post('/', validateUser, (req, res) => {
  console.log('POST /api/users - Creating new user:', req.body);
  
  const { name, email, role } = req.body;

  // สร้าง user ใหม่
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };

  users.push(newUser);
  
  console.log('User created successfully:', newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

/**
 * PUT /api/users/:id - Update user
 * Body: { name, email, role }
 */
router.put('/:id', validateUser, (req, res) => {
  console.log('PUT /api/users/:id - ID:', req.params.id, 'Data:', req.body);
  
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    console.log(`User with ID ${id} not found for update`);
    return res.status(404).json({
      success: false,
      error: {
        message: `User with ID ${id} not found`
      }
    });
  }

  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(role && { role })
  };
  
  console.log('User updated successfully:', users[userIndex]);

  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

/**
 * DELETE /api/users/:id - Delete user
 */
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/users/:id - ID:', req.params.id);
  
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    console.log(`User with ID ${id} not found for deletion`);
    return res.status(404).json({
      success: false,
      error: {
        message: `User with ID ${id} not found`
      }
    });
  }

  // ลบ user
  const deletedUser = users.splice(userIndex, 1)[0];
  
  console.log('User deleted successfully:', deletedUser);

  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});

module.exports = router;