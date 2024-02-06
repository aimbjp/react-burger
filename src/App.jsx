import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from "./components/header/AppHeader";
import BurgerIngredients from "./components/ingredients/BurgerIngredients";
import BurgerConstructor from "./components/constructor/BurgerConstructor";
import {fetchIngredients} from './services/api/api-norma';
import {IngredientContext} from "./services/context/ingredient-context";

function App() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchIngredients()
            .then(data => setIngredients(data.data))
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    console.log(ingredients);

    return (
        <>
            <AppHeader />
            <div id="modal-root"></div>
            <main className={styles.App}>
                <BurgerIngredients ingredients={ingredients} />
                <IngredientContext.Provider value={ingredients}>
                    <BurgerConstructor/>
                </IngredientContext.Provider>
            </main>
        </>
    );
}

export default App;
