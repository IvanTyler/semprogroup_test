"use client";

import { createContext, FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import type { Scrollbar } from "smooth-scrollbar/scrollbar";

const ScrollbarContext = createContext<Scrollbar | null>(null);
// Контекст для передачи экземпляра плавного скролла в другие компоненты

export const useScrollbar = () => useContext(ScrollbarContext);

export const SmoothScrollProvider: FC<{ children: ReactNode; header?: ReactNode }> = ({ children, header }) => {
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
            // Инициализация SmoothScrollbar с заданными параметрами

            setScrollbar(sb);
            // Инициализируем экземпляр SmoothScrollbar на контейнере и сохраняем его в состоянии

            const handleWheel = (e: WheelEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    sb.scrollTo(sb.offset.x, sb.offset.y + e.deltaY, 0);
                }
            };
            // Добавляем обработчик события колесика мыши для прокрутки SmoothScrollbar
            // Если событие происходит вне контейнера, прокручиваем SmoothScrollbar на соответствующее смещение

            window.addEventListener("wheel", handleWheel, { passive: true });
            // Возвращаем функцию очистки, чтобы удалить обработчик события при размонтировании компонента
            // «Я обещаю, что не буду мешать скроллу. Крути колёсико сразу, не жди меня. Я не буду вызывать e.preventDefault()
            
            const originalDestroy = sb.destroy.bind(sb);
            // Сохраняем оригинальный метод destroy экземпляра SmoothScrollbar

            sb.destroy = () => {
                window.removeEventListener("wheel", handleWheel);
                originalDestroy();
            };
            // Переопределяем метод destroy экземпляра SmoothScrollbar, 
            // чтобы удалить обработчик события колесика мыши при уничтожении скроллбара
        });

        return () => {
            sb?.destroy();
        };
        // Возвращаем функцию очистки, чтобы уничтожить экземпляр SmoothScrollbar при размонтировании компонента
    }, []);

    return (
        <ScrollbarContext.Provider value={scrollbar}>
            {header}
            <div ref={containerRef} style={{ height: "calc(100vh - var(--header-height))", marginTop: "var(--header-height)", overflow: "hidden" }}>
                {children}
            </div>
        </ScrollbarContext.Provider>
    );
};
