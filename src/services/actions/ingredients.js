import {fetchIngredients, fetchOrder} from "../api/api-norma";
import { v4 as uuidv4 } from 'uuid';

export const GET_INGREDIENTS_REQUEST = 'REQUEST_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ACTIVE_INGREDIENT = 'GET_ACTIVE_INGREDIENT';
export const COLLAPSE_ACTIVE_INGREDIENT = 'COLLAPSE_ACTIVE_INGREDIENT';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const COLLAPSE_ORDER = 'COLLAPSE_ORDER';

export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';

export function getIngredients() {
    return function(dispatch) {
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

export function getOrder(orderDetails){
    return function(dispatch) {
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

export function addIngredientToConstructor(ingredient) {
    if (ingredient.type === 'bun') {
        return {
            type: ADD_BUN_TO_CONSTRUCTOR,
            bun: ingredient,
        };
    } else {
        return {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            ingredient: {
                ...ingredient,
                uniqueId: uuidv4(),
            },
        };
    }
}

export function removeIngredientFromConstructor(uniqueId) {
    return {
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        payload: uniqueId,
    };
}


export const moveConstructorIngredient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        payload: { dragIndex, hoverIndex }
    };
};



