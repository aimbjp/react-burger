import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from "./components/header/app-header";
import BurgerIngredients from "./components/ingredients/burger-ingredients";
import BurgerConstructor from "./components/constructor/burger-constructor";
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

    return (
        <>
            <AppHeader />
            {/*<div id="modal-root"></div>*/}
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
