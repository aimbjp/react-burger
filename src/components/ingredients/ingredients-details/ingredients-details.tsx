import styles from './ingredients-details.module.css';
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {IRootState} from "../../constructor/types-constructor";

export default function IngredientsDetails () {
    let { ingredientId } = useParams();
    const activeIngredient = useSelector((store: IRootState) => store.ingredientsReducer.ingredients).find(ing => ing._id === ingredientId);


    return(
        <>
            <section className={styles.details}>
            <img src={activeIngredient && activeIngredient.image_large} alt={activeIngredient && activeIngredient.name}/>
            <h3 className="text text_type_main-medium pt-4">{activeIngredient && activeIngredient.name}</h3>
            <ul className={`${styles.list_energy_value} pb-15 pt-8`}>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Калории, ккал
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient && activeIngredient.calories}
                    </span>
                </li>
                <li className={`${styles.list_energy_value__element} `}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Белки, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient && activeIngredient.proteins}
                    </span>
                </li>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Жиры, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient && activeIngredient.fat}
                    </span>
                </li>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Углеводы, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient && activeIngredient.carbohydrates}
                    </span>
                </li>
            </ul>
        </section>
        </>
    )
}