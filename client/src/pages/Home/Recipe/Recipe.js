import styles from "../Recipe/Recipe.module.scss";

function Recipe({ recipe}) {



  return (
    <div className={styles.recipe}>

      <div className={styles.imageContainer}>
      <img src={`http://localhost:8080/public/upload/posts/${recipe.img}`} alt="post"></img>
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
