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
