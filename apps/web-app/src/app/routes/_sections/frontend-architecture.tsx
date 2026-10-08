import { useCallback } from 'react'

import { Badge, Button, Card, Eyebrow, Section, SectionTitle } from '@libs/views'

import { Reveal } from '../_components/reveal'
import type { DocId } from '../_data/docs'
import { generators } from '../_data/open-source'
import { frontendLayers, frontendStack } from '../_data/resume'

export function FrontendArchitecture({ onOpenDoc }: { onOpenDoc: (id: DocId) => void }) {
    const open = useCallback(() => {
        onOpenDoc('frontend-architecture')
    }, [onOpenDoc])

    return (
        <Section id="frontend-architecture">
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                    <div>
                        <Eyebrow>Архитектура</Eyebrow>
                        <SectionTitle>Фронтенд: слоями и без сюрпризов</SectionTitle>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                            Nx-монорепа. Страница только собирает провайдеры, layout и виджеты. Бизнес-логика живёт в DI и не импортирует UI. Виджет — единственная точка, где они встречаются.
                        </p>
                        <div className="mt-6">
                            <Button onClick={open}>Открыть arch.md</Button>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {frontendStack.map((item) => (
                                <Badge key={item}>{item}</Badge>
                            ))}
                        </div>
                        <p className="mt-6 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">Генераторы</p>
                        <ul className="mt-2 space-y-1 text-sm">
                            {generators.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-lime">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        {frontendLayers.map((layer) => (
                            <Card key={layer.name} className="px-4 py-3 transition hover:border-white/15">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                    <p className="font-mono text-sm text-lime">{layer.name}</p>
                                    <p className="text-sm text-zinc-400 sm:text-right">{layer.rule}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Reveal>
        </Section>
    )
}
