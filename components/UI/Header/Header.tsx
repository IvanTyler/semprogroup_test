"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { Container } from "@/components/UI/Container/Container";
import { Menu } from "@/components/UI/Menu/Menu";
import { ApartmentSelect } from "@/components/UI/ApartmentSelect/ApartmentSelect";
import { SlideText } from "@/components/UI/SlideText/SlideText";
import styles from "./Header.module.scss";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [orderCallHovered, setOrderCallHovered] = useState(false);

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
                    <Image
                        src="/icon/logo.svg"
                        alt="inchapin"
                        width={156}
                        height={25}
                        className={styles.header__logo}
                        priority
                    />
                </a>

                <a href="tel:+74955272121" className={styles.header__tel}>
                    <span className={styles.header__telText}>+7 495 527 21 21</span>
                    <Image
                        src="/icon/phone.svg"
                        alt="phone"
                        width={20}
                        height={20}
                        className={styles.header__telIcon}
                    />
                </a>

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
