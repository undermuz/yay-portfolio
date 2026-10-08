import { Badge, Card, Section } from '@libs/views'

import { projects } from '../_data/resume'
import { ArrowOut } from '../_components/icons'
import { Reveal } from '../_components/reveal'

export function Projects() {
    return (
        <Section id="projects" eyebrow="Проекты" title="Собрано с нуля, вместе с командой" className="pt-8">
            <Reveal>
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.title} className="flex h-full flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">{project.period}</p>
                                    <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                                </div>
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${project.title} — открыть сайт`}
                                    className="grid size-8 shrink-0 place-items-center rounded-md border border-line text-zinc-400 transition hover:border-white/20 hover:text-white"
                                >
                                    <ArrowOut />
                                </a>
                            </div>
                            <p className="mt-3 text-sm text-zinc-400">{project.summary}</p>
                            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                                {project.points.map((point) => (
                                    <li key={point} className="flex gap-2">
                                        <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-600" aria-hidden="true" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            {project.links ? (
                                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                                    {project.links.map((link) => (
                                        <li key={link.href}>
                                            <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-lime">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </Reveal>
        </Section>
    )
}
