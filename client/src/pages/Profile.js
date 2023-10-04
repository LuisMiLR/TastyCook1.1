import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../api/auth";
import styles from "./Profile.module.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

//creation de la page profile avec la requette get user info

const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

// affichage des infos de l'utilisateur connecté



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((res) => {
          setUser(res.data.user);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return token != null ? (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
       <Header />
       <div className="flex-fill container d-flex flex-column p-20">
       <h1 className="my-30"> Profil </h1>
      
        <div className="d-flex flex-fill p-20">
          <div className="d-flex flex-column flex-fill"></div>
        </div>
      </div>
      <Footer />
    </div>  
  ) : (
    <Navigate to="/login" />
  );
};

export default Profile;
