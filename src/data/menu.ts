export type PriceTier = {
  duration: string;
  price: number;
  oldPrice?: number;
};

export type MenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  includes?: string;
  description: string;
  badge?: string;
  tiers?: PriceTier[];
  price?: number;
  duration?: string;
  oldPrice?: number;
};

export type ServiceCategory = {
  id: string;
  title: string;
  note?: string;
  intro?: string;
  items: MenuItem[];
};

export type ServiceOverview = {
  id: string;
  title: string;
  summary: string;
  anchor: string;
};

const tiers = (...rows: [number, string][]) =>
  rows.map(([price, duration]) => ({ price, duration }));

export const SERVICE_OVERVIEW: ServiceOverview[] = [
  {
    id: 'sessions',
    title: 'Сеансы',
    summary: '7 видов массажа · от 2 700 ₽',
    anchor: 'menu-sessions',
  },
  {
    id: 'programs',
    title: 'Программы',
    summary: 'Комплексы для тела и лица',
    anchor: 'menu-programs',
  },
  {
    id: 'rituals',
    title: 'Спа-ритуалы',
    summary: 'Массаж + скраб + обёртывание',
    anchor: 'menu-rituals',
  },
  {
    id: 'local',
    title: 'Локальные',
    summary: 'Отдельные зоны · от 1 200 ₽',
    anchor: 'menu-local',
  },
  {
    id: 'addons',
    title: 'Дополнения',
    summary: 'Скрабы, обёртывания, уход',
    anchor: 'menu-addons',
  },
  {
    id: 'couple',
    title: 'Парные',
    summary: 'Сеансы и ритуалы для двоих',
    anchor: 'menu-couple-sessions',
  },
  {
    id: 'subscriptions',
    title: 'Абонементы',
    summary: '10 сеансов со скидкой',
    anchor: 'menu-subscriptions',
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'sessions',
    title: 'Сеансы',
    items: [
      {
        id: 'general',
        title: 'Общий сеанс',
        description:
          'Полное обновление. Восстановление энергии, гармония тела и души, лёгкость с первого визита.',
        tiers: tiers([2700, '60 мин'], [3900, '90 мин'], [4900, '120 мин']),
      },
      {
        id: 'aroma',
        title: 'Арома сеанс',
        description:
          'Погружение в ароматы. Магия эфирных масел, расслабление и свежая энергия для всего тела.',
        tiers: tiers([2900, '60 мин'], [4100, '90 мин'], [5100, '120 мин']),
      },
      {
        id: 'lymph',
        title: 'Лимфо-сеанс',
        description:
          'Свобода тела. Снимает тяжесть и отёки, дарит ощущение лёгкости и свободы.',
        tiers: tiers([2700, '60 мин'], [3900, '90 мин'], [4900, '120 мин']),
      },
      {
        id: 'modeling',
        title: 'Моделирующий сеанс',
        description:
          'Силуэт вашей мечты. Подтянутая кожа и упругий силуэт — видимый результат с первого сеанса.',
        tiers: tiers([2900, '60 мин'], [4100, '90 мин'], [5100, '120 мин']),
      },
      {
        id: 'nourishing',
        title: 'Питательный сеанс',
        description:
          'Мягкость и забота. Максимальный комфорт с питательным кремом — идеально для чувствительной кожи.',
        tiers: tiers([2900, '60 мин'], [4100, '90 мин'], [5100, '120 мин']),
      },
      {
        id: 'hardware',
        title: 'Аппаратный сеанс',
        description:
          'Сила технологий. Быстрое восстановление, упругая кожа и заряд энергии. Подтяжка и свежесть без усилий.',
        tiers: tiers([2700, '60 мин'], [3900, '90 мин'], [4900, '120 мин']),
      },
      {
        id: 'sport',
        title: 'Спортивный сеанс',
        description:
          'Восстановление после нагрузок, повышение тонуса, энергия и сила для активной жизни.',
        tiers: tiers([3000, '60 мин'], [4200, '90 мин'], [5200, '120 мин']),
      },
    ],
  },
  {
    id: 'programs',
    title: 'Массажные программы',
    items: [
      {
        id: 'absolute',
        title: 'Абсолютное восстановление',
        includes: 'Общий массаж · массаж лица · массаж головы · уходовая маска для лица',
        description:
          'Флагманская программа центра. Глубокая работа с телом, лицом и нервной системой для полного перезагрузочного эффекта.',
        price: 5900,
        duration: '120 мин',
      },
      {
        id: 'face-body',
        title: 'Гармония лица и тела',
        includes: 'Общий массаж · массаж лица',
        description:
          'Комплекс для расслабления, улучшения тонуса кожи и гармонизации состояния.',
        badge: '★ Любимый выбор женщин',
        price: 4000,
        duration: '90 мин',
      },
      {
        id: 'deep-relax',
        title: 'Глубокое расслабление',
        includes: 'Общий массаж · массаж головы',
        description:
          'Снимает мышечное и умственное напряжение, улучшает сон и общее самочувствие.',
        badge: '★ Частый выбор мужчин',
        price: 3700,
        duration: '80 мин',
      },
      {
        id: 'face',
        title: 'Гармония лица',
        includes: 'Массаж лица · уходовая маска для лица',
        description:
          'Комплексная программа для улучшения тонуса кожи, расслабления мышц лица и свежего, отдохнувшего вида.',
        price: 2300,
        duration: '60 мин',
      },
    ],
  },
  {
    id: 'rituals',
    title: 'Спа-ритуалы',
    items: [
      {
        id: 'detox',
        title: 'Детокс',
        includes: 'Массаж 60 мин · скрабирование Ламинария · обёртывание Ламинария',
        description: 'Морской ритуал для упругости, тонуса и свежего, ухоженного вида.',
        price: 6900,
        duration: '120 мин',
      },
      {
        id: 'marzipan',
        title: 'Марципановый Рай',
        includes: 'Массаж 60 мин · скрабирование марципан · обёртывание марципан',
        description: 'Нежный ритуал с сладкими ароматами и бархатистой кожей.',
        price: 5900,
        duration: '120 мин',
      },
      {
        id: 'moroccan',
        title: 'Марокканский СПА',
        includes: 'Массаж 60 мин · скрабирование Марракеш · обёртывание Марракеш',
        description: 'Восточный ритуал для глубокого расслабления и обновления.',
        price: 5500,
        duration: '120 мин',
      },
      {
        id: 'choco-coconut',
        title: 'Шоколадный Кокос',
        includes:
          'Массаж 60 мин · скрабирование шоколадно-кокосовое · обёртывание шоколадно-кокосовое',
        description: 'Тёплый ритуал с насыщенными ароматами и мягкой кожей.',
        price: 5500,
        duration: '120 мин',
      },
      {
        id: 'coconut',
        title: 'Кокос',
        includes: 'Массаж 60 мин · скрабирование кокос · обёртывание кокос',
        description: 'Тропический ритуал для нежности и бархатистости кожи.',
        price: 5400,
        duration: '120 мин',
      },
      {
        id: 'chocolate',
        title: 'Шоколад',
        includes: 'Массаж 60 мин · скрабирование кофе · обёртывание шоколад',
        description: 'Ароматный ритуал для гладкости и сияния кожи.',
        price: 5400,
        duration: '120 мин',
      },
      {
        id: 'mango',
        title: 'Манго',
        includes: 'Массаж 60 мин · скрабирование Манго · обёртывание Манго',
        description: 'Фруктовый ритуал для свежести и тонуса.',
        price: 5400,
        duration: '120 мин',
      },
      {
        id: 'muscatel',
        title: 'Мускатэль',
        includes: 'Массаж 60 мин · скрабирование вино · обёртывание вино',
        description: 'Изысканный ритуал с винными нотами.',
        price: 5400,
        duration: '120 мин',
      },
      {
        id: 'lemongrass',
        title: 'Лемонграсс',
        includes: 'Массаж 60 мин · скрабирование Лемонграсс · обёртывание Лемонграсс',
        description: 'Освежающий ритуал для бодрости и лёгкости.',
        price: 5400,
        duration: '120 мин',
      },
      {
        id: 'vitality',
        title: 'Жизненный тонус',
        includes: 'Массаж 60 мин · скрабирование на выбор · обёртывание на выбор',
        description: 'Гибкий ритуал под ваше настроение и запрос.',
        price: 5400,
        duration: '120 мин',
      },
    ],
  },
  {
    id: 'local',
    title: 'Локальные сеансы',
    note: 'Можно добавить к основному сеансу или выбрать отдельно',
    items: [
      {
        id: 'face-local',
        title: 'Лицо',
        description:
          'Мягкая работа с мышцами лица, снимает напряжение, улучшает тонус кожи и дарит ощущение ухоженности.',
        price: 1500,
        duration: '30 мин',
      },
      {
        id: 'head',
        title: 'Голова',
        description:
          'Снимает внутреннее напряжение, помогает отключиться от мыслей и восстановить спокойствие.',
        price: 1200,
        duration: '20 мин',
      },
      {
        id: 'back',
        title: 'Спина',
        description:
          'Глубокое расслабление спины, возвращает комфорт и лёгкость телу.',
        price: 1400,
        duration: '30 мин',
      },
      {
        id: 'neck',
        title: 'ШВЗ',
        description:
          'Работа с шейно-воротниковой зоной: снимает напряжение, улучшает подвижность.',
        price: 1300,
        duration: '20 мин',
      },
      {
        id: 'hands',
        title: 'Руки',
        description:
          'Расслабляющий уход для рук, снимает усталость и возвращает мягкость.',
        price: 1300,
        duration: '20 мин',
      },
      {
        id: 'legs',
        title: 'Ноги',
        description:
          'Снимает напряжение и тяжесть, улучшает циркуляцию и дарит лёгкость в ногах.',
        price: 1300,
        duration: '30 мин',
      },
    ],
  },
  {
    id: 'addons',
    title: 'Спа-дополнения',
    note: 'Можно добавить к основному сеансу или выбрать отдельно',
    items: [
      {
        id: 'wrap-choice',
        title: 'Обёртывание (на выбор)',
        subtitle: 'Тёплая нежность',
        description:
          'Тёплая процедура, которая дарит коже мягкость и ощущение заботы.',
        price: 1500,
        duration: '30 мин',
      },
      {
        id: 'wrap-laminaria',
        title: 'Обёртывание Ламинария',
        subtitle: 'Морское обновление',
        description:
          'Морской ритуал для упругости, тонуса и свежего, ухоженного вида.',
        price: 2500,
        duration: '30 мин',
      },
      {
        id: 'scrub-choice',
        title: 'Скрабирование (на выбор)',
        subtitle: 'Идеальная гладкость',
        description:
          'Бережно обновляет кожу, делает её гладкой и приятной на ощупь.',
        price: 1500,
        duration: '30 мин',
      },
      {
        id: 'honey',
        title: 'Медовый сеанс',
        subtitle: 'Медовая мягкость',
        description:
          'Ароматный уход с медовой текстурой для нежности и бархатистости кожи.',
        price: 2800,
        duration: '1 час',
      },
      {
        id: 'japanese-face',
        title: 'Японский массаж лица',
        description:
          'Премиальная японско-корейская техника глубокого косметического массажа для овала, тонуса кожи и лимфодренажа.',
        price: 3000,
        duration: '2 часа',
      },
    ],
  },
  {
    id: 'couple-sessions',
    title: 'Парные сеансы',
    items: [
      {
        id: 'couple-general',
        title: 'Общий сеанс',
        subtitle: 'Вместе в моменте',
        description:
          'Глубокое расслабление и синхронный отдых для двоих. Снимает напряжение, восстанавливает энергию и гармонию рядом с близким человеком.',
        tiers: tiers([5200, '60 мин'], [7500, '90 мин'], [9500, '120 мин']),
      },
      {
        id: 'couple-aroma',
        title: 'Арома сеанс',
        subtitle: 'Ароматы близости',
        description:
          'Погружение в мир эфирных масел. Тёплые прикосновения, расслабляющие ароматы и атмосфера доверия.',
        tiers: tiers([5600, '60 мин'], [7900, '90 мин'], [9900, '120 мин']),
      },
      {
        id: 'couple-nourishing',
        title: 'Питательный сеанс',
        subtitle: 'Мягкость и забота',
        description:
          'Нежный уход с питательным кремом. Глубоко увлажняет кожу, дарит комфорт и тепло — идеально для чувствительной кожи.',
        tiers: tiers([5600, '60 мин'], [7900, '90 мин'], [9900, '120 мин']),
      },
      {
        id: 'couple-sport',
        title: 'Спортивный сеанс',
        subtitle: 'Восстановление и сила',
        description:
          'Активная работа с мышцами для двоих. Снимает напряжение после нагрузок, улучшает тонус и подвижность.',
        tiers: tiers([5600, '60 мин'], [7900, '90 мин'], [9900, '120 мин']),
      },
    ],
  },
  {
    id: 'couple-rituals',
    title: 'Парные спа-ритуалы',
    items: [
      {
        id: 'couple-detox',
        title: 'Детокс',
        includes: 'Массаж 60 мин · скрабирование Ламинария · обёртывание Ламинария',
        description: 'Морской ритуал для двоих — упругость, тонус и обновление.',
        price: 13800,
        duration: '120 мин',
      },
      {
        id: 'couple-marzipan',
        title: 'Марципановый Рай',
        includes: 'Массаж 60 мин · скрабирование марципан · обёртывание марципан',
        description: 'Нежный ритуал для двоих с сладкими ароматами.',
        price: 11800,
        duration: '120 мин',
      },
      {
        id: 'couple-moroccan',
        title: 'Марокканский СПА',
        includes: 'Массаж 60 мин · скрабирование Марракеш · обёртывание Марракеш',
        description: 'Восточный ритуал для двоих.',
        price: 11000,
        duration: '120 мин',
      },
      {
        id: 'couple-choco-coconut',
        title: 'Шоколадный Кокос',
        includes:
          'Массаж 60 мин · скрабирование шоколадно-кокосовое · обёртывание шоколадно-кокосовое',
        description: 'Тёплый ритуал для двоих.',
        price: 11000,
        duration: '120 мин',
      },
      {
        id: 'couple-coconut',
        title: 'Кокос',
        includes: 'Массаж 60 мин · скрабирование кокос · обёртывание кокос',
        description: 'Тропический ритуал для двоих.',
        price: 10800,
        duration: '120 мин',
      },
      {
        id: 'couple-chocolate',
        title: 'Шоколад',
        includes: 'Массаж 60 мин · скрабирование кофе · обёртывание шоколад',
        description: 'Ароматный ритуал для двоих.',
        price: 10800,
        duration: '120 мин',
      },
      {
        id: 'couple-mango',
        title: 'Манго',
        includes: 'Массаж 60 мин · скрабирование Манго · обёртывание Манго',
        description: 'Фруктовый ритуал для двоих.',
        price: 10800,
        duration: '120 мин',
      },
      {
        id: 'couple-muscatel',
        title: 'Мускатэль',
        includes: 'Массаж 60 мин · скрабирование вино · обёртывание вино',
        description: 'Изысканный ритуал для двоих.',
        price: 10800,
        duration: '120 мин',
      },
      {
        id: 'couple-lemongrass',
        title: 'Лемонграсс',
        includes: 'Массаж 60 мин · скрабирование Лемонграсс · обёртывание Лемонграсс',
        description: 'Освежающий ритуал для двоих.',
        price: 10800,
        duration: '120 мин',
      },
      {
        id: 'couple-vitality',
        title: 'Жизненный тонус',
        includes: 'Массаж 60 мин · скрабирование на выбор · обёртывание на выбор',
        description: 'Гибкий ритуал для двоих под ваш запрос.',
        price: 10800,
        duration: '120 мин',
      },
    ],
  },
  {
    id: 'subscriptions',
    title: 'Абонементы',
    intro:
      'Абонемент — самый выгодный способ заботиться о себе регулярно. Фиксированная цена, стабильный результат, экономия и удобство.',
    items: [
      {
        id: 'sub-60',
        title: '10 сеансов по 60 минут',
        description: 'Фиксированная цена на 10 сеансов общего или выбранного формата.',
        price: 25000,
        oldPrice: 27000,
        duration: '10 сеансов',
      },
      {
        id: 'sub-90',
        title: '10 сеансов по 90 минут',
        description: 'Фиксированная цена на 10 расширенных сеансов.',
        price: 35000,
        oldPrice: 39000,
        duration: '10 сеансов',
      },
    ],
  },
];

export type BookingServiceOption = {
  id: string;
  title: string;
  category: string;
};

export function getBookingServiceOptions(): BookingServiceOption[] {
  return SERVICE_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      id: `${category.id}:${item.id}`,
      title: item.title,
      category: category.title,
    })),
  );
}
