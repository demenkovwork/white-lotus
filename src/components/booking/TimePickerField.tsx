import { useMemo, useRef, useState } from 'react';
import { generateTimeSlots } from '@/lib/dateTime';
import { useClickOutside } from '@/hooks/useClickOutside';

type TimePickerFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

const triggerClass =
  'flex w-full items-center justify-between gap-3 rounded-soft border border-water-deep/20 bg-bg px-4 py-3 text-left text-sm text-ink outline-none transition-colors hover:border-water-deep/35 focus-visible:border-water-deep/50';

const TIME_SLOTS = generateTimeSlots(9, 21, 15);

export function TimePickerField({ value, onChange, label }: TimePickerFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(rootRef, () => setOpen(false), open);

  const display = useMemo(() => {
    if (!value) return 'Выберите время';
    return value.replace(':', '.');
  }, [value]);

  const pickTime = (time: string) => {
    onChange(time);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative flex flex-col gap-1.5">
      <span className="text-xs tracking-[0.18em] text-ink-soft uppercase">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={value ? 'text-ink' : 'text-ink-soft/80'}>
          {display}
        </span>
        <ClockIcon />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Выбор времени"
          data-lenis-prevent
          className="scroll-soft absolute top-[calc(100%+0.5rem)] z-50 max-h-56 w-full overflow-y-auto rounded-soft border border-water-deep/15 bg-lotus p-3 shadow-soft"
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((time) => {
              const selected = value === time;
              return (
                <button
                  key={time}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => pickTime(time)}
                  className={[
                    'rounded-pill px-2 py-2 text-sm transition-colors',
                    selected
                      ? 'bg-water-deep text-bg'
                      : 'bg-bg/80 text-ink hover:bg-water/40',
                  ].join(' ')}
                >
                  {time.replace(':', '.')}
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-water-deep/10 pt-3">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className="text-xs text-ink-soft transition-colors hover:text-ink"
            >
              Очистить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-water-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  );
}
