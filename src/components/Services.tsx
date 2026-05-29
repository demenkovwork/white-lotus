import { SERVICE_OVERVIEW } from '@/data/menu';

/** Legacy-компонент. В App не используется — см. SpaMenu и ScrollScene. */
export function Services() {
  return (
    <section id="services-legacy" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-(--container-content)">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_OVERVIEW.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.anchor}`}
                className="block rounded-soft border border-water-deep/15 bg-bg p-5 shadow-soft"
              >
                <h3 className="text-xl">{category.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{category.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
