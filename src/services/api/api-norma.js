const baseUrl = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            return response.json();
        });
};

export const fetchOrderID = (orderDetails) =>{
    return fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: orderDetails,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            return response.json();
        });
}