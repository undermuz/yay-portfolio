import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type DocModalProps = {
    open: boolean
    title: string
    fileName?: string
    onClose: () => void
    onDownload?: () => void
    children: ReactNode
}

const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function DocModal({ open, title, fileName, onClose, onDownload, children }: DocModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const onCloseRef = useRef(onClose)
    const previousFocus = useRef<HTMLElement | null>(null)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        if (!open) return

        previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseRef.current()
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
    }, [open])

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 flex items-stretch justify-center md:items-center md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        type="button"
                        aria-label="Закрыть документ"
                        className="absolute inset-0 bg-black/75"
                        onClick={onClose}
                    />
                    <motion.dialog
                        ref={dialogRef}
                        open
                        aria-modal="true"
                        aria-labelledby="doc-modal-title"
                        className="portfolio-doc-dialog relative z-10 m-0 flex h-full max-h-full w-full max-w-5xl flex-col overflow-hidden border-0 bg-bg p-0 text-inherit md:h-[min(88dvh,860px)] md:max-h-[min(88dvh,860px)] md:rounded-2xl md:border md:border-line"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                    >
                        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-5">
                            <div className="min-w-0">
                                <p id="doc-modal-title" className="truncate text-sm font-medium text-white">
                                    {title}
                                </p>
                                {fileName ? (
                                    <p className="truncate font-mono text-[11px] text-zinc-500">{fileName}</p>
                                ) : null}
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                {onDownload ? (
                                    <button
                                        type="button"
                                        onClick={onDownload}
                                        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:text-white"
                                    >
                                        Скачать .md
                                    </button>
                                ) : null}
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:text-white"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </header>
                        {children}
                    </motion.dialog>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
