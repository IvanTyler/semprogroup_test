"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/UI/Container/Container";
import { Menu } from "@/components/UI/Menu/Menu";
import { ApartmentSelect } from "@/components/UI/ApartmentSelect/ApartmentSelect";
import { SlideText } from "@/components/UI/SlideText/SlideText";
import { Tel } from "@/components/UI/Tel/Tel";
import { Modal } from "@/components/UI/Modal/Modal";
import { CallbackForm } from "@/components/UI/CallbackForm/CallbackForm";
import { useScrollbar } from "@/components/providers/SmoothScrollProvider";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import styles from "./Header.module.scss";

export const Header = () => {
    const [orderCallHovered, setOrderCallHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { isMobileContent: isTelIcon } = useWindowWidth(840);
    const { isMobileContent: isSmallScreen } = useWindowWidth(600);


    return (
        <header className={clsx(styles.header)}>
            <Container className={styles.containerHeader}>
                <Menu />

                <ApartmentSelect hidden={isSmallScreen} />

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
                    onClick={() => setModalOpen(true)}
                >
                    <SlideText animated={orderCallHovered}>заказать звонок</SlideText>
                </div>
            </Container>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <CallbackForm />
            </Modal>
        </header>
    );
};
