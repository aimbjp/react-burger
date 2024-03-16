import React, { useMemo } from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-list/constructor-list";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import ConstructorOfferInfo from "./constructer-offer-info/constructor-offer-info";
import { useDispatch, useSelector } from "react-redux";
import {
    addIngredientToConstructor,
    COLLAPSE_ORDER,
    getOrder,
} from "../../services/actions/ingredients";
import {useDrop} from "react-dnd";
import {useNavigate} from "react-router-dom";
import {DragItem, IIngredient, IRootState} from "./types-constructor";

function calculateCostOrder(bun: IIngredient | null, ingredients: Array<IIngredient>) {
    const bunCost = bun ? bun.price * 2 : 0;
    const ingredientsCost = ingredients.length > 0 ? ingredients.reduce((acc, ing) => acc + ing.price, 0) : 0;
    return bunCost + ingredientsCost;
}

function BurgerConstructor(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ingredients = useSelector((store: IRootState) => store.ingredientsReducer.ingredients);
    const modalOpen = useSelector((state: IRootState) => state.ingredientsReducer.modalOrderOpen);
    const chosenBun = useSelector((state: IRootState) => state.ingredientsReducer.constructorIngredients.bun);
    const chosenIngredients = useSelector((state: IRootState) => state.ingredientsReducer.constructorIngredients.ingredients);
    const email = useSelector((state: IRootState) => state.userReducer.user.email) !== '';

    // const isAuthChecked = useSelector(store => store.userReducer.tokenChecked);


    const costOrder: number = useMemo(() => {
        return calculateCostOrder(chosenBun, chosenIngredients)
    }, [chosenBun, chosenIngredients])


    const handleOfferClick = () => {

        if (!email ) {
            navigate('/login')
            return;
        }

        if (chosenIngredients.length && chosenBun) {
            const chosenBunId: string = chosenBun._id;
            const chosenIngredientsIds: string[] = chosenIngredients.map(ing => ing._id);
            const ingredientsIdsArray: string[] = [chosenBunId, ...chosenIngredientsIds];

            const orderDetails: string = JSON.stringify({ingredients: ingredientsIdsArray});

            //TODO: remove ts ignore after type of store
            // @ts-ignore
            dispatch(getOrder(orderDetails));
        }
        else {
            if (ingredients.length > 0 && chosenIngredients.length < 1) dispatch(addIngredientToConstructor(ingredients[1]));

            if (!chosenBun && ingredients.length > 0) {
                const firstBun: IIngredient | undefined = ingredients.find(ingredient => ingredient.type === 'bun');
                if (firstBun) {
                    dispatch(addIngredientToConstructor(firstBun));
                }
            }
        }
    };

    const handleCloseModal = () => {
        dispatch({type: COLLAPSE_ORDER})
    };

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: DragItem, monitor) {
            const ingredientToAdd = ingredients.find(ing => ing._id === item.id);
            if (ingredientToAdd) {
                dispatch(addIngredientToConstructor(ingredientToAdd));
            }
        },
    });

    return(
        <section className={`${styles.burgerConstructor} pt-25 pb-10`} ref={dropRef}>
            {(chosenBun
                && <ConstructorElement
                type="top"
                isLocked={true}
                text={chosenBun.name +" (верх)"}
                price={chosenBun.price}
                thumbnail={chosenBun.image}
                extraClass={styles.blocked} />)
                || <span className={'text text_type_main-medium'}>Перенесите булку</span>
            }

            { (chosenIngredients.length > 0
                && <ConstructorList/>)
                || <span className={'text text_type_main-medium'}>А сюда ингредиенты</span>
            }

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
                    <p className="text text_type_digits-medium">{costOrder}</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleOfferClick}>
                    Оформить заказ
                </Button>
            </section>
            {modalOpen && (
                <Modal title="" onClose={handleCloseModal}>
                    <ConstructorOfferInfo />
                </Modal>
            )}
        </section>
    );
}


export default BurgerConstructor;