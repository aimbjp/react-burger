import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from "../header/app-header";
import BurgerIngredients from "../ingredients/burger-ingredients";
import BurgerConstructor from "../constructor/burger-constructor";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, []);

    return (
        <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles.App}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </>
    );
}

export default App;
