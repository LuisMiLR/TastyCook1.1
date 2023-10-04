import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import Search from "../components/search/Search";
import styles from "./Home.module.scss";
import { getPosts } from "../api/post";

//creation de la page home avec la requette get all recipes

const Home = () => {
  
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    getPosts()
    .then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
      setIsLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
}, []);

  return token != null ? (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className=" d-flex justify-content-center my-30">
          Découvrez nos nouvelles recettes
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setFilter={setFilter} />
          {isLoading && !posts.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {posts
                .filter((r) => r.post.toLowerCase().startsWith(filter))
                .map((r) => (
                  <div key={r.id} className="d-flex flex-column mb-20">
                    <div className="d-flex flex-column mb-20">
                      <h2>{r.title}</h2>
                      <p>{r.description}</p>
                      <p>{r.cookingtime}</p>
                      <p>{r.img}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="d-flex flex-row justify-content-center align-items-center p-20"></div>
        </div>
      
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
