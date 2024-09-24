export const genres = [
  {
    id: 'clxppkqld0005k2ybyugrhn61',
    name: 'Приключения',
    slug: 'priklyucheniya',
    description:
      '<p><span style="color: rgb(153,154,165);background-color: rgb(16,15,18);font-size: medium;font-family: __GeistSans_3a0388, __GeistSans_Fallback_3a0388;">Откройте <strong>мир</strong> приключений на нашем сайте! Выбирайте лучшие фильмы о <strong><em>путешествиях</em></strong> и отважных подвигах <ins>прямо</ins> сейчас!</span>&nbsp;</p>',
    icon: 'LuHistory',
  },
  {
    id: 'clxppk6mj0004k2yb1p9mpu53',
    name: 'Криминал',
    slug: 'kriminal',
    description:
      'Откройте мир криминального кино! У нас — захватывающие истории преступлений, детективы и неожиданные повороты сюжета. Погружайтесь в лучшие криминальные фильмы прямо сейчас!',
    icon: 'LuBomb',
  },
  {
    id: 'clxppjmqz0003k2yb4iyrb1in',
    name: 'Драма',
    slug: 'drama',
    description:
      '<p>Драмы, наполненные <strong>глубокими</strong> эмоциями и жизненными историями. Готовы почувствовать это</p>',
    icon: 'LuApple',
  },
  {
    id: 'clxppilrm0002k2ybs9gmdya6',
    name: 'Комедия',
    slug: 'komediya',
    description:
      'Комедии, вызывающие смех и поднимающие настроение. Готовы ли вы посмеяться от души?',
    icon: 'LuCookie',
  },
  {
    id: 'clxppi5t70001k2yb5nqr8gp4',
    name: 'Боевики',
    slug: 'boeviki',
    description:
      'Боевики, полные адреналина и невероятных приключений. Готовы ли вы к этому?.',
    icon: 'LuFan',
  },
  {
    id: 'clxpphjdz0000k2ybnji921yv',
    name: 'Экшн',
    slug: 'ekshn',
    description:
      'Взрывная коллекция экшн-фильмов ждет вас! Погрузитесь в мир адреналина прямо сейчас.',
    icon: 'LuAccessibility',
  },
];

export const actors = [
  {
    id: 'clxpyv75y0006lpkgsdv4u3c7',
    name: 'Сэм Уортингтон',
    slug: 'sem-uortington',
    photoUrl: '/uploads/actors/sam-worthington.jpg',
  },
  {
    id: 'clxpyuwlv0005lpkgcbjf1dcv',
    name: 'Райан Рейнольдс',
    slug: 'rajan-rejnolds',
    photoUrl: '/uploads/actors/ryan-reynolds.jpg',
  },
  {
    id: 'clxpyum7m0004lpkgpqywryq7',
    name: 'Мэттью Макконахи',
    slug: 'mettyu-makkonahi',
    photoUrl: '/uploads/actors/matthew.jpg',
  },
  {
    id: 'clxpyudi70003lpkg42e976sn',
    name: 'Эдвард Нортон',
    slug: 'edvard-norton',
    photoUrl: '/uploads/actors/edward-norton.jpg',
  },
  {
    id: 'clxpyt7cx0002lpkghb0dtf0n',
    name: 'Брэд Питт',
    slug: 'bred-pitt',
    photoUrl: '/uploads/actors/brad-pitt.jpg',
  },
  {
    id: 'clxpyqehs0001lpkg70gunc27',
    name: 'Райан Гослинг',
    slug: 'rajan-gosling',
    photoUrl: '/uploads/actors/rajan-gosling.jpg',
  },
  {
    id: 'clxpypd030000lpkg4tkynvh2',
    name: 'Леонардо Ди Каприо',
    slug: 'leonardo-di-kaprio',
    photoUrl: '/uploads/actors/leo.jpg',
  },
  {
    id: 'clxpqqy4w0000tzoq8v7uvwbb',
    name: 'Киану Ривз',
    slug: 'kianu-rivz',
    photoUrl: '/uploads/actors/keanu-reeves.jpg',
  },
];

export const movies = [
  {
    id: 'clxxajvhw0003109yfpevmfuf',
    title: 'Дэдпул',
    slug: 'dedpul',
    poster: '/uploads/movies/deadpool.jpg',
    bigPoster: '/uploads/movies/deadpool-big.jpg',
    videoUrl: '/uploads/movies/deadpool.mp4',
    country: 'США',
    year: 2016,
    duration: 108,
    actors: {
      connect: [
        {
          id: 'clxpyuwlv0005lpkgcbjf1dcv',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppi5t70001k2yb5nqr8gp4',
        },
        {
          id: 'clxppilrm0002k2ybs9gmdya6',
        },
      ],
    },
  },
  {
    id: 'clxxalkdq0004109y45ylb3gh',
    title: 'Интерстеллар',
    slug: 'interstellar',
    poster: '/uploads/movies/interstellar.jpg',
    bigPoster: '/uploads/movies/interstellar-big.jpg',
    videoUrl: '/uploads/movies/interstellar.mp4',
    country: 'США, Великобритания, Канада',
    year: 2014,
    duration: 169,
    actors: {
      connect: [
        {
          id: 'clxpyum7m0004lpkgpqywryq7',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
        {
          id: 'clxppkqld0005k2ybyugrhn61',
        },
      ],
    },
  },
  {
    id: 'clxxank4f0005109yixw6qh1h',
    title: 'Аватар',
    slug: 'avatar',
    poster: '/uploads/movies/avatar.jpg',
    bigPoster: '/uploads/movies/avatar-big.webp',
    videoUrl: '/uploads/movies/avatar.mp4',
    country: 'США',
    year: 2009,
    duration: 162,
    actors: {
      connect: [
        {
          id: 'clxpyv75y0006lpkgsdv4u3c7',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppi5t70001k2yb5nqr8gp4',
        },
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
        {
          id: 'clxppkqld0005k2ybyugrhn61',
        },
      ],
    },
  },
  {
    id: 'clxxag7k10002109ytekvt7gt',
    title: 'Славные парни',
    slug: 'slavnye-parni',
    poster: '/uploads/movies/nice-guys.webp',
    bigPoster: '/uploads/movies/nice-guys-big.jpg',
    videoUrl: '/uploads/movies/nice-guys.mp4',
    country: 'США, Великобритания',
    year: 2016,
    duration: 115,
    actors: {
      connect: [
        {
          id: 'clxpyqehs0001lpkg70gunc27',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppi5t70001k2yb5nqr8gp4',
        },
        {
          id: 'clxppilrm0002k2ybs9gmdya6',
        },
      ],
    },
  },
  {
    id: 'clxx9s67h0000109yuk7qi0sk',
    title: 'Драйв',
    slug: 'drajv',
    poster: '/uploads/movies/drive.webp',
    bigPoster: '/uploads/movies/drive-big.jpeg',
    videoUrl: '/uploads/movies/drive.mp4',
    country: 'США',
    year: 2011,
    duration: 100,
    actors: {
      connect: [
        {
          id: 'clxpyqehs0001lpkg70gunc27',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
        {
          id: 'clxppk6mj0004k2yb1p9mpu53',
        },
      ],
    },
  },
  {
    id: 'clxt41dvk000287pwj4g68w6w',
    title: 'Титаник',
    slug: 'titanik',
    poster: '/uploads/movies/titanic.webp',
    bigPoster: '/uploads/movies/titanic-big.webp',
    videoUrl: '/uploads/movies/titanic.mp4',
    country: 'США, Мексика',
    year: 1997,
    duration: 194,
    actors: {
      connect: [
        {
          id: 'clxpypd030000lpkg4tkynvh2',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
      ],
    },
  },
  {
    id: 'clxt3y3wu000187pwgmcce9qj',
    title: 'Бойцовский клуб',
    slug: 'bojtsovskij-klub',
    poster: '/uploads/movies/fight-club.jpg',
    bigPoster: '/uploads/movies/fight-club-big.jpg',
    videoUrl: '/uploads/movies/fight-club.mp4',
    country: 'США, Германия',
    year: 1999,
    duration: 139,
    actors: {
      connect: [
        {
          id: 'clxpyt7cx0002lpkghb0dtf0n',
        },
        {
          id: 'clxpyudi70003lpkg42e976sn',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
        {
          id: 'clxppk6mj0004k2yb1p9mpu53',
        },
      ],
    },
  },
  {
    id: 'clxt3uc1w000087pwioe9y6w0',
    title: 'Волк с Уолл-стрит',
    slug: 'volk-s-uoll-strit',
    poster: '/uploads/movies/street.jpg',
    bigPoster: '/uploads/movies/street-big.jpg',
    videoUrl: '/uploads/movies/street.mp4',
    country: 'США',
    year: 2013,
    duration: 180,
    actors: {
      connect: [
        {
          id: 'clxpypd030000lpkg4tkynvh2',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxppilrm0002k2ybs9gmdya6',
        },
        {
          id: 'clxppjmqz0003k2yb4iyrb1in',
        },
      ],
    },
  },
  {
    id: 'clxpuataw0000zi9pzxb8agzj',
    title: 'Джон уик',
    slug: 'dzhon-uik',
    poster: '/uploads/movies/john-wick.jpg',
    bigPoster: '/uploads/movies/big-john-wick.jpg',
    videoUrl: '/uploads/movies/john-wick.mp4',
    country: 'США',
    year: 2023,
    duration: 180,
    actors: {
      connect: [
        {
          id: 'clxpqqy4w0000tzoq8v7uvwbb',
        },
      ],
    },
    genres: {
      connect: [
        {
          id: 'clxpphjdz0000k2ybnji921yv',
        },
        {
          id: 'clxppi5t70001k2yb5nqr8gp4',
        },
      ],
    },
  },
];
