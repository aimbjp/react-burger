import React from 'react';
import IngredientCard from "../ingredients-card/ingredient-card";
import styles from './ingredients-group.module.css';

function IngredientsGroup(props){
    return(
        <section className={`${styles.group} pt-10`}>
            <h2 className={`text text_type_main-medium`}>{props.value}</h2>
            <div className={`${styles.ingredientList} pl-4 pt-6`}>
                {props.items.map(item => (
                    <IngredientCard
                        key={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        onClick={() => props.onCardClick(item)}
                        id={item._id}
                        type={item.type}
                    />
                ))}
            </div>
        </section>
    );
}

export default IngredientsGroup;