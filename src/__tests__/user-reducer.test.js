import {initialState, userReducer} from "../services/reducers/user";
import * as types from '../services/actions-types/user-types';

describe('User reducer', () => {
    it('should create initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });


    // Тесты для REGISTER actions
    it('should handle REGISTER', () => {
        const action = { type: types.REGISTER };
        const expectedState = {
            ...initialState,
            register: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REGISTER_SUCCESS', () => {
        const action = {
            type: types.REGISTER_SUCCESS,
            email: 'test@example.com',
            name: 'Test User'
        };
        const expectedState = {
            ...initialState,
            user: { email: 'test@example.com', name: 'Test User' },
            register: false,
            registerFailed: false
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REGISTER_FAILED', () => {
        const action = {
            type: types.REGISTER_FAILED,
            email: 'test@example.com',
            name: 'Test User'
        };
        const expectedState = {
            ...initialState,
            register: false,
            registerFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

// Тесты для CHECK_USER_AUTH actions
    it('should CHECK_USER_AUTH', () => {
        const action = {
            type: types.CHECK_USER_AUTH
        };
        const expectedState = {
            ...initialState,
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    })

    it('should CHECK_USER_AUTH_FAILED', () => {
        const action = {
            type: types.CHECK_USER_AUTH_FAILED
        };
        const expectedState = {
            ...initialState,
            tokenFailed: true,
            tokenChecked: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    })

    it('should CHECK_USER_AUTH_SUCCESS', () => {
        const action = {
            type: types.CHECK_USER_AUTH_SUCCESS
        };
        const expectedState = {
            ...initialState,
            tokenFailed: false,
            tokenChecked: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    })

// Тесты для AUTHORIZATION actions
    it('should handle AUTHORIZATION', () => {
        const action = { type: types.AUTHORIZATION };
        const expectedState = {
            ...initialState,
            authorization: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle AUTHORIZATION_FAILED', () => {
        const action = { type: types.AUTHORIZATION_FAILED };
        const expectedState = {
            ...initialState,
            authorization: false,
            authorizationFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle AUTHORIZATION_SUCCESS', () => {
        const action = {
            type: types.AUTHORIZATION_SUCCESS,
            email: 'user@example.com',
            name: 'User Name'
        };
        const expectedState = {
            ...initialState,
            authorization: false,
            authorizationFailed: false,
            user: {
                email: 'user@example.com',
                name: 'User Name'
            }
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для LOGOUT actions
    it('should handle LOGOUT', () => {
        const action = { type: types.LOGOUT };
        const expectedState = {
            ...initialState,
            logout: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOGOUT_FAILED', () => {
        const action = { type: types.LOGOUT_FAILED };
        const expectedState = {
            ...initialState,
            logout: false,
            logoutFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOGOUT_SUCCESS', () => {
        const action = { type: types.LOGOUT_SUCCESS };
        const expectedState = {
            ...initialState,
            tokenChecked: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_USER_INFO actions
    it('should handle GET_USER_INFO', () => {
        const action = { type: types.GET_USER_INFO };
        const expectedState = {
            ...initialState,
            getUserInfo: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_INFO_FAILED', () => {
        const action = { type: types.GET_USER_INFO_FAILED };
        const expectedState = {
            ...initialState,
            getUserInfo: false,
            getUserInfoFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_INFO_SUCCESS', () => {
        const action = {
            type: types.GET_USER_INFO_SUCCESS,
            email: 'user@example.com',
            name: 'User Name'
        };
        const expectedState = {
            ...initialState,
            getUserInfo: false,
            getUserInfoFailed: false,
            user: {
                ...initialState.user,
                email: 'user@example.com',
                name: 'User Name'
            }
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_USER_INFO actions
    it('should handle UPDATE_USER_INFO', () => {
        const action = { type: types.UPDATE_USER_INFO };
        const expectedState = {
            ...initialState,
            updateUserInfo: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_USER_INFO_FAILED', () => {
        const action = { type: types.UPDATE_USER_INFO_FAILED };
        const expectedState = {
            ...initialState,
            updateUserInfo: false,
            updateUserInfoFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_USER_INFO_SUCCESS', () => {
        const action = {
            type: types.UPDATE_USER_INFO_SUCCESS,
            email: 'update@example.com',
            name: 'Updated Name'
        };
        const expectedState = {
            ...initialState,
            updateUserInfo: false,
            updateUserInfoFailed: false,
            user: {
                ...initialState.user,
                email: 'update@example.com',
                name: 'Updated Name'
            }
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для CHECK_EMAIL_EXIST actions
    it('should handle CHECK_EMAIL_EXIST', () => {
        const action = { type: types.CHECK_EMAIL_EXIST };
        const expectedState = {
            ...initialState,
            checkEmailExist: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CHECK_EMAIL_EXIST_FAILED', () => {
        const action = { type: types.CHECK_EMAIL_EXIST_FAILED };
        const expectedState = {
            ...initialState,
            checkEmailExist: false,
            checkEmailExistFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CHECK_EMAIL_EXIST_SUCCESS', () => {
        const action = { type: types.CHECK_EMAIL_EXIST_SUCCESS };
        const expectedState = {
            ...initialState,
            checkEmailExist: false,
            checkEmailExistFailed: false,
            emailChecked: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для CHANGE_FORGOT_PASSWORD_EMAIL
    it('should handle CHANGE_FORGOT_PASSWORD_EMAIL', () => {
        const action = { type: types.CHANGE_FORGOT_PASSWORD_EMAIL };
        const expectedState = {
            ...initialState,
            emailChecked: false
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для REMIND_PASSWORD
    it('should handle REMIND_PASSWORD', () => {
        const action = { type: types.REMIND_PASSWORD };
        const expectedState = {
            ...initialState,
            emailChecked: false,
            resetPasswordEnd: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для RESET_PASSWORD actions
    it('should handle RESET_PASSWORD', () => {
        const action = { type: types.RESET_PASSWORD };
        const expectedState = {
            ...initialState,
            resetPassword: true,
            resetPasswordSuccess: false
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        const action = { type: types.RESET_PASSWORD_FAILED };
        const expectedState = {
            ...initialState,
            resetPasswordFailed: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const action = { type: types.RESET_PASSWORD_SUCCESS };
        const expectedState = {
            ...initialState,
            resetPassword: false,
            resetPasswordFailed: false,
            resetPasswordSuccess: true,
            resetPasswordEnd: true,
            emailChecked: false
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

})