import styles from './ingredients-details.module.css';
import {useSelector} from "react-redux";

export default function IngredientsDetails () {

    const activeIngredient = useSelector(store => store.ingredientsReducer.activeIngredient);

    return(
        <section className={styles.details}>
            <img src={activeIngredient.image_large} alt={activeIngredient.name}/>
            <h3 className="text text_type_main-medium pt-4">{activeIngredient.name}</h3>
            <ul className={`${styles.list_energy_value} pb-15 pt-8`}>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Калории, ккал
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient.calories}
                    </span>
                </li>
                <li className={`${styles.list_energy_value__element} `}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Белки, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient.proteins}
                    </span>
                </li>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Жиры, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient.fat}
                    </span>
                </li>
                <li className={styles.list_energy_value__element}>
                    <p className="text text_type_main-default text_color_inactive" >
                        Углеводы, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive" >
                        {activeIngredient.carbohydrates}
                    </span>
                </li>
            </ul>
        </section>
    )
}