import { FC } from "react";
import { useSelector } from "../../../../../services/hooks";
import styles from './item-icons.module.css';

interface IItemIcons {
    ingredients: string[];
}

export const ItemIcons: FC<IItemIcons> = ({ ingredients }) => {
    const ingredientsAll = useSelector(store => store.ingredientsReducer.ingredients);

    const icons: string[] = [];
    ingredients.slice(0, 5).forEach(ingredientId => {
        const ingredient = ingredientsAll.find(ing => ing._id === ingredientId);
        if (ingredient && ingredient.image) {
            icons.push(ingredient.image);
        }
    });

    const remainingCount = Math.max(0, ingredients.length - 5);
    let iconNext: string = '';

    if (remainingCount > 0) {
        const nextIngredientId = ingredients[5]; // Получаем ID следующего ингредиента
        const nextIngredient = ingredientsAll.find(ing => ing._id === nextIngredientId);
        if (nextIngredient && nextIngredient.image) {
            iconNext = nextIngredient.image;
        }
    }

    return (
        <ul className={` ${styles.itemIconsContainer}`}>
            {/* Отображаем первые пять иконок */}
            {icons.map((icon, index) => (
                <li key={index} className={`${styles.iconContainer} ${styles[`icon-${index + 1}`]}`}>
                    <img src={icon} alt={`Icon ${index}`} />
                </li>
            ))}
            {remainingCount > 0 && (
                <li className={`${styles.iconContainer} ${styles.remainingIcon}`}>
                    <img src={iconNext} alt={`Icon`}/>
                    <div className={`${styles.remainingCount} text_type_digits-large`}>{`+${remainingCount}`}</div>
                </li>
            )}
        </ul>
    );
};
