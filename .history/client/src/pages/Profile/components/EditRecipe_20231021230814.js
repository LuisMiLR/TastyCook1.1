import React, { useState, useEffect } from "react";
import { getOnePost, updatePost } from "../../../api/post";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";

const EditRecipe = ({ match }) => {
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const postId = match.params.id; // Récupérez l'ID de la recette à partir des paramètres de l'URL
      if (token && postId) {
        getOnePost(postId, token) // Utilisez la fonction pour récupérer les détails de la recette
          .then((res) => {
            setRecipe(res.post);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setIsLoading(false);
          });
      }
    }, [match.params.id]);
  
    const handleUpdate = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Vous n'êtes pas autorisé à éditer cette recette.");
        return;
      }
  
      setIsLoading(true);
      try {
        await updatePost(recipe, recipe.id, token); // Utilisez la fonction pour mettre à jour la recette
        console.log("Recette mise à jour avec succès");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
 
    const handleChange = (e) => {
        setRecipe({
          ...recipe,
          [e.target.name]: e.target.value,
        });
      };
    
      return (
        <div className="container">
          <h2 className="d-flex justify-content-center my-30">
            Éditer la recette : {recipe.title}
          </h2>
          <form>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={recipe.description}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="cookingtime">Temps de préparation</label>
              <input
                type="text"
                name="cookingtime"
                value={recipe.cookingtime}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label>Image pour la recette</label>
              <input
                type="file"
                name="img"
                id="img"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center p-20">
              <button
                className="btn btn-primary my-10"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? "Mise à jour en cours..." : "Sauvegarder"}
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default EditRecipe;