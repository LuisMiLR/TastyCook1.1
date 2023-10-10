import styles from "./Header.module.scss";
import tastyCook from "../../assets/images/vert tastyCook Logo1.png";
import { useState } from "react";
import HeaderMenu from "./components/headerMenu/HeaderMenu";
import { NavLink, useNavigate } from "react-router-dom";


function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // Supprimer le JWT du localStorage
      localStorage.removeItem("token");
      navigate("/login"); 
    };

  return (
    <header className={`${styles.Header} d-flex flex-row align-items-center`}>
      <div className="flex-fill ml-45">
        <NavLink to="/home">
          <img src={tastyCook} alt="logo tastycook" />
        </NavLink>
      </div>
      <ul className={styles.headerList}>
        {token ? (
          <NavLink to="/AddRecipePage">
            <button className=" mr-5 btn btn-reverse-primary">
              {" "}
              <i className="fa-solid fa-circle-plus mr-5"></i>
              <span>Ajouter une recette</span>
            </button>
          </NavLink>
        ) : null}
        {token ? (
          <NavLink to="/Profile">
            <button className=" mr-15 btn btn-reverse-primary">
              {" "}
              <i className="fa-solid fa-user mr-5"></i>
              <span>Profil</span>
            </button>
          </NavLink>
        ) : null}
      <button onClick={handleLogout} className="btn btn-primary">Déconnexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars fa-2x ${styles.headerXs} `}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu />
        </>
      )}
    </header>
  );
}

export default Header;
