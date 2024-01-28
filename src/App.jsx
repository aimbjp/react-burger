import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from "./components/header/AppHeader";
import BurgerIngredients from "./components/ingredients/BurgerIngredients";
import BurgerConstructor from "./components/constructor/BurgerConstructor";
import Modal from './components/modal/modal';
const urlIngredients =  'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(urlIngredients)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные');
                }
                return response.json();
            })
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
