import React, { useReducer, useEffect } from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-list/constructor-list";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import ConstructorOfferInfo from "./constructer-offer-info/constructor-offer-info";
import {useDispatch, useSelector} from "react-redux";
import {
    addIngredientToConstructor,
    COLLAPSE_ORDER,
    getOrder,
} from "../../services/actions/ingredients";
import {useDrop} from "react-dnd";


function reducerCostOrder(state, action){
    switch (action.type) {
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

    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
    const modalOpen = useSelector(store => store.ingredientsReducer.modalOrderOpen);
    const chosenBun = useSelector(store => store.ingredientsReducer.constructorIngredients.bun); //0 or 7
    const chosenIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients.ingredients) ;

    const [costOrder, dispatchCostOrder] = useReducer(reducerCostOrder,  initialStateCostOrder, undefined)

    useEffect(() => {
        if (!chosenBun && ingredients.length > 0) {
            const firstBun = ingredients.find(ingredient => ingredient.type === 'bun');
            if (firstBun) {
                dispatch(addIngredientToConstructor(firstBun));
            }
        }
    }, [chosenBun, ingredients, dispatch]);


    useEffect(() => {
        if (ingredients.length > 0 && chosenBun) {
            const cost = calculateCostOrder(chosenBun, chosenIngredients);
            dispatchCostOrder({type: "add", payload: cost});
        }
    }, [ingredients.length, chosenBun, chosenIngredients]);


    const handleOfferClick = () => {

        if (chosenIngredients.length > 0) {
            const chosenBunId = chosenBun._id;
            const chosenIngredientsIds = chosenIngredients.map(ing => ing._id);
            const ingredientsIdsArray = [chosenBunId, ...chosenIngredientsIds];

            const orderDetails = JSON.stringify({ingredients: ingredientsIdsArray});


            dispatch(getOrder(orderDetails));
        }
        else {
            dispatch(addIngredientToConstructor(ingredients[1]));
        }
    };

    const handleCloseModal = () => {
        dispatch({type: COLLAPSE_ORDER})
    };

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item, monitor) {
            const ingredientToAdd = ingredients.find(ing => ing._id === item.id);
            if (ingredientToAdd) {
                dispatch(addIngredientToConstructor(ingredientToAdd));
            }
        },
    });

    return(
        <section className={`${styles.burgerConstructor} pt-25 pb-10`} ref={dropRef}>
            {chosenBun && <ConstructorElement
                type="top"
                isLocked={true}
                text={chosenBun.name +" (верх)"}
                price={chosenBun.price}
                thumbnail={chosenBun.image}
                extraClass={styles.blocked}
            />}

                <ConstructorList />

            {chosenBun && <ConstructorElement
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
                    <ConstructorOfferInfo/>
                </Modal>
            )}
        </section>
    );
}


export default BurgerConstructor;