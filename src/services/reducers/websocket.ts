import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS, WS_CONNECTION_CLOSE
} from '../actions-types/ws-types';
import {TWSActions} from "../types/websocket";
import {IMessage, IMessageOrder} from "../types/model-data";

type TWSState = {
    wsConnected: boolean;
    messages?: IMessage;
    orders: IMessageOrder[];
    total: number;
    totalToday: number;

    error?: Event;
}

export const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: { ...state.error, eventPhase: action.payload },
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...initialState
            };
        case WS_CONNECTION_CLOSE:
            return {
                ...initialState
            };

        case WS_GET_ORDERS:
            const { orders } = action.payload;
            if (Array.isArray(orders)) {
                return {
                    ...state,
                    error: undefined,
                    messages: action.payload,
                    orders: [ ...orders]
                };
            } else {
                return initialState;
            }

        default:
            return state;
    }
};