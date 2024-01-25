import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

function IngredientCard (props) {
    return(
        <section className={styles.card}>
            <img src={props.image} className={`pl-4 pr-4`} alt={props.name} />
            <p className={`text text_type_digits-default ${styles.price} pb-1 pt-1`}>
                <span className={`pr-1`}>{props.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className="text text_type_main-default" style={{wordWrap: "break-word"}}>{props.name}</h3>
        </section>
    )
}

export default IngredientCard;