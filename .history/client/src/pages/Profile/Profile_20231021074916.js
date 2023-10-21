import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../../api/auth";
import styles from "./Profile.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProfileBio from "./components/ProfileBio";
import ProfileMesRecettes from "./components/ProfileMesRecettes";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((res) => { //ligne 19 à 25 à supprimer, test
          setUser(res);
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
      {isLoading ? (
        <div>Loading...</div> 
      ) : (
      <div className={ `${styles.profileContainer} d-flex `}>
        <div style={{ flex: "0 0 20%" }}>
          <ProfileBio user={user} />
        </div>
        <div style={{ flex: "0 0 60%" }}>
          <ProfileMesRecettes />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Profile;
