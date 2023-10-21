import React, { useState } from "react";
import styles from "./Register.module.scss";
import { registerUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      username,
      email,
      password,
    };
    if (!username || !email || !password ) {
      alert("Merci de renseigner les champs");
    } else {
      await registerUser(data)
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div
      className={`${styles.register} d-flex align-items-center justify-content-center`}
    >
      <div className={`${styles.card} d-flex flex-row-reverse`}>
        <div className={`${styles.left} d-flex flex-column p-50`}>
          <h1>Tasty Cook</h1>
          <p>
            Votre destination gourmande, partagez votre passion pour la cuisine
            accessible avec des plats simple et délicieux !
            Explorez et dégustez des recettes incroyables avec la communauté TastyCook.
          </p>
          <span>Avez-vous déjà un compte TastyCook ?</span>
          <Link to="/login">
            <button className=" btn btn-reverse-primary ">Login</button>
          </Link>
        </div>
        <div
          className={`${styles.right} d-flex flex-column justify-content-center p-50`}
        >
          <h1>Register</h1>
          <form className="d-flex flex-column" onSubmit={handleRegister}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Nom utilisateur"
              autoComplete="username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder=" Adresse email"
              value={email}
              autoComplete="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              autoComplete="current-password"
            />
            <button type="submit" className="btn btn-primary">
              register
            </button>
          </form>
          <p>  Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un chiffre,</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
