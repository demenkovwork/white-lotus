export type Promotion = {
  id: string;
  title: string;
  description: string;
  badge?: string;
};

export type ContactInfo = {
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  workingHours: string;
  mapEmbedUrl: string;
  mapLink: string;
  vk?: string;
  max?: string;
  legalDocs: { label: string; href: string }[];
};

export type LegalInfo = {
  name: string;
  ogrn: string;
  inn: string;
};

export const LEGAL: LegalInfo = {
  name: 'ИП Кашкар Валерия Константиновна',
  ogrn: '325774600046981',
  inn: '772169531160',
};

export const PROMOTIONS: Promotion[] = [
  {
    id: 'first-visit',
    title: 'Первое посещение',
    description: 'Скидка 15% на любой массаж при первом визите. По будням.',
    badge: '−15%',
  },
  {
    id: 'duo',
    title: 'Парный сеанс',
    description: 'Спа-ритуал на двоих в отдельном кабинете со скидкой.',
    badge: 'Для двоих',
  },
  {
    id: 'gift',
    title: 'Подарочный сертификат',
    description: 'На сумму от 3 000 ₽. Можно подарить близкому человеку.',
  },
];

export const ABOUT = {
  heading: 'О центре',
  foundedYear: 2023,
  paragraphs: [
    'Спа-центр «Белый Лотос» работает в Симферополе с 2023 года. Мы не про шумный конвейер — про тишину, ритм и внимание к телу.',
    'Команда — сертифицированные массажисты и банщики. Используем натуральную косметику и проверенные техники, без эзотерики и обещаний чудес.',
  ],
  bullets: [
    'Авторские программы под состояние и запрос',
    'Камерный формат — максимум 2 гостя одновременно',
    'Только проверенная косметика и масла',
  ],
};

export const CONTACTS: ContactInfo = {
  phone: '+79781877070',
  phoneFormatted: '+7 (978) 187-70-70',
  email: 'beliylotos@mail.ru',
  address: 'г. Симферополь, ул. Проспект Победы, д. 5А',
  workingHours: 'Ежедневно, 9:00 — 21:00',
  mapEmbedUrl:
    'https://yandex.ru/map-widget/v1/org/bely_lotos/221942059145/?ll=34.112741%2C44.959591&z=17&scroll=false',
  mapLink: 'https://yandex.ru/maps/-/CPH6vZz8',
  vk: 'https://vk.com/white_lotus_simf',
  max: 'https://max.ru/u/f9LHodD0cOKHmq5VTcZ3q6BEWKl-pIWylQtUCD6Xd8ta2fl6E8D4r_yzJUo',
  legalDocs: [
    {
      label: 'Публичная оферта',
      href: 'https://docs.google.com/document/d/13WBqk89PgHXC905s6GiR0EzcW4HGuTcX/edit?usp=sharing&ouid=106943740826284178007&rtpof=true&sd=true',
    },
    {
      label: 'Политика конфиденциальности',
      href: 'https://docs.google.com/document/d/1IG6GxK0PVMn1zeKpPQ0ZihkiidSqbBi9/edit?usp=sharing&ouid=106943740826284178007&rtpof=true&sd=true',
    },
    {
      label: 'Согласие на обработку перс. данных',
      href: 'https://docs.google.com/document/d/10Bb3T6G3YuYsnLd-ePBnqp-CgLUPR6ZH/edit?usp=sharing&ouid=106943740826284178007&rtpof=true&sd=true',
    },
  ],
};

export const NAV_LINKS = [
  { id: 'services', label: 'Услуги' },
  { id: 'menu', label: 'Меню' },
  { id: 'promotions', label: 'Акции' },
  { id: 'about', label: 'О нас' },
  { id: 'contacts', label: 'Контакты' },
  { id: 'booking', label: 'Запись' },
];

// Манифест скролл-сцены.
// SCENE_FRAMES — статические ключевые кадры (с прогрессом 0..1).
// SCENE_VIDEOS — видео-переходы между кадрами (mp4, скрабятся по скроллу).
// Если для какой-то стадии видео нет (например, на mobile), используется кросс-фейд между статичными кадрами.

export type SceneFrame = {
  id: string;
  progress: number;
  desktop: string;
  mobile: string;
  alt: string;
};

export type SceneVideo = {
  id: string;
  fromProgress: number;
  toProgress: number;
  /** mp4 для desktop. Если на mobile нет — оставляем undefined, fallback = кросс-фейд кадров */
  desktop?: string;
  mobile?: string;
};

export const SCENE_FRAMES: SceneFrame[] = [
  {
    id: '1stage',
    progress: 0,
    desktop: '/assets/desktop/1stage_desktop.jpeg',
    mobile: '/assets/mobile/1stage_mobile.jpeg',
    alt: 'Белый лотос с каплями росы парит в туманном небе',
  },
  {
    id: '2stage',
    progress: 1,
    desktop: '/assets/desktop/2stage_desktop.jpeg',
    mobile: '/assets/mobile/2stage_mobile.jpeg',
    alt: 'Лотос на спине — финальный кадр перехода',
  },
];

export const SCENE_VIDEOS: SceneVideo[] = [
  {
    id: '1to2',
    fromProgress: 0,
    toProgress: 1,
    desktop: '/assets/desktop/animation/1stage-to-2stage.scrub.mp4',
    mobile: '/assets/mobile/animation/1stage-to-2stage.scrub.mp4',
  },
];
