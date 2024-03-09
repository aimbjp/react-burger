import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    GET_TOKEN,
    GET_TOKEN_FAILED,
    GET_TOKEN_SUCCESS,
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    AUTHORIZATION,
    AUTHORIZATION_FAILED,
    AUTHORIZATION_SUCCESS,
    GET_USER_INFO,
    GET_USER_INFO_FAILED,
    GET_USER_INFO_SUCCESS,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    CHECK_EMAIL_EXIST,
    CHECK_EMAIL_EXIST_SUCCESS, CHECK_EMAIL_EXIST_FAILED,
    CHANGE_FORGOT_PASSWORD_EMAIL, REMIND_PASSWORD
} from "../actions/user";

const initialState = {
    user: {
        email: '',
        name: '',
    },

    register: false,
    registerFailed: false,

    authorization: false,
    authorizationFailed: false,

    logout: false,
    logoutFailed: false,

    getUserInfo: false,
    getUserInfoFailed: false,

    updateUser: false,
    updateUserFailed: false,

    token: false,
    tokenFailed: false,
    tokenChecked: false,

    resetPassword: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: true,
    resetPasswordEnd: false,

    checkEmailExist: false,
    checkEmailExistFailed: false,

    emailChecked: false
};

export function userReducer (state = initialState, action)  {
    switch (action.type) {
        case REGISTER: {
            return {...state, register: true};
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                register: false,
                registerFailed: true,
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                register: false,
                registerFailed: false,
                user: { email: action.email, name: action.name}
            }
        }

        //TODO: change with CHECK_USER_AUTH etc.
        case GET_TOKEN: {
            return {...state, }
        }
        case GET_TOKEN_FAILED: {
            return {...initialState, tokenFailed: true, tokenChecked: true}
        }
        case GET_TOKEN_SUCCESS: {
            return {...state, tokenFailed: false, tokenChecked: true}
        }

        case AUTHORIZATION: {
            return {...state, authorization: true}
        }
        case AUTHORIZATION_FAILED: {
            return {
                ...state,
                authorization: false,
                authorizationFailed: true,
            }
        }
        case AUTHORIZATION_SUCCESS: {
            return {
                ...state,
                authorization: false,
                authorizationFailed: false,
                user: { email: action.email, name: action.name}
            }
        }

        case LOGOUT: {
            return {...state, logout: true}
        }
        case LOGOUT_FAILED: {
            return {...state, logout: false, logoutFailed: true}
        }
        case LOGOUT_SUCCESS: {
            return {...initialState, tokenChecked: true}
        }

        case GET_USER_INFO: {
            return {...state, getUserInfo: true}
        }
        case GET_USER_INFO_FAILED: {
            return {...state, getUserInfo: false, getUserInfoFailed: true}
        }
        case GET_USER_INFO_SUCCESS: {
            return {
                ...state, getUserInfo: false, getUserInfoFailed: false,
                user: {
                    ...state.user,
                    email: action.email,
                    name: action.name
                }
            }
        }

        case UPDATE_USER_INFO: {
            return {...state, updateUserInfo: true}
        }
        case UPDATE_USER_INFO_FAILED: {
            return {...state, updateUserInfo: false, updateUserInfoFailed: true}
        }
        case UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state, updateUserInfo: false, updateUserInfoFailed: false,
                user: {
                    ...state.user,
                    email: action.email,
                    name: action.name
                }
            }
        }

        case CHECK_EMAIL_EXIST: {
            return {...state, checkEmailExist: true}
        }
        case CHECK_EMAIL_EXIST_FAILED: {
            return {...state, checkEmailExist: false, checkEmailExistFailed: true}
        }
        case CHECK_EMAIL_EXIST_SUCCESS: {
            return {...state, checkEmailExist: false, checkEmailExistFailed: false, emailChecked: true}
        }

        case CHANGE_FORGOT_PASSWORD_EMAIL: {
            return {...state, emailChecked: false}
        }

        case REMIND_PASSWORD: {
            return {...state, emailChecked: false, resetPasswordEnd: true }
        }

        case RESET_PASSWORD: {
            return {...state, resetPassword: true, resetPasswordSuccess: false, }
        }
        case RESET_PASSWORD_FAILED: {
            return {...state, resetPasswordFailed: true, }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, resetPassword: false, resetPasswordFailed: false, resetPasswordSuccess: true, resetPasswordEnd: true, emailChecked: false}
        }

        default: return state
    }
}