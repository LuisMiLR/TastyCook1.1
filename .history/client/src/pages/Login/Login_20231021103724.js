import React, { useState } from "react";
import styles from "../Login/Login.module.scss";
import { loginUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    await loginUser(data)
      .then((token) => {
        if (token != null) {
          Navigate("/home");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className={`${styles.login} d-flex align-items-center justify-content-center `}
    >
      <div className={`${styles.card} d-flex  `}>
        <div className={`${styles.left} d-flex flex-column p-50`}>
          <h1>Tasty Friends </h1>
          <p>
            Votre destination gourmande où se partage la passion pour la cuisine
            bien faite, accessible avec des plats simple et délicieux prennet vie.
            Partagez, explorez et dégustez des recettes incroyables
          </p>
          <span>Créez votre compte TastyCook !</span>
          <Link to="/register">
            <button className=" btn btn-reverse-primary ">Register</button>
          </Link>
        </div>
        <div
          className={`${styles.right} d-flex flex-column justify-content-center p-50`}
        >
          <h1>Login</h1>
          <form className="d-flex flex-column" onSubmit={handleLogin}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
