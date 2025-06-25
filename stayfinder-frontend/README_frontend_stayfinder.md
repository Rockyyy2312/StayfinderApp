
# StayFinder Frontend

This is the **frontend** of the **StayFinder** full-stack app built for a pre-internship project. It allows users to browse listings, view property details, log in/register using Firebase Auth, and book listings via date inputs.

---

## 🚀 Features

- React-based SPA with routing
- Firebase Authentication (Login/Register)
- Property Listings from backend
- Detailed view for each property
- Booking form with date selection
- Search filters (Location, Price)
- Tailwind CSS for responsive design

---

## 📁 Folder Structure

```
stayfinder-frontend/
├── public/
│   └── index.html, manifest.json, icons, etc.
├── src/
│   ├── components/           # Reusable components
│   ├── config/               # Firebase config
│   ├── pages/                # Main app pages
│   │   ├── HomePage.js
│   │   ├── ListingsPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── SingleListingPage.js
│   ├── styles/               # Custom CSS (if any)
│   ├── utils/                # Axios instance setup
│   ├── App.js                # Routing setup
│   ├── index.js              # React root
│   └── tailwind.config.js    # Tailwind setup
```

---

## 🔧 Installation & Setup

Make sure you have Node.js & npm installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stayfinder-project.git
   cd stayfinder-project/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for Firebase:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   ...
   ```

4. Start the app:
   ```bash
   npm start
   ```

The app will run at `http://localhost:3000`.

---

## 🔌 External Integrations

- Firebase Auth (Email/Password Login)
- Axios for API calls
- Tailwind CSS for styling
- React Router DOM for navigation

---

## ✍️ Author

 Laukik Parashare  
 project built using MERN stack and Tailwind CSS_
