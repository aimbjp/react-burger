import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR, COLLAPSE_ACTIVE_INGREDIENT, COLLAPSE_ORDER, GET_ACTIVE_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    MOVE_CONSTRUCTOR_INGREDIENT,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from "../actions-types/ingredient-types";
import {TIngredient} from "./model-data";


// Группа GET
export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: TIngredient[];
}

// Группа ADD
export interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    ingredient: TIngredient;
}
export interface IAddBunToConstructorAction {
    readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
    bun: TIngredient;
}

// Группа REMOVE
export interface IRemoveIngredientFromConstructorAction {
    readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    payload: string;
}

// Группа GET_ORDER
export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    order: number;
}
export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

// Группа MOVE
export interface IMoveConstructorIngredientAction {
    readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
    payload: {
        dragIndex: number;
        hoverIndex: number;
    };
}

export interface IGetActiveIngredientAction {
    readonly type: typeof GET_ACTIVE_INGREDIENT;
    ingredient: TIngredient | undefined;
}
export interface ICollapseActiveIngredientAction {
    readonly type: typeof COLLAPSE_ACTIVE_INGREDIENT;
}
export interface ICollapseOrderAction {
    readonly type: typeof COLLAPSE_ORDER;
}


export type ActionIngredientType =
    | IGetIngredientsRequestAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction
    | IAddIngredientToConstructorAction
    | IAddBunToConstructorAction
    | IRemoveIngredientFromConstructorAction
    | IGetOrderSuccessAction
    | IGetOrderRequestAction
    | IGetOrderFailedAction
    | IMoveConstructorIngredientAction
    | IGetActiveIngredientAction
    | ICollapseActiveIngredientAction
    | ICollapseOrderAction;