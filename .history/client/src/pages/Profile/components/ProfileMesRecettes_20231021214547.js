import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EditRecipe.module.scss";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/post/${id}`, config)
      .then((res) => {
        setRecipe(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updatedRecipe = {
      title,
      description,
      imageUrl,
    };
    try {
      await axios.put(`http://localhost:8080/post/${id}`, updatedRecipe, config);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.design} d-flex justify-content-center p-50`}>
        <div className={`d-flex flex-column mb-20`}>
          <h2 className="d-flex justify-content-center my-30">Modifier la recette</h2>
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="imageUrl">URL de l'image</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton}>
                  Enregistrer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditRecipe;