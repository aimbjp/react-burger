import React from 'react';
import BurgerIngredients from "../components/ingredients/burger-ingredients";
import BurgerConstructor from "../components/constructor/burger-constructor";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home-page.module.css';

export default function HomePage() {
    return (
        <>
                <DndProvider backend={HTML5Backend}>
                    <main className={styles.Home}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                </DndProvider>
        </>
    );
}
