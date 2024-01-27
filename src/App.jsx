import React from 'react';
import styles from './App.module.css';
import AppHeader from "./components/header/AppHeader";
import BurgerIngredients from "./components/ingredients/BurgerIngredients";
import data from './utils/data.js';
import BurgerConstructor from "./components/constructor/BurgerConstructor";

function App() {
  return (
    <>
        <AppHeader />
        <main className={styles.App}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
        </main>
    </>
  );
}

export default App;
