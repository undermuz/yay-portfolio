import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const hidden = { opacity: 0, y: 16 }
const shown = { opacity: 1, y: 0 }
const viewport = { once: true, margin: '-80px' } as const
const transition = { duration: 0.45, ease: 'easeOut' } as const

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
    const reduce = useReducedMotion()
    if (reduce) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div className={className} initial={hidden} whileInView={shown} viewport={viewport} transition={transition}>
            {children}
        </motion.div>
    )
}
