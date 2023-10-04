import { NavLink } from "react-router-dom";
import styles from "./ProfileNav.module.scss";

function ProfileNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="recipes"
      >
        Mes Recettes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="users"
      >
        Ma bio
      </NavLink>
    </ul>
  );
}

export default ProfileNav;
