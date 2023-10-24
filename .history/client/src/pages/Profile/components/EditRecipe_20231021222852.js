import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";
import { updatePost } from "../../../api/post";

const [isLoading, setIsLoading] = useState(false);
const token = localStorage.getItem("token");




// const handleEdit = async () => {
//     if (!token) {
//       // ne pas permettre la modification de la recette
//       console.log("Vous n'êtes pas autorisé à modifier cette recette.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await updatePost(recipe.id);
//       onEdit(recipe.id);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

const EditRecipe = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {

        const getOneRecipe = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/post/one/${id}`
            );
            setRecipe(response.data);
        };
        getOneRecipe();
    }
    , [id]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleCookingTimeChange = (event) => {
        setCookingTime(event.target.value);
    }
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }
    

    }
  return (
   

export default EditRecipe;