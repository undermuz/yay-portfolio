# Портфолио

Сайт Александра Антонова, Senior Fullstack Developer. Одностраничное портфолио: проекты, опыт, архитектура фронтенда и бэкенда, open source.

Сайт: https://undermuz.github.io/yay-portfolio/

## Стек

Nx-монорепозиторий. Приложение на React 19, Vite и TypeScript. Стили — Tailwind CSS 4. Маршруты — TanStack Router. Анимации — Framer Motion.

## Структура

- `apps/web-app` — страница портфолио
- `libs/views` — UI-примитивы: кнопка, карточка, секция, модалка
- `apps/web-app/src/content/docs` — markdown-документы, которые открываются в модалке

## Запуск

Нужен Node.js 22.

```sh
npm install
npx nx dev web-app
```

Приложение открывается на http://localhost:4200/.

Сборка:

```sh
npx nx build web-app
```

Продакшен-сборка рассчитана на адрес `/yay-portfolio/`. В режиме разработки базовый путь — `/`.

## Деплой

Пуш в `main` запускает [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Workflow собирает `web-app` и публикует `apps/web-app/dist` на GitHub Pages. В настройках репозитория источник Pages — GitHub Actions.
