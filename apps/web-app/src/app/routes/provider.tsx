import {
    createRouter,
    RouterProvider as TanStackRouterProvider,
} from "@tanstack/react-router";

import * as rootRouter from ".";

const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createRouter({
    routeTree: rootRouter.tree,
    basepath,
    defaultPreload: "intent",
    scrollRestoration: true,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function RouterProvider() {
    return (
        <>
            <TanStackRouterProvider router={router} />
            {/* <TanStackRouterDevtools router={router} /> */}
        </>
    );
}
