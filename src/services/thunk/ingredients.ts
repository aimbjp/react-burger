import { fetchIngredients, fetchOrder } from "../api/api-norma";
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    MOVE_CONSTRUCTOR_INGREDIENT,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from "../actions-types/ingredient-types";
import {AppDispatch, AppThunkAction, RootState} from "../types";
import {TIngredient, TOrderDetails} from "../types/model-data";


export function getIngredients(): AppThunkAction {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetchIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        }).catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    };
}

export function getOrder(orderDetails: string[]): AppThunkAction {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetchOrder(orderDetails).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res
                });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        }).catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    };
}

export const addIngredientToConstructor = (ingredient: TIngredient): AppThunkAction => (dispatch: AppDispatch) => {
    if (ingredient.type === 'bun') {
        dispatch({
            type: ADD_BUN_TO_CONSTRUCTOR,
            bun: ingredient,
        });
    } else {
        const uniqueId = uuidv4();
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            ingredient: {
                ...ingredient,
                uniqueId,
            },
        });
    }
};

export const removeIngredientFromConstructor = (uniqueId: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        payload: uniqueId,
    });
};

export const moveConstructorIngredient = (dragIndex: number, hoverIndex: number): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        payload: { dragIndex, hoverIndex }
    });
};
