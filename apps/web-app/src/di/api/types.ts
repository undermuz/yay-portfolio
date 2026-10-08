import type { Factory } from "inversify"

import type { IHttpClient, IHttpClientOptions } from "../http/types"
import type { ILogger } from "../types/logger"

export const ApiProvider = Symbol.for("ApiProvider")
export const ApiFactory = Symbol.for("ApiFactory")

export type IApiClientOptions = IHttpClientOptions & {
    logger: ILogger
    endpoint: string
}

export type IApiProvider = Omit<IHttpClient, "initialize"> & {
    initialize: (options: IApiClientOptions) => Promise<void> | void
}

export type IApiFactory = Factory<IApiProvider, [IApiClientOptions]>
