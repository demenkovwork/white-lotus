import type { MenuItem } from '@/data/menu';
import { formatPrice } from '@/lib/formatPrice';

type Props = {
  item: MenuItem;
};

export function MenuRow({ item }: Props) {
  return (
    <article className="grid gap-4 border-b border-water-deep/10 py-6 last:border-b-0 md:grid-cols-[1fr_auto] md:gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl text-ink">{item.title}</h3>
          {item.subtitle && (
            <span className="text-sm text-water-deep">{item.subtitle}</span>
          )}
        </div>
        {item.includes && (
          <p className="text-sm text-ink-soft/90">{item.includes}</p>
        )}
        <p className="text-ink-soft">{item.description}</p>
        {item.badge && (
          <span className="mt-1 w-fit rounded-pill bg-water/35 px-3 py-1 text-xs text-ink">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-2 md:min-w-[9.5rem] md:items-end md:text-right">
        {item.tiers ? (
          item.tiers.map((tier) => (
            <div
              key={`${tier.price}-${tier.duration}`}
              className="flex items-baseline gap-3 md:flex-row-reverse md:gap-4"
            >
              <span className="text-lg font-medium text-water-deep tabular-nums">
                {formatPrice(tier.price)}
              </span>
              <span className="text-sm text-ink-soft tabular-nums">
                {tier.duration}
              </span>
            </div>
          ))
        ) : (
          <>
            <div className="flex items-baseline gap-3 md:flex-row-reverse md:gap-4">
              <span className="text-lg font-medium text-water-deep tabular-nums">
                {item.price != null && formatPrice(item.price)}
              </span>
              {item.duration && (
                <span className="text-sm text-ink-soft">{item.duration}</span>
              )}
            </div>
            {item.oldPrice != null && (
              <span className="text-sm text-ink-soft/70 line-through tabular-nums">
                {formatPrice(item.oldPrice)}
              </span>
            )}
          </>
        )}
      </div>
    </article>
  );
}
