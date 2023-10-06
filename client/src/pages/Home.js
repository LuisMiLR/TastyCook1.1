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
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  console.log("HOME");
  // const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("START FETCHING");
    getPosts()
      .then((res) => {
        console.log("RES", res.data);
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className=" d-flex justify-content-center my-30">
          Découvrez nos nouvelles recettes
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setFilter={setQuery} />
          {isLoading && !posts.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {posts
                .filter((post) => post.title.toLowerCase().startsWith(query))
                .map((post) => (
                  <div key={post.id} className="d-flex flex-column mb-20">
                    <div className="d-flex flex-column mb-20">
                      <h2>{post.title}</h2>
                      <p>{post.description}</p>
                      <p>{post.cookingtime}</p>
                      <img src={`http://localhost:8080/public/upload/posts/${post.img}`} alt="post"></img>
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
  );
};

export default Home;
