import React, { useMemo } from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-list/constructor-list";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import ConstructorOfferInfo from "./constructer-offer-info/constructor-offer-info";
import {
    addIngredientToConstructor,
    getOrder,
} from "../../services/thunk/ingredients";
import {useDrop} from "react-dnd";
import {useNavigate} from "react-router-dom";
import {DragItem} from "./types-constructor";
import {COLLAPSE_ORDER} from "../../services/actions-types/ingredient-types";
import {useDispatch, useSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/model-data";
import {calculateCostOrder} from "../../utils/functions/order";



function BurgerConstructor(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
    const modalOpen = useSelector((state) => state.ingredientsReducer.modalOrderOpen);
    const chosenBun = useSelector((state) => state.ingredientsReducer.constructorIngredients.bun);
    const chosenIngredients = useSelector((state) => state.ingredientsReducer.constructorIngredients.ingredients);
    const email = useSelector((state) => state.userReducer.user.email) !== '';

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

            dispatch(getOrder(ingredientsIdsArray));
        }
        else {
            if (ingredients.length > 0 && chosenIngredients.length < 1) dispatch(addIngredientToConstructor(ingredients[1]));

            if (!chosenBun && ingredients.length > 0) {
                const firstBun: TIngredient | undefined = ingredients.find(ingredient => ingredient.type === 'bun');
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
        <section className={`${styles.burgerConstructor} pt-25 pb-10`} ref={dropRef} data-testid="constructor-area">
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
                <Button htmlType="button" type="primary" size="large" onClick={handleOfferClick} data-testid="order-button">
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