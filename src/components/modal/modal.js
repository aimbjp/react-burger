import React, { useEffect } from 'react';
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={handleCloseClick} />
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.header} pr-10 pl-10`}>
                    <h1 className="text text_type_main-large">{title}</h1>
                    <CloseIcon type="primary" onClick={handleCloseClick} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
