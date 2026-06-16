"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/UI/Container/Container";
import { Menu } from "@/components/UI/Menu/Menu";
import { ApartmentSelect } from "@/components/UI/ApartmentSelect/ApartmentSelect";
import { SlideText } from "@/components/UI/SlideText/SlideText";
import { Tel } from "@/components/UI/Tel/Tel";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import styles from "./Header.module.scss";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [orderCallHovered, setOrderCallHovered] = useState(false);
    const { isMobileContent: isTelIcon } = useWindowWidth(840);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(document.body.getBoundingClientRect().y < 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={clsx(styles.header, { [styles.header__scrolled]: scrolled })}>
            <Container className={styles.containerHeader}>
                <Menu />

                <ApartmentSelect />

                <a href="/" className={styles.header__linkLogo}>
                    <img
                        src="/icon/logo.svg"
                        alt="inchapin"
                        width={156}
                        height={25}
                        className={styles.header__logo}
                    />
                </a>

                <Tel isIcon={isTelIcon} className={styles.header__tel} />

                <div
                    className={styles.header__orderCall}
                    onMouseEnter={() => setOrderCallHovered(true)}
                    onMouseLeave={() => setOrderCallHovered(false)}
                >
                    <SlideText animated={orderCallHovered}>заказать звонок</SlideText>
                </div>
            </Container>
        </header>
    );
};
