import React, {useEffect, useState} from "react";
import { CurrencyIcon, Counter, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

function IngredientCard (props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    const [count, setCount] = useState(0);
    const constructorIngredients = useSelector(state => state.ingredientsReducer.constructorIngredients.ingredients);
    const constructorBun = useSelector(state => state.ingredientsReducer.constructorIngredients.bun);

    useEffect(() => {
        const newCount = constructorIngredients.filter(item => item._id === props.id).length + (constructorBun && constructorBun._id === props.id ? 2 : 0);
        setCount(newCount);
    }, [constructorIngredients, constructorBun, props.id]);


    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: { id: props.id, type: props.type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return(
        <section className={styles.card} onClick={handleClick} ref={dragRef}>
            <img src={props.image} className={`pl-4 pr-4`} alt={props.name} />
            <p className={`text text_type_digits-default ${styles.price} pb-1 pt-1`}>
                <span className={`pr-1`}>{props.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className="text text_type_main-default" style={{wordWrap: "break-word"}}>{props.name}</h3>
            <div className={styles.counter}>
                {
                    count > 0 && <Counter count={count} size="default" extraClass="m-1" />
                }
            </div>
        </section>
    )
}

export default IngredientCard;