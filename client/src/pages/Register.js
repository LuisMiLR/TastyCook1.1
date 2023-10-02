import React, { useState } from 'react';
import styles from "./Register.module.scss";
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = async (event) => {
      
        event.preventDefault();
    
        const data = {
          username,
          email,
          password,
        };
    
        if (username === '' ||email === '' || password === '') {
            alert('Merci de renseigner les champs');
        } else {
          await registerUser(data)
          .then(() => {
            navigate('/login')
          })
          .catch((e) => {
            console.log(e);
          })
        }
      };
    
  
        return (
            <div className= {`${styles.register} d-flex align-items-center justify-content-center `}> 
                <div className={`${styles.card} d-flex flex-row-reverse`}> 
                    <div className={`${styles.left} d-flex flex-column p-50`}>
                        <h1>Social Cook</h1>
                        <p>
                        Votre destination gourmande où se partage la passion pour la cuisine bien faite accésible avec des plats simple et délicieux prennet vie. Partagez, explorez et dégustez des recettes incroyables
                        </p>
                        <span>Avez-vous déjà un compte TastyCook ?</span>
            
                        <button className=" btn btn-reverse-primary " >Login</button>
                    
                        
                    </div>
                    <div className={`${styles.right} d-flex flex-column justify-content-center p-50`}>
                        <h1>Register</h1>
                        <form className="d-flex flex-column" onSubmit={handleRegister}>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Usernane" autoComplete="username"  />
                            <input onChange={(e) => setEmail(e.target.value)}  type="email" name="email" placeholder=" Adresse email" value={email} autoComplete="email" />
                            <input onChange={(e) => setPassword(e.target.value)}  type="password" name="password" placeholder="Mot de passe" value={password} autoComplete="current-password" />
                            <button type="submit" className="btn btn-primary">register</button>
                        </form>
                    </div>
                </div>
        
            
            </div>
        );
    }

    
    
    export default Register;
