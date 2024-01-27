import React from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-item/constructor-list";
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";

const fakeBun = {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: null
}


function BurgerConstructor(props){
    return(
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={null}
                    extraClass={styles.blocked}
                />

                <ConstructorList chosenIngredients={[fakeBun, fakeBun, fakeBun, fakeBun, fakeBun, fakeBun,]} />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={null}
                    extraClass={styles.blocked}
                />
            <section className={styles.price}>
                <span className={`${styles.price} pr-6`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            price: PropTypes.number,
            thumbnail: PropTypes.string,
        })
    ).isRequired,
};


export default BurgerConstructor;