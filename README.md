# DecodeLabs Internship Full Stack Project

## Description
This project is a full stack web application developed during the DecodeLabs Internship.

It consists of a responsive frontend interface, a backend API built using Node.js and Express, and a PostgreSQL database for storing product data.  
The application demonstrates how a frontend interacts with backend services and how data is managed using a database.

---

## Technologies Used

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  

### Database
- PostgreSQL  

### Tools
- Git  
- GitHub  
- Postman  

---

## Project Structure
DecodeLabs-Internship

project-1-responsive-ui
Frontend interface built using HTML, CSS and JavaScript

project-2-backend-api
Backend API developed using Node.js and Express with PostgreSQL integration


---

## Task 1 — Responsive UI (Frontend)

In this task a responsive e-commerce style interface was created using HTML, CSS and JavaScript.

The interface includes:

- Navigation bar  
- Product display section  
- Quantity increase and decrease controls  
- Order summary section  
- Footer  
- Responsive design for mobile and tablet screens  

---

## How to Check Task 1

**Step 1**  
Open the project folder.

**Step 2**  
Navigate to the folder:

project-1-responsive-ui

**Step 3**  
Open the file:

index.html


**Step 4**  
The frontend UI will open in the browser.

You should see:

- Navigation bar  
- Product items  
- Quantity buttons  
- Order summary section  

If everything loads properly, Task 1 is working.

---

## Task 2 — Backend API (Node.js + Express)

In this task a backend API was developed using Node.js and Express.

The API provides functionality to:

- Fetch all products  
- Add a new product  

The backend runs on:
[http://localhost:5000](http://localhost:5000/)


---

## How to Run the Backend

**Step 1**  
Open terminal.

**Step 2**  
Navigate to backend folder:

```bash
cd project-2-backend-api

Step 3
Start the server:
node server.js

Step 4
If successful, you will see:

Server running at http://localhost:5000

How to Test GET API

Step 1
Open browser.

Step 2
Enter the URL:

http://localhost:5000/products

Step 3
You will see product data similar to:

[
 {"id":1,"name":"Lipstick","price":350},
 {"id":2,"name":"Powder","price":420},
 {"id":3,"name":"Sunscreen","price":480}
]

This confirms the GET API is working.

How to Test POST API (Add Product)

Step 1
Open Postman.

Step 2
Select method:

POST

Step 3
Enter URL:

http://localhost:5000/products

Step 4
Go to:

Body → raw → JSON

Step 5
Enter:

{
"name":"Foundation",
"price":550
}

Step 6
Click Send.

Step 7
You will receive response like:

{
"id":4,
"name":"Foundation",
"price":550
}

Step 8
Check again in browser:

http://localhost:5000/products

The new product will appear in the list.

If visible, Task 2 is working.

Task 3 — PostgreSQL Database Integration

In this task the backend was connected to a PostgreSQL database to store data permanently.

The pg library is used to connect Node.js with PostgreSQL.

Products are stored in a table named:

products
How to Check Database Data

Step 1
Open terminal.

Step 2
Start PostgreSQL.

Step 3
Open PostgreSQL CLI:

psql -U postgres

Step 4
Connect to database:

\c beautyshop

Step 5
Run query:

SELECT * FROM products;

Step 6
You will see stored product records.

Example:

 id |   name      | price
----|-------------|------
 1  | Lipstick    | 350
 2  | Powder      | 420
 3  | Sunscreen   | 480

This confirms successful database integration.

Task 4 — Frontend and Backend Integration

In this task the frontend was connected with the backend API to create a complete application.

Instead of static data, the frontend fetches product data from the backend using the Fetch API.

The received data is displayed dynamically on the UI. Basic error handling is implemented to handle server issues.

How to Check Task 4

Step 1
Start backend server:

cd project-2-backend-api
node server.js

Step 2
Open frontend:

project-1-responsive-ui/index.html

Step 3
Products will be loaded dynamically from backend.

Dynamic Data Test

Step 1
Open Postman.

Step 2
Send POST request:

http://localhost:5000/products

Step 3
Go to Body → raw → JSON

Step 4
Enter:

{
"name":"Serum",
"price":600
}

Step 5
Click Send.

Step 6
Refresh frontend page.

New product will appear.

Error Handling Test

Step 1
Stop backend server.

Step 2
Refresh frontend.

Step 3
You will see message like:

error loading data

This confirms error handling is working.
```
Author

Dhruvesh Patil
DecodeLabs Internship Project
