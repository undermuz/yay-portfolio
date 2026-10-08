import { useCallback } from 'react'

import { DocModal } from '@libs/views'

import { MarkdownView } from './_components/markdown-view'
import { documents, type DocId } from './_data/docs'
import { AiWorkflow } from './_sections/ai-workflow'
import { BackendArchitecture } from './_sections/backend-architecture'
import { MiroArchitecture } from './_sections/miro-architecture'
import { MiroWireframes } from './_sections/miro-wireframes'
import { Experience } from './_sections/experience'
import { Footer } from './_sections/footer'
import { FrontendArchitecture } from './_sections/frontend-architecture'
import { FrontendDi } from './_sections/frontend-di'
import { Header } from './_sections/header'
import { Hero } from './_sections/hero'
import { Highlights } from './_sections/highlights'
import { OpenSource } from './_sections/open-source'
import { Projects } from './_sections/projects'
import { Stack } from './_sections/stack'

type IndexPageProps = {
    docId?: DocId
    onOpenDoc: (id: DocId) => void
    onCloseDoc: () => void
}

export function IndexPage({ docId, onOpenDoc, onCloseDoc }: IndexPageProps) {
    const doc = docId ? documents[docId] : undefined

    const onDownload = useCallback(() => {
        if (!doc) return
        const blob = new Blob([doc.markdown], { type: 'text/markdown;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = doc.fileName
        link.click()
        URL.revokeObjectURL(url)
    }, [doc])

    return (
        <div id="top" className="min-h-screen bg-bg text-white">
            <Header />
            <main>
                <Hero />
                <Projects />
                <Highlights />
                <Stack />
                <Experience />
                <AiWorkflow />
                <div id="architecture" className="scroll-mt-24">
                    <FrontendArchitecture onOpenDoc={onOpenDoc} />
                    <FrontendDi onOpenDoc={onOpenDoc} />
                    <BackendArchitecture onOpenDoc={onOpenDoc} />
                    <MiroWireframes />
                    <MiroArchitecture onOpenDoc={onOpenDoc} />
                </div>
                <OpenSource />
            </main>
            <Footer />
            <DocModal
                open={Boolean(doc)}
                title={doc?.title ?? 'Документ'}
                fileName={doc?.fileName}
                onClose={onCloseDoc}
                onDownload={doc ? onDownload : undefined}
            >
                {doc ? <MarkdownView markdown={doc.markdown} /> : null}
            </DocModal>
        </div>
    )
}
