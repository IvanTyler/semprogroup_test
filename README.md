# ЖК Inchapin

---

## 1. Технологии

**Основной стек**

- Next.js 16 — фреймворк (App Router, SSR/SSG)
- TypeScript — строгая типизация
- SCSS Modules — изолированные стили по компонентам (`.module.scss`)
- clsx — условное объединение CSS-классов

**UI и анимации**

- react-transition-group (CSSTransition) — анимации появления/скрытия модалок
- react-select — кастомный дропдаун «Выбрать квартиру»

**Форма**

- react-hook-form — управление состоянием формы
- zod + @hookform/resolvers — схема валидации полей
- react-imask (IMaskInput) — маска телефона `+7 (000) 000-00-00`

**Скроллинг**

- smooth-scrollbar — кастомный инерционный скролл для всей страницы (`damping: 0.08`)

---

## 2. Установка и запуск

Установить зависимости:

```bash
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Проект доступен по адресу: [http://localhost:3000](http://localhost:3000)

Сборка для продакшена:

```bash
npm run build
npm run start
```

---

## 3. Изменение брейкпоинта с 768px на 900px в AboutProject

В компоненте `AboutProject` все адаптивные правила переведены с `@media (max-width: 768px)` на `@media (max-width: 900px)`.

Секция использует двухколоночную сетку с большим gap:

```scss
gap: clamp(94px, calc(19.64vw - 56.7px), 226px)
```

При ширине около 850–900px gap становился слишком большим и контент переставал читаться нормально. Брейкпоинт 768px срабатывал слишком поздно. Переход на 900px позволяет вовремя переключиться в одноколоночный вид.

Также изменён порядок `grid-areas` для двухколоночного вида:

Было:
```
"line  line"
"title description"
"video video"
```

Стало:
```
"line  video"
"title description"
```

Ниже 630px — одна колонка в исходном порядке (`line → title → description → video`).

---

## 4. Итоговая структура компонентов

### `components/UI` — переиспользуемые компоненты

- **CloseButton/** — крестик с rotate-анимацией. Цвет через `currentColor`
- **Container/** — контейнер с `max-width` и отступами
- **FloatingField/** — поле ввода с анимированным всплывающим лейблом
- **Picture/** — компонент `<picture>` с поддержкой массива `sources`
- **SectionLabel/** — лейбл секции (`uppercase`, `color: primary`)
- **VideoControls/** — панель управления видео: play/pause, прогресс-бар, таймер, громкость, fullscreen
- **Modal/** — универсальное модальное окно
- **VideoModal/** — модальное окно с видео на весь экран
- **VideoPreview/** — блок «видео о проекте» с hover-анимацией
- **CallbackForm/** — форма обратного звонка с валидацией
- **ApartmentSelect/** — дропдаун выбора квартиры (react-select)
- **Header/** — шапка сайта (`position: fixed`, живёт в `layout.tsx`)
- **Menu/** — бургер-меню
- **Tel/** — телефон в шапке
- **Burger/** — иконка бургера с анимацией
- **Ellipse/** — декоративный элемент
- **SlideText/** — анимированный текст с эффектом слайда

### `components/sections` — секции страницы

- **FirstDisplay/** — первый экран (Banner + Inchapin)
- **Banner/** — баннер с картинкой
- **Inchapin/** — заголовок «inchapin» с большим clamp-шрифтом
- **AboutProject/** — секция «о проекте»

### `components/providers`

- **SmoothScrollProvider/** — провайдер кастомного скролла. Инициализирует `smooth-scrollbar`, передаёт экземпляр через React Context (`useScrollbar` hook)
