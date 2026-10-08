import { Eyebrow, Section, SectionTitle } from '@libs/views'

import { experience } from '../_data/resume'
import { Reveal } from '../_components/reveal'

export function Experience() {
    return (
        <Section id="experience">
            <Reveal>
                <Eyebrow>Опыт</Eyebrow>
                <SectionTitle>15 лет, от вёрстки до команды</SectionTitle>
                <div className="relative mt-12">
                    <div className="pointer-events-none absolute top-0 right-0 left-0 hidden h-px bg-lime/80 lg:block" />
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {experience.map((job) => (
                            <article key={job.company} className="relative lg:pt-6">
                                <span className="absolute top-0 left-0 hidden size-2 -translate-y-1/2 rounded-full bg-lime lg:block" />
                                <p className="font-mono text-[11px] tracking-wider text-lime uppercase">{job.length}</p>
                                <p className="mt-2 font-mono text-[11px] text-zinc-500">{job.period}</p>
                                <h3 className="mt-3 text-base font-semibold">{job.company}</h3>
                                <p className="mt-1 text-sm text-zinc-300">{job.role}</p>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{job.summary}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </Reveal>
        </Section>
    )
}
