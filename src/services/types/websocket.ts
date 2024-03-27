import {
    WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../actions-types/ws-types";
import {IMessage} from "./model-data";

export interface IWebSocketStart {
    readonly type: typeof WS_CONNECTION_START;
    payload: string;
}
export interface IWebSocketClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWebSocketClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWebSocketSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWebSocketError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: string;
}
export interface IWebSocketGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    payload: IMessage;
}


export type TWSActions =
    | IWebSocketStart
    | IWebSocketClose
    | IWebSocketClosed
    | IWebSocketSuccess
    | IWebSocketError
    | IWebSocketGetOrders
    ;