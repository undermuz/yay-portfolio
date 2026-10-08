import { useCallback } from 'react'

import { Button, Card, Eyebrow, Section, SectionTitle } from '@libs/views'

import { Reveal } from '../_components/reveal'
import type { DocId } from '../_data/docs'
import { backendNodes, backendPoints } from '../_data/resume'

function FlowRow({ label, items }: { label: string; items: readonly string[] }) {
    return (
        <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{label}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <span key={item} className="rounded-md border border-line bg-bg px-2.5 py-1 text-xs text-zinc-200">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}

export function BackendArchitecture({ onOpenDoc }: { onOpenDoc: (id: DocId) => void }) {
    const open = useCallback(() => {
        onOpenDoc('backend-architecture')
    }, [onOpenDoc])

    return (
        <Section id="backend-architecture" className="pt-0">
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    <div>
                        <Eyebrow>Backend</Eyebrow>
                        <SectionTitle>Микросервисы на NestJS для платформы доставки</SectionTitle>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                            Клиент ходит в HTTP-gateway своей роли. Gateway проверяет доступ и отправляет домен в микросервис через RabbitMQ. Данные — MySQL, Redis и S3.
                        </p>
                        <ul className="mt-6 space-y-4">
                            {backendPoints.map((point) => (
                                <li key={point.title}>
                                    <p className="text-sm font-medium">{point.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{point.text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Button onClick={open}>Открыть README</Button>
                        </div>
                    </div>
                    <Card className="space-y-3 p-5">
                        <FlowRow label="Клиенты" items={backendNodes.clients} />
                        <p className="font-mono text-xs text-lime" aria-hidden="true">
                            ↓
                        </p>
                        <FlowRow label="HTTP Gateway" items={backendNodes.gateways} />
                        <p className="font-mono text-xs text-lime" aria-hidden="true">
                            ↓
                        </p>
                        <FlowRow label="Транспорт" items={backendNodes.bus} />
                        <p className="font-mono text-xs text-lime" aria-hidden="true">
                            ↓
                        </p>
                        <FlowRow label="Микросервисы" items={backendNodes.services} />
                        <p className="font-mono text-xs text-lime" aria-hidden="true">
                            ↓
                        </p>
                        <FlowRow label="Данные" items={backendNodes.data} />
                    </Card>
                </div>
            </Reveal>
        </Section>
    )
}
