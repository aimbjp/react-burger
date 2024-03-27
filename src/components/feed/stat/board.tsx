import { FC } from "react";
import styles from './feed-stat.module.css';
import { useSelector } from "../../../services/hooks";
import { LoaderWithoutMargin} from "../../elements";

interface IBoard {
    name: string;
    status: 'done' | 'pending';
}

export const Board: FC<IBoard> = ({ name, status }) => {

    const orders = useSelector((store) => store.webSocket.orders);
    let numbersOrders: number[] = [];

    switch (status) {
        case 'done': {
            const doneOrders = orders.filter(order => order.status === 'done').slice(0, 20);
            numbersOrders = doneOrders.map(order => order.number);
            break;
        }
        case 'pending': {
            const pendingOrders = orders.filter(order => order.status === 'pending').slice(0, 20);
            numbersOrders = pendingOrders.map(order => order.number);
            break;
        }
    }

    const firstTenOrders = numbersOrders.slice(0, 10);
    const remainingOrders = numbersOrders.slice(10);

    return (
        <div className={`${styles.board}`}>
            <h3 className={`text text_type_main-medium pb-6`}>{name}:</h3>
            {numbersOrders.length > 0 ? (
                <div className={styles.board_desk}>
                    <ul className={`text ${name === 'Готовы' ? 'text_color_success' : ''} text_type_digits-default ${styles.item}`}>
                        {firstTenOrders.map((number, index) => (
                            <li key={index} className={`pb-1`}>
                                {number}
                            </li>
                        ))}
                    </ul>
                    {remainingOrders.length > 0 && (
                        <ul className={`text ${name === 'Готовы' ? 'text_color_success' : ''} text_type_digits-default ${styles.item}`}>
                            {remainingOrders.map((number, index) => (
                                <li key={index} className={`pb-1`}>
                                    {number}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                status === 'done' ? <LoaderWithoutMargin /> : <span className={`text text_type_main-default`}>Заказов в работе нет</span>
            )}
        </div>
    );
}

