// generateToken.js
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCD1atx9jXA--gElRFtuUzwKoPuHSBsUJw",
  authDomain: "stayfinder-1e3dd.firebaseapp.com",
  projectId: "stayfinder-1e3dd",
  storageBucket: "stayfinder-1e3dd.firebasestorage.app",
  messagingSenderId: "896683389521",
  appId: "1:896683389521:web:eb11285068b9f0706efe70",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithEmailAndPassword(auth, "testuser@gmail.com", "123456")
  .then(async (userCredential) => {
    const user = userCredential.user;
    const token = await user.getIdToken();
    console.log("Firebase ID Token:", token);
  })
  .catch((error) => {
    console.error("Error logging in:", error.message);
  });
