import { Eyebrow, Section, SectionTitle } from '@libs/views'

import screens from '../../../assets/miro/screens.png'
import wireframes from '../../../assets/miro/wireframes.png'
import { ImageLightbox } from '../_components/image-lightbox'
import { Reveal } from '../_components/reveal'
import { miroWireframes } from '../_data/resume'

const sources = {
    screens,
    wireframes,
} as const

export function MiroWireframes() {
    return (
        <Section id="miro-wireframes" className="pt-0">
            <Reveal>
                <Eyebrow>Проектирование</Eyebrow>
                <SectionTitle>Сначала экраны и вайрфреймы, потом код</SectionTitle>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{miroWireframes.lead}</p>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    {miroWireframes.shots.map((shot) => (
                        <ImageLightbox
                            key={shot.id}
                            src={sources[shot.id]}
                            alt={shot.alt}
                            title={shot.title}
                            text={shot.text}
                        />
                    ))}
                </div>
            </Reveal>
        </Section>
    )
}
