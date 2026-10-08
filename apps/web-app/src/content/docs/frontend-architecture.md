# Архитектура проекта

Проект использует модульную архитектуру с чётким разделением ответственности
между слоями. Структура каталогов отражает принципы масштабируемости,
предсказуемости и контроля зависимостей.

## Технологический стек

Монорепозиторий на **Nx**. Приложения — **React** + **TypeScript**.

- **Nx** — монорепозиторий, приложения и библиотеки (`apps/`, `libs/`).
- **React** + **TypeScript** — UI и типизация.
- **InversifyJS** — DI-контейнер и модули бизнес-логики. Новые модули
  добавляются через
  [undermuz/inversify-generator](https://github.com/undermuz/inversify-generator).
- **[@base-ui/react](https://base-ui.com/)** — фундамент UI-примитивов
  (`views/ui`, `libs/views/ui`).
- **Tailwind CSS** — стилизация UI.
- **Valtio** — реактивное клиентское состояние в DI-провайдерах
  (`proxy` / `useSnapshot`).
- **Logtape** — логирование (`libs/di/logger`).
- **TanStack Query** — серверное состояние, запросы и кэш.
- **TanStack Router** — маршрутизация в **файловом режиме**: структура
  `app/routes/` соответствует URL. Инициализация и новые маршруты — через
  [undermuz/tanstack-router-generator](https://github.com/undermuz/tanstack-router-generator).

## Структура каталогов

```
apps/<APP_NAME>/src/  # Корневой каталог приложения
  di/                 # Бизнес-логика, модули, сервисы, API-клиенты, типы сущностей (@di)
    auth/             # Пример модуля: аутентификация

  app/                # Инфраструктурный слой приложения: точка входа, глобальные провайдеры, корневой layout (@app)
    routes/           # TanStack Router, файловый режим. Структура папок = URL.
    i18n/             # Переводы i18n.provider.tsx
    app.provider.tsx  # Провайдеры приложения

  views/              # Слой представления (UI)
    components/       # Компоненты, собранные из ui-примитивов. Без бизнес-логики (@components)
    forms/            # Сложные формы с валидацией и состоянием (@forms)
    layouts/          # Глобальные каркасы страниц (@layouts)
    ui/               # UI-примитивы на @base-ui/react + Tailwind CSS (@ui)
    themes/           # Темы, токены стилей (@themes)
    widgets/          # Переиспользуемые высокоуровневые блоки, могут использовать di (@widgets)

  utils/              # Вспомогательные утилиты
    types/            # Общие типы (@types)
    constants/        # Константы (@constants)
    hooks/            # Переиспользуемые хуки (@hooks)
    helpers/          # Хелперы и функции общего назначения (@helpers)

libs/                 # Подключаемые библиотеки
libs/di/              # Общие DI-модули для приложений (@libs/di/*)
    api/              # API-абстракции (Api, фабрики, типы)
    cache/            # Кэш-провайдер
    event-bus/        # EventBus
    http-client/      # HTTP-клиент, типы, исключения
    logger/           # Логгер (Logtape)
    promise-manager/  # Управление конкурентными promise
    script-loader/    # Загрузка внешних скриптов
libs/views/           # Основная библиотека UI
    components/       # Компоненты, собранные из ui-примитивов. Без бизнес-логики (@components)
    ui/               # UI-примитивы на @base-ui/react + Tailwind CSS (@ui)
    themes/           # Темы, токены стилей (@themes)
libs/contracts/       # HTTP API контракты

```

## Правила использования слоёв

di/

- Содержит бизнес-логику, сервисы, API, модули.
- Не использует UI.
- Может предоставлять провайдеры для DI-контекстов.
- Примеры: аутентификация

app/

- Слой инфраструктуры.
- Подключает глобальные провайдеры.
- Определяет корневой layout.
- Содержит маршруты и страницы.

views/ui/

- Атомарные визуальные элементы на базе `@base-ui/react` и Tailwind CSS, для переиспользования в нескольких компонентах.
- Могут иметь собственные провайдеры (например, тема).
- Не содержат бизнес-логики.
- Не используют другие слои.
- Примеры: иконки, кнопки, списки, ссылки

views/components/

- Низкоуровневые компоненты.
- Используют ui-примитивы.
- Не используют бизнес-логику.
- Примеры: автокомплит, инпуты форм, слайдеры

views/widgets/

- Высокоуровневые компоненты
- Могут использовать components, ui
- Могут использовать бизнес-логику
- Примеры: Карта, Список продуктов, Корзина

views/forms/

- Сложные формы.
- Могут использовать di.
- Имеют собственную валидацию, схемы, состояние.
- Примеры: Форма регистрации, Форма входа

views/layouts/

- Глобальные каркасы страниц.
- Могут использовать всё, кроме страниц.
- Примеры: Хедер, Футер

app/routes/

- Страницы и маршруты TanStack Router (файловый режим).
- Структура папок = структура URL.
- Страницы могут использовать все слои, кроме других страниц.
- Внутри сегмента маршрута:
    - page.tsx — страница
    - routes.tsx — вложенные маршруты

## Основные принципы архитектуры

- Страницы не содержат бизнес-логики — только сборка providers + layout +
  widgets.
- Widgets — единственный слой, где UI и бизнес-логика пересекаются.
- Components — чистый UI без DI.
- UI-примитивы — фундамент визуального слоя.
- DI — полностью изолированная бизнес-логика.
- App — инфраструктурный слой, управляющий жизненным циклом приложения.
- Маршруты полностью отражают структуру URL.

### Правило импортов DI

- Общие инфраструктурные DI-модули (`api`, `cache`, `event-bus`, `http-client`,
  `logger`, `promise-manager`, `script-loader`) импортируются из `@libs/di/*`.
- Доменные и app-specific DI-модули остаются в `apps/<APP_NAME>/src/di/*`.

## Добавление маршрутов через генератор

Маршрутизация — TanStack Router в файловом режиме. Скелет роутера и новые
сегменты создаются генератором
[undermuz/tanstack-router-generator](https://github.com/undermuz/tanstack-router-generator).

Инициализация в приложении:

```bash
npx @undermuz/tanstack-router-generator@latest init --project=apps/<APP NAME>/src/app
```

Новый маршрут:

```bash
npx @undermuz/tanstack-router-generator add-route <ROUTE NAME> --project=apps/<APP NAME>/src/app
```

Генератор создаёт сегмент в `apps/<APP NAME>/src/app/routes/<ROUTE NAME>`
(`page.tsx`, `routes.tsx`) и обновляет корневой `index.tsx`. После генерации
проверьте соответствие архитектурным правилам: страница собирает providers +
layout + widgets и не содержит бизнес-логики.

## Добавление DI-модулей через генератор

Для ускорения создания модулей Inversify можно использовать генератор:
[undermuz/inversify-generator](https://github.com/undermuz/inversify-generator).

Команда:

```bash
npx @undermuz/inversify-generator add-module <MODULE NAME> --project=apps/<APP NAME>/src
```

Генератор создаёт структуру модуля в `apps/<APP NAME>/src/di` и обновляет
контейнер.  
После генерации проверьте соответствие архитектурным правилам проекта (типы,
провайдер, модуль, регистрация, инициализация при необходимости).

По возможности использовать готовые модули из [preset](https://github.com/undermuz/inversify-generator/blob/main/presets/README.md)

```bash
npx @undermuz/inversify-generator add-preset-module <MODULE NAME> --project=apps/<APP NAME>/src
```