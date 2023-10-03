import styles from './HeaderMenu.module.scss';
import { NavLink } from 'react-router-dom';


function HeaderMenu() {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/profile"> Ajouter 1 recette </NavLink>
        </li>
      <li>Favoris</li>
      <li>Déconnexion</li>
    </ul>
  );
}

export default HeaderMenu;