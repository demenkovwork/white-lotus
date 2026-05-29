# Белый Лотос

Лендинг спа-центра «Белый Лотос» (Симферополь) с скролл-анимацией. Замена сайта на Tilda.

## Стек

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (через `@tailwindcss/vite`, конфиг в `@theme` внутри `src/index.css`)
- GSAP + ScrollTrigger, Lenis (плавный скролл)
- lottie-react (для отдельных эффектов вроде всплеска)
- react-hook-form + zod (форма записи, Фаза 4)
- @fontsource/cormorant + @fontsource/manrope

## Скрипты

```bash
npm run dev       # dev-сервер
npm run build     # сборка прод
npm run preview   # предпросмотр сборки
npm run lint      # eslint
```

## Структура

```
white-lotus/
├── public/assets/{desktop,mobile}/  # кадры скролл-сцены
├── src/
│   ├── components/   # Header, ScrollScene, Section, Services, Promotions, About, Contacts, BookingForm, Footer
│   ├── hooks/        # (TODO) useLenis, useScrollScene
│   ├── data/         # content.ts — все тексты + манифест кадров SCENE_FRAMES
│   ├── lib/          # email.ts (заглушка)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css     # Tailwind v4 + палитра + шрифты
├── .cursor/rules/    # project / animations / styling
└── vite.config.ts
```

## Скролл-анимация: подход

Image sequence. В `src/data/content.ts` есть массив `SCENE_FRAMES` — добавляешь
сюда новый кадр (с путями к desktop и mobile версии и значением `progress` 0..1),
и сцена сама подхватит. Логику кросс-фейда / canvas-рендера подключим в Фазе 3.

Текущее состояние — статичный первый кадр (`1ASTART_*`) как фон Hero. Остальные
кадры подкидывает дизайнер.

## Что дальше

См. `../docs/01_PLAN.md`. Сделано: Фаза 0 + Фаза 2 (статичный каркас). Дальше:

- Фаза 1 (параллельно с дизайнером): подкидываются кадры
- Фаза 3: Lenis + GSAP ScrollTrigger pinned-сцена со скрабом кадров
- Фаза 4: настоящая форма записи + EmailJS
- Фаза 5: адаптив-полировка, prefers-reduced-motion, Lighthouse
- Фаза 6: SEO-мета, og-image, деплой
