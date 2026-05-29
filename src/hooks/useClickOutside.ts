import { useEffect, type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const handlePointer = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || !ref.current || ref.current.contains(target)) return;
      onOutside();
    };

    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [ref, onOutside, enabled]);
}
