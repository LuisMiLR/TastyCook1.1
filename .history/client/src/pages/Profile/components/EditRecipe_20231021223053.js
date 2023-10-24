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
    setIsLoading(true);
    try {
        await updatePost(recipe.id);
        onEdit(recipe.id);
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }

    const [recipe, setRecipe] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        img: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getOneRecipe = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/post/one/${id}`
            );
            setRecipe(response.data);
        };
        getOneRecipe();
    }, [id]);

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(recipe, id);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };

  return (

    <div className={styles.container}>
        
   

export default EditRecipe;