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
  
    if (isLoading) {
      return <p>Chargement en cours...</p>;
    }
  
    return (
      <div>
        <h2>Éditer la recette : {recipe.title}</h2>
        {/* Ajoutez ici les champs de formulaire pour éditer la recette, en utilisant les valeurs de "recipe" */}
        {/* Par exemple : */}
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
        {/* Ajoutez d'autres champs de formulaire pour d'autres propriétés de la recette. */}
        <button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Mise à jour en cours..." : "Enregistrer"}
        </button>
      </div>
    );
  };
  
  export default EditRecipe;
  


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

    </div>
    );
}   


export default EditRecipe;