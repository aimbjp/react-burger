import React, {useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = ({ title, children, onClose }) => {
    const modalRoot = document.getElementById('modal-root');

    const handleCloseClick = (e) => {
        e.stopPropagation();
        onClose();
    };

    const handleOverlayClick = () => {
        onClose();
    };

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    return ReactDOM.createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <section className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <section className={`${styles.header} pr-10 pl-10`}>
                    <h2 className="text text_type_main-large">{title}</h2>
                    <CloseIcon type="primary"  onClick={handleCloseClick} />
                </section>
                <section className={styles.content}>
                    {children}
                </section>
            </section>
        </ModalOverlay>,
        modalRoot
    );
};

export default Modal;
