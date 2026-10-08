import { Badge, Button, Card, Eyebrow, Section } from '@libs/views'

import { Reveal } from '../_components/reveal'
import { profile } from '../_data/resume'

export function Hero() {
    return (
        <Section className="pt-14 pb-8 md:pt-20 md:pb-12">
            <Reveal>
                <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
                    <div>
                        <Eyebrow>
                            {profile.role} · {profile.city}
                        </Eyebrow>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.08]">
                            {profile.headline.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </h1>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">{profile.summary}</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button href={profile.telegram}>Написать в Telegram</Button>
                            <Button href={profile.resumeHref} variant="ghost">
                                Резюме на hh.ru
                            </Button>
                        </div>
                        <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
                            {profile.meta.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <span className="text-lime" aria-hidden="true">
                                        ·
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Card className="p-4 md:p-5">
                        <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
                            <span>Fullstack</span>
                            <span>15 лет</span>
                        </div>
                        <p className="mt-4 text-lg font-medium">{profile.terminal.role}</p>
                        <p className="mt-1 text-sm text-zinc-500">{profile.terminal.place}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {profile.terminal.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>
                        <p className="mt-5 flex items-center gap-2 text-sm text-zinc-300">
                            <span className="size-1.5 animate-pulse rounded-full bg-lime" aria-hidden="true" />
                            {profile.terminal.status}
                        </p>
                        <div className="mt-5 rounded-lg border border-alert-line bg-alert px-4 py-3">
                            <p className="text-sm font-medium text-rose-100">{profile.offer.title}</p>
                            <p className="mt-1 font-mono text-xs text-rose-200/80">
                                {profile.offer.salary} · {profile.offer.format}
                            </p>
                        </div>
                    </Card>
                </div>
            </Reveal>
        </Section>
    )
}
