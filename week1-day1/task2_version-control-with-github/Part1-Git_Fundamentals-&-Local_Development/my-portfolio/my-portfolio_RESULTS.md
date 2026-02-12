# My Portfolio - ผลการทดลอง (Git Fundamentals & Local Development)

## ผู้ทดลอง
- ชื่อ: นาย ณัฐดนัย แปงจิตต์
- รหัสนักศึกษา: 68543210082-2
- วันที่: February 24, 2026

---

## 📋 สารบัญ
1. [ภาพรวมโปรเจค (Project Overview)](#ภาพรวมโปรเจค-project-overview)
2. [Git Fundamentals (พื้นฐาน Git)](#git-fundamentals-พื้นฐาน-git)
3. [Local Development Workflow](#local-development-workflow)
4. [Git Commands ที่ฝึกใช้](#git-commands-ที่ฝึกใช้)
5. [Branching & Merging](#branching--merging)
6. [การจัดการ History](#การจัดการ-history)
7. [สิ่งที่ได้เรียนรู้ (Key Learnings)](#สิ่งที่ได้เรียนรู้-key-learnings)

---

## ภาพรวมโปรเจค (Project Overview)

### 🎯 วัตถุประสงค์
สร้างเว็บไซต์ Portfolio ส่วนตัวเพื่อฝึกการใช้ Git ในการจัดการ Version Control แบบ Local

### 🛠️ เทคโนโลยีที่ใช้
- **HTML5** - โครงสร้างหน้าเว็บ
- **CSS3** - จัดรูปแบบและออกแบบ
- **Git** - Version Control System

### 📦 เนื้อหาในเว็บไซต์
- ✅ Header พร้อมชื่อและตำแหน่ง
- ✅ ส่วน About (เกี่ยวกับฉัน)
- ✅ ส่วน Skills (ทักษะ)
- ✅ ส่วน Projects (โปรเจกต์)
- ✅ Footer พร้อมข้อมูลติดต่อ

### 📂 โครงสร้างโปรเจค
```
my-portfolio/
├── index.html          # หน้าเว็บหลัก
├── style.css           # Stylesheet
└── .git/               # Git repository (hidden)
```

---

## Git Fundamentals (พื้นฐาน Git)

### 1. การติดตั้งและตั้งค่า Git

**ตรวจสอบเวอร์ชัน Git:**
```bash
git --version
# Output: git version 2.40.0 (or similar)
```

**ตั้งค่า User Configuration:**
```bash
# ตั้งค่าชื่อผู้ใช้
git config --global user.name "Nutdanai Pangjit"

# ตั้งค่า Email
git config --global user.email "68543210082-2@example.com"

# ตรวจสอบการตั้งค่า
git config --list
```

**✅ ผลลัพธ์:**
```
user.name=Nutdanai Pangjit
user.email=68543210082-2@example.com
core.editor=code --wait
core.autocrlf=input (Linux/Mac) or true (Windows)
```

**Config Levels:**
- `--system` - ทุก users ในเครื่อง
- `--global` - user ปัจจุบัน (ใช้บ่อยสุด)
- `--local` - เฉพาะ repository นั้นๆ

---

### 2. การสร้าง Git Repository

**สร้างโฟลเดอร์โปรเจค:**
```bash
mkdir my-portfolio
cd my-portfolio
```

**เริ่มต้น Git Repository:**
```bash
git init
```

**Output:**
```
Initialized empty Git repository in /path/to/my-portfolio/.git/
```

**✅ สิ่งที่เกิดขึ้น:**
- สร้างโฟลเดอร์ `.git` (hidden folder)
- `.git` เก็บประวัติการเปลี่ยนแปลงทั้งหมด
- โปรเจคพร้อมสำหรับ Version Control

**ตรวจสอบโฟลเดอร์ .git:**
```bash
ls -la
# จะเห็นโฟลเดอร์ .git

ls -la .git/
# เห็นโครงสร้างภายใน:
# - HEAD (ชี้ไปที่ branch ปัจจุบัน)
# - config (การตั้งค่า repo)
# - objects/ (เก็บข้อมูลทั้งหมด)
# - refs/ (เก็บ branches และ tags)
```

---

### 3. Git Working Areas

Git มี 3 พื้นที่สำคัญ:

```
Working Directory  →  Staging Area  →  Repository
    (ไฟล์งาน)         (เตรียมส่ง)        (บันทึกแล้ว)
        ↓                  ↓                 ↓
    git add           git commit        History
```

**1. Working Directory:**
- พื้นที่ที่เราทำงานและแก้ไขไฟล์
- ไฟล์ที่ยังไม่ได้ track หรือแก้ไขแล้วยังไม่ stage

**2. Staging Area (Index):**
- พื้นที่เตรียมไฟล์ก่อน commit
- เลือกได้ว่าจะ commit ไฟล์ไหนบ้าง
- ใช้ `git add` เพื่อย้ายไฟล์เข้า staging

**3. Repository (Local):**
- ข้อมูลที่ commit แล้ว
- เก็บใน `.git/objects`
- สามารถย้อนกลับได้

---

### 4. สร้างไฟล์และ First Commit

**สร้างไฟล์ index.html:**
```bash
# สร้างไฟล์ด้วย text editor หรือ command
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
</head>
<body>
    <header>
        <h1>สวัสดี! ฉันคือ [ชื่อของคุณ]</h1>
        <p>นักพัฒนาเว็บไซต์มือใหม่</p>
    </header>
</body>
</html>
EOF
```

**ตรวจสอบสถานะ:**
```bash
git status
```

**Output:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)
```

**เพิ่มไฟล์เข้า Staging Area:**
```bash
git add index.html
```

**ตรวจสอบสถานะอีกครั้ง:**
```bash
git status
```

**Output:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html
```

**Commit ครั้งแรก:**
```bash
git commit -m "Initial commit: Add basic HTML structure"
```

**Output:**
```
[main (root-commit) a1b2c3d] Initial commit: Add basic HTML structure
 1 file changed, 15 insertions(+)
 create mode 100644 index.html
```

**✅ ผลลัพธ์:**
- สร้าง commit แรก (root-commit)
- ได้ commit hash: `a1b2c3d`
- บันทึกการเปลี่ยนแปลง 15 บรรทัด
- branch default: `main`

---

### 5. เพิ่มและ Commit ไฟล์ CSS

**สร้างไฟล์ style.css:**
```bash
cat > style.css << 'EOF'
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem;
}
EOF
```

**เชื่อมโยง CSS กับ HTML:**
```bash
# แก้ไข index.html เพิ่ม link ใน <head>
<link rel="stylesheet" href="style.css">
```

**ตรวจสอบสถานะ:**
```bash
git status
```

**Output:**
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        style.css

no changes added to commit (use "git add" and/or "git commit -a")
```

**เพิ่มทั้งสองไฟล์:**
```bash
# เพิ่มทีละไฟล์
git add index.html
git add style.css

# หรือเพิ่มทั้งหมด
git add .
```

**Commit:**
```bash
git commit -m "Add CSS styling and link stylesheet"
```

**Output:**
```
[main b2c3d4e] Add CSS styling and link stylesheet
 2 files changed, 25 insertions(+), 1 deletion(-)
 create mode 100644 style.css
```

---

## Local Development Workflow

### ขั้นตอนการพัฒนาแบบ Iterative

**Workflow ที่ใช้:**
```
1. แก้ไขไฟล์ → 2. ตรวจสอบสถานะ → 3. Stage Changes → 4. Commit
         ↑                                                      ↓
         └──────────────────────────────────────────────────────┘
```

### การพัฒนาในแต่ละขั้นตอน

#### Iteration 1: เพิ่มส่วน About

**แก้ไข index.html:**
```html
<main>
    <section id="about">
        <h2>เกี่ยวกับฉัน</h2>
        <p>ฉันกำลังเรียนรู้การพัฒนาเว็บไซต์และตื่นเต้นมากกับเทคโนโลยีใหม่ๆ</p>
    </section>
</main>
```

**แก้ไข style.css:**
```css
main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

section {
    background-color: white;
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
```

**Git Commands:**
```bash
git status
git diff                    # ดูการเปลี่ยนแปลง
git add .
git commit -m "Add About section with styling"
```

---

#### Iteration 2: เพิ่มส่วน Skills

**แก้ไข index.html:**
```html
<section id="skills">
    <h2>ทักษะ</h2>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript (เรียนรู้อยู่)</li>
    </ul>
</section>
```

**แก้ไข style.css:**
```css
ul {
    list-style-type: none;
    padding-left: 0;
}

ul li {
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
}
```

**Git Commands:**
```bash
git add .
git commit -m "Add Skills section with styled list"
```

---

#### Iteration 3: เพิ่มส่วน Projects

**แก้ไข index.html:**
```html
<section id="projects">
    <h2>โปรเจกต์ของฉัน</h2>
    <div class="project">
        <h3>เว็บไซต์ Portfolio</h3>
        <p>เว็บไซต์แสดงผลงานส่วนตัวที่สร้างด้วย HTML, CSS</p>
        <a href="#" class="project-link">ดูโปรเจกต์</a>
    </div>
</section>
```

**แก้ไข style.css:**
```css
.project {
    border: 1px solid #ddd;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.project-link {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
}

.project-link:hover {
    background-color: #2980b9;
}
```

**Git Commands:**
```bash
git add .
git commit -m "Add Projects section with project cards"
```

---

#### Iteration 4: เพิ่ม Footer

**แก้ไข index.html:**
```html
<footer>
    <p>&copy; 2025 My Portfolio | Version 1.0 | Contact: myemail@example.com</p>
</footer>
```

**แก้ไข style.css:**
```css
footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: 2rem;
}
```

**Git Commands:**
```bash
git add .
git commit -m "Add footer with copyright and contact info"
```

---

## Git Commands ที่ฝึกใช้

### 1. Status & Information (ตรวจสอบสถานะ)

**git status:**
```bash
git status
# แสดงสถานะไฟล์ปัจจุบัน

git status -s
# แสดงแบบย่อ
# M  index.html     (Modified, staged)
# ?? newfile.txt    (Untracked)
#  M style.css      (Modified, not staged)
```

**git log:**
```bash
# ดู commit history
git log

# แสดงแบบย่อ (1 บรรทัดต่อ commit)
git log --oneline

# แสดงพร้อม graph
git log --oneline --graph --all

# แสดงแค่ 5 commits ล่าสุด
git log -5

# แสดงพร้อมรายละเอียดการเปลี่ยนแปลง
git log -p

# แสดงสถิติ
git log --stat
```

**Output ตัวอย่าง:**
```
commit b2c3d4e (HEAD -> main)
Author: Nutdanai Pangjit <68543210082-2@example.com>
Date:   Wed Feb 12 10:30:00 2026 +0700

    Add footer with copyright and contact info

commit a1b2c3d
Author: Nutdanai Pangjit <68543210082-2@example.com>
Date:   Wed Feb 12 10:15:00 2026 +0700

    Add Projects section with project cards
```

**git show:**
```bash
# แสดงรายละเอียด commit ล่าสุด
git show

# แสดงรายละเอียด commit เฉพาะ
git show a1b2c3d

# แสดงไฟล์ในเวอร์ชันที่ commit แล้ว
git show HEAD:index.html
```

---

### 2. Staging (เตรียมไฟล์)

**git add:**
```bash
# เพิ่มไฟล์เดียว
git add index.html

# เพิ่มหลายไฟล์
git add index.html style.css

# เพิ่มทุกไฟล์ในโฟลเดอร์ปัจจุบัน
git add .

# เพิ่มทุกไฟล์ (รวมที่ลบด้วย)
git add -A

# เพิ่มเฉพาะไฟล์ที่แก้ไข (ไม่รวม untracked)
git add -u

# Interactive staging
git add -p
```

**git reset (unstage):**
```bash
# ยกเลิก staging ไฟล์เดียว
git reset HEAD index.html

# ยกเลิก staging ทั้งหมด
git reset HEAD

# ยกเลิก staging (Git 2.23+)
git restore --staged index.html
```

---

### 3. Committing (บันทึก)

**git commit:**
```bash
# Commit พร้อม message
git commit -m "Add footer section"

# Commit พร้อม description ยาว
git commit -m "Add footer section" -m "Added copyright, version, and contact info"

# Commit และ stage modified files ทันที (ไม่รวม untracked)
git commit -am "Update styling for footer"

# เปิด editor เพื่อเขียน commit message
git commit

# แก้ไข commit ล่าสุด (message)
git commit --amend -m "New message"

# แก้ไข commit ล่าสุด (เพิ่มไฟล์)
git add forgotten-file.txt
git commit --amend --no-edit
```

**Commit Message Best Practices:**
```bash
# ✅ Good Commit Messages
git commit -m "Add contact form to footer"
git commit -m "Fix: Correct spelling in about section"
git commit -m "Refactor: Improve CSS organization"
git commit -m "feat: Add responsive navigation menu"

# ❌ Bad Commit Messages
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
git commit -m "asdfasdf"
```

**Commit Message Format (Conventional Commits):**
```
<type>: <subject>

<body> (optional)

<footer> (optional)
```

**Types:**
- `feat` - ฟีเจอร์ใหม่
- `fix` - แก้ไข bug
- `docs` - เอกสาร
- `style` - จัดรูปแบบ (ไม่กระทบโค้ด)
- `refactor` - ปรับโครงสร้างโค้ด
- `test` - เพิ่ม/แก้ไข tests
- `chore` - งานบำรุงรักษา

---

### 4. Comparing Changes (เปรียบเทียบ)

**git diff:**
```bash
# ดูการเปลี่ยนแปลงที่ยังไม่ stage
git diff

# ดูการเปลี่ยนแปลงที่ stage แล้ว
git diff --staged
# หรือ
git diff --cached

# ดูการเปลี่ยนแปลงไฟล์เฉพาะ
git diff index.html

# เปรียบเทียบระหว่าง 2 commits
git diff a1b2c3d b2c3d4e

# เปรียบเทียบกับ commit ก่อนหน้า
git diff HEAD~1 HEAD

# แสดงแค่ชื่อไฟล์ที่เปลี่ยน
git diff --name-only

# แสดงสถิติ
git diff --stat
```

**Output ตัวอย่าง:**
```diff
diff --git a/style.css b/style.css
index abc1234..def5678 100644
--- a/style.css
+++ b/style.css
@@ -10,6 +10,12 @@ body {
     background-color: #f4f4f4;
 }
 
+header h1 {
+    margin-bottom: 0.5rem;
+    font-size: 2.5rem;
+}
+
 main {
     max-width: 800px;
```

**สัญลักษณ์:**
- `---` = ไฟล์เก่า
- `+++` = ไฟล์ใหม่
- `-` = บรรทัดที่ลบ (สีแดง)
- `+` = บรรทัดที่เพิ่ม (สีเขียว)

---

### 5. Undoing Changes (ยกเลิกการเปลี่ยนแปลง)

**ยกเลิกการแก้ไขในไฟล์:**
```bash
# ยกเลิกการเปลี่ยนแปลงที่ยังไม่ stage
git checkout -- index.html

# Git 2.23+
git restore index.html

# ยกเลิกทุกไฟล์
git restore .
```

**ยกเลิก Staging:**
```bash
# ยกเลิก staging ไฟล์
git reset HEAD index.html

# Git 2.23+
git restore --staged index.html
```

**ยกเลิก Commit:**
```bash
# ยกเลิก commit ล่าสุด แต่เก็บการเปลี่ยนแปลงไว้
git reset --soft HEAD~1

# ยกเลิก commit และ staging แต่เก็บไฟล์
git reset --mixed HEAD~1
# หรือ
git reset HEAD~1

# ยกเลิก commit และการเปลี่ยนแปลงทั้งหมด (อันตราย!)
git reset --hard HEAD~1
```

**Revert Commit (สร้าง commit ใหม่เพื่อยกเลิก):**
```bash
# สร้าง commit ใหม่ที่ยกเลิกการเปลี่ยนแปลงของ commit นั้น
git revert a1b2c3d

# ยกเลิก commit ล่าสุด
git revert HEAD
```

---

## Branching & Merging

### 1. การทำงานกับ Branches

**ทำไมต้องใช้ Branches:**
- ✅ แยกงานออกจากกัน (isolation)
- ✅ ทดลองฟีเจอร์ใหม่โดยไม่กระทบ main
- ✅ แก้ไข bugs แยกจากการพัฒนาหลัก
- ✅ ทำงานพร้อมกันหลายคน

**Branch Visualization:**
```
main:     o---o---o---o
               \       \
feature:        o---o---o
```

---

### 2. Branch Commands

**ดูรายการ branches:**
```bash
# ดู branches ทั้งหมด
git branch

# ดูพร้อม commit ล่าสุด
git branch -v

# ดู branches ที่ merge แล้ว
git branch --merged

# ดู branches ที่ยังไม่ merge
git branch --no-merged
```

**สร้าง branch:**
```bash
# สร้าง branch ใหม่
git branch feature-contact

# สร้างและเปลี่ยนไปใช้ทันที
git checkout -b feature-contact

# Git 2.23+
git switch -c feature-contact
```

**เปลี่ยน branch:**
```bash
# เปลี่ยนไปใช้ branch อื่น
git checkout feature-contact

# Git 2.23+
git switch feature-contact

# กลับไป main
git switch main
```

**ลบ branch:**
```bash
# ลบ branch (ต้อง merge แล้ว)
git branch -d feature-contact

# บังคับลบ (ยังไม่ merge)
git branch -D feature-contact
```

---

### 3. ตัวอย่างการใช้ Feature Branch

**Scenario: เพิ่มฟอร์มติดต่อ**

**1. สร้าง branch สำหรับฟีเจอร์:**
```bash
git checkout -b feature-contact-form
```

**2. พัฒนาฟีเจอร์:**
```html
<!-- เพิ่มใน index.html -->
<section id="contact">
    <h2>ติดต่อฉัน</h2>
    <form>
        <input type="text" placeholder="ชื่อ" required>
        <input type="email" placeholder="อีเมล" required>
        <textarea placeholder="ข้อความ" required></textarea>
        <button type="submit">ส่งข้อความ</button>
    </form>
</section>
```

```css
/* เพิ่มใน style.css */
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

form input,
form textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

form button {
    background-color: #3498db;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
```

**3. Commit การเปลี่ยนแปลง:**
```bash
git add .
git commit -m "Add contact form with styling"
```

**4. กลับไป main branch:**
```bash
git checkout main
```

**5. Merge feature branch เข้า main:**
```bash
git merge feature-contact-form
```

**Output (Fast-forward merge):**
```
Updating a1b2c3d..c3d4e5f
Fast-forward
 index.html | 8 ++++++++
 style.css  | 15 +++++++++++++++
 2 files changed, 23 insertions(+)
```

**6. ลบ feature branch:**
```bash
git branch -d feature-contact-form
```

---

### 4. Types of Merges

**Fast-Forward Merge:**
```
Before:
main:     o---o
               \
feature:        o---o

After:
main:     o---o---o---o
```
- ใช้เมื่อ main ไม่มีการเปลี่ยนแปลงหลัง branch ออกมา
- แค่เลื่อน pointer ของ main ไปข้างหน้า

**Three-Way Merge:**
```
Before:
main:     o---o---o
               \
feature:        o---o

After:
main:     o---o---o---M
               \     /
feature:        o---o
```
- ใช้เมื่อทั้ง main และ feature มีการเปลี่ยนแปลง
- สร้าง merge commit ใหม่

**Merge Commands:**
```bash
# Fast-forward merge (default ถ้าทำได้)
git merge feature-branch

# บังคับ Fast-forward หรือ error
git merge --ff-only feature-branch

# บังคับสร้าง merge commit เสมอ
git merge --no-ff feature-branch

# Merge แต่ไม่ commit ทันที
git merge --no-commit feature-branch
```

---

### 5. การจัดการ Merge Conflicts

**เมื่อเกิด Conflict:**
```bash
git merge feature-styling
# Auto-merging style.css
# CONFLICT (content): Merge conflict in style.css
# Automatic merge failed; fix conflicts and then commit the result.
```

**ตรวจสอบสถานะ:**
```bash
git status
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   style.css
```

**เปิดไฟล์ที่ conflict:**
```css
header {
<<<<<<< HEAD
    background-color: #2c3e50;
    padding: 2rem;
=======
    background-color: #34495e;
    padding: 3rem;
>>>>>>> feature-styling
}
```

**แก้ไข conflict:**
```css
/* เลือกเวอร์ชันที่ต้องการ หรือรวมทั้งสอง */
header {
    background-color: #2c3e50;
    padding: 2.5rem;
}
```

**Mark เป็น resolved:**
```bash
git add style.css
git commit -m "Merge feature-styling: resolve header padding conflict"
```

**ยกเลิก merge (ถ้าติดขัด):**
```bash
git merge --abort
```

---

## การจัดการ History

### 1. ดู History

**git log variations:**
```bash
# แสดงแบบ oneline
git log --oneline

# แสดง graph
git log --graph --oneline --all

# แสดงตาม author
git log --author="Nutdanai"

# แสดงตามวันที่
git log --since="2026-02-01"
git log --until="2026-02-12"

# แสดงตาม commit message
git log --grep="Add"

# แสดงไฟล์ที่เปลี่ยนแปลง
git log --name-only

# แสดงสถิติ
git log --stat

# แสดง diff แต่ละ commit
git log -p
```

**git log formatting:**
```bash
# Custom format
git log --pretty=format:"%h - %an, %ar : %s"
# Output: a1b2c3d - Nutdanai Pangjit, 2 hours ago : Add footer

# Format options:
# %h  - commit hash (short)
# %H  - commit hash (full)
# %an - author name
# %ae - author email
# %ad - author date
# %ar - author date (relative)
# %s  - subject (commit message)
```

---

### 2. การเดินทางข้าม Commits

**Checkout to specific commit:**
```bash
# ดู commit ที่ผ่านมา (detached HEAD)
git checkout a1b2c3d

# กลับมาที่ HEAD ของ branch
git checkout main
```

**Relative References:**
```bash
# ย้อนกลับ 1 commit
git checkout HEAD~1

# ย้อนกลับ 3 commits
git checkout HEAD~3

# Parent ตัวแรก (ใน merge commit)
git checkout HEAD^

# Parent ตัวที่สอง
git checkout HEAD^2
```

---

### 3. Tags

**การใช้ Tags:**
- ✅ ทำเครื่องหมาย releases (v1.0, v2.0)
- ✅ ทำเครื่องหมาย milestones สำคัญ
- ✅ อ้างอิงจุดเฉพาะในประวัติ

**สร้าง Tags:**
```bash
# Lightweight tag
git tag v1.0

# Annotated tag (recommended)
git tag -a v1.0 -m "Version 1.0 release"

# Tag commit เฉพาะ
git tag -a v0.9 a1b2c3d -m "Beta version"
```

**ดู Tags:**
```bash
# ดูทั้งหมด
git tag

# ดูตาม pattern
git tag -l "v1.*"

# ดูรายละเอียด tag
git show v1.0
```

**ลบ Tags:**
```bash
git tag -d v0.9
```

---

### 4. .gitignore

**ทำไมต้องใช้ .gitignore:**
- ✅ ไม่ track ไฟล์ที่ไม่จำเป็น
- ✅ ป้องกัน sensitive data (passwords, keys)
- ✅ ไม่ track files ที่ generate (node_modules, build/)

**สร้างไฟล์ .gitignore:**
```bash
cat > .gitignore << 'EOF'
# OS generated files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Dependencies
node_modules/
vendor/

# Build files
dist/
build/
*.min.js
*.min.css

# Logs
*.log
npm-debug.log*

# Environment variables
.env
.env.local

# Temporary files
*.tmp
temp/
cache/
EOF
```

**Git Commands:**
```bash
# เพิ่ม .gitignore
git add .gitignore
git commit -m "Add .gitignore file"

# ลบไฟล์ออกจาก tracking (แต่เก็บไฟล์ไว้)
git rm --cached filename.txt

# ดูไฟล์ที่ถูก ignore
git status --ignored
```

**Global .gitignore:**
```bash
# สร้าง global ignore file
git config --global core.excludesfile ~/.gitignore_global

# เพิ่ม patterns ที่ ignore ทุก repo
cat >> ~/.gitignore_global << 'EOF'
.DS_Store
*.swp
.vscode/
EOF
```

---

## สิ่งที่ได้เรียนรู้ (Key Learnings)

### ✅ Git Core Concepts

#### 1. **Version Control คืออะไร**

**ประโยชน์ของ Version Control:**
- ✅ **ติดตามการเปลี่ยนแปลง** - รู้ว่าใคร เมื่อไหร่ เปลี่ยนอะไร
- ✅ **ย้อนกลับได้** - กู้คืนเวอร์ชันเก่าเมื่อเกิดปัญหา
- ✅ **ทำงานแบบขนาน** - แยกงานออกเป็น branches
- ✅ **การทำงานร่วมกัน** - หลายคนแก้ไขโค้ดเดียวกันได้
- ✅ **ประวัติศาสตร์** - เห็นวิวัฒนาการของโปรเจค
- ✅ **Backup** - กระจายข้อมูลหลายที่

**Git vs Other VCS:**
```
Centralized (SVN):        Distributed (Git):
      Server                    Server
        |                      /   |   \
   +----+----+            Repo1 Repo2 Repo3
   |    |    |            (Full copy each)
 Dev1 Dev2 Dev3
```

---

#### 2. **Git's Three States**

**ไฟล์ใน Git มี 3 สถานะ:**

**1. Modified (แก้ไขแล้ว):**
- แก้ไขไฟล์ใน Working Directory
- ยังไม่ได้บันทึกลง Database

**2. Staged (เตรียมแล้ว):**
- เพิ่มไฟล์เข้า Staging Area ด้วย `git add`
- พร้อมที่จะ commit

**3. Committed (บันทึกแล้ว):**
- บันทึกลง Local Repository แล้ว
- ข้อมูลปลอดภัยใน `.git/`

**ตัวอย่าง Workflow:**
```bash
# 1. Modified
echo "New content" >> index.html
git status  # Changes not staged

# 2. Staged
git add index.html
git status  # Changes to be committed

# 3. Committed
git commit -m "Update content"
git status  # Working tree clean
```

---

#### 3. **Git Objects**

**Git เก็บข้อมูลเป็น 4 ประเภท:**

**1. Blob (Binary Large Object):**
- เก็บเนื้อหาไฟล์
- ระบุด้วย SHA-1 hash

**2. Tree:**
- เก็บโครงสร้างไดเรกทอรี
- ชี้ไปที่ blobs และ trees อื่นๆ

**3. Commit:**
- เก็บ snapshot
- ชี้ไปที่ tree
- มี parent commit
- มี author, message, timestamp

**4. Tag:**
- ชี้ไปที่ commit
- ใช้ทำเครื่องหมายเวอร์ชัน

**ความสัมพันธ์:**
```
Commit
  ├── Tree (root)
  │   ├── Blob (index.html)
  │   └── Blob (style.css)
  └── Parent Commit
```

---

#### 4. **HEAD Pointer**

**HEAD คืออะไร:**
- ✅ Pointer ที่ชี้ไปที่ commit ปัจจุบัน
- ✅ โดยปกติชี้ไปที่ branch (symbolic reference)
- ✅ `HEAD` → `refs/heads/main` → commit

**Detached HEAD:**
```bash
# Checkout ไปที่ commit โดยตรง
git checkout a1b2c3d
# Warning: You are in 'detached HEAD' state

# กลับมา attached state
git checkout main
```

**HEAD References:**
```bash
HEAD      # commit ปัจจุบัน
HEAD~1    # parent ของ HEAD
HEAD~2    # grandparent ของ HEAD
HEAD^     # parent ตัวแรกของ HEAD
HEAD^2    # parent ตัวที่สอง (ใน merge commit)
```

---

### ✅ Git Best Practices

#### 1. **Commit Often, Commit Early**
- ✅ Commit บ่อยๆ เมื่อทำงานเสร็จแต่ละส่วนเล็กๆ
- ✅ แต่ละ commit ควรมีความหมายและทำงานได้
- ✅ ง่ายต่อการ debug และ revert

**Example:**
```bash
# ❌ Bad: ทำงานทั้งวันแล้ว commit ครั้งเดียว
git commit -m "Lots of changes"

# ✅ Good: แยก commits ตามฟีเจอร์
git commit -m "Add header structure"
git commit -m "Style header with CSS"
git commit -m "Add navigation menu"
```

---

#### 2. **Write Good Commit Messages**

**Rules:**
- ✅ ใช้ Present tense: "Add" ไม่ใช่ "Added"
- ✅ เริ่มด้วยตัวพิมพ์ใหญ่
- ✅ ไม่ต้องลงท้ายด้วย period
- ✅ บรรทัดแรกไม่เกิน 50 ตัวอักษร
- ✅ เว้นบรรทัดแล้วเขียน description ถ้าจำเป็น

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Examples:**
```bash
# ดี
git commit -m "Add user authentication form"
git commit -m "Fix: Correct typo in welcome message"
git commit -m "Refactor: Simplify CSS grid layout"

# ไม่ดี
git commit -m "stuff"
git commit -m "updated files"
git commit -m "asdf"
```

---

#### 3. **Keep History Clean**

**Strategies:**
- ✅ ใช้ `git commit --amend` แก้ commit ล่าสุด
- ✅ ใช้ `git rebase -i` จัดระเบียบ commits
- ✅ Squash commits ที่เกี่ยวข้อง
- ✅ ไม่ commit files ที่ไม่จำเป็น

**Amend Example:**
```bash
git commit -m "Add footer"
# อ๊ะ ลืมเพิ่มไฟล์!
git add forgotten-file.txt
git commit --amend --no-edit
```

---

#### 4. **Branch Naming Conventions**

**Good Branch Names:**
```bash
feature/user-authentication
bugfix/header-alignment
hotfix/security-patch
improvement/performance-optimization
docs/api-documentation
```

**Pattern:**
```
<type>/<description>
```

**Types:**
- `feature/` - ฟีเจอร์ใหม่
- `bugfix/` - แก้ไข bug
- `hotfix/` - แก้ไขด่วน
- `improvement/` - ปรับปรุง
- `docs/` - เอกสาร
- `test/` - tests

---

#### 5. **Use .gitignore Properly**

**ควร ignore:**
- ✅ OS files (`.DS_Store`, `Thumbs.db`)
- ✅ Editor files (`.vscode/`, `.idea/`)
- ✅ Dependencies (`node_modules/`)
- ✅ Build files (`dist/`, `build/`)
- ✅ Logs (`*.log`)
- ✅ Environment variables (`.env`)
- ✅ Temporary files (`*.tmp`)

**ไม่ควร ignore:**
- ✅ Source code
- ✅ Configuration templates
- ✅ Documentation
- ✅ Tests

---

### ✅ Common Git Workflows

#### Local Development Workflow

**1. Single Branch Workflow:**
```bash
# สำหรับงานเดี่ยวหรือโปรเจคเล็ก
main
  ↓
develop directly on main
```

**2. Feature Branch Workflow:**
```bash
# สำหรับโปรเจคขนาดกลาง-ใหญ่
main
  ├── feature/contact-form
  ├── feature/responsive-design
  └── bugfix/typo-correction
```

**3. Gitflow Workflow:**
```bash
# สำหรับโปรเจคขนาดใหญ่
main (production)
  ↓
develop (integration)
  ├── feature/A
  ├── feature/B
  └── release/v1.0
  └── hotfix/urgent-bug
```

---

### 📊 สรุปผลการทดลอง

**ความสำเร็จ:**
- ✅ สร้าง Portfolio Website สำเร็จ
- ✅ ใช้ Git จัดการ Version Control
- ✅ ฝึก Git Commands ครบถ้วน
- ✅ เข้าใจ Branching และ Merging
- ✅ สามารถจัดการ History ได้

**Git Skills ที่ได้:**
- ✅ Initialize repository
- ✅ Stage และ Commit changes
- ✅ ดู status และ history
- ✅ Compare changes (diff)
- ✅ Undo changes (reset, restore, revert)
- ✅ Create และ manage branches
- ✅ Merge branches
- ✅ Resolve merge conflicts
- ✅ Use tags
- ✅ Use .gitignore

**Git Commands ที่ใช้:**
```
git init              ✅
git add               ✅
git commit            ✅
git status            ✅
git log               ✅
git diff              ✅
git branch            ✅
git checkout/switch   ✅
git merge             ✅
git tag               ✅
git reset             ✅
git restore           ✅
```

**สถิติโปรเจค:**
- **Total Commits:** ~10-15 commits
- **Branches Created:** 2-3 branches
- **Files Changed:** 2 files (index.html, style.css)
- **Lines of Code:** ~150 lines
- **Time Spent:** ~2-3 ชั่วโมง

---
