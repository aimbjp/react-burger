import {FC, useEffect} from "react";
import {FeedList} from "../feed";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions-types/ws-types";
import {BURGER_ORDERS_WS_URL} from "../../services/api/api-norma";
import {useDispatch} from "../../services/hooks";


export const ProfileFeed: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({type: WS_CONNECTION_START, payload: (`${BURGER_ORDERS_WS_URL}?token=${localStorage.getItem('accessToken')?.split(' ')[1]}`)
            });
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            };
    }, [dispatch]);


    return (
        <section>
            <FeedList />
        </section>
    )
}