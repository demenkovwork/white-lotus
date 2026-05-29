import { useEffect, useState } from 'react';
import { NAV_LINKS, CONTACTS } from '@/data/content';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-water-deep/10'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-(--container-content) items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-heading text-xl text-ink"
          aria-label="Белый Лотос — на главную"
        >
          <img
            src="/icon-512.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="tracking-wide">Белый&nbsp;Лотос</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${CONTACTS.phone}`}
          className="hidden rounded-pill border border-water-deep/30 px-4 py-2 text-sm text-ink transition-colors hover:bg-water/30 md:inline-flex"
        >
          {CONTACTS.phoneFormatted}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-water-deep/30 text-ink md:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          <span className="sr-only">Меню</span>
          <BurgerIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-water-deep/10 bg-bg/95 backdrop-blur md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="block py-3 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`tel:${CONTACTS.phone}`}
                className="block rounded-soft bg-water/40 px-4 py-3 text-center text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {CONTACTS.phoneFormatted}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <line
        x1="4"
        y1={open ? '12' : '8'}
        x2="20"
        y2={open ? '12' : '8'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ transform: open ? 'rotate(45deg)' : 'none', transformOrigin: '12px 12px', transition: 'transform .2s' }}
      />
      <line
        x1="4"
        y1={open ? '12' : '16'}
        x2="20"
        y2={open ? '12' : '16'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ transform: open ? 'rotate(-45deg)' : 'none', transformOrigin: '12px 12px', transition: 'transform .2s' }}
      />
    </svg>
  );
}
