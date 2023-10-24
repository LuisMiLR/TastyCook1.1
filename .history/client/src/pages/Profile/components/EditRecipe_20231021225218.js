import React, { useState, useEffect } from "react";
import { getOnePost, updatePost}
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../AddRecipePage/AddRecipePage.module.scss";
import { updatePost } from "../../../api/post";

  return (

    <div className={styles.container}>

        <Header />

        <div className={styles.main}>
            <h1 className={styles.title}>Modifier une recette</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={recipe.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ingredients">Ingrédients</label>
                    <textarea
                        name="ingredients"
                        id="ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        name="instructions"
                        id="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="img">Image</label>
                    <input
                        type="file"
                        name="img"
                        id="img"
                        value={recipe.img}
                        onChange={handleChange}
                    />
                </div>
                <button className={styles.button} type="submit">
                    Modifier
                </button>
            </form>
        </div>

        <Footer />

    </div>
    );
}   


export default EditRecipe;