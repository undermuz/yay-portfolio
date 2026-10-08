import { ContainerModule } from "inversify"

import { Api } from "./provider"
import {
    ApiFactory,
    ApiProvider,
    type IApiClientOptions,
    type IApiFactory,
    type IApiProvider,
} from "./types"

export const ApiModule = new ContainerModule((ctx) => {
    ctx.bind<IApiProvider>(ApiProvider).to(Api).inTransientScope()

    ctx.bind<IApiFactory>(ApiFactory).toFactory((ctx) => {
        return async (options: IApiClientOptions) => {
            const api = await ctx.getAsync<IApiProvider>(ApiProvider)

            await api.initialize(options)

            return api
        }
    })
})
