import type { MouseEventHandler, ReactNode } from 'react'

import { cn } from './cn'

const variants = {
    primary: 'bg-lime text-lime-ink hover:brightness-105',
    ghost: 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5',
} as const

const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime'

type Variant = keyof typeof variants

type ButtonProps = {
    variant?: Variant
    className?: string
    children: ReactNode
    href?: string
    download?: boolean | string
    type?: 'button' | 'submit' | 'reset'
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

function isExternal(href: string) {
    return /^(https?:|mailto:)/.test(href)
}

export function Button({ variant = 'primary', className, children, href, download, type = 'button', onClick }: ButtonProps) {
    const classes = cn(base, variants[variant], className)

    if (href) {
        const external = isExternal(href)
        return (
            <a
                href={href}
                className={classes}
                download={download}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
            >
                {children}
            </a>
        )
    }

    return (
        <button type={type} className={classes} onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}>
            {children}
        </button>
    )
}
