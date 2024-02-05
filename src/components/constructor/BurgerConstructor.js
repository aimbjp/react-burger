import React, {useState} from "react";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from "./constructor-item/constructor-list";
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import ConstructorOfferInfo from "./constructer-offer-info/constructor-offer-info";
import ingredientType from "../../utils/ingredientTypes";

const fakeBun = {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png"
}

const fakeOfferID = "034536";

function BurgerConstructor(props){
    const [modalOpen, setModalOpen] = useState(false);
    const [offerID, setOfferID] = useState(null);

    const handleOfferClick = (ingredient) => {
        setOfferID(ingredient);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setOfferID(null);
    };

    return(
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    extraClass={styles.blocked}
                />

                <ConstructorList chosenIngredients={[fakeBun, fakeBun, fakeBun, fakeBun, fakeBun, fakeBun,]} />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    extraClass={styles.blocked}
                />
            <section className={styles.price}>
                <span className={`${styles.price} pr-6`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => {handleOfferClick(fakeOfferID)}}>
                    Оформить заказ
                </Button>
            </section>
            {modalOpen && (
                <Modal title="" onClose={handleCloseModal}>
                    <ConstructorOfferInfo offerId={offerID}/>
                </Modal>
            )}
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        ingredientType
    ).isRequired,
};


export default BurgerConstructor;