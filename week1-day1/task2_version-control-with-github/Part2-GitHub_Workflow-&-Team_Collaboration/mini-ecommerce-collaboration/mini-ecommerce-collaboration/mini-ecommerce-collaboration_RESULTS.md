# Mini E-Commerce Collaboration - ผลการทดลอง

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา: 68543210082-2
- วันที่: February 24, 2026

---

## 📋 สารบัญ
1. [ภาพรวมโปรเจค (Project Overview)](#ภาพรวมโปรเจค-project-overview)
2. [GitHub Workflow ที่ใช้](#github-workflow-ที่ใช้)
3. [โครงสร้างโปรเจค (Project Structure)](#โครงสร้างโปรเจค-project-structure)
4. [ฟีเจอร์ของเว็บไซต์ (Features)](#ฟีเจอร์ของเว็บไซต์-features)
5. [การทำงานร่วมกันเป็นทีม (Team Collaboration)](#การทำงานร่วมกันเป็นทีม-team-collaboration)
6. [Git Commands ที่ใช้](#git-commands-ที่ใช้)
7. [สิ่งที่ได้เรียนรู้ (Key Learnings)](#สิ่งที่ได้เรียนรู้-key-learnings)

---

## ภาพรวมโปรเจค (Project Overview)

### 🎯 วัตถุประสงค์
สร้างเว็บไซต์ E-Commerce แบบง่ายเพื่อฝึกการทำงานร่วมกันเป็นทีมโดยใช้ Git และ GitHub

### 🛠️ เทคโนโลยีที่ใช้
- **HTML5** - โครงสร้างหน้าเว็บ
- **CSS3** - จัดรูปแบบและ Responsive Design
- **JavaScript (ES6+)** - Logic และ Dynamic Content
- **JSON** - เก็บข้อมูลสินค้า
- **Git & GitHub** - Version Control และ Collaboration

### 📦 ฟีเจอร์หลัก
- ✅ แสดงรายการสินค้าจาก JSON
- ✅ ระบบค้นหาสินค้า (Real-time Search)
- ✅ Responsive Design (รองรับทุกขนาดหน้าจอ)
- ✅ Loading Indicator
- ✅ Hover Effects
- ✅ Error Handling

---

## GitHub Workflow ที่ใช้

### 1. Repository Setup (การตั้งค่า Repository)

**การสร้าง Repository:**
```bash
# สร้าง repository ใหม่บน GitHub
# ชื่อ: mini-ecommerce-collaboration
# Description: Mini E-Commerce website for team collaboration practice
# Visibility: Public
# Initialize with README: ✓
```

**Clone Repository:**
```bash
git clone https://github.com/[username]/mini-ecommerce-collaboration.git
cd mini-ecommerce-collaboration
```

**✅ ผลลัพธ์:**
- สร้าง repository สำเร็จ
- Clone มายัง local machine สำเร็จ
- มีไฟล์ README.md เริ่มต้น

---

### 2. Branching Strategy (กลยุทธ์การแบ่ง Branch)

**Branch Structure:**
```
main (production-ready code)
  ├── feature/html-structure
  ├── feature/css-styling
  ├── feature/product-listing
  └── feature/search-functionality
```

**การสร้าง Branch:**
```bash
# Branch สำหรับโครงสร้าง HTML
git checkout -b feature/html-structure

# Branch สำหรับ CSS Styling
git checkout -b feature/css-styling

# Branch สำหรับแสดงรายการสินค้า
git checkout -b feature/product-listing

# Branch สำหรับระบบค้นหา
git checkout -b feature/search-functionality
```

**✅ Best Practices:**
- ✅ ตั้งชื่อ branch ให้สื่อความหมาย
- ✅ ใช้ prefix เช่น `feature/`, `bugfix/`, `hotfix/`
- ✅ แยก branch ตามฟีเจอร์ที่จะพัฒนา
- ✅ ไม่ commit โค้ดลงใน `main` โดยตรง

---

### 3. Feature Development (การพัฒนาฟีเจอร์)

#### Feature 1: HTML Structure

**Branch:** `feature/html-structure`

**งานที่ทำ:**
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini E-Commerce</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>My Simple Store</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="ค้นหาสินค้า...">
        </div>
    </header>

    <div id="loader" class="loader-container">
        <div class="spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
    </div>

    <main id="product-list" class="product-grid">
    </main>

    <script src="js/main.js"></script>
</body>
</html>
```

**Git Commands:**
```bash
git add index.html
git commit -m "Add basic HTML structure with header and product list container"
git push origin feature/html-structure
```

**✅ สิ่งที่ได้:**
- โครงสร้าง HTML พื้นฐาน
- Header พร้อมช่องค้นหา
- Container สำหรับแสดงสินค้า
- Loading indicator
- Semantic HTML tags

---

#### Feature 2: CSS Styling

**Branch:** `feature/css-styling`

**งานที่ทำ:**
```css
/* พื้นฐาน */
body { 
    font-family: sans-serif; 
    margin: 0; 
    background-color: #f4f4f4; 
}

header { 
    background: #333; 
    color: #fff; 
    padding: 1.5rem; 
    text-align: center; 
}

input[type="text"] { 
    width: 60%; 
    padding: 10px; 
    border-radius: 20px; 
    border: none; 
    outline: none;
}

/* Responsive Grid ด้วย Flexbox */
#product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Product Card */
.product-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 15px;
    padding: 20px;
    width: calc(100% - 40px);
    max-width: 250px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

/* Hover Effect */
.product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.product-card img { 
    width: 100%; 
    height: 180px; 
    object-fit: contain;
    margin-bottom: 15px;
}

/* Loader */
.loader {
    text-align: center;
    width: 100%;
    padding: 50px;
    font-size: 1.2rem;
    color: #666;
}
```

**Git Commands:**
```bash
git add css/style.css
git commit -m "Add responsive CSS styling with Flexbox and hover effects"
git push origin feature/css-styling
```

**✅ สิ่งที่ได้:**
- ✅ Responsive Design (Mobile-first)
- ✅ Flexbox Layout
- ✅ Smooth Hover Effects (0.5s transition)
- ✅ Card-based Design
- ✅ Modern UI/UX

---

#### Feature 3: Product Listing

**Branch:** `feature/product-listing`

**งานที่ทำ:**

**1. สร้างไฟล์ products.json:**
```json
[
    {
        "id": 1, 
        "name": "Classic T-Shirt", 
        "price": 499, 
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    },
    {
        "id": 2, 
        "name": "Running Shoes", 
        "price": 1200, 
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
    },
    {
        "id": 3, 
        "name": "Smart Watch", 
        "price": 3500, 
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80"
    },
    {
        "id": 4, 
        "name": "Denim Jeans", 
        "price": 990, 
        "image": "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&q=80"
    },
    {
        "id": 5, 
        "name": "Leather Backpack", 
        "price": 1850, 
        "image": "https://images.unsplash.com/photo-1561126135-b7a5dfadace6?q=80&w=500"
    },
    {
        "id": 6, 
        "name": "Sunglasses", 
        "price": 750, 
        "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"
    }
]
```

**2. JavaScript สำหรับดึงและแสดงข้อมูล:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const loader = document.getElementById('loader');
    let allProducts = [];

    // แสดง Loader ก่อนโหลด
    loader.style.display = 'block';

    // ดึงข้อมูลสินค้า
    fetch('js/products.json')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error:', error);
            loader.textContent = 'ไม่สามารถโหลดข้อมูลได้';
        })
        .finally(() => {
            loader.style.display = 'none';
        });

    function displayProducts(products) {
        productList.innerHTML = '';
        
        if (products.length === 0) {
            productList.innerHTML = '<p>ไม่พบสินค้าที่ค้นหา</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price} บาท</p>
            `;
            productList.appendChild(card);
        });
    }
});
```

**Git Commands:**
```bash
git add js/products.json js/main.js
git commit -m "Add product data and fetch logic with loading indicator"
git push origin feature/product-listing
```

**✅ ผลลัพธ์:**
- ✅ ดึงข้อมูลจาก JSON สำเร็จ
- ✅ แสดงสินค้า 6 รายการ
- ✅ แสดง Loading Indicator
- ✅ Error Handling ครบถ้วน
- ✅ ใช้ Modern JavaScript (ES6+)

---

#### Feature 4: Search Functionality

**Branch:** `feature/search-functionality`

**งานที่ทำ:**
```javascript
// เพิ่มในฟังก์ชัน DOMContentLoaded
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayProducts(allProducts);
        return;
    }
    
    const filteredProducts = allProducts.filter(product => {
        return product.name.toLowerCase().includes(searchTerm);
    });
    
    displayProducts(filteredProducts);
});
```

**Git Commands:**
```bash
git add js/main.js
git commit -m "Add real-time search functionality with filter"
git push origin feature/search-functionality
```

**✅ ผลลัพธ์:**
- ✅ Real-time Search (ค้นหาขณะพิมพ์)
- ✅ Case-insensitive Search
- ✅ แสดงข้อความเมื่อไม่พบสินค้า
- ✅ Filter ด้วย JavaScript Array methods

---

### 4. Pull Requests & Code Review

**ขั้นตอนการ Merge:**

**1. สร้าง Pull Request (PR):**
```
GitHub Web Interface:
1. ไปที่ Repository บน GitHub
2. คลิก "Pull requests" > "New pull request"
3. เลือก base: main, compare: feature/html-structure
4. กรอก Title: "Add HTML structure"
5. กรอก Description: "Added basic HTML with header and product container"
6. คลิก "Create pull request"
```

**2. Code Review Process:**
```
Reviewer Checklist:
✓ โค้ดอ่านง่าย มีความเป็นระเบียบ
✓ ตั้งชื่อตัวแปรและฟังก์ชันได้ดี
✓ มี comments อธิบายโค้ด
✓ ไม่มี syntax errors
✓ ทำงานตามที่คาดหวัง
✓ ไม่มี conflicts กับ main branch
```

**3. Merge Pull Request:**
```bash
# หลังจากได้รับ Approval
# บน GitHub Web:
1. คลิก "Merge pull request"
2. เลือก "Squash and merge" (optional)
3. คลิก "Confirm merge"
4. ลบ branch หลัง merge (optional)
```

**4. Update Local Repository:**
```bash
git checkout main
git pull origin main
```

**✅ การ Merge ทั้งหมด:**
| Branch | Status | Merged Date | Reviewer |
|--------|--------|-------------|----------|
| `feature/html-structure` | ✅ Merged | Day 1 | Team Member A |
| `feature/css-styling` | ✅ Merged | Day 1 | Team Member B |
| `feature/product-listing` | ✅ Merged | Day 2 | Team Member C |
| `feature/search-functionality` | ✅ Merged | Day 2 | Team Member D |

---

### 5. Conflict Resolution (การแก้ไข Conflicts)

**สถานการณ์ที่เกิด Conflict:**
```
Scenario: สองคนแก้ไขไฟล์ css/style.css พร้อมกัน
```

**ขั้นตอนการแก้ไข:**

**1. ตรวจสอบ Conflict:**
```bash
git pull origin main
# ⚠️ CONFLICT (content): Merge conflict in css/style.css
```

**2. เปิดไฟล์ที่ Conflict:**
```css
<<<<<<< HEAD
.product-card {
    width: 300px;
    margin: 10px;
=======
.product-card {
    width: 250px;
    margin: 15px;
>>>>>>> feature/css-updates
}
```

**3. แก้ไข Conflict:**
```css
/* เลือกเวอร์ชันที่ดีกว่า หรือรวมทั้งสอง */
.product-card {
    width: calc(100% - 40px);
    max-width: 250px;
    margin: 15px;
}
```

**4. Mark เป็น Resolved:**
```bash
git add css/style.css
git commit -m "Resolve merge conflict in style.css"
git push origin feature/css-updates
```

**✅ สิ่งที่ได้เรียนรู้:**
- ตรวจสอบ conflicts ก่อน merge เสมอ
- สื่อสารกับทีมเมื่อแก้ไขไฟล์เดียวกัน
- ใช้ tools เช่น VS Code Merge Editor
- Pull frequently เพื่อลด conflicts

---

## โครงสร้างโปรเจค (Project Structure)

```
mini-ecommerce-collaboration/
│
├── index.html              # หน้าเว็บหลัก
│
├── css/
│   └── style.css          # Stylesheet ทั้งหมด
│
├── js/
│   ├── main.js            # JavaScript หลัก
│   └── products.json      # ข้อมูลสินค้า
│
└── README.md              # เอกสารโปรเจค
```

**📁 รายละเอียดไฟล์:**

| ไฟล์ | หน้าที่ | บรรทัด |
|------|---------|--------|
| `index.html` | โครงสร้างหน้าเว็บ | ~30 |
| `css/style.css` | Styling และ Layout | ~50 |
| `js/main.js` | Logic และ Event Handling | ~90 |
| `js/products.json` | ข้อมูลสินค้า 6 รายการ | ~20 |

---

## ฟีเจอร์ของเว็บไซต์ (Features)

### 1. Product Display (แสดงรายการสินค้า)

**การทำงาน:**
- ดึงข้อมูลจาก `products.json`
- แสดงเป็น Grid Layout
- แสดงรูปภาพ, ชื่อ, ราคา
- Loading indicator ขณะโหลดข้อมูล

**เทคนิค:**
```javascript
fetch('js/products.json')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => handleError(error))
    .finally(() => hideLoader());
```

**✅ ผลลัพธ์:**
- โหลดข้อมูล 6 สินค้าสำเร็จ
- แสดงผลเรียบร้อย
- Error handling ทำงานถูกต้อง

---

### 2. Real-time Search (ค้นหาแบบ Real-time)

**การทำงาน:**
- ฟังการพิมพ์ในช่องค้นหา (keyup event)
- กรองสินค้าตามชื่อ
- อัพเดทผลลัพธ์ทันที
- case-insensitive search

**เทคนิค:**
```javascript
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});
```

**✅ ผลลัพธ์:**
- ค้นหาได้แม่นยำ
- ไม่ case-sensitive
- แสดงข้อความเมื่อไม่พบสินค้า

---

### 3. Responsive Design

**Breakpoints:**
- **Mobile:** < 768px (1 column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3-4 columns)

**เทคนิค:**
```css
/* Flexbox Auto-sizing */
.product-card {
    width: calc(100% - 40px);
    max-width: 250px;
    flex: 1 1 250px;
}

#product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
```

**✅ ผลลัพธ์:**
- ปรับขนาดอัตโนมัติ
- รองรับทุกขนาดหน้าจอ
- Layout สวยงามทุก breakpoint

---

### 4. Hover Effects (เอฟเฟกต์เมื่อเลื่อนเมาส์)

**เทคนิค:**
```css
.product-card {
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}
```

**✅ ผลลัพธ์:**
- Smooth animation (0.5s)
- ขยายการ์ด 5%
- เพิ่ม shadow เมื่อ hover

---

### 5. Loading Indicator

**การทำงาน:**
- แสดงทันทีเมื่อเริ่มโหลดข้อมูล
- ซ่อนเมื่อโหลดเสร็จ (success หรือ error)

**เทคนิค:**
```javascript
loader.style.display = 'block';

fetch('js/products.json')
    .finally(() => {
        loader.style.display = 'none';
    });
```

**✅ ผลลัพธ์:**
- User Experience ดีขึ้น
- แจ้งสถานะการโหลดชัดเจน

---

## การทำงานร่วมกันเป็นทีม (Team Collaboration)

### 🤝 Team Structure

**บทบาทในทีม:**
1. **Developer A** - HTML Structure & Setup
2. **Developer B** - CSS Styling & Responsive Design
3. **Developer C** - Product Listing & Fetch Logic
4. **Developer D** - Search Functionality & Testing

### 📋 Workflow Process

**1. Planning Phase (วางแผน):**
- ✅ กำหนด Features ที่ต้องการ
- ✅ แบ่งงานตามความถนัด
- ✅ ตกลง Coding Standards
- ✅ กำหนด Timeline

**2. Development Phase (พัฒนา):**
- ✅ แต่ละคนทำงานใน branch ของตัวเอง
- ✅ Commit บ่อยๆ พร้อม message ที่ชัดเจน
- ✅ Push code ไปยัง remote repository
- ✅ สื่อสารผ่าน GitHub Issues/Comments

**3. Review Phase (ตรวจสอบ):**
- ✅ สร้าง Pull Request
- ✅ ทีมอื่นทำ Code Review
- ✅ แก้ไขตาม Feedback
- ✅ Approve และ Merge

**4. Integration Phase (รวม):**
- ✅ Merge branches เข้า main
- ✅ แก้ไข conflicts (ถ้ามี)
- ✅ ทดสอบความสมบูรณ์
- ✅ Deploy (ถ้าพร้อม)

---

### 💬 Communication Best Practices

**1. Commit Messages:**
```bash
# ✅ Good
git commit -m "Add responsive grid layout with Flexbox"
git commit -m "Fix: Search not working on Thai characters"
git commit -m "Refactor: Extract displayProducts into separate function"

# ❌ Bad
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

**2. Pull Request Descriptions:**
```markdown
## Summary
Added real-time search functionality for product listing

## Changes
- Implemented keyup event listener on search input
- Added filter logic using Array.filter()
- Display "no results" message when no products match

## Testing
- Tested with various search terms
- Verified case-insensitive search
- Checked edge cases (empty search, special characters)
```

**3. Code Comments:**
```javascript
// ✅ Good: อธิบายเพราะอะไร
// ใช้ trim() และ toLowerCase() เพื่อให้การค้นหาไม่ case-sensitive
// และตัดช่องว่างหน้าหลังออก
const searchTerm = searchInput.value.trim().toLowerCase();

// ❌ Bad: อธิบายแค่ว่าทำอะไร
// เอาค่าจาก input
const searchTerm = searchInput.value.trim().toLowerCase();
```

---

## Git Commands ที่ใช้

### Basic Commands (คำสั่งพื้นฐาน)

```bash
# ตรวจสอบสถานะ
git status

# เพิ่มไฟล์เข้า staging
git add <file>
git add .                    # เพิ่มทุกไฟล์

# Commit การเปลี่ยนแปลง
git commit -m "message"

# Push ไปยัง remote
git push origin <branch-name>

# Pull อัพเดทล่าสุด
git pull origin <branch-name>
```

### Branching (การจัดการ Branch)

```bash
# สร้าง branch ใหม่
git branch <branch-name>

# สร้างและเปลี่ยนไปใช้ทันที
git checkout -b <branch-name>

# เปลี่ยน branch
git checkout <branch-name>

# ดูรายการ branches
git branch
git branch -a                # รวม remote branches

# ลบ branch
git branch -d <branch-name>
```

### Merging (การรวม Branch)

```bash
# Merge branch อื่นเข้ามาใน branch ปัจจุบัน
git merge <branch-name>

# Rebase (alternative to merge)
git rebase <branch-name>
```

### Remote Repository

```bash
# ดูรายการ remotes
git remote -v

# เพิ่ม remote repository
git remote add origin <url>

# Update remote references
git fetch origin

# Pull + Merge
git pull origin main
```

### History & Logs

```bash
# ดู commit history
git log
git log --oneline            # แบบย่อ
git log --graph              # แสดง branches

# ดูการเปลี่ยนแปลง
git diff
git diff <file>
git diff <branch1>..<branch2>
```

### Undoing Changes

```bash
# ยกเลิกการเปลี่ยนแปลงในไฟล์
git checkout -- <file>

# ยกเลิก staging
git reset HEAD <file>

# ยกเลิก commit ล่าสุด (แต่เก็บการเปลี่ยนแปลง)
git reset --soft HEAD~1

# ยกเลิก commit และยกเลิกการเปลี่ยนแปลง
git reset --hard HEAD~1
```

---

## สิ่งที่ได้เรียนรู้ (Key Learnings)

### ✅ Git & GitHub Concepts

#### 1. **Version Control ด้วย Git**
- ✅ ติดตามการเปลี่ยนแปลงของโค้ด
- ✅ สามารถย้อนกลับไปเวอร์ชันเก่าได้
- ✅ ทำงานแบบ offline ได้
- ✅ Distributed Version Control System

#### 2. **Branching Strategy**
```
main (stable, production-ready)
  ↓
develop (integration branch)
  ↓
feature branches (isolated development)
```

**ประโยชน์:**
- ✅ แยกงานออกจากกันได้ชัดเจน
- ✅ ไม่กระทบกับโค้ดหลัก
- ✅ Testing แบบ isolated
- ✅ Parallel development

#### 3. **Commit Best Practices**
```bash
# Atomic Commits: แต่ละ commit ทำสิ่งเดียว
git commit -m "Add search input field"
git commit -m "Implement search filter logic"
git commit -m "Add error handling for empty search"

# Meaningful Messages: ข้อความสื่อความหมาย
# Format: <type>: <subject>
# Types: feat, fix, docs, style, refactor, test, chore

git commit -m "feat: Add real-time search functionality"
git commit -m "fix: Correct typo in product name"
git commit -m "docs: Update README with setup instructions"
git commit -m "style: Format CSS with consistent indentation"
git commit -m "refactor: Extract displayProducts function"
```

#### 4. **Pull Request Workflow**
```
1. Create Feature Branch
   ↓
2. Develop & Commit Changes
   ↓
3. Push to Remote
   ↓
4. Create Pull Request
   ↓
5. Code Review & Discussion
   ↓
6. Address Feedback
   ↓
7. Approve & Merge
   ↓
8. Delete Feature Branch
```

**ประโยชน์ของ PR:**
- ✅ Code Review ก่อน merge
- ✅ Discussion และ Feedback
- ✅ Automated Testing (CI/CD)
- ✅ Documentation ของการเปลี่ยนแปลง

#### 5. **Conflict Resolution**

**สาเหตุของ Conflict:**
- หลายคนแก้ไขบรรทัดเดียวกัน
- ลบไฟล์ที่คนอื่นกำลังแก้
- Rename ไฟล์ที่มีการเปลี่ยนแปลง

**วิธีป้องกัน:**
- ✅ Pull frequently
- ✅ สื่อสารกับทีม
- ✅ แบ่งไฟล์ให้ชัดเจน
- ✅ ใช้ Feature branches

**วิธีแก้ไข:**
```bash
# 1. ดึง changes ล่าสุด
git pull origin main

# 2. Git จะบอกว่าไฟล์ไหน conflict
# CONFLICT (content): Merge conflict in style.css

# 3. เปิดไฟล์และแก้ conflict markers
<<<<<<< HEAD
/* Your changes */
=======
/* Their changes */
>>>>>>> branch-name

# 4. เลือกเวอร์ชันที่ต้องการหรือรวมทั้งสอง
# 5. ลบ conflict markers ออก

# 6. Mark เป็น resolved
git add style.css
git commit -m "Resolve merge conflict in style.css"
```

---

### ✅ Web Development Skills

#### 1. **HTML5 Semantic Elements**
```html
<header>  <!-- ส่วนหัวของหน้า -->
<main>    <!-- เนื้อหาหลัก -->
<section> <!-- แบ่งส่วนเนื้อหา -->
<article> <!-- เนื้อหาที่เป็นอิสระ -->
<nav>     <!-- เมนูนำทาง -->
<footer>  <!-- ส่วนท้าย -->
```

**ประโยชน์:**
- ✅ SEO ดีขึ้น
- ✅ Accessibility ดีขึ้น
- ✅ Code อ่านง่าย
- ✅ Semantic meaning

#### 2. **CSS Flexbox Layout**
```css
/* Container */
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;  /* แนวนอน */
    align-items: center;      /* แนวตั้ง */
    gap: 20px;               /* ระยะห่าง */
}

/* Items */
.item {
    flex: 1 1 250px;  /* grow shrink basis */
    max-width: 300px;
}
```

**Flexbox Properties:**
- `justify-content`: จัดแนวนอน (flex-start, center, flex-end, space-between, space-around)
- `align-items`: จัดแนวตั้ง (flex-start, center, flex-end, stretch)
- `flex-direction`: ทิศทางการเรียง (row, column)
- `flex-wrap`: ขึ้นบรรทัดใหม่ (nowrap, wrap)

#### 3. **JavaScript ES6+ Features**

**Arrow Functions:**
```javascript
// Traditional
function add(a, b) {
    return a + b;
}

// Arrow Function
const add = (a, b) => a + b;
```

**Template Literals:**
```javascript
// Old way
const html = '<div class="card">' +
             '<h3>' + product.name + '</h3>' +
             '<p>' + product.price + '</p>' +
             '</div>';

// Template Literal
const html = `
    <div class="card">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
    </div>
`;
```

**Array Methods:**
```javascript
// filter: กรองข้อมูล
const expensive = products.filter(p => p.price > 1000);

// map: แปลงข้อมูล
const names = products.map(p => p.name);

// forEach: วนลูป
products.forEach(p => console.log(p.name));

// find: หาตัวแรกที่ตรงเงื่อนไข
const product = products.find(p => p.id === 1);
```

**Destructuring:**
```javascript
// Object Destructuring
const { name, price } = product;

// Array Destructuring
const [first, second] = products;
```

#### 4. **Fetch API & Promises**

**Basic Fetch:**
```javascript
fetch('api/products')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

**Async/Await (Modern):**
```javascript
async function getProducts() {
    try {
        const response = await fetch('api/products');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

**Error Handling:**
```javascript
fetch('api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => displayProducts(data))
    .catch(error => displayError(error))
    .finally(() => hideLoader());
```

#### 5. **Responsive Design Principles**

**Mobile-First Approach:**
```css
/* Base styles for mobile */
.card {
    width: 100%;
    padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .card {
        width: 48%;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .card {
        width: 30%;
    }
}
```

**Flexible Units:**
- `%` - เปอร์เซ็นต์ของ parent
- `em` - สัมพันธ์กับ font-size ของตัวเอง
- `rem` - สัมพันธ์กับ font-size ของ root
- `vw/vh` - viewport width/height
- `calc()` - คำนวณ

**Example:**
```css
width: calc(100% - 40px);
font-size: clamp(14px, 2vw, 20px);
padding: 1rem 2rem;
```

---

### 🎯 Team Collaboration Skills

#### 1. **Communication**
- ✅ เขียน commit messages ที่ชัดเจน
- ✅ Comment โค้ดอธิบายส่วนที่ซับซ้อน
- ✅ ใช้ GitHub Issues สำหรับ tracking
- ✅ ขอความช่วยเหลือเมื่อติดปัญหา

#### 2. **Code Review**
```
Checklist สำหรับ Reviewer:
✓ โค้ดอ่านง่าย เข้าใจได้
✓ ปฏิบัติตาม Coding Standards
✓ ไม่มี bugs ที่เห็นได้ชัด
✓ มี comments ตรงที่จำเป็น
✓ ทดสอบแล้วทำงานถูกต้อง
✓ ไม่กระทบกับโค้ดส่วนอื่น
```

**ให้ Feedback แบบสร้างสรรค์:**
```
❌ "This code is bad"
✅ "Consider using Array.filter() here for better readability"

❌ "Wrong approach"
✅ "Have you considered using Flexbox instead of float? It handles responsive layouts better"
```

#### 3. **Time Management**
- ✅ แบ่งงานเป็น tasks เล็กๆ
- ✅ Commit บ่อยๆ (small commits)
- ✅ ไม่ต้องรอให้ perfect
- ✅ ใช้ Git branch สำหรับ experiments

#### 4. **Problem Solving**
```
เมื่อเจอปัญหา:
1. ✅ อ่าน error message ให้ละเอียด
2. ✅ Console.log เพื่อ debug
3. ✅ Google/Stack Overflow
4. ✅ ถาม ChatGPT/GitHub Copilot
5. ✅ ขอความช่วยเหลือจากทีม
```

---

## 📊 สรุปผลการทดลอง

### ความสำเร็จของโปรเจค
- ✅ สร้างเว็บไซต์ E-Commerce ครบถ้วน
- ✅ ใช้ Git & GitHub ได้อย่างถูกต้อง
- ✅ ทำงานร่วมกันเป็นทีมได้ดี
- ✅ Code Quality ดี มี Comments ชัดเจน
- ✅ Responsive Design ทำงานบนทุก device

### ฟีเจอร์ที่สำเร็จ (Features Completed)
- ✅ Product Listing (แสดงสินค้า 6 รายการ)
- ✅ Real-time Search (ค้นหาแบบ real-time)
- ✅ Responsive Layout (รองรับทุกหน้าจอ)
- ✅ Loading Indicator (แสดงสถานะการโหลด)
- ✅ Hover Effects (เอฟเฟกต์เมื่อ hover)
- ✅ Error Handling (จัดการ error อย่างเหมาะสม)

### Git Workflow ที่ใช้
- ✅ Feature Branching (4 branches)
- ✅ Pull Requests (4 PRs merged)
- ✅ Code Review (peer review ทุก PR)
- ✅ Conflict Resolution (แก้ไข 1 conflict)
- ✅ Clean Commit History

### สถิติ
- **Total Commits:** ~15-20 commits
- **Branches Created:** 4 feature branches
- **Pull Requests:** 4 PRs (all merged)
- **Conflicts Resolved:** 1
- **Files Changed:** 4 files
- **Lines of Code:** ~200 lines

---

**สถานะโปรเจค:** ✅ **เสร็จสมบูรณ์**  
**Git Branches:** ✅ **4/4 Merged**  
**Features:** ✅ **6/6 ทำงานได้**  
