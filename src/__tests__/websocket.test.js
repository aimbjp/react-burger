import { wsReducer, initialState } from '../services/reducers/websocket';
import * as types from '../services/actions-types/ws-types';

describe('WebSocket Reducer', () => {
    it('should create initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = { type: types.WS_CONNECTION_SUCCESS };
        const expectedState = {
            ...initialState,
            error: undefined,
            wsConnected: true,
        };
        expect(wsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        const action = { type: types.WS_CONNECTION_ERROR, payload: 3 };
        const expectedState = {
            ...initialState,
            error: { eventPhase: 3 },
            wsConnected: false
        };
        expect(wsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_CLOSED })).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_CLOSE', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_CLOSE })).toEqual(initialState);
    });

    it('should handle WS_GET_ORDERS', () => {
        const action = {
            type: types.WS_GET_ORDERS,
            payload: {
                orders: [
                    { id: 'order1', status: 'completed', price: 300 },
                    { id: 'order2', status: 'pending', price: 450 }
                ],
            }
        };
        const expectedState = {
            ...initialState,
            error: undefined,
            messages: action.payload,
            orders: action.payload.orders,
        };
        expect(wsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should reset to initial state if WS_GET_ORDERS has no valid orders', () => {
        const action = {
            type: types.WS_GET_ORDERS,
            payload: {}
        };
        expect(wsReducer(initialState, action)).toEqual(initialState);
    });
});
