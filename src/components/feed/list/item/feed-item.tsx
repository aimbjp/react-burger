import styles from './feed-item.module.css';
import {IOrder} from "../../types-feed";
import {FC, useMemo} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {ItemIcons} from "./item-icons/item-icons";
import {calculateCostOrder} from "../../../../utils/functions/order";
import {useSelector} from "../../../../services/hooks";
import {TIngredient} from "../../../../services/types/model-data";
import {OrderStatus, orderStatusClasses, OrderStatusKey} from "../../../../utils/types/order-types";

interface IFeedItem {
    order: IOrder;
    index: number;
}

export  const FeedItem: FC<IFeedItem> = ({order, index}) => {

    const { ingredients, name, number, createdAt } = order;
    const ingredientsAll = useSelector(store => store.ingredientsReducer.ingredients);

    const chosenBun: TIngredient | null = ingredients
        .map(id => ingredientsAll.find(ing => ing._id === id && ing.type === 'bun'))
        .filter(Boolean)[0] || null;

    const chosenIngredients: TIngredient[] = ingredients
        .map(id => ingredientsAll.find(ing => ing._id === id && ing.type !== 'bun'))
        .filter(ing => ing !== undefined)
        .map(ing => ing as TIngredient);

    const costOrder: number = useMemo(() => {
        return calculateCostOrder(chosenBun, chosenIngredients);
    }, [chosenBun, chosenIngredients]);



    return(
        <li className={`${styles.item}`}>
            <section className={`mt-6 mb-6 ${styles.header}`}>
                <span className={`text text_type_digits-default`}>#{number}</span>
                <FormattedDate date={new Date(createdAt)}
                               className={`text text_color_inactive text_type_main-default`}/>

            </section>
            <h2 className={`text text_type_main-medium mb-6 ${styles.name}`}>
                {name}
            </h2>
            <span
                className={`pb-3 text ${orderStatusClasses[OrderStatus[order.status as OrderStatusKey]]}`}>{OrderStatus[order.status as OrderStatusKey]}</span>

            <section className={`mb-6 ${styles.ingredients}`}>
                <ItemIcons ingredients={ingredients}/>
                <span className={`${styles.price}`}>
                    <p className="text text_type_digits-default">{costOrder}</p>
                    <CurrencyIcon type="primary"/>
                </span>
            </section>
        </li>
    )
}
