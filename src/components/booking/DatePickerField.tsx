import { useMemo, useRef, useState } from 'react';
import {
  formatDisplayDate,
  formatMonthYear,
  getCalendarDays,
  isSameDay,
  parseIsoDate,
  startOfDay,
  toIsoDate,
  WEEKDAYS_SHORT,
} from '@/lib/dateTime';
import { useClickOutside } from '@/hooks/useClickOutside';

type DatePickerFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  minDate?: string;
};

const triggerClass =
  'flex w-full items-center justify-between gap-3 rounded-soft border border-water-deep/20 bg-bg px-4 py-3 text-left text-sm text-ink outline-none transition-colors hover:border-water-deep/35 focus-visible:border-water-deep/50';

export function DatePickerField({
  value,
  onChange,
  label,
  minDate,
}: DatePickerFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const min = useMemo(
    () => startOfDay(parseIsoDate(minDate ?? toIsoDate(new Date())) ?? new Date()),
    [minDate],
  );
  const selected = useMemo(() => parseIsoDate(value), [value]);
  const today = useMemo(() => startOfDay(new Date()), []);

  const [viewYear, setViewYear] = useState(
    () => selected?.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    () => selected?.getMonth() ?? today.getMonth(),
  );

  useClickOutside(rootRef, () => setOpen(false), open);

  const days = useMemo(
    () => getCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const pickDay = (day: Date) => {
    if (startOfDay(day) < min) return;
    onChange(toIsoDate(day));
    setOpen(false);
  };

  const display = value ? formatDisplayDate(value) : 'Выберите дату';

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
        aria-haspopup="dialog"
      >
        <span className={value ? 'text-ink' : 'text-ink-soft/80'}>
          {display}
        </span>
        <CalendarIcon />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Выбор даты"
          data-lenis-prevent
          className="absolute top-[calc(100%+0.5rem)] z-50 w-full min-w-[17.5rem] rounded-soft border border-water-deep/15 bg-lotus p-4 shadow-soft"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-water/40 hover:text-ink"
              aria-label="Предыдущий месяц"
            >
              ‹
            </button>
            <p className="font-heading text-lg text-ink">
              {formatMonthYear(viewYear, viewMonth)}
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-water/40 hover:text-ink"
              aria-label="Следующий месяц"
            >
              ›
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS_SHORT.map((day) => (
              <span
                key={day}
                className="py-1 text-center text-[0.65rem] font-medium tracking-[0.12em] text-ink-soft uppercase"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = day.getMonth() === viewMonth;
              const disabled = startOfDay(day) < min;
              const isSelected = selected ? isSameDay(day, selected) : false;
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={toIsoDate(day)}
                  type="button"
                  disabled={disabled}
                  onClick={() => pickDay(day)}
                  className={[
                    'flex h-9 items-center justify-center rounded-soft text-sm transition-colors',
                    !inMonth && 'text-ink-soft/35',
                    inMonth && !disabled && 'text-ink hover:bg-water/35',
                    disabled && 'cursor-not-allowed opacity-30',
                    isSelected && 'bg-water-deep text-bg hover:bg-water-deep',
                    isToday &&
                      !isSelected &&
                      'ring-1 ring-water-deep/40 ring-inset',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-water-deep/10 pt-3">
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
            <button
              type="button"
              onClick={() => pickDay(today)}
              className="text-xs font-medium text-water-deep transition-colors hover:text-ink"
            >
              Сегодня
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-water-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2.5" y="4" width="15" height="13" rx="2" />
      <path d="M6.5 2.5v3M13.5 2.5v3M2.5 8h15" />
    </svg>
  );
}
