import { Link } from "react-router-dom";
import styles from "../Recipe/Recipe.module.scss";

function Recipe({ recipe}) {



  return (
    <div className={styles.recipe}>

      <div className={styles.imageContainer}>
      <img src={`http://localhost:8080/public/upload/posts/${recipe.img}`} alt="post"></img>
      <i
        className={`fa-solid fa-thumbs-up ${recipe.liked ? "text-primary" : ""}`}
      ></i>
      </div>
      <Link to={`/recipeDetail/${recipe.id} `} 
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-15">{recipe.title}</h3>
      </Link>
    </div>
  );
} 

export default Recipe;
