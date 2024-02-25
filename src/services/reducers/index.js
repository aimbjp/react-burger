import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    userReducer: userReducer,
});