export type OpenSourceProject = {
    name: string
    npm: string
    href: string
    demo?: string
    badge?: string
    description: string
    points: readonly string[]
    tags: readonly string[]
    uses?: string
    snippet?: string
}

export const openSource: readonly OpenSourceProject[] = [
    {
        name: 'inversify-generator',
        npm: '@undermuz/inversify-generator',
        href: 'https://github.com/undermuz/inversify-generator',
        description: 'CLI, который подключает InversifyJS к JS- или Nx-проекту: контейнер, модуль и готовые пресеты.',
        points: [
            'init ставит зависимости и создаёт container.ts',
            'add-module собирает types, provider и module и регистрирует их',
            'Каталог пресетов: env, react, logger, http, api, i18n, cache, event-bus',
        ],
        tags: ['CLI', 'InversifyJS', 'Nx', 'Node.js'],
        snippet: 'npx @undermuz/inversify-generator@latest init',
    },
    {
        name: 'use-form',
        npm: '@undermuz/use-form',
        href: 'https://github.com/undermuz/use-form',
        demo: 'https://undermuz.github.io/use-form/',
        badge: '2.0 alpha',
        description: 'Типобезопасные React-формы: типы значений, имён полей и валидаторов выводятся из конфига.',
        points: [
            'useForm, ConnectToForm и FormSubmit',
            'Cross-field правила и маппинг серверных ошибок',
            'Controlled-режим, middleware и низкоуровневый useFormCore',
        ],
        tags: ['React', 'TypeScript', 'Vitest'],
    },
    {
        name: 'react-json-form',
        npm: '@undermuz/react-json-form',
        href: 'https://github.com/undermuz/react-json-form',
        demo: 'https://undermuz.github.io/react-json-form/',
        badge: 'beta',
        uses: 'use-form',
        description: 'Формы из JSON-схемы. Внешний вид подключается темой и не зашит в ядро.',
        points: [
            'Поля, правила и значения по умолчанию живут в схеме',
            'Темы: base, Chakra, MUI, Mantine, Ant Design, HeroUI и другие',
            'Свои layout: stack, grid, вложенные блоки',
        ],
        tags: ['React', 'JSON Schema', 'Nx'],
    },
    {
        name: 'react-page-builder',
        npm: '@undermuz/react-page-builder',
        href: 'https://github.com/undermuz/react-page-builder',
        demo: 'https://undermuz.github.io/react-page-builder/',
        uses: 'react-json-form',
        description: 'Страницы из блоков: JSON-схема плюс React-компонент, форма редактирования собирается сама.',
        points: [
            'BlocksEditor меняет состав и порядок блоков',
            'BlocksView рендерит сохранённый JSON',
            'Состояние страницы удобно отдавать в API или CMS',
        ],
        tags: ['React', 'TypeScript', 'Nx'],
    },
]

export const moreRepos = [
    {
        name: 'cryptessage',
        href: 'https://github.com/undermuz/cryptessage',
        description: 'Offline-first обмен зашифрованными сообщениями',
    },
    {
        name: '0vault',
        href: 'https://github.com/undermuz/0vault',
        description: 'Защищённое децентрализованное хранилище',
    },
] as const

export const generators = [
    {
        name: 'inversify-generator',
        href: 'https://github.com/undermuz/inversify-generator',
    },
    {
        name: 'tanstack-router-generator',
        href: 'https://github.com/undermuz/tanstack-router-generator',
    },
] as const
