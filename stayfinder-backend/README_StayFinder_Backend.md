
# 🏡 StayFinder Backend

Backend system for **StayFinder**, a property listing and booking platform.

This project allows users to:
- 🔐 Authenticate using Firebase
- 🏠 List properties
- 📅 Make bookings for properties
- ✅ Access protected routes via Firebase ID tokens

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- Firebase Authentication
- Postman (for API testing)

---

## 📦 Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/stayfinder?retryWrites=true&w=majority
   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## 🔐 Authentication (Firebase)

- Firebase Authentication is used to handle login/signup on the frontend.
- Backend expects a Firebase ID token in the `Authorization` header for protected routes.

**Header Format:**
```
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

---

## 🌐 API Endpoints

### 🔹 Auth Routes

Handled by Firebase on frontend — no direct backend auth endpoints here.

---

### 🔹 Properties (Listings)

| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| `GET`  | `/api/properties`   | Get all properties            |
| `POST` | `/api/properties`   | Create a property (Protected) |

#### POST `/api/properties` Body:
```json
{
  "name": "Sea View Apartment",
  "location": "Goa",
  "price": 2500
}
```

---

### 🔹 Bookings

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| `POST` | `/api/bookings`  | Create a booking (Protected)    |

#### POST `/api/bookings` Body:
```json
{
  "propertyId": "replace_with_mongo_property_id",
  "dateFrom": "2025-06-20",
  "dateTo": "2025-06-25"
}
```

---

## 📁 Folder Structure

```
stayfinder-backend/
│
├── config/
│   ├── db.js
│   └── firebase.js
│
├── middleware/
│   ├── verifyToken.js
│   └── errorHandler.js
│
├── models/
│   ├── Property.js
│   └── Booking.js
│
├── routes/
│   ├── auth.routes.js
│   ├── properties.js
│   └── bookings.js
│
├── .env
├── index.js
├── package.json
├── README.md
```

---

## 🧪 Testing with Postman

1. **Login with Firebase** (frontend or HTML page)
2. Copy the ID token
3. Use that token in `Authorization` header for:
   - Creating properties
   - Booking a property

---

## 🔧 Environment Variables

Your `.env` file should look like this:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## ✅ Completed Features

- Firebase auth integration
- Token-protected routes
- MongoDB setup via Mongoose
- Create & list properties
- Bookings system
- Error handling
- API documentation

---

## 📌 Next Steps (Frontend Integration)

- Build React-based UI for login, property display, and booking
- Use Axios/Fetch to call backend APIs
- Store Firebase token in frontend to send with each request

---

## 👨‍💻 Built By

-Laukik Parashare  
 
