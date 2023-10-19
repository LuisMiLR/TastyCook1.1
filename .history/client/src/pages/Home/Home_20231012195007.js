import React, { useEffect, useState } from "react";
import styles from "../Home/Home.module.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Search from "./components/search/Search";
import { getPosts } from "../../api/post";
import Recipe from "./Recipe/Recipe";
import "../RecipeDetail/RecipeDetail";

//creation de la page home avec la requette get all recipes + filtre de recherche
//et intégration d'une redirection vers la page login si l'utilisateur n'est pas connecté

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/home");
    }

    getPosts()
      .then((res) => {
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
        <h1 className=" d-flex justify-content-center my-50">
          Les <span className={{styles.span}>T</span>asty recettes, faciles et délicieuses
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
                .filter((post) => {
                  return post.title.toLowerCase().startsWith(query);
                })
                .map((post) => (
                  <Recipe
                    key={post.id}
                    recipe={post}
                    img={post.img}
                    title={post.title}
                  />
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
