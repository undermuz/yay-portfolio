import { useCallback } from 'react'

import { Button, Card, Eyebrow, Section, SectionTitle } from '@libs/views'

import { Reveal } from '../_components/reveal'
import type { DocId } from '../_data/docs'
import { diChain, diPoints } from '../_data/resume'

const sample = `import { inject, injectable } from "inversify"
import { proxy } from "valtio"

@injectable()
export class Session implements ISessionProvider {
  public state: ISessionState

  public async initialize() {
    this.state = proxy({ status: "unauthenticated" })
  }
}

// module
ctx.bind(SessionProvider).to(Session).inSingletonScope()

// component
const session = useDi<ISessionProvider>(SessionProvider)
const state = useSnapshot(session.state)`

export function FrontendDi({ onOpenDoc }: { onOpenDoc: (id: DocId) => void }) {
    const open = useCallback(() => {
        onOpenDoc('frontend-di')
    }, [onOpenDoc])

    return (
        <Section id="frontend-di" className="pt-0">
            <Reveal>
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                    <div>
                        <Eyebrow>Dependency injection</Eyebrow>
                        <SectionTitle>Контейнер, а не пропсы через пять экранов</SectionTitle>
                        <ul className="mt-6 space-y-4">
                            {diPoints.map((point) => (
                                <li key={point.title}>
                                    <p className="text-sm font-medium">{point.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{point.text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Button onClick={open}>Открыть di.md</Button>
                        </div>
                        <ol className="mt-6 flex flex-wrap items-center gap-2">
                            {diChain.map((step, index) => (
                                <li key={step} className="flex items-center gap-2">
                                    {index > 0 ? (
                                        <span className="font-mono text-xs text-lime" aria-hidden="true">
                                            →
                                        </span>
                                    ) : null}
                                    <span className="rounded-md border border-line bg-card px-2 py-1 font-mono text-[11px] text-zinc-300">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <Card className="overflow-hidden p-0">
                        <div className="flex items-center justify-between border-b border-line px-4 py-2">
                            <p className="font-mono text-[11px] text-zinc-500">session.provider.ts</p>
                            <p className="font-mono text-[11px] text-lime">inversify + valtio</p>
                        </div>
                        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 text-zinc-300">
                            <code>{sample}</code>
                        </pre>
                    </Card>
                </div>
            </Reveal>
        </Section>
    )
}
