import {FC} from "react";
import {TIngredient} from "../../../services/types/model-data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './item-ingredient.module.css';

interface IItemIngredient {
    ingredient: TIngredient;
    amount: number;
    index: number;

}

export const ItemIngredient: FC<IItemIngredient> = ({ingredient, amount, index}) => {
    return(
        <li className={`${styles.item} pb-4`} key={index}>
            <img src={ingredient.image} alt={`Ingredient ${ingredient._id}`}/>
            <h4>{ingredient.name}</h4>
            <section className={`${styles.price}`}>
                <span className={`text_type_digits-default  text`}>
                    {amount} x {ingredient.price}
                </span>
                <CurrencyIcon type={"primary"} />
            </section>
        </li>
    )
}