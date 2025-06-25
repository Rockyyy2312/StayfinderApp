import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ListingsPage from "./pages/ListingsPage";
import SingleListingPage from "./pages/SingleListingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<SingleListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
