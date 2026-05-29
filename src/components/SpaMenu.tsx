import { useCallback, useEffect, useState } from 'react';
import { SERVICE_CATEGORIES } from '@/data/menu';
import { ServiceCategorySection } from '@/components/menu/ServiceCategorySection';

const DEFAULT_CATEGORY_ID = SERVICE_CATEGORIES[0]?.id ?? 'sessions';

function categoryIdFromHash(): string | null {
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith('menu-')) return null;
  const id = hash.slice('menu-'.length);
  return SERVICE_CATEGORIES.some((c) => c.id === id) ? id : null;
}

export function SpaMenu() {
  const [activeId, setActiveId] = useState(DEFAULT_CATEGORY_ID);

  const selectCategory = useCallback((id: string) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#menu-${id}`);
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const id = categoryIdFromHash();
      if (!id) return;
      setActiveId(id);
      requestAnimationFrame(() => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'auto' });
      });
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const activeCategory =
    SERVICE_CATEGORIES.find((c) => c.id === activeId) ?? SERVICE_CATEGORIES[0];

  if (!activeCategory) return null;

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 bg-water/10 px-5 py-20 md:px-8 md:py-28"
      aria-label="Прайс-лист"
    >
      <div className="mx-auto flex max-w-(--container-content) flex-col gap-8">
        <header className="flex max-w-2xl flex-col gap-3">
          <span className="text-[11px] tracking-[0.32em] text-water-deep uppercase">
            Прайс
          </span>
          <h2 className="text-balance text-3xl leading-tight md:text-5xl">
            Спа-меню
          </h2>
          <p className="text-base text-ink-soft md:text-lg">
            Выберите категорию — откроется прайс только по ней.
          </p>
        </header>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-[11rem_1fr] md:items-start md:gap-6 lg:grid-cols-[13rem_1fr] lg:gap-8">
          <nav
            aria-label="Категории меню"
            role="tablist"
            className="scroll-soft -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:sticky md:top-24 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`menu-panel-${category.id}`}
                  id={`menu-tab-${category.id}`}
                  onClick={() => selectCategory(category.id)}
                  className={[
                    'shrink-0 rounded-pill border px-3.5 py-2 text-left text-xs leading-snug whitespace-nowrap transition-colors md:shrink md:rounded-soft md:border-transparent md:px-3 md:py-2.5 md:text-sm md:whitespace-normal',
                    isActive
                      ? 'border-water-deep/40 bg-bg font-medium text-ink shadow-soft md:border-transparent'
                      : 'border-water-deep/20 text-ink-soft hover:bg-bg/70 hover:text-ink md:border-transparent',
                  ].join(' ')}
                >
                  {category.title}
                </button>
              );
            })}
          </nav>

          <div
            id={`menu-panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`menu-tab-${activeCategory.id}`}
            className="min-w-0"
          >
            <ServiceCategorySection
              key={activeCategory.id}
              category={activeCategory}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
