import type { Factory } from "inversify"
import type { BooleanOptional, IStringifyOptions } from "qs"

import type { Initializable } from "../types/initializable"
import type { ILogger } from "../types/logger"

export const HttpClientProvider = Symbol.for("HttpClientProvider")
export const HttpClientFactory = Symbol.for("HttpClientFactory")

export type IHttpClientHeaders = Record<string, string>

export type IHttpClientOptions = Record<string, unknown> & {
    logger?: ILogger
    headers?: IHttpClientHeaders
    qsOptions?: IStringifyOptions<BooleanOptional>
}

export type IHttpClient = Initializable<void, [IHttpClientOptions]> & {
    send<T = unknown>(
        method: string,
        _url: string,
        data: unknown,
        _options: IHttpClientOptions,
    ): Promise<T>
    post<T = unknown>(
        url: string,
        body: unknown,
        rest?: IHttpClientOptions,
    ): Promise<T>
    get<T = unknown>(
        url: string,
        queryParams?: unknown,
        rest?: IHttpClientOptions,
    ): Promise<T>
    patch<T = unknown>(
        url: string,
        body: unknown,
        rest?: IHttpClientOptions,
    ): Promise<T>
    put<T = unknown>(
        url: string,
        body: unknown,
        rest?: IHttpClientOptions,
    ): Promise<T>
    delete<T = unknown>(
        url: string,
        body: unknown,
        rest?: IHttpClientOptions,
    ): Promise<T>
}

export type IHttpClientFactory = Factory<IHttpClient, [IHttpClientOptions]>

export interface IHttpClientContext {
    method: string
    url: string
    data: unknown
    options: IHttpClientOptions
}
