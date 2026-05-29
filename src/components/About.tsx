import { Section } from './Section';
import { ABOUT } from '@/data/content';

export function About() {
  return (
    <Section id="about" eyebrow="О нас" title={ABOUT.heading}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-base text-ink-soft md:text-lg">
              {p}
            </p>
          ))}
        </div>
        <ul className="flex flex-col gap-3 md:col-span-5">
          {ABOUT.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-soft border border-water-deep/15 bg-lotus/70 px-4 py-3"
            >
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-water-deep"
              />
              <span className="text-sm text-ink">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
