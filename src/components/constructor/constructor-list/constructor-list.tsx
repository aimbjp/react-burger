import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveConstructorIngredient } from "../../../services/actions/ingredients";
import styles from './constructor-list.module.css';
import { ConstructorItem } from '../constructor-item/constructor-item';
import {IIngredient, IRootState} from "../types-constructor";



function ConstructorList() {
    const dispatch = useDispatch();

    const chosenIngredients: IIngredient[] = useSelector((store: IRootState) => store.ingredientsReducer.constructorIngredients.ingredients);

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
