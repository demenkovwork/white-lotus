import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Section } from './Section';
import { CONTACTS } from '@/data/content';
import { getBookingServiceOptions } from '@/data/menu';
import { bookingSchema, type BookingData } from '@/lib/bookingSchema';
import { sendBooking } from '@/lib/email';
import { DatePickerField } from '@/components/booking/DatePickerField';
import { TimePickerField } from '@/components/booking/TimePickerField';
import { toIsoDate } from '@/lib/dateTime';

const CONSENT_DOC = CONTACTS.legalDocs.find((d) =>
  d.label.toLowerCase().includes('согласие'),
);

export function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const lastSubmitRef = useRef(0);
  const serviceOptions = useMemo(() => getBookingServiceOptions(), []);

  const servicesByCategory = useMemo(() => {
    const map = new Map<string, typeof serviceOptions>();
    for (const option of serviceOptions) {
      const list = map.get(option.category) ?? [];
      list.push(option);
      map.set(option.category, list);
    }
    return map;
  }, [serviceOptions]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      services: [],
      date: '',
      time: '',
      comment: '',
      consent: false,
      company: '',
    },
  });

  const selectedServices = watch('services') ?? [];

  const toggleService = (id: string) => {
    const next = selectedServices.includes(id)
      ? selectedServices.filter((s) => s !== id)
      : [...selectedServices, id];
    setValue('services', next, { shouldValidate: true });
  };

  const onSubmit = async (data: BookingData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < 30_000) return;
    lastSubmitRef.current = now;

    setStatus('idle');
    try {
      await sendBooking(data);
      setStatus('success');
      reset({
        name: '',
        phone: '',
        services: [],
        date: '',
        time: '',
        comment: '',
        consent: false,
        company: '',
      });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-soft border border-water-deep/20 bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-water-deep/50';

  return (
    <Section
      id="booking"
      eyebrow="Запись"
      title="Записаться на сеанс"
      intro="Оставьте заявку — перезвоним и согласуем время. Или свяжитесь с нами напрямую."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 rounded-soft border border-water-deep/15 bg-lotus/70 p-6 lg:col-span-3 md:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs tracking-[0.18em] text-ink-soft uppercase">
                Имя *
              </span>
              <input
                {...register('name')}
                autoComplete="name"
                className={inputClass}
                placeholder="Как к вам обращаться"
              />
              {errors.name && (
                <span className="text-xs text-red-700">{errors.name.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs tracking-[0.18em] text-ink-soft uppercase">
                Телефон *
              </span>
              <input
                {...register('phone')}
                type="tel"
                autoComplete="tel"
                className={inputClass}
                placeholder="+7 (978) 000-00-00"
              />
              {errors.phone && (
                <span className="text-xs text-red-700">
                  {errors.phone.message}
                </span>
              )}
            </label>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-xs tracking-[0.18em] text-ink-soft uppercase">
              Услуги *
            </legend>
            <div
              data-lenis-prevent
              className="scroll-soft max-h-56 overflow-y-auto rounded-soft border border-water-deep/15 bg-bg/80 p-3 pr-2"
            >
              {[...servicesByCategory.entries()].map(([category, items]) => (
                <div key={category} className="mb-3 last:mb-0">
                  <p className="mb-2 text-xs font-medium text-water-deep">
                    {category}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item.id}>
                        <label className="flex cursor-pointer items-start gap-2 text-sm text-ink">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item.id)}
                            onChange={() => toggleService(item.id)}
                            className="mt-0.5 accent-water-deep"
                          />
                          <span>{item.title}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {errors.services && (
              <span className="text-xs text-red-700">
                {errors.services.message}
              </span>
            )}
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label="Желаемая дата"
                  value={field.value ?? ''}
                  minDate={toIsoDate(new Date())}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <TimePickerField
                  label="Удобное время"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs tracking-[0.18em] text-ink-soft uppercase">
              Комментарий
            </span>
            <textarea
              {...register('comment')}
              rows={3}
              className={inputClass}
              placeholder="Пожелания, вопросы"
            />
            {errors.comment && (
              <span className="text-xs text-red-700">
                {errors.comment.message}
              </span>
            )}
          </label>

          <label className="flex cursor-pointer items-start gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-0.5 accent-water-deep"
            />
            <span>
              Согласен(на) на{' '}
              {CONSENT_DOC ? (
                <a
                  href={CONSENT_DOC.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-water-deep underline-offset-2 hover:underline"
                >
                  обработку персональных данных
                </a>
              ) : (
                'обработку персональных данных'
              )}
            </span>
          </label>
          {errors.consent && (
            <span className="text-xs text-red-700">{errors.consent.message}</span>
          )}

          <input
            {...register('company')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-pill bg-water-deep px-7 py-3 text-sm font-medium text-bg transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
          </button>

          {status === 'success' && (
            <p className="rounded-soft border border-water-deep/20 bg-bg/90 px-4 py-3 text-sm text-ink">
              Спасибо! Заявка отправлена — свяжемся с вами в ближайшее время.
            </p>
          )}
          {status === 'error' && (
            <p className="rounded-soft border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              Не удалось отправить. Позвоните:{' '}
              <a href={`tel:${CONTACTS.phone}`} className="underline">
                {CONTACTS.phoneFormatted}
              </a>
            </p>
          )}
        </form>

        <aside className="flex flex-col justify-center gap-4 rounded-soft border border-water-deep/15 bg-bg/80 p-6 lg:col-span-2">
          <span className="text-xs tracking-[0.24em] text-ink-soft uppercase">
            Или напрямую
          </span>
          <a
            href={`tel:${CONTACTS.phone}`}
            className="font-heading text-3xl text-ink hover:text-water-deep md:text-4xl"
          >
            {CONTACTS.phoneFormatted}
          </a>
          <a
            href={`mailto:${CONTACTS.email}`}
            className="text-base text-ink-soft hover:text-ink"
          >
            {CONTACTS.email}
          </a>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={`tel:${CONTACTS.phone}`}
              className="rounded-pill bg-water-deep px-6 py-3 text-center text-sm font-medium text-bg transition-colors hover:bg-ink"
            >
              Позвонить
            </a>
            {CONTACTS.max && (
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noreferrer"
                className="rounded-pill border border-water-deep/40 px-6 py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-water/30"
              >
                Написать в MAX
              </a>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}
