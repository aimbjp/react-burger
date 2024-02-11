import React, { useState, useRef, useMemo } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import ingredientTypes from "../../utils/ingredient-types";
import Modal from "../modal/modal";
import IngredientsDetails from "./ingredients-details/ingredients-details";

const BurgerIngredients = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIngredient, setActiveIngredient] = useState(null);

    const handleCardClick = (ingredient) => {
        setActiveIngredient(ingredient);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setActiveIngredient(null);
    };


    const [activeTab, setActiveTab] = useState("buns");

    const refs = {
        "buns": useRef(null),
        "sauces": useRef(null),
        "fillings": useRef(null),
    }

    const handleTabClick = (value) => {
        setActiveTab(value);
        refs[value].current.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredBuns = useMemo(() => props.ingredients.filter(item => item.type === 'bun'), [props.ingredients]);
    const filteredSauces = useMemo(() => props.ingredients.filter(item => item.type === 'sauce'), [props.ingredients]);
    const filteredFillings = useMemo(() => props.ingredients.filter(item => item.type === 'main'), [props.ingredients]);


    return (
        <section className={`${styles.burgerIngredients} pt-10 pr-10`}>
            <h2 className="text text_type_main-large">Соберите бургер</h2>
            <section className={`${styles.tab} pt-5 `}>
                <Tab
                    value="buns"
                    active={activeTab === 'buns'}
                    onClick={handleTabClick}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauces"
                    active={activeTab === 'sauces'}
                    onClick={handleTabClick}
                >
                    Соусы
                </Tab>
                <Tab
                    value="fillings"
                    active={activeTab === 'fillings'}
                    onClick={handleTabClick}
                >
                    Начинки
                </Tab>
            </section>
            <ul className={` ${styles.groups} custom-scroll`}>
                <li ref={refs.buns}>
                    <IngredientsGroup value={'Булки'} items={filteredBuns} onCardClick={handleCardClick} />
                </li>
                <li ref={refs.sauces}>
                    <IngredientsGroup value={'Соусы'} items={filteredSauces} onCardClick={handleCardClick} />
                </li>
                <li ref={refs.fillings}>
                    <IngredientsGroup value={'Начинки'} items={filteredFillings} onCardClick={handleCardClick} />
                </li>
            </ul>
            {modalOpen && (
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                    <IngredientsDetails activeIngredient={activeIngredient} />
                </Modal>
            )}
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientTypes).isRequired,
};

export default BurgerIngredients;
