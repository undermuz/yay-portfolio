import { Button, Container } from '@libs/views'

import { nav, profile } from '../_data/resume'

export function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-white/5 bg-bg/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between gap-4">
                <a href="#top" className="flex min-w-0 items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-lime text-sm font-semibold text-lime-ink">
                        {profile.monogram}
                    </span>
                    <span className="truncate text-sm font-medium">{profile.name}</span>
                </a>
                <nav className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex" aria-label="Разделы">
                    {nav.map((item) => (
                        <a key={item.href} href={item.href} className="transition hover:text-white">
                            {item.label}
                        </a>
                    ))}
                </nav>
                <Button href={profile.telegram} className="shrink-0 px-3 py-2">
                    Написать
                </Button>
            </Container>
        </header>
    )
}
