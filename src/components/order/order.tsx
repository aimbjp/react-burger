import { FC, useState, useEffect } from "react";
import styles from './order.module.css';
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { fetchGetOrder } from "../../services/api/api-norma";
import { Loader } from "../elements";
import { ItemIngredient } from "./item-ingredient/item-ingredient";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { calculateCostOrder } from "../../utils/functions/order";
import { OrderStatus, orderStatusClasses, OrderStatusKey } from "../../utils/types/order-types";
import {IMessageOrder, TIngredient} from "../../services/types/model-data";



export const Order: FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<IMessageOrder | null>(null);
    const [flagOrderFind, setFlagOrderFind] = useState<boolean>(false);

    useEffect(() => {
        fetchGetOrder(id || '')
            .then(response => {
                if (response.success) {
                    response.orders.length < 2
                        ? setOrder(response.orders[0])
                        : setOrder(null)
                    ;
                    setFlagOrderFind(true);
                }
            })
            .catch(err => {
                setFlagOrderFind(false);
                console.error("Failed to fetch order:", err);
            });
    }, [id]);

    const ingredientsAll = useSelector(store => store.ingredientsReducer.ingredients);

    const chosenBun = order?.ingredients
        .map(id => ingredientsAll.find(ing => ing._id === id && ing.type === 'bun'))
        .filter(Boolean)[0] || null;

    const chosenIngredients = order?.ingredients
        .map(id => ingredientsAll.find(ing => ing._id === id && ing.type !== 'bun'))
        .filter(ing => ing !== undefined) as TIngredient[] || [];

    const costOrder = calculateCostOrder(chosenBun, chosenIngredients);

    const ingredientCounts: [number, TIngredient][] = [];
    const uniqueIngredients = Array.from(new Set(chosenIngredients));

    uniqueIngredients.forEach(ingredient => {
        const count = chosenIngredients.filter(ing => ing === ingredient).length;
        ingredientCounts.push([count, ingredient]);
    });

    return (
        <section className={`ml-8 mr-8 ${styles.order}`}>
                {!flagOrderFind ? (
                <Loader />
                ) : (
                order ? (
                            <>
                            <span className="text text_type_digits-default pb-10">#{order.number}</span>
                <h2 className={`pb-3 text text_type_main-large`}>{order.name}</h2>
                <span className={`pb-15 text ${orderStatusClasses[OrderStatus[order.status as OrderStatusKey]]}`}>{OrderStatus[order.status as OrderStatusKey]}</span>
                <h3 className={'text text_type_main-medium pb-6'}>
                    Состав:
                </h3>
                <ul className={`text text_type_main-default pt-1 ${styles.list}`}>
                    {chosenBun && <ItemIngredient ingredient={chosenBun} amount={2} index={-1}/>}
                    {ingredientCounts.map(((value, index) => (
                        <ItemIngredient key={value[1]._id} ingredient={value[1]} amount={value[0]} index={index}/>
                    )))}
                </ul>
                <div className={`${styles.summarize} pb-6 pt-10`}>
                    <FormattedDate date={new Date(order.createdAt)} className={`text text_color_inactive`}/>
                    <p className={`text text_type_digits-default ${styles.price}`}>
                        <span className={`pr-2`}>{costOrder}</span>
                        <CurrencyIcon type="primary"/>
                    </p>
                </div>
            </>
                ) : (
                    <span className={`text text_type_main-large text_color_error`} style={{display:"grid", justifyContent: "center", alignItems: "center", height: '80vh'}}>Заказ не найден</span>
                )
            )}
        </section>
    );
};
