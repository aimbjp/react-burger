import {Board} from "./board";
import styles from './feed-stat.module.css'
import {useSelector} from "../../../services/hooks";
import {IMessage} from "../../../services/types/model-data";

export default function  FeedStat () {

    const messages = useSelector((store) => store.webSocket.messages) as IMessage;



    return(
        <section className={`${styles.stat}`}>
            <div>
                <section className={`pb-15 ${styles.boards}`}>
                    <Board name={'Готовы'} status={'done'}/>
                    <Board name={'В работе'} status={'pending'}/>
                </section>
                <section>
                    <section className={`pb-15`}>
                        <h3 className={`text text_type_main-medium`}>
                            Выполнено за все время:
                        </h3>
                        <span className={`text text_type_digits-large ${styles.digits__shadow}`}>
                            {messages && messages.total}
                        </span>
                    </section>
                    <section>
                        <h3 className={`text text_type_main-medium`}>
                            Выполнено за сегодня:
                        </h3>
                        <span className={`text text_type_digits-large ${styles.digits__shadow}`}>
                            {messages && messages.totalToday}
                        </span>
                    </section>
                </section>
            </div>
        </section>
    )
}
