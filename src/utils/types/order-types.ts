export enum OrderStatus {
    done = 'Выполнен',
    pending = 'Готовится',
    created = 'Отправлен',
    cancelled = 'Отклонен'
}

export type OrderStatusKey = keyof typeof OrderStatus;

export interface OrderStatusClasses {
    [key: string]: string;
}

export const orderStatusClasses: OrderStatusClasses = {
    [OrderStatus.done]: 'text_color_success',
    [OrderStatus.pending]: 'text_color_accent',
    [OrderStatus.created]: 'text_color_accent',
    [OrderStatus.cancelled]: 'text_color_error'
};