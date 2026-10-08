import { useCallback } from 'react'

import { Button, Eyebrow, Section, SectionTitle } from '@libs/views'

import architecture from '../../../assets/miro/architecture.png'
import { ImageLightbox } from '../_components/image-lightbox'
import { Reveal } from '../_components/reveal'
import type { DocId } from '../_data/docs'
import { miroArchitecture } from '../_data/resume'

export function MiroArchitecture({ onOpenDoc }: { onOpenDoc: (id: DocId) => void }) {
    const open = useCallback(() => {
        onOpenDoc('backend-architecture')
    }, [onOpenDoc])

    return (
        <Section id="miro-architecture" className="pt-0">
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
                    <div>
                        <Eyebrow>Miro</Eyebrow>
                        <SectionTitle>Архитектура платформы доставки на борде</SectionTitle>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{miroArchitecture.lead}</p>
                        <ul className="mt-6 space-y-4">
                            {miroArchitecture.points.map((point) => (
                                <li key={point.title}>
                                    <p className="text-sm font-medium">{point.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{point.text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Button onClick={open}>Открыть README backend</Button>
                        </div>
                    </div>
                    <ImageLightbox
                        src={architecture}
                        alt={miroArchitecture.alt}
                        title="Флоу, модели, инфраструктура, API"
                        text="Общий борд: сценарии заказа, сущности, инфраструктура и четыре gateway."
                        previewClassName="max-h-[420px] w-full object-contain object-left"
                    />
                </div>
            </Reveal>
        </Section>
    )
}
