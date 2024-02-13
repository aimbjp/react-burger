import React, { useState, useRef, useEffect } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import styles from './burger-ingredients.module.css';
import Modal from "../modal/modal";
import IngredientsDetails from "./ingredients-details/ingredients-details";
import { useDispatch, useSelector } from "react-redux";
import {  COLLAPSE_ACTIVE_INGREDIENT } from "../../services/actions/ingredients";

const BurgerIngredients = () => {

    const dispatch = useDispatch();

    const modalOpen = useSelector(store => store.ingredientsReducer.modalIngredientOpen);


    const refs = {
        "buns": useRef(null),
        "sauces": useRef(null),
        "fillings": useRef(null),
    }

    const ingredientsContainerRef = useRef(null);

    const [activeTab, setActiveTab] = useState("buns");



    const handleCloseModal = () => {
        dispatch({type: COLLAPSE_ACTIVE_INGREDIENT})
    };

    const handleTabClick = (value) => {
        setActiveTab(value);
        refs[value].current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const containerRect = ingredientsContainerRef.current.getBoundingClientRect();

            const bunsRect = refs.buns.current.getBoundingClientRect();
            const saucesRect = refs.sauces.current.getBoundingClientRect();
            const fillingsRect = refs.fillings.current.getBoundingClientRect();

            const distances = {
                buns: Math.abs(bunsRect.top - containerRect.top) + Math.abs(bunsRect.left - containerRect.left),
                sauces: Math.abs(saucesRect.top - containerRect.top) + Math.abs(saucesRect.left - containerRect.left),
                fillings: Math.abs(fillingsRect.top - containerRect.top) + Math.abs(fillingsRect.left - containerRect.left),
            };

            let closest = 'buns';
            let minDistance = Number.MAX_VALUE;
            Object.entries(distances).forEach(([key, value]) => {
                if (value < minDistance) {
                    minDistance = value;
                    closest = key;
                }
            });

            setActiveTab(closest);
        };

        const container = ingredientsContainerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [refs.buns, refs.fillings, refs.sauces]);


    return (
        <section className={`${styles.burgerIngredients} pt-10 pr-10`} >
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
            <ul className={` ${styles.groups} custom-scroll`} ref={ingredientsContainerRef} >
                <li ref={refs.buns}>
                    <IngredientsGroup value={'Булки'} type={'bun'} />
                </li>
                <li ref={refs.sauces}>
                    <IngredientsGroup value={'Соусы'} type={'sauce'} />
                </li>
                <li ref={refs.fillings}>
                    <IngredientsGroup value={'Начинки'} type={'main'} />
                </li>
            </ul>
            {modalOpen && (
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                    <IngredientsDetails />
                </Modal>
            )}
        </section>
    );
};



export default BurgerIngredients;
