export const profile = {
    name: 'Антонов Александр',
    monogram: 'АА',
    role: 'Fullstack Developer',
    city: 'Санкт-Петербург',
    telegram: 'https://t.me/undermuzDev',
    telegramLabel: '@undermuzDev',
    email: 'undermuz@gmail.com',
    github: 'https://github.com/undermuz',
    githubLabel: 'github.com/undermuz',
    resumeHref: 'https://spb.hh.ru/resume/4ed0cbb9ff10f1c4310039ed1f334f6e76536d?hhtmFrom=applicant_profile',
    headline: ['Проектирую сложные', 'продукты с нуля', 'и довожу до продакшена'],
    summary:
        'Fullstack с 15-летним опытом. Собираю экосистемы во главе команды: от архитектуры WebRTC и real-time до ИИ-пайплайнов и геопоиска. Быстро превращаю бизнес-идею в масштабируемый продукт.',
    meta: ['15 лет опыта', 'Team Lead', 'удалённо / гибрид'],
    education: 'СПб ГБПОУ КИТ, программист, 2014',
    english: 'Английский B2',
    offer: {
        title: 'Открыт к роли Fullstack / Team Lead',
        salary: '250 000 ₽ на руки',
        format: 'удалённо, гибрид, офис',
    },
    terminal: {
        role: 'Team Lead, Full-stack',
        place: 'Сеть клиник · с марта 2024',
        status: 'Открыт к предложениям',
        tags: ['Next.js', 'NestJS', 'WebRTC', 'TypeScript', 'Elasticsearch'],
    },
} as const

export const nav = [
    { href: '#projects', label: 'Проекты' },
    { href: '#architecture', label: 'Архитектура' },
    { href: '#open-source', label: 'Open source' },
    { href: '#experience', label: 'Опыт' },
    { href: '#contacts', label: 'Контакты' },
] as const

export type Project = {
    title: string
    href: string
    period: string
    summary: string
    points: readonly string[]
    tags: readonly string[]
    links?: readonly { label: string; href: string }[]
}

export const projects: readonly Project[] = [
    {
        title: 'Skin Expert',
        href: 'https://skin.expert/',
        period: '2024 — 2026',
        summary: 'Телемедицина и инфраструктура для клиник.',
        points: [
            'Видеозвонки и чаты на WebRTC, мобильное приложение',
            'Геопоиск по десяткам тысяч клиник на Elasticsearch',
            'CRM для врачей и ИИ-пайплайн мониторинга конкурентов',
        ],
        tags: ['WebRTC', 'Node.js', 'React', 'Elasticsearch', 'Vercel AI'],
    },
    {
        title: 'Med Link',
        href: 'https://med-link.ru/',
        period: '2024 — 2026',
        summary: 'Электронный документооборот.',
        points: [
            'Архитектура и визуальные компоненты с нуля',
            'Холст документов на Canvas',
            'Next.js на клиенте, NestJS на сервере',
        ],
        tags: ['Next.js', 'NestJS', 'Canvas'],
    },
    {
        title: 'INSTG',
        href: 'https://ins.tg/',
        period: '2024 — 2026',
        summary: 'Модульный конструктор сайтов и посадочных страниц.',
        points: [
            'Сборка страниц из модулей',
            'Админка и публичная выдача из одной схемы',
            'Next.js и NestJS',
        ],
        tags: ['Next.js', 'NestJS'],
    },
    {
        title: 'Bolt-System',
        href: 'https://premier-tur.com/',
        period: '2014 — 2024',
        summary: 'Линейка продуктов: сайты, админки, парсеры, платежи, интеграции.',
        points: [
            'Два туроператора с оплатой и интеграциями',
            'Аукцион японских мотоциклов и магазин электроники',
            'Личный кабинет студента автошколы',
        ],
        tags: ['PHP', 'Node.js', 'React'],
        links: [
            { label: 'Premier Tour', href: 'https://premier-tur.com/' },
            { label: 'Amist', href: 'https://amist.ru/' },
            { label: 'ProJapan', href: 'https://projapan.ru/' },
            { label: 'Don-Telefon', href: 'https://don-telefon.ru/' },
            { label: 'Автошкола', href: 'https://my.avtoshkola4kolesa.ru/' },
        ],
    },
]

export const highlights = [
    {
        index: '01',
        title: 'AI и компьютерное зрение',
        text: 'Распознавание лиц на TensorFlow вместе с real-time 3D-анимацией. ИИ-пайплайны на Vercel AI SDK и OpenRouter.',
    },
    {
        index: '02',
        title: 'Real-time и high-load',
        text: 'Чаты, видеозвонки и парсеры, которые держат поток данных, а не демо на одного пользователя.',
    },
    {
        index: '03',
        title: 'Продукты с нуля',
        text: 'Приложение доставки еды и биржа рекламных заказов в Telegram. Боты, которые закрывают ручные процессы.',
    },
    {
        index: '04',
        title: 'Скорость через AI',
        text: 'Cursor и Claude Code как мидл-ассистенты, локальные модели для ревью. Готовый результат в 2–3 раза быстрее обычного цикла.',
    },
] as const

export const stackGroups = [
    {
        title: 'Frontend',
        items: ['TypeScript', 'React', 'Next.js', 'Redux', 'MobX', 'Vite', 'SSR'],
    },
    {
        title: 'Backend',
        items: ['Node.js', 'NestJS', 'PHP', 'WebSocket', 'WebRTC', 'BullMQ'],
    },
    {
        title: 'Данные и инфраструктура',
        items: ['MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'RabbitMQ', 'Docker', 'Linux'],
    },
    {
        title: 'Mobile',
        items: ['React Native', 'Capacitor', 'Cordova'],
    },
    {
        title: 'Практики',
        items: ['SOLID', 'DI', 'TypeORM', 'Vitest', 'Микросервисы', 'Управление командой'],
    },
] as const

export const experience = [
    {
        period: 'март 2024 — июль 2026',
        length: '2 года 5 мес.',
        company: 'Линлайн',
        role: 'Team Lead, Full-stack',
        summary: 'Сеть клиник. С нуля: документооборот, конструктор сайтов, телемедицина, CRM и ИИ-пайплайн.',
    },
    {
        period: 'февраль 2014 — март 2024',
        length: '10 лет 2 мес.',
        company: 'Bolt-System',
        role: 'Tech Lead, Senior Frontend',
        summary: 'Архитектура, ТЗ, код-ревью и сложные фичи на фронте и бэке. Туризм, аукцион, ритейл, автошкола.',
    },
    {
        period: 'ноябрь 2012 — февраль 2014',
        length: '1 год 4 мес.',
        company: 'Бюллетень недвижимости',
        role: 'Junior Frontend',
        summary: 'Админка, интерактивные конструкторы парсинга и внедрение вёрстки на bn.ru.',
    },
    {
        period: 'август 2011 — сентябрь 2013',
        length: '2 года 2 мес.',
        company: 'ООО Сорокин',
        role: 'Старший web-разработчик',
        summary: 'Бизнес-логика, бэкенд и фронтенд, базы данных и специфический контент.',
    },
] as const

export const aiPoints = [
    {
        index: '01',
        title: 'AI как мидл-ассистент',
        text: 'Объёмные задачи уходят агентам вместе с готовым ТЗ в plan-mode. Базовый код пишется кратно быстрее, решения по архитектуре остаются за мной.',
    },
    {
        index: '02',
        title: 'AI как QA',
        text: 'Локальные модели проверяют логику, делают код-ревью и ищут баги до деплоя.',
    },
    {
        index: '03',
        title: 'Тесты и рутина',
        text: 'Юнит- и интеграционные тесты и повторяющиеся операции автоматизированы. Готовый результат выходит в 2–3 раза быстрее обычного таймлайна.',
    },
] as const

export const frontendLayers = [
    {
        name: 'di/',
        rule: 'Бизнес-логика, сервисы и API. UI отсюда не импортируется.',
    },
    {
        name: 'app/',
        rule: 'Провайдеры, корневой layout и маршруты. Папка маршрута совпадает с URL.',
    },
    {
        name: 'views/widgets',
        rule: 'Единственное место, где интерфейс встречается с DI.',
    },
    {
        name: 'views/components',
        rule: 'Сборка из ui-примитивов. Без бизнес-логики и без контейнера.',
    },
    {
        name: 'views/ui',
        rule: 'Атомы на base-ui и Tailwind: кнопки, списки, ссылки.',
    },
    {
        name: 'libs/',
        rule: 'Общие DI-модули и UI-библиотека для всех приложений монорепы.',
    },
] as const

export const frontendStack = [
    'Nx',
    'React',
    'TypeScript',
    'InversifyJS',
    'base-ui',
    'Tailwind',
    'Valtio',
    'TanStack Query',
    'TanStack Router',
    'Logtape',
] as const

export const diPoints = [
    {
        title: 'Логика отдельно от UI',
        text: 'Провайдеры не знают про компоненты. Виджет берёт сервис через useDi и подписывается на Valtio-снимок.',
    },
    {
        title: 'Lazy singleton',
        text: 'Модуль регистрирует класс в контейнере. Экземпляр появляется в момент первого запроса и живёт один на контейнер.',
    },
    {
        title: 'Async initialize',
        text: 'Сервис с Initializable поднимается асинхронно. Компонент получает промис и читает его через React use.',
    },
] as const

export const diChain = ['React', 'DiProvider / useDi', 'Container', 'Modules', 'Providers'] as const

export const backendPoints = [
    {
        title: '~20 приложений',
        text: '5 HTTP-gateway, 4 auth, 8 core и cli. Общие библиотеки, а не копипаста между сервисами.',
    },
    {
        title: 'Gateway как BFF',
        text: 'Клиент ходит только в REST своей роли. Домен уходит в микросервис сообщением RabbitMQ.',
    },
    {
        title: 'Контракт рядом с кодом',
        text: 'Типы API живут отдельным пакетом. Фронт и gateway смотрят в одну схему.',
    },
    {
        title: 'E2E на контейнерах',
        text: 'Vitest поднимает MySQL, RabbitMQ и Redis и гоняет HTTP по настоящей топологии.',
    },
] as const

export const backendNodes = {
    clients: ['Web', 'Mobile'],
    gateways: ['Customer', 'Vendor', 'Courier', 'Control', 'Payments'],
    bus: ['RabbitMQ'],
    services: ['Auth', 'Core'],
    data: ['MySQL', 'Redis', 'S3'],
} as const
