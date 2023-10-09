import styles from "../NoteFound/NoteFound.module.scss";
import TastyCookErreur404Page from "../../assets/images/TastyCookErreur404Page.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div className={`left d-flex flex-column align-items-center my-20 ${styles.appContainer}`}>
        <h1 className="mt-30"> <span>T</span>astyCook n'a pas trouvé la page <br/> Elle n'existe pas encore... </h1>
     
        <img src={TastyCookErreur404Page} alt="404 page" />
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
