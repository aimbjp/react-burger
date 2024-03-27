import React from 'react';
import { moveConstructorIngredient } from "../../../services/thunk/ingredients";
import styles from './constructor-list.module.css';
import { ConstructorItem } from '../constructor-item/constructor-item';
import {useDispatch , useSelector } from "../../../services/hooks";
import {TIngredient} from "../../../services/types/model-data";



function ConstructorList() {
    const dispatch = useDispatch();

    // const chosenIngredients: IIngredient[] = useSelector((store) => store.ingredientsReducer.constructorIngredients.ingredients);
    const chosenIngredients: TIngredient[] = useSelector((store) => store.ingredientsReducer.constructorIngredients.ingredients);

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveConstructorIngredient(dragIndex, hoverIndex));
    };

    return (
        <section className={`${styles.list} custom-scroll`}>
            {chosenIngredients.map((ingredient, index) => (
                <ConstructorItem key={ingredient.uniqueId} ingredient={ingredient} index={index} moveIngredient={moveIngredient} />
            ))}
        </section>
    );
}

export default ConstructorList;
