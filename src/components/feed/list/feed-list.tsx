import { useSelector } from "../../../services/hooks";
import {Link, useLocation } from "react-router-dom";

import { FeedItem } from "./item/feed-item";
import styles from "./feed-list.module.css";
import {useMemo} from "react";
import {Loader} from "../../elements";

export default function FeedList() {
    const location = useLocation();

    const path = location.pathname;

    const isConnected = useSelector(store => store.webSocket.wsConnected);
    const orders = useSelector(store => store.webSocket.orders);

    const sortedOrders = useMemo(() => {
        const ordersCopy = [...orders]; // Создаем копию массива заказов
        return ordersCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [orders]);

    return (
        <section className={`pr-2`}>
            <h2 className={`text text_type_main-large mb-6`}>Лента заказов</h2>
            {isConnected && orders ? (
                <>
                    <ul className={`${styles.feed_list_container}`}>
                        {orders && sortedOrders.map((order, index) => (
                            <Link key={index} to={ `${path}/${order.number}`} state={{background: location}}
                                  className={` text text_color_primary ${styles.list} `}>
                                <FeedItem key={index} order={order} index={index}/>
                            </Link>
                        ))}
                    </ul>
                </>
            ) : (
                <Loader/>
            )}
        </section>
    );
}
