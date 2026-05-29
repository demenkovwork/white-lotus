import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя'),
  phone: z
    .string()
    .trim()
    .min(10, 'Укажите телефон')
    .regex(/^[\d+\s()-]+$/, 'Некорректный формат телефона'),
  services: z.array(z.string()).min(1, 'Выберите хотя бы одну услугу'),
  date: z.string().optional(),
  time: z.string().optional(),
  comment: z.string().max(500, 'Не более 500 символов').optional(),
  consent: z.boolean().refine((v) => v, {
    message: 'Нужно согласие на обработку данных',
  }),
  company: z.string().max(0).optional(),
});

export type BookingData = z.infer<typeof bookingSchema>;
