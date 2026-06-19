"use client";

import { createContext, FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import type { Scrollbar } from "smooth-scrollbar/scrollbar";

const ScrollbarContext = createContext<Scrollbar | null>(null);

export const useScrollbar = () => useContext(ScrollbarContext);

export const SmoothScrollProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollbar, setScrollbar] = useState<Scrollbar | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        let sb: Scrollbar;

        import("smooth-scrollbar").then(({ default: SmoothScrollbar }) => {
            if (!containerRef.current) return;
            sb = SmoothScrollbar.init(containerRef.current, {
                damping: 0.08,
                renderByPixels: true,
                alwaysShowTracks: false,
            });
            setScrollbar(sb);
        });

        return () => {
            sb?.destroy();
        };
    }, []);

    return (
        <ScrollbarContext.Provider value={scrollbar}>
            <div ref={containerRef} style={{ height: "calc(100vh - var(--header-height))", marginTop: "var(--header-height)", overflow: "hidden" }}>
                {children}
            </div>
        </ScrollbarContext.Provider>
    );
};
