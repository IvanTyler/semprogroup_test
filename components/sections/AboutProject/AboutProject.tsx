import { Container } from "@/components/UI/Container/Container";
import { Ellipse } from "@/components/UI/Ellipse/Ellipse";
import { Picture } from "@/components/UI/Picture/Picture";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel";
import { VideoPreview } from "@/components/UI/VideoPreview/VideoPreview";
import styles from "./AboutProject.module.scss";

export const AboutProject = () => (
    <section className={styles.aboutProject}>
        <Container className={styles.containerAboutProject}>
            <div className={styles.aboutProject__left}>
                <SectionLabel className={styles.aboutProject__label}>о проекте</SectionLabel>
                <div className={styles.aboutProject__wrapperImg}>
                    <Picture
                        sources={[{ media: "(max-width: 500px)", srcSet: "/img/home-2-360.png" }]}
                        src="/img/home-2.png"
                        className={styles.aboutProject__picture}
                        imgClassName={styles.aboutProject__img}
                    />
                    <Ellipse className={styles.aboutProject__ellipse} />
                </div>
            </div>
            <div className={styles.aboutProject__right}>
                <div className={styles.aboutProject__line}></div>
                <p className={styles.aboutProject__title}>
                    Уютное и безопасное<br />
                    пространство для счастливой, <br />
                    <span>спокойной и размеренной<br />жизни</span>
                </p>
                <p className={styles.aboutProject__description}>
                    <span>Квартиры от 65 до 356 м² с чистовой отделкой,</span><br />
                    балконами, лоджиями и террасами в собственной<br />
                    закрытой охраняемой территории.
                </p>
                <div className={styles.aboutProject__video}>
                    <VideoPreview />
                </div>
            </div>
        </Container>
    </section>
);
