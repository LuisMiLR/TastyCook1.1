import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOnePost, updatePost } from "../../../api/post";
import styles from "../../AddRecipePage/AddRecipePage.module.scss";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer"; 


const EditRecipe = () => {
  const { id } = useParams(); 
  const Navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      getOnePost(id, token) // Utiliser l'ID de la recette extrait des paramètres de l'URL, et token
        .then((res) => {
          setRecipe(res.post);
          setTitle(res.post.title);
          setDescription(res.post.description);
          setCookingtime(res.post.cookingtime);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Vous n'êtes pas autorisé à éditer cette recette.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("cookingtime", cookingtime);
      if (img) {
        formData.append("img", img);
      }
      await updatePost(recipe, id, token); // Utilisez l'ID de la recette pour la mise à jour
      console.log("Recette mise à jour avec succès");
      Navigate("/profile") // Rediriger l'user vers la page profil
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
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "cookingtime") {
      setCookingtime(e.target.value);
    }
  };

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.design} d-flex  justify-content-center p-50 `}>
        <div className={`d-flex flex-column mb-20`}>
          <form
           className={`${styles.card} flex_column  justify-content-center p-20`}
           >
   
      <h2 className="d-flex justify-content-center my-30">
        Éditer la recette : {recipe.title}
      </h2>
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
      </div>
      <Footer />
    </div>
  );
};

export default EditRecipe;

