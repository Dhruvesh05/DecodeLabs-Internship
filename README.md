## Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  

### Database
- PostgreSQL  

### Tools & Utilities
- Git  
- GitHub  
- Postman  

---

## Repository Structure


DecodeLabs-Internship/
│
├── project-1-responsive-ui/ # Frontend implementation
├── project-2-backend-api/ # Backend + Database integration


---

## Frontend — Responsive UI

The frontend is designed as a simple e-commerce cart interface with a focus on layout and responsiveness.

### Key Functionalities
- Structured navigation bar  
- Product listing with quantity controls  
- Order summary section  
- Clean layout with responsive behavior across devices  

### Running the Frontend

1. Open the folder:

project-1-responsive-ui

2. Launch:

index.html

3. View it in any browser  

---

## Backend — REST API

The backend is built using Express.js and exposes endpoints to manage product data.

### Available Endpoints

| Method | Endpoint   | Description          |
|--------|------------|----------------------|
| GET    | /products  | Fetch all products   |
| POST   | /products  | Add a new product    |

---

## Running the Server

```bash
cd project-2-backend-api
node server.js

Server will start at:

http://localhost:5000
API Testing
GET Request

Open:

http://localhost:5000/products

Returns a list of available products.

POST Request

Using Postman:

Method: POST
URL: http://localhost:5000/products

Body (JSON):

{
  "name": "Sample Product",
  "price": 500
}

This will create a new product entry.

Database Integration

The backend is connected to PostgreSQL to ensure persistent data storage.

Details
Database: beautyshop
Table: products
Verify Data
SELECT * FROM products;

This confirms that the API is storing data correctly in the database.

Full Stack Integration

The frontend and backend are connected using the Fetch API.

What Happens Here
Frontend requests product data from backend
Backend fetches data from PostgreSQL
Data is rendered dynamically on UI
Testing Integration
Start backend server
Open frontend (index.html)
Add a product using API
Refresh frontend

New data should reflect immediately.

Error Handling

Basic error handling is implemented:

If backend is down, frontend shows an error message
Prevents UI from breaking on failed requests
What I Learned
Building REST APIs using Express
Connecting Node.js with PostgreSQL
Handling asynchronous data using Fetch API
Structuring a full stack project
Debugging frontend-backend communication
Author

Dhruvesh Patil
DecodeLabs Internship Project
