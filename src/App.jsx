import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from "./components/header/AppHeader";
import BurgerIngredients from "./components/ingredients/BurgerIngredients";
import BurgerConstructor from "./components/constructor/BurgerConstructor";
import {fetchIngredients} from './api/api-ingredients';

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
            <div id="modal-root"></div>
            <main className={styles.App}>
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor ingredients={ingredients} />
            </main>
        </>
    );
}

export default App;
