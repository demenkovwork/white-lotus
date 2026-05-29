import type { ReactNode } from 'react';

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: 'default' | 'soft';
};

export function Section({ id, eyebrow, title, intro, children, tone = 'default' }: Props) {
  return (
    <section
      id={id}
      className={[
        'relative px-5 py-20 md:px-8 md:py-28',
        tone === 'soft' ? 'bg-water/15' : 'bg-bg',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-(--container-content) flex-col gap-10">
        <header className="flex flex-col gap-3">
          {eyebrow && (
            <span className="text-[11px] tracking-[0.32em] text-water-deep uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="max-w-3xl text-balance text-3xl leading-tight md:text-5xl">
            {title}
          </h2>
          {intro && (
            <p className="max-w-2xl text-base text-ink-soft md:text-lg">{intro}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
