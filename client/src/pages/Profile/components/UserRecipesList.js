import React, { useState, useEffect } from "react";
import styles from "./UserRecipesList.module.scss";
import { getPostsByUser, deletePost as deleteR } from "../../../api/post";
import { NavLink } from "react-router-dom";

function UserRecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPostsByUser(token)
        .then((res) => {
          setRecipes(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  async function deletePost(id) {
    await deleteR(id);
    setRecipes(recipes.filter((r) => r.id !== id));
  }

  return (
    <ul className={styles.list}>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : recipes.length === 0 ? (
        <p>Aucune recette trouvée.</p>
      ) : (
        recipes.map((recipe) => (
          <li key={recipe.id} className="d-flex align-items-center">
            <img src={`http://localhost:8080/public/upload/posts/${recipe.img}`} alt={recipe.title} className={`mr-20 ${styles.image}`}></img>
            <span className="flex-fill ml-45">{recipe.title}</span>
            <NavLink to={`../edit/${recipe.id}`}>
              <button className="btn btn-primary mr-15">Editer</button>
            </NavLink>
            <button
              onClick={() => deletePost(recipe.id)}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default UserRecipesList;
