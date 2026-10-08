import { Eyebrow, Section, SectionTitle } from '@libs/views'

import { aiPoints } from '../_data/resume'
import { Reveal } from '../_components/reveal'

export function AiWorkflow() {
    return (
        <Section>
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <Eyebrow>AI в работе</Eyebrow>
                        <SectionTitle>ИИ ускоряет рутину. Решения остаются за мной</SectionTitle>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                            Cursor и Claude Code закрывают объём. Локальные модели проверяют логику до деплоя. Архитектуру, декомпозицию и ревью я не отдаю наружу целиком.
                        </p>
                    </div>
                    <ol className="space-y-6">
                        {aiPoints.map((point) => (
                            <li key={point.index} className="border-t border-line pt-5">
                                <div className="flex gap-4">
                                    <span className="font-mono text-sm text-lime">{point.index}</span>
                                    <div>
                                        <h3 className="text-base font-medium">{point.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{point.text}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Reveal>
        </Section>
    )
}
