import { FC, useEffect, useState } from "react";
import { CurrencyIcon, Counter, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag} from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredientCardProps } from "../types-ingredients";
import { GET_ACTIVE_INGREDIENT } from "../../../services/actions-types/ingredient-types";
import { useDispatch, useSelector } from "../../../services/hooks";


const IngredientCard: FC<IIngredientCardProps> = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const ingredientId = props.id;
    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);


    const handleCardClick = () => {
        dispatch({ type: GET_ACTIVE_INGREDIENT, ingredient: ingredients.find(ing => ing._id === props.id) || undefined });
    };

    const [count, setCount] = useState(0);
    const constructorIngredients = useSelector((state) => state.ingredientsReducer.constructorIngredients.ingredients);
    const constructorBun = useSelector((state) => state.ingredientsReducer.constructorIngredients.bun);

    useEffect(() => {
        const newCount = constructorIngredients.filter(item => item._id === props.id).length + (constructorBun && constructorBun._id === props.id ? 2 : 0);
        setCount(newCount);
    }, [constructorIngredients, constructorBun, props.id]);


    const [, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: { id: props.id, type: props.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return(
        <Link key={ingredientId} to={`/ingredients/${ingredientId}`} state={ { background: location } } className={` text text_color_primary ${styles.list} `}>
            <section className={styles.card} onClick={handleCardClick} ref={dragRef}>
                <img src={props.image} className={`pl-4 pr-4`} alt={props.name} />
                <p className={`text text_type_digits-default ${styles.price} pb-1 pt-1`}>
                    <span className={`pr-1`}>{props.price}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className="text text_type_main-default " style={{wordWrap: "break-word"}}>{props.name}</h3>
                <div className={styles.counter}>
                    {
                        count > 0 && <Counter count={count} size="default" extraClass="m-1" />
                    }
                </div>
            </section>
        </Link>
    )
}


export default IngredientCard;