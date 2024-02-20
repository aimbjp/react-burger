import React, {useMemo, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredientFromConstructor } from "../../../services/actions/ingredients";
import styles from './constructor-item.module.css';
import PropTypes from "prop-types";
import ingredientType from "../../../utils/ingredient-types";

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
    ingredient: ingredientType,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,
};
