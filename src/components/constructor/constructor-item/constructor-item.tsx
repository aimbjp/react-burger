import React, {FC, MutableRefObject, useMemo, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredientFromConstructor } from "../../../services/thunk/ingredients";
import styles from './constructor-item.module.css';
import { Identifier } from 'dnd-core';
import {DragItem, IConstructorItem} from "../types-constructor";
import {useDispatch} from "../../../services/hooks";

export const ConstructorItem: FC<IConstructorItem> = ({ ingredient, index, moveIngredient }) => {
    const dispatch = useDispatch();
    const ref: MutableRefObject<null> = useRef(null);

    const item: DragItem = useMemo(() => ({ id: ingredient.uniqueId, index }), [ingredient.uniqueId, index]);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'ingredientConstructor',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item: DragItem, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = index;
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
                handleClose={() => dispatch(removeIngredientFromConstructor(ingredient.uniqueId || ''))}
            />
        </div>
    );
};

