import { Badge, Card, Eyebrow, Section, SectionTitle } from '@libs/views'

import { stackGroups } from '../_data/resume'
import { Reveal } from '../_components/reveal'

export function Stack() {
    return (
        <Section id="stack">
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
                    <div>
                        <Eyebrow>Стек</Eyebrow>
                        <SectionTitle>Инструменты, на которых собираю продукт</SectionTitle>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                            От интерфейса и real-time до очередей, поиска и мобильной оболочки. Рядом — практики, без которых команда разъезжается.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {stackGroups.map((group) => (
                            <Card key={group.title} className="p-4">
                                <h3 className="text-sm font-medium">{group.title}</h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <Badge key={item}>{item}</Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Reveal>
        </Section>
    )
}
