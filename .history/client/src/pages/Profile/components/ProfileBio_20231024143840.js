import { useState, useEffect } from "react";
import styles from "./ProfileBio.module.scss";
import { getUserInfo } from "../../../api/auth";
import profilImage from "../../../assets/images/top-chiefs/img_6.jpg";

// function profile bio with user info
function ProfileBio() {
  const [user, setUser] = useState(null);
  const [website, setWebsite] = useState("https://blog-perso.com");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((res) => {
          setUser(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  return (
    <div className={`${styles.list} d-flex justify-content-center flex-column mt-10 mr-30 `}>
      <h2 className="d-flex justify-content-center "><span className={styles.name}>{user != null && user.username}</span></h2>
      <div className="d-flex flex-column mb-20">
        <div className="d-flex">
          <img src={profilImage} alt="profil" />
        </div>
      </div>
      <div className="d-flex flex-column my-30 mb-15">
        <h4 className="username mb-15">Email:</h4>
        <span className={styles.email}>{user != null && user.email}</span>
      </div>
      <div className="d-flex flex-column">
        <label className={styles.label} htmlFor="website">Site internet:</label>
        <div className="d-flex">
          <input
            type="text"
            id="website"
            value={website}
            onChange={handleWebsiteChange}
          />
          <button className=" mr-5 btn btn-reverse-primary">
          <span>Ajouter</span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBio;
