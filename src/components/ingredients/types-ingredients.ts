export enum IngredientType {
    Buns = "bun",
    Sauces = "sauce",
    Fillings = "main",
}

export enum TabType {
    Buns = "buns",
    Sauces = "sauces",
    Fillings = "fillings",
}

export interface IIngredientsGroupProps {
    value: string;
    type: IngredientType;
}

export interface IIngredientCardProps {
    id: string,
    name: string,
    image: string,
    price: number,
    type: string,
}