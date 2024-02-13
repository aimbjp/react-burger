import React, {useMemo, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredientFromConstructor } from "../../../services/actions/ingredients";
import styles from './constructor-item.module.css';
import PropTypes from "prop-types";

export const ConstructorItem = ({ ingredient, index, moveIngredient }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const item = useMemo(() => ({ id: ingredient.uniqueId, index }), [ingredient.uniqueId, index]);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredientConstructor',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex !== hoverIndex) {
                moveIngredient(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredientConstructor',
        item,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} data-handler-id={handlerId} className={styles.item} style={{ opacity: isDragging ? 0 : 1 }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredientFromConstructor(ingredient.uniqueId))}
            />
        </div>
    );
};

ConstructorItem.propTypes = {
    ingredient: PropTypes.shape({
        uniqueId: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,
};
