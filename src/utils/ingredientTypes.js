import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
});

export default ingredientType;