import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

type ImageLightboxProps = {
    src: string
    alt: string
    title: string
    text?: string
    previewClassName?: string
}

const focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ImageLightbox({ src, alt, title, text, previewClassName }: ImageLightboxProps) {
    const titleId = useId()
    const closeRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const previousFocus = useRef<HTMLElement | null>(null)
    const [open, setOpen] = useState(false)
    const [zoomed, setZoomed] = useState(false)

    const openLightbox = useCallback(() => {
        setOpen(true)
    }, [])

    const close = useCallback(() => {
        setOpen(false)
        setZoomed(false)
    }, [])

    const toggleZoom = useCallback(() => {
        setZoomed((value) => !value)
    }, [])

    useEffect(() => {
        if (!open) return

        previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close()
                return
            }
            if (event.key !== 'Tab') return
            const dialog = dialogRef.current
            if (!dialog) return
            const focusable = dialog.querySelectorAll<HTMLElement>(focusableSelector)
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (!first || !last) return
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', onKeyDown)
            previousFocus.current?.focus()
        }
    }, [open, close])

    const overlay: ReactNode = (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button type="button" aria-label="Закрыть изображение" className="absolute inset-0 bg-black/80" onClick={close} />
                    <motion.dialog
                        ref={dialogRef}
                        open
                        aria-modal="true"
                        aria-labelledby={titleId}
                        className="portfolio-image-dialog z-10 flex flex-col"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                    >
                        <header className="pointer-events-auto flex shrink-0 items-center justify-between gap-4 border-b border-line bg-bg px-4 py-3 md:px-5">
                            <p id={titleId} className="min-w-0 truncate text-sm font-medium text-white">
                                {title}
                            </p>
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={toggleZoom}
                                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:text-white"
                                >
                                    {zoomed ? 'Уменьшить' : 'Увеличить'}
                                </button>
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={close}
                                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:text-white"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </header>
                        <div className="pointer-events-auto min-h-0 flex-1 overflow-auto bg-zinc-950 p-4 md:p-6">
                            <div className={zoomed ? 'w-[200%]' : 'mx-auto w-fit max-w-full'}>
                                <button
                                    type="button"
                                    onClick={toggleZoom}
                                    aria-label={zoomed ? 'Уменьшить изображение' : 'Увеличить изображение'}
                                    className={zoomed ? 'block w-full cursor-zoom-out' : 'block cursor-zoom-in'}
                                >
                                    <img
                                        src={src}
                                        alt={alt}
                                        draggable={false}
                                        className={
                                            zoomed
                                                ? 'h-auto w-full bg-white'
                                                : 'mx-auto h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full bg-white'
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </motion.dialog>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )

    return (
        <>
            <button
                type="button"
                onClick={openLightbox}
                className="group block w-full rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
                <span className="block overflow-hidden rounded-xl border border-line bg-white">
                    <img src={src} alt="" className={previewClassName ?? 'h-72 w-full object-contain object-left sm:h-[22rem]'} />
                </span>
                <span className="mt-3 block text-sm font-medium text-white">{title}</span>
                {text ? <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{text}</span> : null}
                <span className="mt-2 block font-mono text-[11px] tracking-wider text-zinc-500 uppercase transition group-hover:text-lime">
                    Открыть
                </span>
            </button>
            {typeof document === 'undefined' ? null : createPortal(overlay, document.body)}
        </>
    )
}
