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

        <Header />

        <div className={styles.main}>
            <h1 className={styles.title}>Modifier une recette</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={recipe.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ingredients">Ingrédients</label>
                    <textarea
                        name="ingredients"
                        id="ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        name="instructions"
                        id="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="img">Image</label>
                    <input
                        type="file"
                        name="img"
                        id="img"
                        value={recipe.img}
                        onChange={handleChange}
                    />
                </div>
                <button className={styles.button} type="submit">
                    Modifier
                </button>
            </form>
        </div>

        <Footer />
        
   

export default EditRecipe;