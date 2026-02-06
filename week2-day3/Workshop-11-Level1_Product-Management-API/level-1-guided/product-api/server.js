// สร้างไฟล์server.js
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Product API Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/products`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
});

// Graceful shutdown
const shutdown = () => {
  console.log('\n👋 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 10s
  setTimeout(() => {
    console.error('❌ Forced shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);