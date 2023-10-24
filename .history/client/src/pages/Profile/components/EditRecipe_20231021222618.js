import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";
import { updatePost } from "../../../api/post";



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
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("cookingTime", cookingTime);
        formData.append("image", image);
        try {
            const response = await updatePost(formData, id);
            console.log(response);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.design} d-flex  justify-content-center p-50 `}>
        <div className={`d-flex flex-column mb-20`}>
          <form
            className={`${styles.card} flex_column  justify-content-center p-20`}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="d-flex justify-content-center my-30">
              Modifier la recette
            </h2>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="title">Titre :</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="cookingTime">Temps de préparation :</label>
              <input
                type="text"
                id="cookingTime"
                value={cookingTime}
                onChange={handleCookingTimeChange}
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="image">Image :</label>
              <input type="file" id="image" onChange={handleImageChange} />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center p-20">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "En cours..." : "Enregistrer"}
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