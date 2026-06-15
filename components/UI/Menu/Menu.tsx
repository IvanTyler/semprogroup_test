"use client";

import { FC, useState } from "react";
import { clsx } from "clsx";
import { Burger } from "@/components/UI/Burger/Burger";
import styles from "./Menu.module.scss";

interface MenuProps {
    className?: string;
}

export const Menu: FC<MenuProps> = ({ className }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={clsx(styles.menu, c