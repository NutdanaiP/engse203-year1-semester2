// index.js
const taskManager = require('./modules/taskManager');
const logger = require('./modules/logger');
const { config, validateConfig } = require('./modules/config');

// Validate configuration
try {
  validateConfig();
} catch (error) {
  logger.error(error.message);
  process.exit(1);
}

// Show banner
function showBanner() {
  console.log('\n' + '='.repeat(60));
  console.log(`  📝 ${config.appName}`);
  console.log('='.repeat(60) + '\n');
}

// Show help
function showHelp() {
  console.log('Usage: node index.js <command> [arguments]\n');
  console.log('Commands:');
  console.log('  add <title> [priority] [options]  - Add a new task');
  console.log('  list [filter] [options]           - List tasks');
  console.log('  search <keyword>                  - Search tasks by keyword');
  console.log('  complete <id>                     - Mark task as completed');
  console.log('  delete <id>                       - Delete a task');
  console.log('  update <id> <title>               - Update task title');
  console.log('  stats                             - Show statistics');
  console.log('  export <filename>                 - Export tasks to JSON file');
  console.log('  import <filename>                 - Import tasks from JSON file');
  console.log('  help                              - Show this help\n');
  console.log('Options:');
  console.log('  --due <date>      - Set due date (YYYY-MM-DD)');
  console.log('  --tag <tag>       - Add tag or filter by tag');
  console.log('  --sort <field>    - Sort by priority/date/due');
  console.log('  --overdue         - Show overdue tasks\n');
  console.log('Examples:');
  console.log('  node index.js add "Buy groceries" high --due 2024-12-31 --tag shopping');
  console.log('  node index.js list pending --sort priority');
  console.log('  node index.js list --overdue');
  console.log('  node index.js list --tag work');
  console.log('  node index.js search "Node"');
}

// Parse command line arguments
function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        options[key] = args[i + 1];
        i++;
      } else {
        options[key] = true;
      }
    }
  }
  return options;
}

// Main function
async function main() {
  showBanner();

  const args = process.argv.slice(2);
  const command = args[0];
  const options = parseArgs(args);

  try {
    switch (command) {
      case 'add':
        if (!args[1]) {
          logger.error('Please provide a task title');
          break;
        }
        const priority = args[2] && !args[2].startsWith('--') ? args[2] : 'medium';
        const addOptions = {};
        if (options.due) addOptions.dueDate = options.due;
        if (options.tag) addOptions.tag = options.tag;
        await taskManager.addTask(args[1], priority, addOptions);
        break;

      case 'list':
        let filter = 'all';
        if (args[1] && !args[1].startsWith('--')) {
          filter = args[1];
        }
        if (options.overdue) {
          filter = 'overdue';
        }
        const listOptions = {};
        if (options.sort) listOptions.sort = options.sort;
        if (options.tag) listOptions.tag = options.tag;
        await taskManager.listTasks(filter, listOptions);
        break;

      case 'search':
        if (!args[1]) {
          logger.error('Please provide a search keyword');
          break;
        }
        await taskManager.searchTasks(args[1]);
        break;

      case 'complete':
        if (!args[1]) {
          logger.error('Please provide task ID');
          break;
        }
        await taskManager.completeTask(parseInt(args[1]));
        break;

      case 'delete':
        if (!args[1]) {
          logger.error('Please provide task ID');
          break;
        }
        await taskManager.deleteTask(parseInt(args[1]));
        break;

      case 'update':
        if (!args[1] || !args[2]) {
          logger.error('Please provide task ID and new title');
          break;
        }
        await taskManager.updateTask(parseInt(args[1]), args[2]);
        break;

      case 'stats':
        await taskManager.showStats();
        break;

      case 'export':
        if (!args[1]) {
          logger.error('Please provide export filename');
          break;
        }
        await taskManager.exportTasks(args[1]);
        break;

      case 'import':
        if (!args[1]) {
          logger.error('Please provide import filename');
          break;
        }
        await taskManager.importTasks(args[1]);
        break;

      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();