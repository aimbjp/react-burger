export interface TUser {
    email: string;
    name: string;
}

export interface TIngredient {
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
    uniqueId?: string;
}

export interface TOrderDetails {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}

export interface IMessageOrder {
    ingredients: string[];
    _id: string;
    status: "done" | "created" | "pending";
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IMessage {
    success: boolean;
    orders: IMessageOrder[];
    total: number;
    totalToday: number;
    message: string;
}