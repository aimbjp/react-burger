const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse)
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

async function request(url, options = null) {
    url = BURGER_API_URL + url;

    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export const fetchIngredients = () => {
    return request(`/ingredients`);
};

export const fetchOrder = (orderDetails) =>{
    return request(`/orders`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: orderDetails,
    });
}

export const fetchForgotPassword = (email) => {
    return request(`/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: email,
    })
}

export const fetchResetPassword = (payload) => {
    return request(`/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchRegister = (payload) => {
    return request(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogin = (payload) => {
    return request(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogout = (payload) => {
    return request(`/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchGetUserInfo = () => {
    return request(`/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken'),
        },
    })
}

export const fetchUpdateUserInfo = (payload) => {
    return request(`/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken'),
        },
        body: payload,
    })
}