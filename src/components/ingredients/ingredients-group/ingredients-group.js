import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import IngredientCard from "../ingredients-card/ingredient-card";
import styles from './ingredients-group.module.css';
import {useSelector} from "react-redux";

function IngredientsGroup(props){

    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);

    const filtered = useMemo(() => ingredients.filter(item => item.type === props.type), [ingredients, props.type]);

    return(
        <section className={`${styles.group} pt-10`}>
            <h2 className={`text text_type_main-medium`}>{props.value}</h2>
            <div className={`${styles.ingredientList} pl-4 pt-6`}>
                {filtered.map(item => (
                    <IngredientCard
                        key={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        id={item._id}
                        type={item.type}
                    />
                ))}
            </div>
        </section>
    );
}

IngredientsGroup.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
};


export default IngredientsGroup;