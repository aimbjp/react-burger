import {Middleware, MiddlewareAPI} from "redux";
import { AppDispatch, RootState} from "../types";
import { TWSStoreActions } from "../types";
import {IMessage} from "../types/model-data";
import {TWSActions} from "../types/websocket";
import {BURGER_ORDERS_WS_URL, refreshToken} from "../api/api-norma";

export const socketMiddleware = (wsActions: TWSStoreActions, withTokenRefresh: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActions) => {
            const { dispatch, } = store;
            const { type } = action;
            const { wsInit,
                wsClose,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;
            if (type === wsInit) {
                socket = new WebSocket(action.payload);//`${wsUrl}?token=${localStorage.getItem('accessToken')}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event.type });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event.type });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: IMessage = JSON.parse(data);


                    if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                        refreshToken().then((refreshData) => {
                            const wssUrl = new URL(BURGER_ORDERS_WS_URL);
                            wssUrl.searchParams.set(
                                "token",
                                refreshData.accessToken.replace("Bearer ", "")
                            );
                            dispatch({ type: wsInit, payload: wssUrl.toString() });
                        });
                    } else {
                        dispatch({
                            type: onMessage,
                            payload: parsedData
                        });
                    }

                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event.type });
                };

                if (type === wsClose) {
                    socket.close();
                }
            }

            next(action);
        };
    }) as Middleware;
}