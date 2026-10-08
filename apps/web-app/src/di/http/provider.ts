import { injectable } from "inversify"
import qs from "qs"

import type {
    IHttpClientContext,
    IHttpClientOptions,
    IHttpClient,
    IHttpClientHeaders,
} from "./types"

import { HttpRequestException } from "./exceptions/HttpRequestException"
import { HttpUnauthorizedException } from "./exceptions/HttpUnauthorizedException"
import {
    formatHttpErrorBody,
    formatUnknownError,
} from "./format-http-error"

import type { ILogger } from "../types/logger"

@injectable()
export class HttpClient implements IHttpClient {
    protected logger: ILogger | null = null

    public async initialize(options: IHttpClientOptions) {
        this.logger = options.logger || null
    }

    protected getClassByCode(code: number) {
        switch (code) {
            case 401:
                return HttpUnauthorizedException
            default:
                return HttpRequestException
        }
    }

    protected async transformUrl(
        url: string,
        context: IHttpClientContext,
    ): Promise<string> {
        return url
    }

    protected async transformOptions(
        options: IHttpClientOptions,
        context: IHttpClientContext,
    ): Promise<IHttpClientOptions> {
        return { ...options }
    }

    protected async transformHeaders(
        headers: IHttpClientHeaders,
        context: IHttpClientContext,
    ): Promise<IHttpClientHeaders> {
        const { data = null } = context

        const shouldNativeSerializer =
            data instanceof FormData || data instanceof URLSearchParams

        if (!shouldNativeSerializer && !headers["Content-Type"]) {
            headers["Content-Type"] = "application/json;charset=utf-8"
        }

        return headers
    }

    protected async getJsonOrText(request: Response) {
        const text = await request.text()

        try {
            return JSON.parse(text)
        } catch {
            return text
        }
    }

    protected async transformResponse<T = unknown>(
        request: Response,
        context: IHttpClientContext,
    ): Promise<T> {
        const response = (await this.getJsonOrText(request)) as
            | T
            | { message: string }

        if (request.status >= 300) {
            const c = this.getClassByCode(request.status)
            const detail = formatHttpErrorBody(response)

            throw new c(request, detail)
        }

        return response as T
    }

    protected async transformBody(
        data: unknown,
        contentType: string,
        context: IHttpClientContext,
    ): Promise<
        | Blob
        | BufferSource
        | FormData
        | URLSearchParams
        | string
        | null
        | undefined
    > {
        if (data === null) {
            return undefined
        }

        if (
            data instanceof FormData ||
            data instanceof URLSearchParams ||
            data instanceof Blob
        ) {
            return data
        }

        if (
            contentType.includes("application/x-www-form-urlencoded") &&
            data &&
            typeof data === "object"
        ) {
            return qs.stringify(data)
        }

        if (
            contentType.includes("multipart/form-data") &&
            data &&
            typeof data === "object"
        ) {
            const form_data = new FormData()

            for (const key in data) {
                form_data.append(
                    key,
                    (data as Record<string, Blob | string>)[key],
                )
            }

            return form_data
        }

        if (contentType.includes("application/json")) {
            return JSON.stringify(data)
        }

        return data as string
    }

    protected async transformQuery(
        data: unknown,
        context: IHttpClientContext,
    ): Promise<string> {
        if (data === null) {
            return ""
        }

        return qs.stringify(data, context.options.qsOptions)
    }

    protected async getBody(data: unknown, context: IHttpClientContext) {
        if (context.method === "GET") {
            return undefined
        }

        return await this.transformBody(
            data,
            context.options.headers?.["Content-Type"] ?? "",
            context,
        )
    }

    protected async getQuery(data: unknown, context: IHttpClientContext) {
        if (context.method !== "GET") {
            return ""
        }

        return await this.transformQuery(data, context)
    }

    protected async fetch(input: RequestInfo | URL, init?: RequestInit) {
        return await fetch(input, init)
    }

    public async send<T = unknown>(
        method: string,
        _url: string,
        data: unknown = null,
        _options: IHttpClientOptions = {},
    ): Promise<T> {
        const context: IHttpClientContext = {
            method,
            url: _url,
            data,
            options: _options,
        }

        context.options = await this.transformOptions(_options, context)

        const log =
            typeof context.options.logger === "undefined"
                ? this.logger
                : context.options.logger

        context.url = await this.transformUrl(_url, context)
        context.options.headers = await this.transformHeaders(
            {
                ...(context.options.headers || {}),
            },
            context,
        )

        const body = await this.getBody(data, context)
        const query = await this.getQuery(data, context)

        const url = `${context.url}${query ? "?" + query : ""}`

        if (log) {
            log.debug(
                `[${method}] ${url}\n` +
                    JSON.stringify(
                        { body, headers: context.options.headers },
                        null,
                        2,
                    ),
            )
        }

        let request: Response

        try {
            if (
                context.options.headers?.["Content-Type"]?.includes(
                    "multipart/form-data",
                )
            ) {
                delete context.options.headers["Content-Type"]
            }

            request = await this.fetch(url, {
                ...context.options,
                method,
                headers: context.options.headers,
                body,
            })
        } catch (e) {
            if (log) {
                log.error(`[${method}] ${url} [ERROR] Network error`, e)
            }

            throw e
        }

        try {
            const response = await this.transformResponse<T>(request, context)

            if (log) {
                log.debug(
                    `[${method}] ${url} [SUCCESS] ${request.status}`,
                    response,
                )
            }

            return response
        } catch (e) {
            if (log) {
                const detail = formatUnknownError(e)

                log.error(`[${method}] ${url} [FAIL] ${request.status}: ${detail}`)
            }

            throw e
        }
    }

    public async post<T = unknown>(url: string, body: unknown, rest = {}) {
        return this.send<T>("POST", url, body, rest)
    }

    public async get<T = unknown>(
        url: string,
        queryParams: unknown = null,
        rest = {},
    ) {
        return this.send<T>("GET", url, queryParams, rest)
    }

    public async patch<T = unknown>(url: string, body = null, rest = {}) {
        return this.send<T>("PATCH", url, body, rest)
    }

    public async put<T = unknown>(
        url: string,
        body: unknown = null,
        rest = {},
    ) {
        return this.send<T>("PUT", url, body, rest)
    }

    public async delete<T = unknown>(url: string, body = null, rest = {}) {
        return this.send<T>("DELETE", url, body, rest)
    }
}
