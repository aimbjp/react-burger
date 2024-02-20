import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
});