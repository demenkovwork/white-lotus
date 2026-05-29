import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Инициализирует Lenis (плавный инерционный скролл) и синхронизирует его
 * с GSAP/ScrollTrigger. Подключать один раз на верхнем уровне приложения.
 *
 * Уважает prefers-reduced-motion — если пользователь его включил, Lenis не запускаем.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const handleScroll = () => ScrollTrigger.update();
    lenis.on('scroll', handleScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);
}
