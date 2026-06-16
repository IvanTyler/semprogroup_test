'use client'
import { useState, useEffect } from 'react';

export const useWindowWidth = (breakpoint?: number) => {
    const [widthWindowSize, setWidthWindowSize] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWidthWindowSize(width);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return {
        widthWindow: widthWindowSize,
        isMobileContent: breakpoint ? widthWindowSize <= breakpoint : false,
    };
};
