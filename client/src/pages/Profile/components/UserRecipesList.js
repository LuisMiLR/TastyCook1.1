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

  async function deletePost(_id) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
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
            <span className="flex-fill">{recipe.title}</span>
            <NavLink to={`../edit/${recipe._id}`}>
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
