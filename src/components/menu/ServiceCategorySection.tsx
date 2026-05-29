import type { ServiceCategory } from '@/data/menu';
import { MenuRow } from './MenuRow';

type Props = {
  category: ServiceCategory;
};

export function ServiceCategorySection({ category }: Props) {
  return (
    <section
      id={`menu-${category.id}`}
      className="rounded-soft border border-water-deep/10 bg-bg/95 p-5 shadow-soft backdrop-blur-sm md:p-8"
    >
      <header className="mb-2 flex flex-col gap-2 border-b border-water-deep/10 pb-5">
        <h3 className="text-3xl text-ink md:text-4xl">{category.title}</h3>
        {category.note && (
          <p className="text-xs tracking-[0.18em] text-ink-soft uppercase">
            {category.note}
          </p>
        )}
        {category.intro && (
          <p className="max-w-2xl text-sm text-ink-soft md:text-base">
            {category.intro}
          </p>
        )}
      </header>

      <div>
        {category.items.map((item) => (
          <MenuRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
