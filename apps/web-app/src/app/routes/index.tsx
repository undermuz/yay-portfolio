import { useCallback } from 'react'
import { createRootRoute, createRoute } from '@tanstack/react-router'

import { type DocId, validateIndexSearch } from './_data/docs'
import { RootLayout } from './layout'
import * as nestedPage from './nested-page/routes'
import { IndexPage } from './page'

export const root = createRootRoute({
    component: RootLayout,
})

export const indexRoute = createRoute({
    getParentRoute: () => root,
    path: '/',
    validateSearch: validateIndexSearch,
    component: HomePage,
})

function HomePage() {
    const { doc } = indexRoute.useSearch()
    const navigate = indexRoute.useNavigate()

    const onOpenDoc = useCallback(
        (id: DocId) => {
            void navigate({
                search: (prev) => ({ ...prev, doc: id }),
                resetScroll: false,
            })
        },
        [navigate],
    )

    const onCloseDoc = useCallback(() => {
        void navigate({
            search: () => ({}),
            replace: true,
            resetScroll: false,
        })
    }, [navigate])

    return <IndexPage docId={doc} onOpenDoc={onOpenDoc} onCloseDoc={onCloseDoc} />
}

export const tree = root.addChildren([indexRoute, nestedPage.tree])
