import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";
import { updatePost } from "../../../api/post";

const [isLoading, setIsLoading] = useState(false);
const token = localStorage.getItem("token");

handleEdit = async () => {
    if (!token) {
        //  ne pas permettre la suppression
        console.log("Vous n'êtes pas autorisé à modifier cette recette.");
        return;
         

    }
  return (
   

export default EditRecipe;