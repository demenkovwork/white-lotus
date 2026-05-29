import emailjs from '@emailjs/browser';
import type { BookingData } from '@/lib/bookingSchema';
import { CONTACTS } from '@/data/content';

function formatPreferredDateTime(data: BookingData): string {
  const parts = [data.date, data.time].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
}

function buildMailtoUrl(data: BookingData): string {
  const subject = encodeURIComponent(`Заявка с сайта — ${data.name}`);
  const body = encodeURIComponent(
    [
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Услуги: ${data.services.join(', ')}`,
      `Дата и время: ${formatPreferredDateTime(data)}`,
      `Комментарий: ${data.comment || '—'}`,
    ].join('\n'),
  );
  return `mailto:${CONTACTS.email}?subject=${subject}&body=${body}`;
}

export async function sendBooking(data: BookingData): Promise<void> {
  if (data.company) return;

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: data.name,
        phone: data.phone,
        services: data.services.join(', '),
        date: formatPreferredDateTime(data),
        comment: data.comment || '—',
        to_email: CONTACTS.email,
      },
      publicKey,
    );
    return;
  }

  window.location.href = buildMailtoUrl(data);
}
