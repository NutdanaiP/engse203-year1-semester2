// modules/taskManager.js
const { v4: uuidv4 } = require('uuid');
const storage = require('./storage');
const logger = require('./logger');

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  // โหลด tasks จาก storage
  async loadTasks() {
    this.tasks = await storage.read();
    if (this.tasks.length > 0) {
      this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
    }
  }

  // บันทึก tasks ไปยัง storage
  async saveTasks() {
    await storage.write(this.tasks);
  }

  // เพิ่ม task ใหม่
  async addTask(title, priority = 'medium', options = {}) {
    await this.loadTasks();

    // TODO: สร้าง task object ใหม่
    // ควรมี properties: id, title, priority, completed, createdAt
    // priority ต้องเป็น low, medium, หรือ high เท่านั้น
    // YOUR CODE HERE
    // ตรวจสอบ priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      priority = 'medium';
    }
    
    const task = {
      id: this.nextId++,
      title: title,
      priority: priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // เพิ่ม due date ถ้ามี
    if (options.dueDate) {
      task.dueDate = options.dueDate;
    }
    
    // เพิ่ม tags ถ้ามี
    if (options.tag) {
      task.tags = Array.isArray(options.tag) ? options.tag : [options.tag];
    } else {
      task.tags = [];
    }

    this.tasks.push(task);
    await this.saveTasks();
    
    logger.success(`Task added: "${title}" (ID: ${task.id})`);
    
    // แสดงรายละเอียด task ที่เพิ่ม
    console.log('\n' + '─'.repeat(60));
    console.log('  📋 Task Details:');
    console.log('─'.repeat(60));
    console.log(`  ID:          ${task.id}`);
    console.log(`  Title:       ${task.title}`);
    console.log(`  Priority:    ${task.priority}`);
    console.log(`  Status:      ${task.completed ? '✓ Completed' : '○ Pending'}`);
    console.log(`  Created:     ${new Date(task.createdAt).toLocaleString()}`);
    if (task.dueDate) {
      const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
      console.log(`  Due Date:    ${new Date(task.dueDate).toLocaleDateString()}${isOverdue ? ' ⚠️ OVERDUE' : ''}`);
    }
    if (task.tags && task.tags.length > 0) {
      console.log(`  Tags:        ${task.tags.map(t => `#${t}`).join(', ')}`);
    }
    console.log('─'.repeat(60) + '\n');
    
    return task;
  }

  // แสดงรายการ tasks
  async listTasks(filter = 'all', options = {}) {
    await this.loadTasks();

    if (this.tasks.length === 0) {
      logger.warning('No tasks found');
      return;
    }

    // TODO: กรอง tasks ตาม filter (all/pending/completed)
    
    let filteredTasks = this.tasks;
    
    if (filter === 'pending') {
      filteredTasks = this.tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filteredTasks = this.tasks.filter(t => t.completed);
    } else if (filter === 'overdue') {
      filteredTasks = this.tasks.filter(t => {
        return t.dueDate && new Date(t.dueDate) < new Date() && !t.completed;
      });
    }
    
    // กรองตาม tag
    if (options.tag) {
      filteredTasks = filteredTasks.filter(t => 
        t.tags && t.tags.includes(options.tag)
      );
    }
    
    // เรียงลำดับ
    if (options.sort) {
      if (options.sort === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      } else if (options.sort === 'date') {
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (options.sort === 'due') {
        filteredTasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      }
    }

    if (filteredTasks.length === 0) {
      logger.warning(`No ${filter} tasks found`);
      return;
    }

    // แสดงผลแบบ table
    logger.info(`\n${filter.toUpperCase()} TASKS:\n`);
    
    // TODO: จัดรูปแบบข้อมูลให้แสดงเป็น table
    // แสดง: ID, Title, Priority, Status, Created
    // YOUR CODE HERE
    console.log('─'.repeat(120));
    console.log(
      'ID'.padEnd(6) + 
      'Title'.padEnd(27) + 
      'Priority'.padEnd(10) + 
      'Status'.padEnd(15) + 
      'Due Date'.padEnd(12) +
      'Tags'
    );
    console.log('─'.repeat(120));
    
    filteredTasks.forEach(task => {
      const status = task.completed ? '✓ Completed' : '○ Pending';
      const created = new Date(task.createdAt).toLocaleString();
      const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
      const dueText = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-';
      const tagsText = task.tags && task.tags.length > 0 ? task.tags.map(t => `#${t}`).join(',') : '-';
      
      console.log(
        String(task.id).padEnd(6) +
        task.title.substring(0, 25).padEnd(27) +
        task.priority.padEnd(10) +
        status.padEnd(15) +
        (isOverdue ? '⚠️ ' : '') + dueText.padEnd(12) +
        tagsText.substring(0, 15)
      );
    });
    
    console.log('─'.repeat(120));
    console.log(`\nTotal: ${filteredTasks.length} task(s)\n`);
  }
  // ค้นหา tasks จาก keyword
  async searchTasks(keyword) {
    await this.loadTasks();
    
    const searchResults = this.tasks.filter(task => 
      task.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())))
    );
    
    if (searchResults.length === 0) {
      logger.warning(`No tasks found matching "${keyword}"`);
      return;
    }
    
    logger.info(`\nSearch results for "${keyword}":\n`);
    
    console.log('─'.repeat(120));
    console.log(
      'ID'.padEnd(6) + 
      'Title'.padEnd(27) + 
      'Priority'.padEnd(10) + 
      'Status'.padEnd(15) + 
      'Due Date'.padEnd(12) +
      'Tags'
    );
    console.log('─'.repeat(120));
    
    searchResults.forEach(task => {
      const status = task.completed ? '✓ Completed' : '○ Pending';
      const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
      const dueText = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-';
      const tagsText = task.tags && task.tags.length > 0 ? task.tags.map(t => `#${t}`).join(',') : '-';
      
      console.log(
        String(task.id).padEnd(6) +
        task.title.substring(0, 25).padEnd(27) +
        task.priority.padEnd(10) +
        status.padEnd(15) +
        (isOverdue ? '⚠️ ' : '') + dueText.padEnd(12) +
        tagsText.substring(0, 15)
      );
    });
    
    console.log('─'.repeat(120));
    console.log(`\nFound: ${searchResults.length} task(s)\n`);
  }
  // ทำเครื่องหมาย task เสร็จ
  async completeTask(id) {
    await this.loadTasks();

    // TODO: หา task จาก id
    // TODO: เปลี่ยน completed เป็น true
    // TODO: เพิ่ม completedAt timestamp
    // YOUR CODE HERE
    const task = this.tasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      logger.error(`Task ${id} not found`);
      return;
    }
    
    task.completed = true;
    task.completedAt = new Date().toISOString();
    
    await this.saveTasks();
    logger.success(`Task ${id} marked as completed`);
  }

  // ลบ task
  async deleteTask(id) {
    await this.loadTasks();

    // TODO: ลบ task ที่มี id ตรงกัน
    // TODO: ตรวจสอบว่าหา task เจอหรือไม่
    // YOUR CODE HERE
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== parseInt(id));
    
    if (this.tasks.length === initialLength) {
      logger.error(`Task ${id} not found`);
      return;
    }
    
    await this.saveTasks();
    logger.success(`Task ${id} deleted`);
  }

  // แก้ไข task
  async updateTask(id, newTitle) {
    await this.loadTasks();

    // TODO: หา task และแก้ไข title
    // TODO: เพิ่ม updatedAt timestamp
    // YOUR CODE HERE
    const task = this.tasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      logger.error(`Task ${id} not found`);
      return;
    }
    
    task.title = newTitle;
    task.updatedAt = new Date().toISOString();
    
    await this.saveTasks();
    logger.success(`Task ${id} updated`);
  }

  // แสดง statistics
  async showStats() {
    await this.loadTasks();

    // TODO: คำนวณ statistics
    // - จำนวน tasks ทั้งหมด
    // - tasks ที่เสร็จแล้ว
    // - tasks ที่รอดำเนินการ
    // - แยกตาม priority (high/medium/low)
    // YOUR CODE HERE
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = this.tasks.filter(t => !t.completed).length;
    
    const highPriority = this.tasks.filter(t => t.priority === 'high').length;
    const mediumPriority = this.tasks.filter(t => t.priority === 'medium').length;
    const lowPriority = this.tasks.filter(t => t.priority === 'low').length;
    
    // คำนวณ tasks ที่ overdue
    const overdue = this.tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
    ).length;
    
    // คำนวณ completion rate
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
    
    // แสดงสถิติแบบเรียบง่าย
    console.log('\n' + '─'.repeat(50));
    console.log('  📊 TASK STATISTICS');
    console.log('─'.repeat(50));
    
    console.log('\n  Summary:');
    console.log(`    Total Tasks       ${total}`);
    console.log(`    ✓ Completed       ${completed}`);
    console.log(`    ○ Pending         ${pending}`);
    if (overdue > 0) {
      console.log(`    ⚠️  Overdue        ${overdue}`);
    }
    console.log(`    Progress          ${completionRate}%`);
    
    console.log('\n  Priority:');
    console.log(`    🔴 High           ${highPriority}`);
    console.log(`    🟡 Medium         ${mediumPriority}`);
    console.log(`    🟢 Low            ${lowPriority}`);
    
    console.log('\n' + '─'.repeat(50) + '\n');
    
    // แสดงรายละเอียดของแต่ละ task
    if (this.tasks.length > 0) {
      // จัดกลุ่ม tasks ตาม status
      const pendingTasks = this.tasks.filter(t => !t.completed);
      const completedTasks = this.tasks.filter(t => t.completed);
      
      // แสดง Pending tasks ก่อน
      if (pendingTasks.length > 0) {
        console.log('─'.repeat(50));
        console.log(`  ⏳ PENDING TASKS (${pendingTasks.length})`);
        console.log('─'.repeat(50) + '\n');
        
        pendingTasks.forEach((task, index) => {
          const priorityIcon = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
          
          console.log(`  ${index + 1}. ${task.title} ${priorityIcon}`);
          console.log(`     ID: ${task.id} | Priority: ${task.priority}`);
          console.log(`     Created: ${new Date(task.createdAt).toLocaleString()}`);
          
          if (task.dueDate) {
            const dueStr = new Date(task.dueDate).toLocaleDateString();
            console.log(`     Due: ${dueStr}${isOverdue ? ' ⚠️ OVERDUE' : ''}`);
          }
          
          if (task.tags && task.tags.length > 0) {
            console.log(`     Tags: ${task.tags.map(t => `#${t}`).join(', ')}`);
          }
          
          console.log('');
        });
      }
      
      // แสดง Completed tasks
      if (completedTasks.length > 0) {
        console.log('─'.repeat(50));
        console.log(`  ✅ COMPLETED TASKS (${completedTasks.length})`);
        console.log('─'.repeat(50) + '\n');
        
        completedTasks.forEach((task, index) => {
          const priorityIcon = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
          
          console.log(`  ${index + 1}. ${task.title} ${priorityIcon}`);
          console.log(`     ID: ${task.id} | Priority: ${task.priority}`);
          
          if (task.completedAt) {
            console.log(`     ✓ Completed: ${new Date(task.completedAt).toLocaleString()}`);
          }
          
          if (task.tags && task.tags.length > 0) {
            console.log(`     Tags: ${task.tags.map(t => `#${t}`).join(', ')}`);
          }
          
          console.log('');
        });
      }
      
      console.log('─'.repeat(50) + '\n');
    }
  }

  // Export tasks
  async exportTasks(filename) {
    await this.loadTasks();
    
    // TODO: ใช้ storage.exportTo() เพื่อ export
    // YOUR CODE HERE
    await storage.exportTo(filename, this.tasks);
    
    logger.success(`Tasks exported to ${filename}`);
  }

  // Import tasks
  async importTasks(filename) {
    // TODO: ใช้ storage.importFrom() เพื่อ import
    // TODO: merge กับ tasks ที่มีอยู่ (ถ้ามี)
    // TODO: ระวัง id ซ้ำ
    // YOUR CODE HERE
    await this.loadTasks();
    
    const importedTasks = await storage.importFrom(filename);
    
    // หา id ที่ใหญ่ที่สุดในปัจจุบัน
    let maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) : 0;
    
    // ปรับ id ของ tasks ที่ import เข้ามาเพื่อไม่ให้ซ้ำ
    importedTasks.forEach(task => {
      task.id = ++maxId;
      this.tasks.push(task);
    });
    
    this.nextId = maxId + 1;
    
    await this.saveTasks();
    logger.success(`Tasks imported from ${filename}`);
  }
}

module.exports = new TaskManager();