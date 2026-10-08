import { Button, Container } from '@libs/views'

import { profile } from '../_data/resume'

export function Footer() {
    return (
        <footer id="contacts" className="scroll-mt-24 border-t border-line">
            <Container className="flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Контакты</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Давайте работать</h2>
                    <p className="mt-3 max-w-md text-sm text-zinc-400">
                        {profile.city}. {profile.education}. {profile.english}.
                    </p>
                    <ul className="mt-4 space-y-1 text-sm text-zinc-300">
                        <li>
                            <a href={profile.telegram} target="_blank" rel="noreferrer" className="hover:text-lime">
                                Telegram {profile.telegramLabel}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${profile.email}`} className="hover:text-lime">
                                {profile.email}
                            </a>
                        </li>
                        <li>
                            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-lime">
                                {profile.githubLabel}
                            </a>
                        </li>
                    </ul>
                </div>
                <Button href={profile.telegram}>Написать в Telegram</Button>
            </Container>
        </footer>
    )
}
