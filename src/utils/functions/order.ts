import {TIngredient} from "../../services/types/model-data";

export function calculateCostOrder(bun: TIngredient | null, ingredients: Array<TIngredient>) {
    const bunCost = bun ? bun.price * 2 : 0;
    const ingredientsCost = ingredients.length > 0 ? ingredients.reduce((acc, ing) => acc + ing.price, 0) : 0;
    return bunCost + ingredientsCost;
}