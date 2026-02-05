// modules/storage.js
const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');
const { config } = require('./config');

class Storage {
  constructor() {
    this.dataFile = config.dataFile;
  }

  // อ่านข้อมูล tasks จากไฟล์
  async read() {
    try {
      // TODO: ตรวจสอบว่าไฟล์มีอยู่หรือไม่
      // ถ้าไม่มี ให้ return empty array
      // ถ้ามี ให้อ่านและ parse JSON
      
      // คำแนะนำ: ใช้ fs.access() เพื่อเช็คว่าไฟล์มีอยู่
      // ใช้ fs.readFile() เพื่ออ่านไฟล์
      // ใช้ JSON.parse() เพื่อแปลงเป็น object
      // YOUR CODE HERE      
      // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
      try {
        await fs.access(this.dataFile);
      } catch {
        // ถ้าไฟล์ไม่มี return empty array
        return [];
      }
      
      // อ่านไฟล์และ parse JSON
      const data = await fs.readFile(this.dataFile, 'utf-8');
      return JSON.parse(data);
      
    } catch (error) {
      logger.error(`Failed to read data: ${error.message}`);
      return [];
    }
  }

  // บันทึกข้อมูล tasks ลงไฟล์
  async write(data) {
    try {
      // TODO: สร้างโฟลเดอร์ data ถ้ายังไม่มี
      // TODO: แปลง data เป็น JSON string (แบบ pretty print)
      // TODO: เขียนลงไฟล์
      
      // คำแนะนำ: ใช้ path.dirname() เพื่อหา directory
      // ใช้ fs.mkdir() เพื่อสร้างโฟลเดอร์ (recursive: true)
      // ใช้ JSON.stringify() พร้อม indent
      // ใช้ fs.writeFile() เพื่อเขียนไฟล์
      // YOUR CODE HERE

      // สร้างโฟลเดอร์ data ถ้ายังไม่มี
      const dir = path.dirname(this.dataFile);
      await fs.mkdir(dir, { recursive: true });
      
      // แปลง data เป็น JSON string (pretty print)
      const jsonData = JSON.stringify(data, null, 2);
      
      // เขียนลงไฟล์
      await fs.writeFile(this.dataFile, jsonData, 'utf-8');
      
      logger.success('Data saved successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to write data: ${error.message}`);
      throw error;
    }
  }

  // Export tasks ไปยังไฟล์อื่น
  async exportTo(filename, data) {
    try {
      // TODO: ทำคล้ายกับ write() แต่ใช้ filename ที่ระบุ
      // YOUR CODE HERE
      // สร้างโฟลเดอร์ถ้ายังไม่มี
      const dir = path.dirname(filename);
      await fs.mkdir(dir, { recursive: true });
      
      // แปลง data เป็น JSON string (pretty print)
      const jsonData = JSON.stringify(data, null, 2);
      
      // เขียนลงไฟล์
      await fs.writeFile(filename, jsonData, 'utf-8');
      
      logger.success(`Data exported to ${filename}`);
      return true;
      
    } catch (error) {
      logger.error(`Failed to export: ${error.message}`);
      throw error;
    }
  }

  // Import tasks จากไฟล์อื่น
  async importFrom(filename) {
    try {
      // TODO: อ่านไฟล์ที่ระบุและ return data
      // YOUR CODE HERE
      // อ่านไฟล์และ parse JSON
      const data = await fs.readFile(filename, 'utf-8');
      const tasks = JSON.parse(data);
      
      logger.success(`Data imported from ${filename}`);
      return tasks;
      
    } catch (error) {
      logger.error(`Failed to import: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new Storage();