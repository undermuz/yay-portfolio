import { injectable } from "inversify"

import { HttpClient } from "../http/provider"

import type { IHttpClientOptions } from "../http/types"
import type { IApiClientOptions, IApiProvider } from "./types"

@injectable()
export class Api extends HttpClient implements IApiProvider {
    protected endpoint: string
    protected options: IApiClientOptions

    public override async initialize(options: IHttpClientOptions) {
        const apiOptions = options as IApiClientOptions

        if (!apiOptions.endpoint) {
            throw new Error("Api endpoint is required")
        }

        this.endpoint = apiOptions.endpoint
        this.options = apiOptions
    }

    protected override async transformUrl(url: string) {
        return `${this.endpoint}${url}`
    }

    protected override async transformOptions(rest: IHttpClientOptions = {}) {
        return {
            ...this.options,
            ...(rest || {}),
            headers: {
                ...(this.options.headers || {}),
                ...(rest.headers || {}),
            },
        }
    }
}
