import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "import Header from "../../components/Header/Header";
";
import Footer from "../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://localhost:8080/post/${id}`, config)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCookingTime(res.data.cookingTime);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCookingTimeChange = (e) => {
    setCookingTime(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cookingTime", cookingTime);
    if (image) {
      formData.append("image", image);
    }
    try {
      await axios.put(
        `http://localhost:8080/post/${id}`,
        formData,
        config
      );
      navigate("/profile/mes-recettes");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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