import {TIngredient} from "../../services/types/model-data";

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string;
}

interface IUser {
    email: string;
    name: string;
}

interface IOrder {
    order: {
        number: number
    };
}

interface IConstructorIngredients {
    bun: IIngredient | null;
    ingredients: IIngredient[];
}

interface IIngredientsReducerState {
    modalOrderOpen: boolean;
    ingredients: IIngredient[];
    constructorIngredients: IConstructorIngredients;
    order: IOrder;
}

interface IUserReducerState {
    user: IUser;
    checkEmailExistFailed: boolean;
    registerFailed: boolean;
}

export interface IConstructorItem {
    ingredient: TIngredient;
    index: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

export interface DragItem {
    index: number;
    id: string | undefined;
}
