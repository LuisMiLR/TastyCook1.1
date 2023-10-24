import React from "react";
import styles from "./Admin.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AdminUsers from "./AdminUsers";
import AdminRecettes from "./AdminRecettes";

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // if user is not logged in or not admin, redirect to login page
  if (!currentUser || currentUser.role !== "admin") {
    navigate("/login");
    return null;
  }

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.list} d-flex flex-column`}>
        <h2 className="d-flex justify-content-center mb-10">
          Toutes les recettes
        </h2>
        <div className={styles.recipeList}>
          <AdminRecettes />
        </div>
      </div>
      <div className={`${styles.list} d-flex flex-column`}>
        <h2 className="d-flex justify-content-center mb-10">
          Tous les utilisateurs
        </h2>
        <div className={styles.userList}>
          <AdminUsers />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
