import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "../src/pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import NotFound from "./pages/NoteFound/NoteFound";
import RecipeDetails from "./pages/RecipeDetail/RecipeDetail";
import Edit from "./pages/Profile/components/EditRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addRecipePage" element={<AddRecipePage />} />
        <Route path="/edit/:id" element={<editRecipe />} />
        <Route path="/post/:id" element={<RecipeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
