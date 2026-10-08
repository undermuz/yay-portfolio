# Dependency Injection (DI) - Архитектура и документация

## Содержание

- [Обзор](#обзор)
- [Архитектура](#архитектура)
- [Паттерны и подходы](#паттерны-и-подходы)
- [Структура папки](#структура-папки)
- [Инструкция по работе](#инструкция-по-работе)
- [Примеры использования](#примеры-использования)

## Обзор

Папка `di/` содержит бизнес-логику приложения, организованную через паттерн Dependency Injection (DI) с использованием библиотеки [InversifyJS](https://inversify.io/). 

**Основные принципы:**
- Полная изоляция бизнес-логики от UI-слоя
- Модульная архитектура с четким разделением ответственности
- Управление зависимостями через DI-контейнер
- Реактивное состояние через Valtio
- Поддержка асинхронной инициализации сервисов

## Архитектура

### Концепция

DI-система построена на следующих компонентах:

1. **Container** (`container.ts`) - корневой DI-контейнер, который собирает все модули
2. **Modules** - модули, регистрирующие провайдеры в контейнере
3. **Providers** - классы, реализующие бизнес-логику
4. **React Integration** - интеграция с React через контекст и хуки

### Слои архитектуры

```
┌─────────────────────────────────────┐
│         React Components            │  ← UI слой (views/)
│  (используют useDi для доступа)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      React Integration Layer        │  ← di/react/
│  (DiProvider, useDi, useDiContainer,│
│   useLogger, useT)                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         DI Container                │  ← container.ts
│  (собирает все модули)              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           Modules                    │  ← */*.module.ts
│  (регистрируют провайдеры)          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          Providers                   │  ← */*.provider.ts
│  (бизнес-логика, сервисы, API)      │
└─────────────────────────────────────┘
```

### Жизненный цикл

1. **Инициализация контейнера** - `createDiContainer()` создает контейнер и загружает модули
2. **Регистрация модулей** - каждый модуль регистрирует свои провайдеры
3. **Активация провайдеров** - провайдеры создаются при первом запросе (lazy)
4. **Инициализация сервисов** - сервисы с интерфейсом `Initializable` инициализируются асинхронно
5. **Использование в React** - компоненты получают доступ через `useDi` хук

## Паттерны и подходы

### 1. Модульная организация

Каждый домен/функциональность организован в отдельный модуль:

```typescript
// Структура модуля
domain/
  ├── domain.module.ts      // Регистрация в DI-контейнере
  ├── domain.provider.ts    // Основная реализация
  ├── domain.[NAME].ts      // Дополнительные классы
  ├── domain.types.ts       // Интерфейсы и типы
```

**Пример модуля:**

```typescript
// auth/by-code/auth-by-code.module.ts
import { ContainerModule } from "inversify"
import { AuthByCodeModuleTypes, IAuthByCodeProvider } from "./auth-by-code.types"
import { AuthByCode } from "./auth-by-code.provider"
import { AuthByCodeApi } from "./auth-by-code.api"

export const AuthByCodeModule = new ContainerModule((ctx) => {
    ctx.bind<IAuthByCodeProvider>(AuthByCodeModuleTypes.AuthService)
        .to(AuthByCode)
        .inSingletonScope()
    
    ctx.bind<AuthByCodeApi>(AuthByCodeApi)
        .to(AuthByCodeApi)
        .inSingletonScope()
})
```

### 2. Провайдеры с зависимостями

Провайдеры используют декораторы `@injectable()` и `@inject()` для внедрения зависимостей:

```typescript
@injectable()
export class AuthByCode implements IAuthByCodeProvider {
    @inject(TokenProvider)
    public readonly tokenProvider: ITokenProvider
    
    @inject(UserProvider)
    public readonly userProvider: IUserProvider
    
    @inject(AuthByCodeApi)
    public readonly api: AuthByCodeApi
}
```

### 3. Асинхронная инициализация

Сервисы могут реализовывать интерфейс `Initializable` для асинхронной инициализации:

```typescript
export interface Initializable<R = void, A extends unknown[] = unknown[]> {
    initialize(...args: A): Promise<R>
}
```

**Пример:**

```typescript
@injectable()
export class AppConfig implements IConfigProvider {
    public async initialize() {
        this.apiPrefix = this.env.getOrThrow("API_PREFIX")
        this.logLevel = this.env.get<LogLevels>("LOG_LEVEL", "trace")
    }
}
```

### 4. Управление состоянием через Valtio

Провайдеры используют Valtio для реактивного состояния:

```typescript
import { proxy } from "valtio"

@injectable()
export class Session implements ISessionProvider {
    public state: ISessionState
    
    public async initialize(config: Partial<ISessionState> = {}) {
        this.state = proxy({
            status: "unauthenticated",
            isLoading: false,
            ...config,
        })
    }
}
```

### 5. Фабрики для создания экземпляров

Использование фабрик для создания экземпляров с параметрами:

```typescript
// В модуле
ctx.bind<IApiFactory>(ApiFactory).toFactory((ctx) => {
    return (endpoint: string, options: IHttpClientOptions) => {
        const api = ctx.get<IApiProvider>(ApiProvider)
        api.initialize(endpoint, options)
        return api
    }
})
```

### 6. Scope управления жизненным циклом

- **Singleton** (`inSingletonScope()`) - один экземпляр на весь контейнер
- **Transient** (`inTransientScope()`) - новый экземпляр при каждом запросе

### 7. Активация хуков

Использование `onActivation` для выполнения логики при активации провайдера:

```typescript
di.onActivation(ConfigProvider, async (_ctx, config: AppConfig) => {
    await config.initialize()
    return config
})
```

## Инструкция по работе

### Создание нового модуля

#### Шаг 1: Определение типов и интерфейсов

Создайте файл `types.ts`:

```typescript
// my-module/types.ts
export const MyModuleProvider = Symbol.for("MyModuleProvider")

export interface IMyModuleProvider {
    doSomething(): Promise<void>
    state: IMyModuleState
}

export interface IMyModuleState {
    data: string | null
    isLoading: boolean
}
```

#### Шаг 2: Создание провайдера

Создайте файл `my-module.provider.ts`:

```typescript
// my-module/my-module.provider.ts
import { inject, injectable } from "inversify"
import { proxy } from "valtio"
import { IMyModuleProvider, IMyModuleState } from "./types"
import { Initializable } from "../types/initializable"

@injectable()
export class MyModule implements IMyModuleProvider, Initializable {
    @inject(SomeDependency)
    private readonly dependency: ISomeDependency
    
    public state: IMyModuleState
    
    public async initialize(config: Partial<IMyModuleState> = {}) {
        this.state = proxy({
            data: null,
            isLoading: false,
            ...config,
        })
    }
    
    public async doSomething(): Promise<void> {
        this.state.isLoading = true
        // Ваша логика
        this.state.isLoading = false
    }
}
```

#### Шаг 3: Создание модуля

Создайте файл `my-module.module.ts`:

```typescript
// my-module/my-module.module.ts
import { ContainerModule } from "inversify"
import { MyModuleProvider, IMyModuleProvider } from "./types"
import { MyModule } from "./my-module.provider"

export const MyModule = new ContainerModule((ctx) => {
    ctx.bind<IMyModuleProvider>(MyModuleProvider)
        .to(MyModule)
        .inSingletonScope()
})
```

#### Шаг 4: Регистрация модуля в контейнере

Добавьте модуль в `container.ts`:

```typescript
// container.ts
import { MyModule } from "./my-module/my-module.module"

export const createDiContainer = () => {
    const di: Container = new Container()
    
    // ... другие модули
    
    di.load(MyModule)
    
    return di
}
```

### Использование в React компонентах

#### Базовое использование

```typescript
import { useDi } from "@libs/di/react/hooks/useDi"
import { MyModuleProvider } from "@/di/my-module/types"

export const MyComponent = () => {
    const myModule = useDi<IMyModuleProvider>(MyModuleProvider)
    
    // Использование сервиса
    const handleClick = async () => {
        await myModule.doSomething()
    }
    
    return <button onClick={handleClick}>Do Something</button>
}
```

#### Асинхронная инициализация

Для сервисов с асинхронной инициализацией используйте `useDi` с флагом `isAsync`:

```typescript
import { useDi } from "@libs/di/react/hooks/useDi"
import { AppProvider } from "@/di/app/types"

export const MyComponent = () => {
    const appPromise = useDi<IAppProvider>(AppProvider, true)
    const app = use(appPromise) // React use hook для промисов
    
    // Использование app
}
```

#### Реактивное состояние

Для отслеживания изменений состояния используйте Valtio:

```typescript
import { useSnapshot } from "valtio"
import { useDi } from "@libs/di/react/hooks/useDi"
import { SessionProvider } from "@/di/session/types"

export const SessionStatus = () => {
    const session = useDi<ISessionProvider>(SessionProvider)
    const state = useSnapshot(session.state)
    
    return <div>Status: {state.status}</div>
}
```

### Создание API клиента

#### Шаг 1: Создание API класса

```typescript
// my-module/my-module.api.ts
import { injectable } from "inversify"
import { Api } from "../common/api/api.provider"
import { Initializable } from "../types/initializable"

@injectable()
export class MyModuleApi extends Api implements Initializable {
    public async initialize() {
        await super.initialize("/api/my-module", {
            headers: {
                "Custom-Header": "value",
            },
        })
    }
    
    public async getData() {
        return this.get<DataResponse>("/data")
    }
    
    public async createData(data: CreateDataRequest) {
        return this.post<DataResponse>("/data", data)
    }
}
```

#### Шаг 2: Регистрация в модуле

```typescript
// my-module/my-module.module.ts
export const MyModule = new ContainerModule((ctx) => {
    ctx.bind<IMyModuleProvider>(MyModuleProvider)
        .to(MyModule)
        .inSingletonScope()
    
    ctx.bind<MyModuleApi>(MyModuleApi)
        .to(MyModuleApi)
        .inSingletonScope()
})
```

#### Шаг 3: Использование в провайдере

```typescript
@injectable()
export class MyModule implements IMyModuleProvider {
    @inject(MyModuleApi)
    public readonly api: MyModuleApi
    
    public async doSomething() {
        const data = await this.api.getData()
        // Обработка данных
    }
}
```

### Работа с HTTP клиентом

HTTP клиент предоставляет базовую функциональность для работы с API:

```typescript
// В провайдере
@inject(HttpClient)
private readonly httpClient: IHttpClient

public async makeRequest() {
    const response = await this.httpClient.get<ResponseType>("/endpoint", {
        queryParams: { id: 123 },
        headers: { "Custom-Header": "value" },
    })
}
```

### Работа с логгером

```typescript
@injectable()
export class MyModule {
    constructor(
        @inject("Factory<Logger>")
        private readonly loggerFactory: ILoggerFactory,
        @inject(ConfigProvider)
        private readonly config: IConfigProvider,
    ) {
        this.logger = this.loggerFactory("MyModule", {
            level: this.config.logLevel,
        })
    }
    
    public async doSomething() {
        this.logger.info("Starting operation")
        this.logger.debug("Debug information", { data: "value" })
        this.logger.error("Error occurred", error)
    }
}
```

## Примеры использования

### Пример 1: Простой сервис

```typescript
// counter/counter.module.ts
import { ContainerModule } from "inversify"
import { CounterProvider, ICounterProvider } from "./types"
import { Counter } from "./counter.provider"

export const CounterModule = new ContainerModule((ctx) => {
    ctx.bind<ICounterProvider>(CounterProvider)
        .to(Counter)
        .inSingletonScope()
})

// counter/counter.provider.ts
import { injectable } from "inversify"
import { proxy } from "valtio"
import { ICounterProvider, ICounterState } from "./types"

@injectable()
export class Counter implements ICounterProvider {
    public state: ICounterState
    
    constructor() {
        this.state = proxy({ count: 0 })
    }
    
    public increment() {
        this.state.count++
    }
    
    public decrement() {
        this.state.count--
    }
}

// Использование в компоненте
const CounterComponent = () => {
    const counter = useDi<ICounterProvider>(CounterProvider)
    const state = useSnapshot(counter.state)
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => counter.increment()}>+</button>
            <button onClick={() => counter.decrement()}>-</button>
        </div>
    )
}
```

### Пример 2: Сервис с зависимостями

```typescript
// order/order.provider.ts
@injectable()
export class OrderService implements IOrderService {
    @inject(ApiProvider)
    private readonly api: IApiProvider
    
    @inject(SessionProvider)
    private readonly session: ISessionProvider
    
    public async createOrder(data: CreateOrderRequest) {
        if (this.session.state.status !== "authenticated") {
            throw new Error("User not authenticated")
        }
        
        return this.api.post("/orders", data)
    }
}
```

### Пример 3: Фабрика для создания экземпляров

```typescript
// В модуле
ctx.bind<Factory<IApiProvider>>("Factory<IApiProvider>").toFactory((ctx) => {
    return (endpoint: string) => {
        const api = ctx.get<IApiProvider>(ApiProvider)

        api.initialize(endpoint)

        return api
    }
})

// Использование
const apiFactory = useDi<Factory<IApiProvider>>("Factory<IApiProvider>")
const customApi = apiFactory("/custom-endpoint")
```

## Лучшие практики

1. **Разделение ответственности**: Каждый модуль должен отвечать за одну область функциональности
2. **Интерфейсы**: Определяйте интерфейсы для провайдеров в `types.ts`
3. **Инициализация**: Используйте `Initializable` для сервисов, требующих асинхронной инициализации
4. **Состояние**: Используйте Valtio `proxy` для реактивного состояния
5. **Логирование**: Используйте фабрику логгеров для создания именованных логгеров
6. **Обработка ошибок**: Используйте кастомные исключения из `common/http-client/exceptions`
7. **Типизация**: Всегда используйте TypeScript типы и интерфейсы
8. **Тестирование**: Провайдеры легко тестируются через моки зависимостей

## Отладка

### Логирование запросов к DI-контейнеру

Для отладки DI используйте логирование в `useDi`:

```typescript
// useDi.ts уже логирует все запросы
console.log(`[di: ${token.toString()}]${isAsync ? "[async]" : ""}`)
```

Проверьте консоль браузера для отслеживания запросов к DI-контейнеру.

### Использование useLogger для отладки

Основной способ отладки в React компонентах - использование хука `useLogger`:

```typescript
import { useLogger } from "@libs/di/react/hooks/useLogger"

export const RestaurantsList = () => {
    const logger = useLogger("RestaurantsList")
    
    // Отладочные сообщения
    logger.debug("No location selected")
    logger.debug("Loading restaurants", { filters })
    
    // Информационные сообщения
    logger.info("Restaurants loaded successfully")
    
    // Предупреждения
    logger.warn("Location permission denied")
    
    // Ошибки
    try {
        // код
    } catch (error) {
        logger.error("Failed to load restaurants", error)
    }
    
    return (
        // Ваш компонент
    )
}
```

**Преимущества `useLogger`:**
- Автоматическое именование логгера по имени компонента
- Использование уровня логирования из конфигурации приложения
- Мемоизация логгера для оптимизации производительности
- Единый интерфейс логирования во всем приложении

**Методы логгера:**
- `logger.debug(message, ...args)` - отладочная информация
- `logger.info(message, ...args)` - информационные сообщения
- `logger.warn(message, ...args)` - предупреждения
- `logger.error(message, ...args)` - ошибки
- `logger.trace(message, ...args)` - детальная трассировка

**Уровни логирования:**
Уровень логирования настраивается через переменную окружения `LOG_LEVEL` и доступен через `app.config.logLevel`. Доступные уровни: `trace`, `debug`, `info`, `warn`, `error`.

## Дополнительные ресурсы

- [InversifyJS документация](https://inversify.io/)
- [Valtio документация](https://valtio.pmnd.rs/)
- [React use hook](https://react.dev/reference/react/use)
