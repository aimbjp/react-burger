import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./reducers";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_ORDERS
} from "./actions-types/ws-types";

const WSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    onOpen:  WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError:  WS_CONNECTION_ERROR,
    onMessage:  WS_GET_ORDERS,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(WSStoreActions)),
});

