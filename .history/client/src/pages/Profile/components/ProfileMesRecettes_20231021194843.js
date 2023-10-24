import React, { useState, useEffect } from "react";
import { getPostsByUser, deletePost } from "../../../api/post";
import UserRecipesList from "../components/UserRecipesList";
import styles from "./ProfileMesRecettes.module.scss";

const ProfileMesRecettes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPostsByUser(token)
        .then((res) => {
          // console.log("------then getPostsByUser-------", res);
          setRecipes(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Vous n'êtes pas autorisé à supprimer cette recette.");
      return;
    }

    setIsLoading(true);
    try {
      await deletePost(id, token);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.list} d-flex flex-column`}>
      <h2 className="d-flex justify-content-center mb-10">Mes Recettes</h2>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : recipes.length === 0 || recipes == null ? (
        <p>Aucune recette trouvée.</p>
      ) : (
        <div className={styles.recipeList}>
          {recipes.map((recipe) => (
            <UserRecipesList
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              setRecipes={setRecipes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileMesRecettes;
