import React, { useState, useEffect } from "react";
import { getAllPosts, deletePost } from "../../api/post";
import UserRecipesList from "../components/UserRecipesList";
import styles from "./Admin.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AdminUsers from "./AdminUsers";
import AdminRecettes from "./AdminRecettes";

const Admin = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAllPosts(token)
        .then((res) => {
          setRecipes(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
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
      navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.list} d-flex flex-column`}>
        <h2 className="d-flex justify-content-center mb-10">Toutes les recettes</h2>
        <div className={styles.recipeList}>
          <AdminRecettes />
        </div>
      </div>
      <div className={`${styles.list} d-flex flex-column`}>
        <h2 className="d-flex justify-content-center mb-10">Tous les utilisateurs</h2>
        <div className={styles.userList}>
          <AdminUsers />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;