import styles from './modal-overlay.module.css';

export default function ModalOverlay({ children, onClick }) {
    return (
        <section className={styles.overlay} onClick={onClick}>
            {children}
        </section>
    );
}
