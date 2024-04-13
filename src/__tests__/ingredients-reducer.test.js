import { ingredientsReducer, initialState } from '../services/reducers/ingredients';
import * as types from '../services/actions-types/ingredient-types';

describe('Ingredients Reducer', () => {
    it('should create initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    describe('Handling Ingredients', () => {
        it('should handle GET_INGREDIENTS_REQUEST', () => {
            const action = { type: types.GET_INGREDIENTS_REQUEST };
            const expectedState = {
                ...initialState,
                ingredientsRequest: true,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle GET_INGREDIENTS_FAILED', () => {
            const action = { type: types.GET_INGREDIENTS_FAILED };
            const expectedState = {
                ...initialState,
                ingredientsRequest: false,
                ingredientsRequestFailed: true,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle GET_INGREDIENTS_SUCCESS', () => {
            const action = {
                type: types.GET_INGREDIENTS_SUCCESS,
                ingredients: [{ id: '1', name: 'Ingredient 1', price: 100 }]
            };
            const expectedState = {
                ...initialState,
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
                ingredients: [{ id: '1', name: 'Ingredient 1', price: 100 }]
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Handling Ingredient Modals', () => {
        it('should handle GET_ACTIVE_INGREDIENT', () => {
            const action = {
                type: types.GET_ACTIVE_INGREDIENT,
                ingredient: { id: '1', name: 'Ingredient 1' }
            };
            const expectedState = {
                ...initialState,
                activeIngredient: { id: '1', name: 'Ingredient 1' },
                modalIngredientOpen: true,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle COLLAPSE_ACTIVE_INGREDIENT', () => {
            const action = { type: types.COLLAPSE_ACTIVE_INGREDIENT };
            const expectedState = {
                ...initialState,
                activeIngredient: null,
                modalIngredientOpen: false,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Handling Order Operations', () => {
        it('should handle GET_ORDER_REQUEST', () => {
            const action = { type: types.GET_ORDER_REQUEST };
            const expectedState = {
                ...initialState,
                modalOrderOpen: true,
                orderRequest: true,
                order: null,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle GET_ORDER_SUCCESS', () => {
            const action = {
                type: types.GET_ORDER_SUCCESS,
                order: { id: '1', status: 'completed' }
            };
            const expectedState = {
                ...initialState,
                modalOrderOpen: true,
                orderRequest: false,
                orderRequestFailed: false,
                order: { id: '1', status: 'completed' }
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle GET_ORDER_FAILED', () => {
            const action = { type: types.GET_ORDER_FAILED };
            const expectedState = {
                ...initialState,
                modalOrderOpen: true,
                orderRequest: false,
                orderRequestFailed: true,
                order: null,
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle COLLAPSE_ORDER', () => {
            const action = { type: types.COLLAPSE_ORDER };
            const expectedState = {
                ...initialState,
                modalOrderOpen: false,
                orderRequest: false,
                order: null,
                constructorIngredients: {
                    bun: null,
                    ingredients: []
                }
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Constructor Operations', () => {
        it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
            const action = {
                type: types.ADD_INGREDIENT_TO_CONSTRUCTOR,
                ingredient: { id: '2', name: 'Ingredient 2', uniqueId: 'unique_2' }
            };
            const expectedState = {
                ...initialState,
                constructorIngredients: {
                    ...initialState.constructorIngredients,
                    ingredients: [...initialState.constructorIngredients.ingredients, action.ingredient]
                }
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle ADD_BUN_TO_CONSTRUCTOR', () => {
            const action = {
                type: types.ADD_BUN_TO_CONSTRUCTOR,
                bun: { id: '1', name: 'Bun 1', type: 'bun' }
            };
            const expectedState = {
                ...initialState,
                constructorIngredients: {
                    ...initialState.constructorIngredients,
                    bun: action.bun,
                }
            };
            expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
            const initialStateWithIngredients = {
                ...initialState,
                constructorIngredients: {
                    ...initialState.constructorIngredients,
                    ingredients: [
                        { id: '2', name: 'Ingredient 2', uniqueId: 'unique_2' },
                        { id: '3', name: 'Ingredient 3', uniqueId: 'unique_3' }
                    ]
                }
            };
            const action = {
                type: types.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
                payload: 'unique_2'
            };
            const expectedState = {
                ...initialStateWithIngredients,
                constructorIngredients: {
                    ...initialStateWithIngredients.constructorIngredients,
                    ingredients: initialStateWithIngredients.constructorIngredients.ingredients.filter(
                        ingredient => ingredient.uniqueId !== action.payload
                    ),
                },
            };
            expect(ingredientsReducer(initialStateWithIngredients, action)).toEqual(expectedState);
        });

        it('should handle MOVE_CONSTRUCTOR_INGREDIENT', () => {
            const initialStateWithIngredients = {
                ...initialState,
                constructorIngredients: {
                    ...initialState.constructorIngredients,
                    ingredients: [
                        { id: '2', name: 'Ingredient 2', uniqueId: 'unique_2' },
                        { id: '3', name: 'Ingredient 3', uniqueId: 'unique_3' }
                    ]
                }
            };
            const action = {
                type: types.MOVE_CONSTRUCTOR_INGREDIENT,
                payload: { dragIndex: 0, hoverIndex: 1 }
            };
            const expectedState = {
                ...initialStateWithIngredients,
                constructorIngredients: {
                    ...initialStateWithIngredients.constructorIngredients,
                    ingredients: [
                        initialStateWithIngredients.constructorIngredients.ingredients[1],
                        initialStateWithIngredients.constructorIngredients.ingredients[0]
                    ]
                }
            };
            expect(ingredientsReducer(initialStateWithIngredients, action)).toEqual(expectedState);
        });
    });


});
