import { Container } from "@/components/UI/Container/Container";
import { Picture } from "@/components/UI/Picture/Picture";
import styles from "./Banner.module.scss";

export const Banner = () => (
    <section className={styles.banner}>
        <Container className={styles.containerBanner}>
            <Picture
                sources={[
                    { media: "(max-width: 360px)", srcSet: "/img/banner-360.png" },
                    { media: "(max-width: 900px)", srcSet: "/img/banner-768.png" },
                    { media: "(max-width: 1200px)", srcSet: "/img/banner-1024.png" },
                ]}
                src="/img/banner.png"
                className={styles.banner__picture}
                imgClassName={styles.banner__img}
            />
        </Container>
    </section>
);
