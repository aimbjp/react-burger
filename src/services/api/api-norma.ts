const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response): Promise<any> => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
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

async function request(url: string, options?: RequestInit | undefined) {
    url = BURGER_API_URL + url;

    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); // Обновляем токен

            if (!options) {
                options = {};
            }

            if (!options.headers) {
                options.headers = new Headers();
            }

            if (options.headers instanceof Headers) {
                options.headers.set('authorization', `Bearer ${refreshData.accessToken}`);
            } else if (Array.isArray(options.headers)) {
                options.headers.push(['authorization', `Bearer ${refreshData.accessToken}`]);
            } else {
                options.headers['authorization'] = `Bearer ${refreshData.accessToken}`;
            }

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}


export const fetchIngredients = () => {
    return request(`/ingredients`);
};

export const fetchOrder = (orderDetails: string) =>{
    return request(`/orders`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken') || ''
        },
        body: orderDetails,
    });
}

export const fetchForgotPassword = (email: string) => {
    return request(`/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: email,
    })
}

export const fetchResetPassword = (payload: string) => {
    return request(`/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchRegister = (payload: string) => {
    return request(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogin = (payload: string) => {
    return request(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogout = (payload: string) => {
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
            'authorization': localStorage.getItem('accessToken') || '',
        },
    })
}

export const fetchUpdateUserInfo = (payload: string) => {
    return request(`/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken') || '',
        },
        body: payload,
    })
}