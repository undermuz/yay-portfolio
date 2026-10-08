import { useCallback, useEffect, useMemo, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { extractH2 } from '../_data/docs'

function CodeBlock({ children, ...props }: ComponentProps<'pre'>) {
    const ref = useRef<HTMLPreElement>(null)
    const [copied, setCopied] = useState(false)

    const copy = useCallback(() => {
        const text = ref.current?.innerText ?? ''
        void navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1400)
        })
    }, [])

    return (
        <div className="relative">
            <button
                type="button"
                onClick={copy}
                className="absolute top-2 right-2 z-10 rounded-md border border-white/10 bg-bg/80 px-2 py-1 font-mono text-[10px] tracking-wide text-zinc-400 uppercase hover:text-white"
            >
                {copied ? 'Скопировано' : 'Скопировать'}
            </button>
            <pre ref={ref} {...props} className={`pt-10 ${props.className ?? ''}`}>
                {children}
            </pre>
        </div>
    )
}

function MarkdownLink({ href, children }: { href?: string; children?: ReactNode }) {
    const external = Boolean(href && /^https?:/.test(href))
    return (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            {children}
        </a>
    )
}

const components: Components = {
    pre: CodeBlock,
    a: MarkdownLink,
}

export function MarkdownView({ markdown }: { markdown: string }) {
    const toc = useMemo(() => extractH2(markdown), [markdown])
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const onClick = (event: Event) => {
            const target = event.target
            if (!(target instanceof Element)) return
            const anchor = target.closest('a')
            if (!anchor || !root.contains(anchor)) return
            const href = anchor.getAttribute('href')
            if (!href?.startsWith('#')) return
            const id = decodeURIComponent(href.slice(1))
            const node = root.querySelector(`#${CSS.escape(id)}`)
            if (!(node instanceof HTMLElement)) return
            event.preventDefault()
            node.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        root.addEventListener('click', onClick)
        return () => root.removeEventListener('click', onClick)
    }, [markdown])

    return (
        <div ref={rootRef} className="grid min-h-0 flex-1 md:grid-cols-[200px_minmax(0,1fr)]">
            <nav className="hidden overflow-y-auto border-r border-line px-4 py-5 md:block" aria-label="Содержание">
                <p className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Содержание</p>
                <ul className="mt-3 space-y-2">
                    {toc.map((item) => (
                        <li key={item.id}>
                            <a href={`#${item.id}`} className="text-xs leading-snug text-zinc-400 hover:text-lime">
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <article className="prose prose-invert prose-doc min-h-0 max-w-none overflow-y-auto px-5 py-6 md:px-8">
                {toc.length > 0 ? (
                    <div className="not-prose mb-6 flex gap-2 overflow-x-auto md:hidden">
                        {toc.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-zinc-400"
                            >
                                {item.text}
                            </a>
                        ))}
                    </div>
                ) : null}
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]} components={components}>
                    {markdown}
                </ReactMarkdown>
            </article>
        </div>
    )
}
