import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constractor-item.module.css';

function ConstructorList (props){
    return(
        <section className={`${styles.list} custom-scroll`}>

            {props.chosenIngredients.map((ingredient, index) => (
                <div key={index} className={styles.item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                </div>
            ))}
        </section>
    );
}

export default ConstructorList;