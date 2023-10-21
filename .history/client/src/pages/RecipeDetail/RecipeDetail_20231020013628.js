import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../api/post";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "../RecipeDetail/RecipeDetail.module.scss";

const RecipeDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getOnePost(id)
      .then((res) => {
        setPost(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header /> 
      <div className={`flex-fill container d-flex flex-column p-20`}>
        <div
            className={`card flex-fill d-flex flex-column p-20 my-50 ${styles.contentCard}`}
          >
        
            <h1 className=" d-flex justify-content-center mt-30 ">
              {post.post.title}
            </h1>
              <div className={`${styles.imageContainer}d-flex justify-content-center my-50 ml-30 mr-30`}>
                <img
                className={`${styles.fluidPic} d-flex justify-content-center my-50 ml-30 mr-30}`}	
                src={`http://localhost:8080/public/upload/posts/${post.post.img}`}
                alt={post.post.title}
                />
                <div
              </div>
            
        </div>
      
      </div>  
      
      <Footer />
    </div>
  );
};

export default RecipeDetails;
