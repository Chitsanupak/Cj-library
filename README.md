CJ Library API
ระบบจัดการหนังสือพร้อมสมัครสมาชิก / เข้าสู่ระบบ
พัฒนาโดยใช้ Node.js + Express + PostgreSQL

คุณสมบัติ 
สมัครสมาชิก (Register)
เข้าสู่ระบบ (Login) + JWT
เพิ่มข้อมูลหนังสือ
ดูรายการหนังสือทั้งหมด
ค้นหา / กรอง (Search & Filter)
ลบหนังสือ
อัปเดตข้อมูลหนังสือ

<!-- Tech Stack -->
Node.js
Express.js
PostgreSQL
JWT Authentication
bcryptjs

<!-- Installation -->
git clone <https://github.com/Chitsanupak/Cj-library.git>
cd CJ-LIBRARY
npm install

<!-- Run Server -->
npm run start

API DOCUMENTATION

POST /register ------------------
<!-- Request Body -->
{
  "username": "john123",
  "password": "123456",
  "firstName": "John",
  "lastName": "Doe"
}
<!-- Response -->
{
  "message": "User created successfully",
  "user_id": 1
}

POST /login ---------------------
<!-- Request Body -->
{
  "username": "john123",
  "password": "123456"
}
<!-- Response -->
{
  "message": "login successful",
  "token": "xxxxx.yyyyy.zzzzz"
}

เพิ่มหนังสือ
POST /books ----------------------
Header: Authorization: Bearer <token>
<!-- Request Body -->
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "genre": "Fantasy"
}
<!-- Response -->
{
  "message": "Book created"
}

ดูหนังสือทั้งหมด
GET /books -----------------------

ค้นหา / กรองหนังสือ
GET /books?search=harry -----------

อัปเดตหนังสือ
PUT /books/:id -------------------

ลบหนังสือ
DELETE /books/:id -----------------


