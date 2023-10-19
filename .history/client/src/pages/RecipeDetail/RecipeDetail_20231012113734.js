import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../api/post";
import styles from "../RecipeDetail/RecipeDetail.module.scss";

const RecipeDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getOnePost(id)
      .then((res) => {
        setPost(res);
        console.log("-------post avec zak----", res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container ${styles.recipeDetails}`}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {post.posttitle}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-12 col-md-4">
          <img
            src={`/uploads/${post.img}`}
            className={`img-fluid ${styles.stickyTop}`}
            alt={post.title}
            loading="lazy"
          />
        </div>

        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-12">
              <h1>{post.name}</h1>
            </div>
            <div className="col-12 mb-4">
              <i className="bi bi-tag"></i> {post.category}
            </div>
            <div className="col-12" style={{ whiteSpace: "pre-line" }}>
              <h4>Cooking Instructions</h4>
              {post.description}
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-12">
              <h4>commentaire</h4>
              {/* <ul className={`list-group list-group-flush ${styles.ingredientsList}`}>
                {post.ingredients.map((ingredient, index) => (
                  <li className="list-group-item" key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
