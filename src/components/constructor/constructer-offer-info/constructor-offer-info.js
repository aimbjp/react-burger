import PropTypes from 'prop-types';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-offer-info.module.css';

export default function ConstructorOfferInfo (props) {
    return(
        <section className={`${styles.offer_info} pb-30`}>
            {props.offerId && <span className={`pb-8 text text_type_digits-large ${styles.offer_id}`}>{props.offerId}</span>}
            {!props.offerId && <span className={`pb-8 text text_type_main-large ${styles.offer_id}`}>В поисках идентификатора заказа...</span>}
            <p className="pb-15 text text_type_main-medium">идентификатор заказа</p>
            <span className={styles.icon}><CheckMarkIcon type="primary" /></span>
            <p className="pb-2 pt-15 text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </section>
    )
}

ConstructorOfferInfo.propTypes = {
    offerId: PropTypes.number,
};
