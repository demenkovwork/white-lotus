import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCENE_FRAMES, SCENE_VIDEOS } from '@/data/content';
import { SERVICE_OVERVIEW } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

const HERO_VH = 100;
const MOBILE_MQ = '(max-width: 768px)';

function getActiveVideo(
  desktop: HTMLVideoElement | null,
  mobile: HTMLVideoElement | null,
) {
  return window.matchMedia(MOBILE_MQ).matches ? mobile : desktop;
}

export function ScrollScene() {
  const heroZoneRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stage1Ref = useRef<HTMLDivElement | null>(null);
  const stage2Ref = useRef<HTMLDivElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const heroZone = heroZoneRef.current;
    const hero = heroRef.current;
    const stage1 = stage1Ref.current;
    const stage2 = stage2Ref.current;
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    if (!heroZone || !hero || !stage1) return;

    const hasVideo = !!(desktopVideo || mobileVideo);

    if (reduceMotion) {
      gsap.set(stage1, { opacity: hasVideo ? 0 : 1 });
      if (stage2) gsap.set(stage2, { opacity: hasVideo ? 0 : 1 });
      if (desktopVideo) gsap.set(desktopVideo, { opacity: hasVideo ? 1 : 0 });
      if (mobileVideo) gsap.set(mobileVideo, { opacity: hasVideo ? 1 : 0 });
      return;
    }

    gsap.set(stage1, { opacity: 1 });
    if (stage2) gsap.set(stage2, { opacity: 0 });
    if (desktopVideo) gsap.set(desktopVideo, { opacity: 0 });
    if (mobileVideo) gsap.set(mobileVideo, { opacity: 0 });

    let rafId = 0;
    let videoTargetTime = 0;

    if (hasVideo) {
      const tick = () => {
        const video = getActiveVideo(desktopVideo, mobileVideo);
        if (video?.duration && !Number.isNaN(video.duration)) {
          const cur = video.currentTime;
          const diff = videoTargetTime - cur;
          if (Math.abs(diff) > 0.002) {
            video.currentTime = cur + diff * 0.18;
          }
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroZone,
        start: 'top top',
        end: `+=${HERO_VH}%`,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const video = getActiveVideo(desktopVideo, mobileVideo);
          if (video?.duration && !Number.isNaN(video.duration)) {
            videoTargetTime = self.progress * video.duration;
          }
        },
      },
    });

    const videos = [desktopVideo, mobileVideo].filter(Boolean);

    if (hasVideo && videos.length > 0) {
      tl.to(videos, { opacity: 1, duration: 0.04, ease: 'none' }, 0);
      tl.to(stage1, { opacity: 0, duration: 0.05, ease: 'none' }, 0.02);
    } else if (stage2) {
      tl.to(stage1, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0.2);
      tl.to(stage2, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, 0.3);
    }

    tl.to(
      hero,
      { opacity: 0, y: -32, duration: 0.35, ease: 'power1.out' },
      0.05,
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const stage1 = SCENE_FRAMES[0];
  const stage2 = SCENE_FRAMES[1];
  const videoMeta = SCENE_VIDEOS[0];
  if (!stage1 || !stage2) return null;

  return (
    <div className="relative bg-bg" aria-label="Главный экран и услуги">
      <div className="pointer-events-none sticky top-0 z-0 h-svh w-full overflow-hidden">
        <div ref={stage1Ref} className="absolute inset-0 will-change-[opacity]">
          <picture>
            <source media="(max-width: 768px)" srcSet={stage1.mobile} />
            <img
              src={stage1.desktop}
              alt={stage1.alt}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>

        {videoMeta?.desktop && (
          <video
            ref={desktopVideoRef}
            src={videoMeta.desktop}
            className="absolute inset-0 hidden h-full w-full object-cover object-center will-change-[opacity] md:block"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}

        {videoMeta?.mobile && (
          <video
            ref={mobileVideoRef}
            src={videoMeta.mobile}
            className="absolute inset-0 h-full w-full object-cover object-center will-change-[opacity] md:hidden"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}

        <div
          ref={stage2Ref}
          className="absolute inset-0 will-change-[opacity]"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={stage2.mobile} />
            <img
              src={stage2.desktop}
              alt={stage2.alt}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div
        ref={heroZoneRef}
        id="top"
        className="relative z-10 -mt-[100svh]"
        style={{ height: `${HERO_VH}svh` }}
      >
        <div className="sticky top-0 flex h-svh items-end justify-center px-5 pb-16 md:px-8 md:pb-24">
          <div
            ref={heroRef}
            className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-soft border border-bg/60 bg-bg/92 px-6 py-7 text-center shadow-[0_8px_40px_rgba(20,28,33,0.18)] backdrop-blur-md will-change-transform md:gap-7 md:px-10 md:py-9"
          >
            <span className="rounded-pill border border-water-deep/40 bg-bg px-4 py-1 text-[11px] tracking-[0.24em] text-water-deep uppercase">
              Спа-центр · Симферополь
            </span>
            <h1 className="text-balance text-3xl leading-[1.05] font-medium md:text-5xl lg:text-6xl">
              Тишина, в которой
              <br className="hidden sm:block" /> возвращаешься к себе
            </h1>
            <p className="max-w-xl text-sm text-ink-soft md:text-base">
              Авторские массажи, парение и спа-ритуалы. Камерное место для тех,
              кто ценит внимание и ритм.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#booking"
                className="rounded-pill bg-water-deep px-7 py-3 text-sm font-medium text-bg shadow-soft transition-colors hover:bg-ink"
              >
                Записаться
              </a>
              <a
                href="#menu"
                className="rounded-pill border border-water-deep/50 bg-bg px-7 py-3 text-sm font-medium text-ink shadow-soft transition-colors hover:bg-water/40"
              >
                Смотреть меню
              </a>
            </div>
            <span className="mt-2 text-[10px] tracking-[0.32em] text-ink-soft/70 uppercase">
              Скролл ↓
            </span>
          </div>
        </div>
      </div>

      <section id="services" className="relative z-10" aria-label="Услуги">
        <div className="relative z-10 mx-auto flex w-full max-w-(--container-content) flex-col gap-8 px-5 pt-16 pb-24 md:px-8 md:gap-10 md:pt-20 md:pb-32">
          <header className="flex flex-col gap-3 rounded-soft border border-bg/60 bg-bg/92 p-6 shadow-[0_8px_40px_rgba(20,28,33,0.18)] backdrop-blur-md md:p-8">
            <span className="text-[11px] tracking-[0.32em] text-water-deep uppercase">
              Услуги
            </span>
            <h2 className="max-w-3xl text-balance text-3xl leading-tight text-ink md:text-5xl">
              Что мы делаем
            </h2>
            <p className="max-w-2xl text-base text-ink-soft md:text-lg">
              Каждая программа — это не просто процедура, а сценарий
              восстановления. Подбираем под состояние и запрос.
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_OVERVIEW.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.anchor}`}
                  className="group flex h-full flex-col gap-2 rounded-soft border border-bg/70 bg-bg/95 p-5 shadow-[0_8px_32px_rgba(20,28,33,0.14)] backdrop-blur-md transition-colors hover:border-water-deep/40 hover:bg-bg"
                >
                  <h3 className="text-xl text-ink md:text-2xl">
                    {category.title}
                  </h3>
                  <p className="text-sm text-ink-soft">{category.summary}</p>
                  <span className="mt-auto pt-2 text-xs tracking-[0.2em] text-water-deep uppercase">
                    Смотреть →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <a
              href="#menu"
              className="inline-flex rounded-pill border border-water-deep/40 bg-bg/90 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-water/40"
            >
              Полное меню со всеми ценами
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
