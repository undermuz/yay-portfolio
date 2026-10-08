import GithubSlugger from 'github-slugger'
import frontendArchitecture from '../../../content/docs/frontend-architecture.md?raw'
import frontendDi from '../../../content/docs/frontend-di.md?raw'
import backendArchitecture from '../../../content/docs/backend-architecture.md?raw'

export const docIds = ['frontend-architecture', 'frontend-di', 'backend-architecture'] as const

export type DocId = (typeof docIds)[number]

export type DocEntry = {
    id: DocId
    title: string
    fileName: string
    markdown: string
}

export const documents: Record<DocId, DocEntry> = {
    'frontend-architecture': {
        id: 'frontend-architecture',
        title: 'Архитектура фронтенда',
        fileName: 'arch.md',
        markdown: frontendArchitecture,
    },
    'frontend-di': {
        id: 'frontend-di',
        title: 'DI на фронтенде',
        fileName: 'di.md',
        markdown: frontendDi,
    },
    'backend-architecture': {
        id: 'backend-architecture',
        title: 'Backend: микросервисы на NestJS',
        fileName: 'backend.md',
        markdown: backendArchitecture,
    },
}

export function isDocId(value: string): value is DocId {
    return (docIds as readonly string[]).includes(value)
}

export function validateIndexSearch(search: Record<string, unknown>): { doc?: DocId } {
    const value = search['doc']
    if (typeof value === 'string' && isDocId(value)) {
        return { doc: value }
    }
    return {}
}

export type TocItem = {
    id: string
    text: string
}

function stripMarkdown(value: string) {
    return value
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_]/g, '')
        .trim()
}

export function extractH2(markdown: string): TocItem[] {
    const slugger = new GithubSlugger()
    const withoutFences = markdown.replace(/```[\s\S]*?```/g, '')
    const items: TocItem[] = []

    for (const match of withoutFences.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
        const level = match[1]?.length ?? 0
        const text = stripMarkdown(match[2] ?? '')
        if (!text) continue
        const id = slugger.slug(text)
        if (level === 2) items.push({ id, text })
    }

    return items
}
