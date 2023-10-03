import styles from "./Header.module.scss";
import tastyCook from "../../assets/images/vert tastyCook Logo1.png";
import { useState } from "react";
import HeaderMenu from "./components/headerMenu/HeaderMenu";
import { NavLink } from "react-router-dom";


function Header() {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <header className={`${styles.Header} d-flex flex-row align-items-center`}>
      <div className="flex-fill ml-45">
        <NavLink to="/">
        <img src={tastyCook} alt="logo tastycook" />
        </NavLink>
      </div>
      <ul className={styles.headerList}>
        <NavLink to="/AddRecipePage"> 
        <button className=" mr-5 btn btn-reverse-primary"> <i className="fa-solid fa-circle-plus mr-5"></i>
        <span>Ajouter une recette</span></button>
        </NavLink>

        <NavLink to="/Profile">
        <button className=" mr-5 btn btn-reverse-primary"> <i className="fa-solid fa-user mr-5"></i>
        <span>Profil</span></button>
        </NavLink>
        <button className="btn btn-primary">Déconnexion</button>
      </ul>
      <i onClick={ () => setShowMenu(true) }  className={`fa-solid fa-bars fa-2x ${ styles.headerXs} `}></i>
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



