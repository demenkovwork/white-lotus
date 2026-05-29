import { Section } from './Section';
import { CONTACTS } from '@/data/content';

export function Contacts() {
  return (
    <Section
      id="contacts"
      eyebrow="Контакты"
      title="Как нас найти"
      tone="soft"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <ul className="flex flex-col gap-5 text-base">
          <li>
            <span className="block text-xs tracking-[0.2em] text-ink-soft uppercase">
              Телефон
            </span>
            <a
              href={`tel:${CONTACTS.phone}`}
              className="text-2xl font-medium text-ink hover:text-water-deep"
            >
              {CONTACTS.phoneFormatted}
            </a>
          </li>
          <li>
            <span className="block text-xs tracking-[0.2em] text-ink-soft uppercase">
              Почта
            </span>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="text-lg text-ink hover:text-water-deep"
            >
              {CONTACTS.email}
            </a>
          </li>
          <li>
            <span className="block text-xs tracking-[0.2em] text-ink-soft uppercase">
              Адрес
            </span>
            <a
              href={CONTACTS.mapLink}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-ink hover:text-water-deep"
            >
              {CONTACTS.address}
            </a>
          </li>
          <li>
            <span className="block text-xs tracking-[0.2em] text-ink-soft uppercase">
              Часы работы
            </span>
            <p className="text-lg text-ink">{CONTACTS.workingHours}</p>
          </li>
          <li className="flex flex-wrap gap-3 pt-1">
            {CONTACTS.vk && (
              <a
                href={CONTACTS.vk}
                target="_blank"
                rel="noreferrer"
                className="rounded-pill border border-water-deep/30 px-4 py-2 text-sm text-ink hover:bg-water/30"
              >
                ВКонтакте
              </a>
            )}
            {CONTACTS.max && (
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noreferrer"
                className="rounded-pill border border-water-deep/30 px-4 py-2 text-sm text-ink hover:bg-water/30"
              >
                MAX
              </a>
            )}
          </li>
        </ul>

        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-soft border border-water-deep/15 bg-bg shadow-soft">
            <iframe
              title="Карта — Белый Лотос, Симферополь"
              src={CONTACTS.mapEmbedUrl}
              className="block h-[min(420px,60svh)] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={CONTACTS.mapLink}
            target="_blank"
            rel="noreferrer"
            className="text-center text-sm text-water-deep hover:text-ink"
          >
            Открыть в Яндекс Картах →
          </a>
        </div>
      </div>
    </Section>
  );
}
