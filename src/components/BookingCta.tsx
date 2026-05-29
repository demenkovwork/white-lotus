import { Section } from './Section';
import { CONTACTS } from '@/data/content';

export function BookingCta() {
  return (
    <Section
      id="booking"
      eyebrow="Запись"
      title="Записаться на сеанс"
      intro="Запись пока ведётся по телефону — позвоните, и мы подберём удобное время."
    >
      <div className="flex flex-col items-start gap-6 rounded-soft border border-water-deep/15 bg-lotus/70 p-6 md:p-10">
        <a
          href={`tel:${CONTACTS.phone}`}
          className="font-heading text-4xl text-ink transition-colors hover:text-water-deep md:text-5xl"
        >
          {CONTACTS.phoneFormatted}
        </a>
        <p className="text-sm text-ink-soft">
          Ежедневно, {CONTACTS.workingHours.replace(/^Ежедневно,\s*/, '')}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${CONTACTS.phone}`}
            className="rounded-pill bg-water-deep px-7 py-3 text-sm font-medium text-bg transition-colors hover:bg-ink"
          >
            Позвонить
          </a>
          {CONTACTS.max && (
            <a
              href={CONTACTS.max}
              target="_blank"
              rel="noreferrer"
              className="rounded-pill border border-water-deep/40 px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-water/30"
            >
              Написать в MAX
            </a>
          )}
          {CONTACTS.vk && (
            <a
              href={CONTACTS.vk}
              target="_blank"
              rel="noreferrer"
              className="rounded-pill border border-water-deep/40 px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-water/30"
            >
              Мы в VK
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
