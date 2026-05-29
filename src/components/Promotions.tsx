import { Section } from './Section';
import { PROMOTIONS } from '@/data/content';

export function Promotions() {
  return (
    <Section
      id="promotions"
      eyebrow="Акции"
      title="Выгодные предложения"
      tone="soft"
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PROMOTIONS.map((promo) => (
          <li
            key={promo.id}
            className="flex h-full flex-col gap-3 rounded-soft bg-lotus p-6 shadow-soft"
          >
            {promo.badge && (
              <span className="self-start rounded-pill bg-meditation/60 px-3 py-1 text-xs text-ink">
                {promo.badge}
              </span>
            )}
            <h3 className="text-xl">{promo.title}</h3>
            <p className="text-sm text-ink-soft">{promo.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
