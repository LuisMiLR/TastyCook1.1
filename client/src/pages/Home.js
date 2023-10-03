import React from 'react';
import styles from './Home.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function HomePage() {

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className="my-30">
          Découvrez nos nouvelles recettes{' '}
          <small className="styles.small">- </small>
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
          
        >
          <div className="d-flex flex-row justify-content-center align-items-center p-20">
          </div>
        </div>
      </div>
     <Footer />
    </div>
  );
}