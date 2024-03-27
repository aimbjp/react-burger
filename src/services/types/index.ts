import {ActionIngredientType} from "./ingredients";
import {ActionUserType} from "./user";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {rootReducer} from "../reducers";
import {
    WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../actions-types/ws-types";
import {TWSActions} from "./websocket";


export type AppActions = ActionIngredientType | ActionUserType | TWSActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsClose: typeof  WS_CONNECTION_CLOSE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_ORDERS,
};