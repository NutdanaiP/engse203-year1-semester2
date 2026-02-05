// middleware/validateUser.js

/**
 * Middleware สำหรับ validate user data
 * ใช้สำหรับ POST และ PUT requests
 */
const validateUser = (req, res, next) => {
  const { name, email, role } = req.body;

  // ตรวจสอบว่ามี name และ email
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Name and email are required',
        fields: {
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined
        }
      }
    });
  }

  // ตรวจสอบความยาวของ name
  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Name must be at least 2 characters long'
      }
    });
  }

  // ตรวจสอบรูปแบบ email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid email format'
      }
    });
  }

  // ตรวจสอบ role ถ้ามี
  if (role && !['admin', 'user', 'moderator'].includes(role)) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid role. Allowed values: admin, user, moderator'
      }
    });
  }

  // ถ้า validation ผ่านให้ทำต่อ
  next();
};

module.exports = validateUser;
