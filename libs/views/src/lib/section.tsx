import type { ReactNode } from 'react'

import { cn } from './cn'
import { Container } from './container'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <p className={cn('font-mono text-[11px] font-medium tracking-[0.18em] text-lime uppercase', className)}>
            {children}
        </p>
    )
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <h2 className={cn('mt-3 text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl', className)}>
            {children}
        </h2>
    )
}

export function Section({
    id,
    eyebrow,
    title,
    description,
    children,
    className,
}: {
    id?: string
    eyebrow?: string
    title?: string
    description?: string
    children?: ReactNode
    className?: string
}) {
    return (
        <section id={id} className={cn('scroll-mt-24 py-16 md:py-24', className)}>
            <Container>
                {eyebrow || title || description ? (
                    <div className="max-w-2xl">
                        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
                        {title ? <SectionTitle>{title}</SectionTitle> : null}
                        {description ? (
                            <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">{description}</p>
                        ) : null}
                    </div>
                ) : null}
                {children}
            </Container>
        </section>
    )
}
