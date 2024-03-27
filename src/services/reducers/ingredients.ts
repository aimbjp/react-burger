import {
    GET_ACTIVE_INGREDIENT, COLLAPSE_ACTIVE_INGREDIENT,
    GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS,
    GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, COLLAPSE_ORDER,
    ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR, MOVE_CONSTRUCTOR_INGREDIENT
} from '../actions-types/ingredient-types';
import {TIngredient, TOrderDetails} from "../types/model-data";
import {ActionIngredientType} from "../types/ingredients";

export interface IInitialState {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsRequestFailed: boolean;

    constructorIngredients: {
        bun: TIngredient | null;
        ingredients: TIngredient[];
    };

    activeIngredient: TIngredient | null;
    modalIngredientOpen: boolean;

    order: TOrderDetails | null;
    orderRequest: boolean;
    orderRequestFailed: boolean;
    modalOrderOpen: boolean;
}


const initialState: IInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsRequestFailed: false,

    constructorIngredients: {
        bun: null,
        ingredients: []
    },

    activeIngredient: null,
    modalIngredientOpen: false,

    order: null,
    orderRequest: false,
    orderRequestFailed: false,
    modalOrderOpen: false,

};

export function ingredientsReducer(state = initialState, action: ActionIngredientType) {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsRequestFailed: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
                ingredients: action.ingredients,
            }
        }
        case GET_ACTIVE_INGREDIENT: {
            return {
                ...state,
                activeIngredient: action.ingredient,
                modalIngredientOpen: true,
            }
        }
        case COLLAPSE_ACTIVE_INGREDIENT: {
            return {
                ...state,
                activeIngredient: null,
                modalIngredientOpen: false,
            }
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                modalOrderOpen: true,
                orderRequest: true,
                order: null,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                modalOrderOpen: true,
                orderRequest: false,
                orderRequestFailed: false,
                order: action.order,

            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                modalOrderOpen: true,
                orderRequest: false,
                orderRequestFailed: true,
                order: null,
            }
        }
        case COLLAPSE_ORDER: {
            const newConstructorIngredients = !state.orderRequestFailed || state.order !== null
                ? { bun: null, ingredients: [] }
                : { ...state.constructorIngredients };

            return {
                ...state,
                modalOrderOpen: false,
                orderRequest: false,
                order: null,
                constructorIngredients: newConstructorIngredients
            };
        }
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    ingredients: [...state.constructorIngredients.ingredients, action.ingredient]
                }
            }
        }
        case ADD_BUN_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    bun: action.bun,
                }
            }
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    ingredients: state.constructorIngredients.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload),
                },
            };
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const { dragIndex, hoverIndex } = action.payload;
            const newIngredients = [...state.constructorIngredients.ingredients];
            const draggedIngredient = newIngredients.splice(dragIndex, 1)[0];
            newIngredients.splice(hoverIndex, 0, draggedIngredient);

            return {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    ingredients: newIngredients
                }
            };
        }
        default:
            return state;
    }
}