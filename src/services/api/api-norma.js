const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(response) {
    if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
    }
    return response.json();
}

function request(url, options = null) {
    return fetch(url, options).then(checkResponse)
}

export const fetchIngredients = () => {
    return request(`${baseUrl}/ingredients`);
};

export const fetchOrder = (orderDetails) =>{
    return request(`${baseUrl}/orders`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: orderDetails,
    });
}
