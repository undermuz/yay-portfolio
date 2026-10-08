import type { ReactNode } from 'react'

import { cn } from './cn'

const tones = {
    neutral: 'border-line bg-white/5 text-zinc-400',
    lime: 'border-lime/30 bg-lime/10 text-lime',
} as const

export function Badge({
    children,
    tone = 'neutral',
    className,
}: {
    children: ReactNode
    tone?: keyof typeof tones
    className?: string
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5',
                tones[tone],
                className,
            )}
        >
            {children}
        </span>
    )
}
