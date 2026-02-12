# Workshop 16: Unit Testing with Jest - Experiment Results

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา: 68543210082-2
- วันที่: February 7, 2026

---

## 📋 Table of Contents (สารบัญ)
1. [Level 1: Guided Exercises (แบบฝึกหัดแบบมีคำแนะนำ)](#level-1-guided-exercises)
2. [Coverage Report (รายงาน Coverage)](#coverage-report)
3. [Challenge Tasks (งานท้าทาย)](#challenge-tasks)
4. [Key Learnings (สิ่งที่ได้เรียนรู้)](#key-learnings)

---

## Level 1: Guided Exercises (แบบฝึกหัดแบบมีคำแนะนำ)

### 1. Validation Tests (การทดสอบ Validation)
**Command:** `npm test validation.test.js`

**Results:**
```
✅ 29 tests passed

Test Categories:
  validateTask (12 tests)
    ✓ Positive: valid task, minimum/maximum length (3 tests)
    ✓ Negative: empty, null, undefined, non-string (4 tests)
    ✓ Boundary: too short, too long, exactly 3/500 chars (5 tests)
  
  isValidPriority (6 tests)
    ✓ Positive: "low", "medium", "high" (3 tests)
    ✓ Negative: invalid, case-sensitive, non-string (3 tests)
  
  validateDueDate (6 tests)
    ✓ Positive: null/undefined (optional), future dates, today (5 tests)
    ✓ Negative: past date, invalid format (2 tests)
  
  validateTodo (4 tests)
    ✓ Complete validation with error collection
```

**Test Coverage:**
- ✅ Positive test cases (valid inputs)
- ✅ Negative test cases (invalid inputs)
- ✅ Boundary test cases (edge values)

---

### 2. Business Rules Tests (การทดสอบกฎทางธุรกิจ)
**Command:** `npm test businessRules.test.js`

**Results:**
```
✅ 28 tests passed

Test Categories:
  canMarkAsDone (4 tests)
    ✓ Allow marking pending todo as done
    ✓ Prevent marking already done todo
    ✓ Handle null/undefined todos
  
  isOverdue (6 tests)
    ✓ Detect overdue todos
    ✓ Handle todos without due date
    ✓ Respect completed status
    ✓ Compare with current time
  
  calculateCompletionRate (8 tests)
    ✓ Calculate 0%, 50%, 100% correctly
    ✓ Round to nearest integer
    ✓ Handle empty/null/non-array inputs
  
  getPriorityScore (2 tests)
    ✓ Return correct scores (high=3, medium=2, low=1)
    ✓ Return 0 for invalid priority
  
  isDueSoon (8 tests)
    ✓ Detect todos due within 24 hours
    ✓ Handle boundary cases (exactly 24 hours, 24.1 hours)
    ✓ Respect completed status
```

**Business Logic Validated:**
- Task completion rules
- Due date calculations
- Priority scoring
- Completion rate metrics

---

### 3. Data Processing Tests (การทดสอบการประมวลผลข้อมูล)
**Command:** `npm test dataProcessing.test.js`

**Results:**
```
✅ 32 tests passed

Test Categories:
  filterTodosByStatus (6 tests)
    ✓ Filter pending/completed todos
    ✓ Handle undefined status, string "true"
    ✓ Validate array inputs
  
  sortTodosByPriority (6 tests)
    ✓ Sort descending (high→low) and ascending (low→high)
    ✓ No mutation of original array
    ✓ Handle missing priority (default to low)
  
  searchTodos (7 tests)
    ✓ Case-insensitive search
    ✓ Find multiple matches
    ✓ Trim keyword, handle empty/null
  
  groupTodosByPriority (4 tests)
    ✓ Group by priority (high/medium/low)
    ✓ Handle missing priority
    ✓ Return empty groups for invalid inputs
  
  paginateTodos (9 tests)
    ✓ Paginate correctly (pages 1, 2, last page)
    ✓ Use default page/limit
    ✓ Handle edge cases (single item, exact page size)
    ✓ Return empty for page beyond total
```

**Data Operations Tested:**
- Filtering and sorting
- Search functionality
- Grouping algorithms
- Pagination logic

---

## Coverage Report (รายงาน Coverage)

### Command: `npm run test:coverage`

**Overall Coverage Summary:**
```
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |   95.83 |    91.61 |    97.5 |   95.77 |
-------------------|---------|----------|---------|---------|
config/            |       0 |        0 |       0 |       0 |
  database.js      |       0 |        0 |       0 |       0 | (mocked in tests)
models/            |     100 |      100 |     100 |     100 |
  Todo.js          |     100 |      100 |     100 |     100 |
utils/             |   98.84 |    96.96 |     100 |   98.82 |
  businessRules.js |     100 |      100 |     100 |     100 |
  dataProcessing.js|   97.36 |    93.93 |     100 |   97.29 |
  dateHelpers.js   |   98.07 |    95.23 |     100 |   98.07 |
  errorHandler.js  |     100 |      100 |     100 |     100 |
  validation.js    |     100 |      100 |     100 |     100 |
```

**Coverage Highlights:**
- ✅ **Statements:** 95.83% (Excellent)
- ✅ **Branch:** 91.61% (Very Good)
- ✅ **Functions:** 97.5% (Excellent)
- ✅ **Lines:** 95.77% (Excellent)

**Coverage Categories:**
- 🟢 **100% Coverage:** Todo.js, businessRules.js, errorHandler.js, validation.js
- 🟢 **97-98% Coverage:** dataProcessing.js, dateHelpers.js
- 🔵 **0% Coverage:** database.js (mocked - not actual application code)

### HTML Coverage Report
**Command:** `open coverage/lcov-report/index.html`

The HTML report provides:
- ✅ Line-by-line coverage visualization
- ✅ Interactive file explorer
- ✅ Detailed branch coverage
- ✅ Uncovered lines highlighted
- 📊 Visual coverage metrics

---

## Challenge Tasks (งานท้าทาย)

### Challenge 1: Test Todo Model (with Mock Database) (ทดสอบ Todo Model ด้วย Mock Database)
**Command:** `npm test Todo.test.js`

**Results:**
```
✅ 20 tests passed

Test Categories:
  getAll (3 tests)
    ✓ Return all todos
    ✓ Return todos with correct structure (id, task, done, priority)
    ✓ Throw error when database fails
  
  getById (4 tests)
    ✓ Return todo by ID
    ✓ Return correct todo data
    ✓ Throw error when todo not found
    ✓ Throw error when database fails
  
  create (5 tests)
    ✓ Create new todo
    ✓ Return todo with createdAt timestamp
    ✓ Increment ID correctly
    ✓ Throw error for duplicate todo
    ✓ Throw error when database fails
  
  update (4 tests)
    ✓ Update existing todo
    ✓ Update partial data
    ✓ Throw error when todo not found
    ✓ Throw error when database fails
  
  delete (4 tests)
    ✓ Delete existing todo
    ✓ Actually remove todo from database
    ✓ Throw error when todo not found
    ✓ Throw error when database fails
```

**Mock Database Implementation:**
- ✅ In-memory data storage
- ✅ CRUD operations simulation
- ✅ Error scenarios testing
- ✅ Network delay simulation (10ms)

**Key Testing Concepts:**
- 🎭 **Mocking:** Replaced real database with mock
- ✅ **Isolation:** Tests don't depend on external database
- 🔄 **Reset:** Mock data reset before each test (beforeEach)
- 🎯 **Coverage:** 100% model code coverage

---

### Challenge 2: Test Error Handling (ทดสอบการจัดการข้อผิดพลาด)
**Command:** `npm test errorHandler.test.js`

**Results:**
```
✅ 16 tests passed

Test Categories:
  AppError (3 tests)
    ✓ Create error with correct properties (message, statusCode, isOperational)
    ✓ Be instance of Error
    ✓ Have stack trace
  
  handleDatabaseError (6 tests)
    ✓ Handle connection refused (ECONNREFUSED)
    ✓ Handle duplicate entry (ER_DUP_ENTRY)
    ✓ Handle foreign key error (ER_ROW_IS_REFERENCED)
    ✓ Handle timeout error (ETIMEDOUT)
    ✓ Handle unknown database error
    ✓ Handle error without code
  
  handleValidationError (3 tests)
    ✓ Handle single validation error
    ✓ Handle multiple validation errors
    ✓ Handle empty errors array
  
  handleNotFoundError (2 tests)
    ✓ Create not found error (404)
    ✓ Work with different resource names
  
  handleAuthError (1 test)
    ✓ Create authentication error (401)
  
  handleForbiddenError (1 test)
    ✓ Create authorization error (403)
```

**Error Types Tested:**
- 🚫 Database errors (connection, duplicate, foreign key, timeout)
- ⚠️ Validation errors (single, multiple)
- 🔍 Resource errors (404 not found)
- 🔒 Authentication errors (401, 403)

**Error Handler Benefits:**
- Consistent error responses
- Proper HTTP status codes
- User-friendly error messages
- Stack trace preservation

---

### Challenge 3: Test Date/Time Logic (ทดสอบโลจิกวันที่/เวลา)
**Command:** `npm test dateHelpers.test.js`

**Results:**
```
✅ 23 tests passed

Test Categories:
  getTasksDueToday (6 tests)
    ✓ Return tasks due today
    ✓ Exclude completed tasks
    ✓ Return empty for non-array input
    ✓ Return empty when no tasks due today
    ✓ Include task at start of day (00:00:00)
    ✓ Include task at end of day (23:59:59)
  
  getTasksDueThisWeek (3 tests)
    ✓ Return tasks due this week
    ✓ Exclude completed tasks
    ✓ Return empty for non-array input
  
  getOverdueTasks (4 tests)
    ✓ Return overdue tasks
    ✓ Exclude completed tasks
    ✓ Include task due 1 minute ago
    ✓ Not include task due in 1 minute
  
  formatRelativeTime (7 tests)
    ✓ Format seconds ago ("30 seconds ago")
    ✓ Format minutes ago ("5 minutes ago")
    ✓ Format hours ago ("2 hours ago")
    ✓ Format days ago ("3 days ago")
    ✓ Format future time ("in 10 minutes")
    ✓ Format future days ("in 2 days")
    ✓ Handle singular units ("1 day ago")
  
  isWeekend (3 tests)
    ✓ Return true for Saturday
    ✓ Return true for Sunday
    ✓ Return false for weekdays
```

**Date/Time Features:**
- 📅 Filter tasks by date ranges (today, this week)
- ⏰ Detect overdue tasks
- 🕐 Format relative time (human-readable)
- 📆 Weekend detection

**Time Testing Challenges:**
- ✅ Handle timezone-independent tests
- ✅ Test boundary conditions (start/end of day)
- ✅ Test relative time calculations
- ✅ Handle singular vs plural units

---

## Key Learnings (สิ่งที่ได้เรียนรู้)

### ✅ What I Learned (สิ่งที่ผมได้เรียนรู้)

#### 1. **Test-Driven Development (TDD) Principles**
- ✅ Write tests first, code second
- ✅ Red-Green-Refactor cycle
- ✅ Tests as documentation

#### 2. **Test Types & Categories**
- ✅ **Positive Tests:** Valid inputs, expected success
- ✅ **Negative Tests:** Invalid inputs, expected errors
- ✅ **Boundary Tests:** Edge cases, limits
- ✅ **Error Tests:** Exception handling

#### 3. **Jest Framework Features**
```javascript
// Test structure
describe('Feature', () => {
  beforeEach(() => { /* setup */ });
  test('should...', () => { /* test */ });
});

// Matchers
expect(value).toBe(expected)
expect(value).toEqual(object)
expect(value).toHaveProperty('key')
expect(async).rejects.toThrow()
expect(array).toHaveLength(n)
```

#### 4. **Mocking & Stubbing**
- 🎭 **Mock Database:** Isolated testing without real DB
- 🔄 **Reset State:** `beforeEach()` for clean tests
- 🎯 **Mock Functions:** `jest.spyOn()`, `mockRejectedValueOnce()`
- ✅ **Dependency Injection:** Easier to test

#### 5. **Code Coverage**
- 📊 **Metrics:** Statements, Branches, Functions, Lines
- 🎯 **Goal:** 80%+ coverage (achieved 95%+!)
- 📈 **Tools:** Jest coverage, HTML reports
- 🔍 **Uncovered Lines:** Identify gaps

#### 6. **Best Practices**
- ✅ Descriptive test names (`should return all todos`)
- ✅ Arrange-Act-Assert (AAA) pattern
- ✅ One assertion per test (mostly)
- ✅ Test behavior, not implementation
- ✅ Keep tests independent
- ✅ Use setup/teardown (beforeEach/afterEach)

#### 7. **Error Handling Testing**
- ✅ Test all error scenarios
- ✅ Verify error messages
- ✅ Check status codes
- ✅ Test error propagation

#### 8. **Date/Time Testing**
- ✅ Use relative times, not absolute
- ✅ Test timezone independence
- ✅ Test boundary conditions
- ✅ Mock Date for consistent tests

### 📈 Test Statistics (สถิติการทดสอบ)

**Total Tests by Category:**
- 🧪 Validation: 29 tests
- 📋 Business Rules: 28 tests
- 🔄 Data Processing: 32 tests
- 💾 Todo Model (Mock): 20 tests
- ⚠️ Error Handling: 16 tests
- 📅 Date/Time Logic: 23 tests

**Grand Total: 148 tests ✅**

**Test Success Rate:** 100% ✅

**Code Coverage:**
- Statements: 95.83%
- Branches: 91.61%
- Functions: 97.5%
- Lines: 95.77%

---

## 🎯 Skills Acquired (ทักษะที่ได้รับ)

### Technical Skills (ทักษะทางเทคนิค) ✅
- [x] Set up Jest testing framework
- [x] Write unit tests for validation
- [x] Write unit tests for business logic
- [x] Write unit tests for data processing
- [x] Design test cases (positive/negative/boundary)
- [x] Use mock/stub for database testing
- [x] Generate and analyze coverage reports
- [x] Test error handling scenarios
- [x] Test date/time logic
- [x] Use Jest matchers and assertions
- [x] Implement test setup/teardown

### Concepts Mastered (แนวคิดที่เชี่ยวชาญ) ✅
- [x] Test-Driven Development (TDD)
- [x] Arrange-Act-Assert (AAA) pattern
- [x] Mocking and stubbing
- [x] Code coverage analysis
- [x] Test isolation
- [x] Error scenario testing
- [x] Boundary testing
- [x] Integration with CI/CD ready

---
