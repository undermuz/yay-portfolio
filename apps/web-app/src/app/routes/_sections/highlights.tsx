import { Card, Section } from '@libs/views'

import { highlights } from '../_data/resume'
import { Reveal } from '../_components/reveal'

export function Highlights() {
    return (
        <Section className="py-8 md:py-12">
            <Reveal>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {highlights.map((item) => (
                        <Card key={item.index} className="p-4">
                            <p className="font-mono text-[11px] text-lime">{item.index}</p>
                            <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.text}</p>
                        </Card>
                    ))}
                </div>
            </Reveal>
        </Section>
    )
}
