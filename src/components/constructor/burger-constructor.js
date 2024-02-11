import React, { useState, useContext, useReducer, useEffect, useMemo } from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-item/constructor-list";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import ConstructorOfferInfo from "./constructer-offer-info/constructor-offer-info";
import { IngredientContext } from "../../services/context/ingredient-context"
import { fetchOrderID} from "../../services/api/api-norma";


function reducerCostOrder(state, action){
    switch (action.type) {
        // in future can be separated
        // add for adding some ingredients cost
        // remove for remove some
        case "add":
            return {costOrder: action.payload};
        case "remove":
            return {costOrder: action.payload};
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function calculateCostOrder(bun, ingredients) {
    const bunCost = bun.price * 2;
    const ingredientsCost = ingredients.reduce((acc, ing) => acc + ing.price, 0);
    return bunCost + ingredientsCost;
}

const initialStateCostOrder = {costOrder: 0};

function BurgerConstructor(){
    const [modalOpen, setModalOpen] = useState(false);
    const [offerID, setOfferID] = useState(null);

    const ingredients = useContext(IngredientContext);

    const chosenBun = ingredients[7]; //0 or 7
    const chosenIngredients = useMemo(() => {
        return [ingredients[3], ingredients[5], ingredients[3], ingredients[5]];
    }, [ingredients]);

    const [costOrder, dispatchCostOrder] = useReducer(reducerCostOrder,  initialStateCostOrder, undefined)

    useEffect(() => {
        if (ingredients.length > 0) {
            const cost = calculateCostOrder(chosenBun, chosenIngredients);
            dispatchCostOrder({type: "add", payload: cost});
        }
    }, [ingredients.length, chosenBun, chosenIngredients]);

    const handleOfferClick = () => {
        const chosenBunId = chosenBun._id;
        const chosenIngredientsIds = chosenIngredients.map(ing => ing._id);
        const ingredientsIdsArray = [chosenBunId, ...chosenIngredientsIds];

        const orderDetails = JSON.stringify({ ingredients: ingredientsIdsArray });


        fetchOrderID(orderDetails)
            .then(data => setOfferID(data.order.number))
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setOfferID(null);
    };


    return(
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {ingredients.length > 0 && <ConstructorElement
                type="top"
                isLocked={true}
                text={chosenBun.name +" (верх)"}
                price={chosenBun.price}
                thumbnail={chosenBun.image}
                extraClass={styles.blocked}
            />}

                <ConstructorList chosenIngredients={ingredients.length > 0 ? chosenIngredients : []} />


            {ingredients.length > 0 && <ConstructorElement
                type="bottom"
                isLocked={true}
                text={chosenBun.name +" (низ)"}
                price={chosenBun.price}
                thumbnail={chosenBun.image}
                extraClass={styles.blocked}
            />}
            <section className={styles.price}>
                <span className={`${styles.price} pr-6`}>
                    <p className="text text_type_digits-medium">{costOrder.costOrder}</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => {handleOfferClick()}}>
                    Оформить заказ
                </Button>
            </section>
            {modalOpen && (
                <Modal title="" onClose={handleCloseModal}>
                    <ConstructorOfferInfo offerId={offerID}/>
                </Modal>
            )}
        </section>
    );
}


export default BurgerConstructor;