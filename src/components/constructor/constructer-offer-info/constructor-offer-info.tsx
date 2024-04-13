import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-offer-info.module.css';
import { useSelector} from "../../../services/hooks";
import {LoaderWithoutMargin} from "../../elements";



export default function ConstructorOfferInfo () {

    const order = useSelector((store) => {
        const orderDetails = store.ingredientsReducer.order;
        if (typeof orderDetails === 'object' && orderDetails !== null) {
            return orderDetails.order?.number;
        }
        return undefined;
    });

    return(
        <section className={`${styles.offer_info} pb-30`}>
            {order
                && <>
                        <span className={`pb-8 text text_type_digits-large ${styles.offer_id}`}>{order}</span>
                        <p className="pb-15 text text_type_main-medium">идентификатор заказа</p>
                        <span className={styles.icon}><CheckMarkIcon type="primary"/></span>
                        <p className="pb-2 pt-15 text text_type_main-small">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной
                            станции</p>
                    </>}
            {!order &&
                <span className={`pb-8 text text_type_main-large ${styles.offer_id}`}>
                    В поисках идентификатора заказа...
                    <LoaderWithoutMargin />
                </span>}

        </section>
    )
}

