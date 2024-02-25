import {
    fetchForgotPassword,
    fetchGetUserInfo,
    fetchLogin,
    fetchLogout,
    fetchRegister, fetchResetPassword,
    fetchUpdateUserInfo
} from "../api/api-norma";

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const AUTHORIZATION = 'AUTHORIZATION';
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const CHECK_EMAIL_EXIST = 'CHECK_EMAIL_EXIST';
export const CHECK_EMAIL_EXIST_SUCCESS = 'CHECK_EMAIL_EXIST_SUCCESS';
export const CHECK_EMAIL_EXIST_FAILED = 'CHECK_EMAIL_EXIST_FAILED';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED';

export const CHANGE_FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_CHANGE_EMAIL';

export const REMIND_PASSWORD = 'REMIND_PASSWORD';


export function register (payload) {
    return function (dispatch) {
        dispatch({
            type: REGISTER,
        });
        fetchRegister(payload)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        email: res.user.email,
                        name: res.user.name
                    });

                    localStorage.setItem("refreshToken", res.refreshToken);
                    localStorage.setItem("accessToken", res.accessToken);
                }
                else {
                    dispatch({type: REGISTER_FAILED})
                }
            })
            .catch(error => {
                console.error('Ошибка при регистрации: ', error)
                dispatch({type: REGISTER_FAILED})
            })
    }
}

export function login (payload) {
    return function (dispatch) {
        dispatch({type: AUTHORIZATION});
        fetchLogin(payload)
            .then(res => {
                if (res && res.success){
                    dispatch({
                        type: AUTHORIZATION_SUCCESS,
                        email: res.user.email,
                        name: res.user.name
                    });

                    localStorage.setItem("refreshToken", res.refreshToken);
                    localStorage.setItem("accessToken", res.accessToken);
                }
                else {
                    dispatch({type: AUTHORIZATION_FAILED})
                }
            })
            .catch(error => {
                console.error('Ошибка при авторизации: ', error);
            })
    }
}

export function logout(payload) {
    return (dispatch) => {
        dispatch({type: LOGOUT});
        fetchLogout(payload)
            .then(res => {
                if (res && res.success) {
                    dispatch({type: LOGOUT_SUCCESS});
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");

                }
                else {
                    dispatch({type: LOGOUT_FAILED});
                }
            })
            .catch(error => {
                console.error('Ошибка при авторизации: ', error);
            })
    }
}

export function getUserInfo () {
    return async (dispatch) => {
        dispatch({type: GET_USER_INFO});

        try {
            const res = await fetchGetUserInfo();
            if (res && res.success) {
                dispatch({
                    type: GET_USER_INFO_SUCCESS,
                    email: res.user.email,
                    name: res.user.name
                });
            } else {
                dispatch({type: GET_USER_INFO_FAILED});
            }
        } catch (error) {
            dispatch({type: GET_USER_INFO_FAILED});
            throw error;
        }
    }
}

export function updateUserInfo (payload) {
    return (dispatch) => {
        dispatch({type: UPDATE_USER_INFO});

        fetchUpdateUserInfo(payload)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_INFO_SUCCESS,
                        email: res.user.email,
                        name: res.user.name
                    })
                }
                else{
                    dispatch({type: UPDATE_USER_INFO_FAILED});
                }
            })
    }
}


export const checkUserAuth = () => {
    return (dispatch) => {
        dispatch({type: GET_TOKEN});

        if (localStorage.getItem('accessToken')){
            dispatch(getUserInfo())
                .catch(() => {
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    dispatch({type: GET_TOKEN_FAILED});
                })
                .finally(() => {dispatch({type: GET_TOKEN_SUCCESS});});
        } else {
            dispatch({type: GET_TOKEN_SUCCESS});
        }
    }
}

export const resetPassword = (payload, setErrorToken, setFlag) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD})

        const res = await fetchResetPassword(payload);
        if (res && res.success) {
            dispatch({type: RESET_PASSWORD_SUCCESS});
        } else {
            console.error('error: ', res.message);
            setErrorToken('Неверный код подтверждения');
            setFlag(true);
            dispatch({type: RESET_PASSWORD_FAILED});
        }
    } catch (e) {
        console.error('error: ', e.message);
        setErrorToken('Неверный код подтверждения');
        setFlag(true);
        dispatch({type: RESET_PASSWORD_FAILED});
    }
};

export const checkEmailExist = (email) => {
    return (dispatch) => {
        dispatch({type: CHECK_EMAIL_EXIST});

        fetchForgotPassword(email)
            .then(res => {
                if (res && res.success) {
                    dispatch({type: CHECK_EMAIL_EXIST_SUCCESS});
                } else {
                    console.error('error: ', res.message);
                    dispatch({type: CHECK_EMAIL_EXIST_FAILED});
                }
            })
            .catch(e => {
                console.error('error fetching: ', e)
                dispatch({type: CHECK_EMAIL_EXIST_FAILED});
            })
    }
}

export const changeForgotPasswordEmail = () => {
    return (dispatch) => {
        dispatch({type: CHANGE_FORGOT_PASSWORD_EMAIL})
    }
}

export const remindPassword = () => {
    return (dispatch) => {
        dispatch({type: REMIND_PASSWORD})
    }
}