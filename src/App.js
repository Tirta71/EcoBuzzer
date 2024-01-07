import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import DetailProduk from "./Pages/DetailProduk";
import DetailCategory from "./Pages/DetailCategory";
import Login from "./Pages/Login&Register/Login";
import Register from "./Pages/Login&Register/Register";
import ProfileDetail from "./Pages/Profile Detail/ProfileDetail";
import TambahProduk from "./Pages/Produk/TambahProduk";

function App() {
  // Check if the user is logged in
  const isUserLoggedIn = localStorage.getItem("UserID") !== null;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-detail" element={<ProfileDetail />} />
        <Route path="/tambah-produk" element={<TambahProduk />} />
        <Route
          path="/detail-category/detail-produk/:ProductID"
          element={isUserLoggedIn ? <DetailProduk /> : <Navigate to="/login" />}
        />
        <Route
          path="/detail-category/:KategoriID"
          element={
            isUserLoggedIn ? <DetailCategory /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
