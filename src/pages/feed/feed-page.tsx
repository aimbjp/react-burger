import { FeedList, FeedStat } from "../../components/feed";
import styles from "./feed-page.module.css";
import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions-types/ws-types";
import { BURGER_ORDERS_WS_URL } from "../../services/api/api-norma";

export default function FeedPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `${BURGER_ORDERS_WS_URL}/all` });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE });
        };
    }, [dispatch]);

    return (
        <main className={`${styles.feed_page} mt-10`}>
            <FeedList />
            <FeedStat />
        </main>
    );
}
