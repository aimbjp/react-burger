import React, {useMemo, forwardRef} from 'react';
import IngredientCard from "../ingredients-card/ingredient-card";
import styles from './ingredients-group.module.css';
import {useSelector} from "react-redux";
import {IIngredientsGroupProps} from "../types-ingredients";
import {IIngredient, IRootState} from "../../constructor/types-constructor";

const IngredientsGroup = forwardRef<HTMLDivElement, IIngredientsGroupProps>((props, ref) => {
    const ingredients: IIngredient[] = useSelector((store: IRootState) => store.ingredientsReducer.ingredients);

    const filtered: IIngredient[] = useMemo(() => ingredients.filter(item => item.type === props.type), [ingredients, props.type]);

    return(
        <section className={`${styles.group} pt-10`} ref={ref}>
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
});

export default IngredientsGroup;
