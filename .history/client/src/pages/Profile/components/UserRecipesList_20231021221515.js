import React, { useState } from "react";
import styles from "./UserRecipesList.module.scss";
import { deletePost } from "../../../api/post";
import { NavLink } from "react-router-dom";

function UserRecipesList({ recipe, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!token) {
      //  ne pas permettre la suppression
      console.log("Vous n'êtes pas autorisé à supprimer cette recette.");
      return;
    }

    setIsLoading(true);
    try {
      await deletePost(recipe.id);
      onDelete(recipe.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!token) {
      // ne pas permettre la modification de la recette
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
  };


  return (
    <li key={recipe.id} className="d-flex align-items-center mb-20">
      <img
        src={`http://localhost:8080/public/upload/posts/${recipe.img}`}
        alt={recipe.title}
        className={`mr-20 ${styles.image}`}
      ></img>
      <span className="flex-fill ml-45">{recipe.title}</span>
      <NavLink to={`../edit/${recipe.id}`}>
        <button className="btn btn-primary mr-15">Editer</button>
      </NavLink>
      {token ? ( // Vérification du token avant d'afficher le bouton de suppression
        <button
          onClick={handleDelete} // Utilisation de la fonction de suppression révisée
          className="btn btn-danger"
          disabled={isLoading} // Désactivez le bouton de suppression pendant la suppression en cours
        >
          {isLoading ? "Suppression en cours..." : "Supprimer"}
        </button>
      ) : (
        <span>Connectez-vous pour supprimer cette recette.</span>
      )}
    </li>
  );
}

//ecrit le code pour modifier une recette




export default UserRecipesList;
