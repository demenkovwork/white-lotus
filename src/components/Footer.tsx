import { CONTACTS, LEGAL } from '@/data/content';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-water-deep/10 bg-bg">
      <div className="mx-auto flex max-w-(--container-content) flex-col gap-6 px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-heading text-lg text-ink">Белый Лотос</span>
            <span className="text-xs text-ink-soft">
              © {year}. Спа-центр в Симферополе.
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-soft">
            {CONTACTS.legalDocs.map((doc) => (
              <li key={doc.label}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink"
                >
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-water-deep/10 pt-6 text-xs leading-relaxed text-ink-soft">
          <p>{LEGAL.name}</p>
          <p>
            ОГРН {LEGAL.ogrn} · ИНН {LEGAL.inn}
          </p>
        </div>
      </div>
    </footer>
  );
}
