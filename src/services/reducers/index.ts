import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { userReducer } from "./user";
import {wsReducer} from "./websocket";

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    userReducer: userReducer,
    webSocket: wsReducer,
});