import { Container } from "@/components/UI/Container/Container";
import styles from "./Inchapin.module.scss";

export const Inchapin = () => (
    <section className={styles.inchapin}>
        <Container className={styles.containerInchapin}>
            <p className={styles.inchapin__text}>
                дом бизнес-класса <br /> для ценителей роскоши
            </p>
            <h1 className={styles.inchapin__title}>inchapin</h1>
        </Container>
    </section>
);
