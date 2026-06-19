"use client";

import { createContext, FC, useContext, useState } from "react";
import Select, {
    components,
    DropdownIndicatorProps,
    PlaceholderProps,
    SingleValueProps,
} from "react-select";
import Image from "next/image";
import { clsx } from "clsx";
import { SlideText } from "@/components/UI/SlideText/SlideText";
import styles from "./ApartmentSelect.module.scss";

interface Option {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: "studio", label: "Студии" },
    { value: "1k", label: "1-комнатные" },
    { value: "2k", label: "2-комнатные" },
    { value: "3k", label: "3-комнатные" },
    { value: "4k", label: "4-комнатные и более" },
];

const HoverContext = createContext(false);

const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => (
    <components.DropdownIndicator {...props}>
        <Image
            src="/icon/arrow-down.svg"
            alt=""
            width={14}
            height={8}
            className={clsx(
                styles["apartment-select__arrow"],
                props.selectProps.menuIsOpen && styles["apartment-select__arrow--open"]
            )}
        />
    </components.DropdownIndicator>
);

const CustomPlaceholder = (props: PlaceholderProps<Option>) => {
    const hovered = useContext(HoverContext);
    return (
        <components.Placeholder {...props}>
            <SlideText animated={hovered}>Выбрать квартиру</SlideText>
        </components.Placeholder>
    );
};

const CustomSingleValue = (props: SingleValueProps<Option>) => {
    const hovered = useContext(HoverContext);
    return (
        <components.SingleValue {...props}>
            <SlideText animated={hovered}>{props.data.label}</SlideText>
        </components.SingleValue>
    );
};

const customComponents = {
    DropdownIndicator,
    Placeholder: CustomPlaceholder,
    SingleValue: CustomSingleValue,
};

interface ApartmentSelectProps {
    hidden?: boolean;
}

export const ApartmentSelect: FC<ApartmentSelectProps> = ({ hidden }) => {
    const [hovered, setHovered] = useState(false);

    if (hidden) return null;

    return (
        <HoverContext.Provider value={hovered}>
            <div
                className={styles["apartment-select"]}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Select<Option>
                    options={options}
                    isSearchable={false}
                    unstyled
                    classNames={{
                        control: () => styles["apartment-select__control"],
                        valueContainer: () => styles["apartment-select__value-container"],
                        placeholder: () => styles["apartment-select__placeholder"],
                        singleValue: () => styles["apartment-select__single-value"],
                        indicatorsContainer: () => styles["apartment-select__indicators"],
                        dropdownIndicator: () => styles["apartment-select__dropdown-indicator"],
                        indicatorSeparator: () => styles["apartment-select__separator"],
                        menu: () => styles["apartment-select__menu"],
                        menuList: () => styles["apartment-select__menu-list"],
                        option: ({ isSelected, isFocused }) =>
                            clsx(
                                styles["apartment-select__option"],
                                isSelected && styles["apartment-select__option--selected"],
                                isFocused && !isSelected && styles["apartment-select__option--focused"]
                            ),
                    }}
                    components={customComponents}
                />
            </div>
        </HoverContext.Provider>
    );
};
