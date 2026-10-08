import { Badge, Button, Card, Section } from '@libs/views'

import { moreRepos, openSource } from '../_data/open-source'
import { Reveal } from '../_components/reveal'

export function OpenSource() {
    return (
        <Section
            id="open-source"
            eyebrow="Open source"
            title="Библиотеки, которыми закрываю рутину"
            description="Формы, конструктор страниц и генератор DI. Пакеты опубликованы в npm под MIT."
        >
            <Reveal>
                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                    {openSource.map((project) => (
                        <Card key={project.name} className="flex h-full flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-mono text-[11px] text-zinc-500">{project.npm}</p>
                                    <h3 className="mt-1 text-lg font-semibold">{project.name}</h3>
                                </div>
                                {project.badge ? <Badge tone="lime">{project.badge}</Badge> : null}
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                            {project.uses ? (
                                <p className="mt-3 font-mono text-[11px] tracking-wide text-lime uppercase">использует {project.uses}</p>
                            ) : null}
                            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                                {project.points.map((point) => (
                                    <li key={point} className="flex gap-2">
                                        <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-600" aria-hidden="true" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            {project.snippet ? (
                                <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[12px] text-zinc-300">
                                    <code>{project.snippet}</code>
                                </pre>
                            ) : null}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Button href={project.href} variant="ghost">
                                    GitHub
                                </Button>
                                {project.demo ? <Button href={project.demo}>Демо</Button> : null}
                            </div>
                        </Card>
                    ))}
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {moreRepos.map((repo) => (
                        <li key={repo.href}>
                            <a
                                href={repo.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-full flex-col rounded-xl border border-line px-4 py-3 transition hover:border-white/15"
                            >
                                <span className="font-mono text-sm text-zinc-200">{repo.name}</span>
                                <span className="mt-1 text-sm text-zinc-500">{repo.description}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </Section>
    )
}
