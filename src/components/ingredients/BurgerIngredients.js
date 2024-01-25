import React, { useState, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import styles from './BurgerIngredients.module.css';
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
    const [activeTab, setActiveTab] = useState("buns");
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);

    const handleTabClick = (value) => {
        setActiveTab(value);

        if (value === 'buns') {
            bunsRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (value === 'sauces') {
            saucesRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (value === 'fillings') {
            fillingsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={`${styles.burgerIngredients} pt-10 pr-10`}>
            <h2 className="text text_type_main-large">Соберите бургер</h2>
            <section className={`${styles.tab} pt-5 `}>
                <Tab
                    value="buns"
                    active={activeTab === 'buns'}
                    onClick={() => handleTabClick('buns')}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauces"
                    active={activeTab === 'sauces'}
                    onClick={() => handleTabClick('sauces')}
                >
                    Соусы
                </Tab>
                <Tab
                    value="fillings"
                    active={activeTab === 'fillings'}
                    onClick={() => handleTabClick('fillings')}
                >
                    Начинки
                </Tab>
            </section>
            <ul className={` ${styles.groups} custom-scroll`}>
                <li ref={bunsRef}>
                    <IngredientsGroup value={'Булки'} items={props.ingredients.filter(item => item.type === 'bun')}/>
                </li>
                <li ref={saucesRef}>
                    <IngredientsGroup value={'Соусы'} items={props.ingredients.filter(item => item.type === 'sauce')}/>
                </li>
                <li ref={fillingsRef}>
                    <IngredientsGroup value={'Начинки'} items={props.ingredients.filter(item => item.type === 'main')}/>
                </li>
            </ul>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            price: PropTypes.number,
            thumbnail: PropTypes.string,
        })
    ).isRequired,
};

export default BurgerIngredients;
