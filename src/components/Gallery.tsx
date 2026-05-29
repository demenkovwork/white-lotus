import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_PHOTOS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const figures = gsap.utils.toArray<HTMLElement>('.gallery-item', root);
    const images = gsap.utils.toArray<HTMLElement>('[data-parallax]', root);

    if (reduceMotion) {
      gsap.set(figures, { opacity: 1, y: 0 });
      gsap.set(images, { scale: 1, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(figures, { opacity: 0, y: 48, scale: 0.96 });

      const batch = ScrollTrigger.batch(figures, {
        start: 'top 88%',
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      });

      // Параллакс: фото оверсайзится на 14%, чтобы движение не оголяло края.
      const parallaxTweens = images.map((img) => {
        gsap.set(img, { scale: 1.14 });
        return gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        batch.forEach((st) => st.kill());
        parallaxTweens.forEach((t) => t.scrollTrigger?.kill());
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      className="relative scroll-mt-24 bg-bg px-5 py-20 md:px-8 md:py-28"
      aria-label="Фотогалерея"
    >
      <div ref={rootRef} className="mx-auto max-w-(--container-content)">
        <header className="mb-8 flex max-w-2xl flex-col gap-3 md:mb-12">
          <span className="text-[11px] tracking-[0.32em] text-water-deep uppercase">
            Атмосфера
          </span>
          <h2 className="text-balance text-3xl leading-tight md:text-5xl">
            Как у нас
          </h2>
          <p className="text-base text-ink-soft md:text-lg">
            Тёплый свет, тишина и внимание к деталям — несколько кадров из жизни
            центра.
          </p>
        </header>

        <div className="columns-2 gap-3 [column-fill:_balance] md:columns-3 md:gap-4 lg:columns-4">
          {GALLERY_PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="gallery-item group relative mb-3 block break-inside-avoid overflow-hidden rounded-soft shadow-soft md:mb-4"
            >
              <img
                data-parallax
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full origin-center object-cover transition-[filter] duration-500 will-change-transform group-hover:brightness-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-3 p-4 text-sm font-medium text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
