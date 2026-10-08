import { ContainerModule } from "inversify"

import { HttpClient } from "./provider"
import {
    HttpClientFactory,
    HttpClientProvider,
    type IHttpClient,
    type IHttpClientFactory,
    type IHttpClientOptions,
} from "./types"

export const HttpClientModule = new ContainerModule((ctx) => {
    ctx.bind<IHttpClient>(HttpClientProvider).to(HttpClient).inTransientScope()

    ctx.bind<IHttpClientFactory>(HttpClientFactory).toFactory((ctx) => {
        return async (options: IHttpClientOptions) => {
            const httpClient = await ctx.getAsync<IHttpClient>(HttpClientProvider)

            await httpClient.initialize(options)

            return httpClient
        }
    })
})
