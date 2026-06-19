import { Banner } from "@/components/sections/Banner/Banner";
import { Inchapin } from "@/components/sections/Inchapin/Inchapin";
import styles from "./FirstDisplay.module.scss";

export const FirstDisplay = () => (
    <section className={styles.firstDisplay}>
        <Banner />
        <Inchapin />
    </section>
);
