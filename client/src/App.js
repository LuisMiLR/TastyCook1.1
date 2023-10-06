import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "../src/pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addRecipePage" element={<AddRecipePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
