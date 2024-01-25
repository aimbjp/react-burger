import React from 'react';
import './App.css';
import AppHeader from "./components/header/AppHeader";
import BurgerIngredients from "./components/ingredients/BurgerIngredients";
import data from './utils/data.js';
import BurgerConstructor from "./components/constructor/BurgerConstructor";

function App() {
  return (
    <>
        <AppHeader />
        <main style={{ display: "flex", gap: "40px", margin: "auto", justifyContent: "center" }}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
        </main>
    </>
  );
}

export default App;
