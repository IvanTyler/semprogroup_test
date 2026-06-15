"use client";

import { useState } from "react";
import Image from "next/image";
import { SlideText } from "@/components/UI/SlideText/SlideText";
import styles from "./ApartmentSelect.module.scss";

export const ApartmentSelect = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            type="button"
            className={styles["apartment-select"]}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <SlideText animated={hovered}>выбрать квартиру</SlideText>
            <Image
                src="/icon/arrow-down.svg"
                alt=""
                width={14}
                height={8}
                className={styles["apartment-select__icon"]}
            />
        </button>
    );
};
