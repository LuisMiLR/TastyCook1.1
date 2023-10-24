import Header from "../../components/Header/Header";
import axios from "axios";
import styles from "../AddRecipePage/AddRecipePage.module.scss";
import Footer from "../../components/Footer/Footer";

//function add recipe  
const handleSubmit = async (event) => {
  event.preventDefault();

  // get data from form and token from localstorage
  const data = new FormData(event.target);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const res = await axios.post(
    "http://localhost:8080/post/create",
    data,
    config
  );

  console.log(res);
  if (res.status === 200) {
    alert("Recette ajoutée");
  } else {
    alert("Erreur lors de l'ajout de la recette");
  }
};

const AddRecipePage = () => {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className={`${styles.design} d-flex  justify-content-center p-50 `}>
        <div className={`d-flex flex-column mb-20`}>
          <form
            action="http://localhost:8080/post/create"
            className={`${styles.card} flex_column  justify-content-center p-20`}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="d-flex justify-content-center my-30">
              Ajouter une recette
            </h2>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="title">Titre </label>
              <input type="text" name="title" placeholder="Ex. Grilade de..." />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Ex. En étape1 couper les..."
              />
            </div>
            <div className="d-flex flex-column mb-20">
              <label htmlFor="cookingtime">Temps de préparation</label>
              <input type="text" name="cookingtime" placeholder="Ex. 15" />
            </div>
            <div className="d-flex flex-column mb-20">
              <label>Image pour la recette</label>
              <input
                type="file"
                name="img"
                id="img"
                accept="image/*"
                required
                placeholder="Image"
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center p-20">
              <button className="btn btn-primary my-10">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRecipePage;
