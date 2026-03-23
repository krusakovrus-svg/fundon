import type { SportEventRecord } from '@/types';

function createMartialArtsEvent({
  id,
  title,
  titleRu,
  startsAt,
  endsAt,
  participants
}: Omit<SportEventRecord, 'sportId'>) {
  return {
    id,
    sportId: 'martial-arts',
    title,
    titleRu,
    startsAt,
    endsAt,
    participants
  } satisfies SportEventRecord;
}

export const martialArtsEvents: SportEventRecord[] = [
  createMartialArtsEvent({
    id: 'martial-arts-aca-1',
    title: 'Martial arts · MMA · ACA',
    titleRu: 'Единоборства · MMA · ACA',
    startsAt: '2026-03-27T20:00:00+03:00',
    endsAt: '2026-03-27T20:45:00+03:00',
    participants: [
      { id: 'silva-j', name: 'Silva J.', nameRu: 'Сильва Ж.', country: 'Brazil' },
      { id: 'podlesniy-a', name: 'Podlesniy A.', nameRu: 'Подлесный А.', country: 'Ukraine' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-1',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T00:00:00+03:00',
    endsAt: '2026-03-29T00:45:00+03:00',
    participants: [
      { id: 'tainara-a', name: 'Tainara A.', nameRu: 'Тайнара А.', country: 'Brazil' },
      { id: 'brazil-b', name: 'Brazil B.', nameRu: 'Бразил Б.', country: 'Brazil' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-2',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T00:15:00+03:00',
    endsAt: '2026-03-29T01:00:00+03:00',
    participants: [
      { id: 'oneil-k', name: "O'Neil K.", nameRu: "О'Нил К.", country: 'Australia' },
      { id: 'fernandes-g', name: 'Fernandes G.', nameRu: 'Фернандес Г.', country: 'Brazil' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-3',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T00:15:00+03:00',
    endsAt: '2026-03-29T01:00:00+03:00',
    participants: [
      { id: 'simon-r', name: 'Simon R.', nameRu: 'Симон Р.', country: 'United States' },
      { id: 'yanez-a', name: 'Yanez A.', nameRu: 'Янес А.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-4',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T00:30:00+03:00',
    endsAt: '2026-03-29T01:15:00+03:00',
    participants: [
      { id: 'stirling-n', name: 'Stirling N.', nameRu: 'Стирлинг Н.', country: 'Australia' },
      { id: 'lopes-bruno', name: 'Bruno Lopes', nameRu: 'Лопес Бруно', country: 'Brazil' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-5',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T01:00:00+03:00',
    endsAt: '2026-03-29T01:45:00+03:00',
    participants: [
      { id: 'tybura-m', name: 'Tybura M.', nameRu: 'Тыбура М.', country: 'Poland' },
      { id: 'fortune-t', name: 'Fortune T.', nameRu: 'Форчун Т.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-6',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T01:15:00+03:00',
    endsAt: '2026-03-29T02:00:00+03:00',
    participants: [
      { id: 'hooper-c', name: 'Hooper C.', nameRu: 'Хупер Ч.', country: 'United States' },
      { id: 'gibson-ml', name: 'Gibson M.L.', nameRu: 'Гибсон Мл. Л.', country: 'Canada' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-7',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T01:30:00+03:00',
    endsAt: '2026-03-29T02:15:00+03:00',
    participants: [
      { id: 'bahamondes-i', name: 'Bahamondes I.', nameRu: 'Бахамондес И.', country: 'Chile' },
      { id: 'musaev-t', name: 'Musaev T.', nameRu: 'Мусаев Т.', country: 'Azerbaijan' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-8',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T03:00:00+03:00',
    endsAt: '2026-03-29T03:45:00+03:00',
    participants: [
      { id: 'mckinney-t', name: 'McKinney T.', nameRu: 'МакКинни Т.', country: 'United States' },
      { id: 'nelson-k', name: 'Nelson K.', nameRu: 'Нельсон К.', country: 'Canada' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-9',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T03:15:00+03:00',
    endsAt: '2026-03-29T04:00:00+03:00',
    participants: [
      { id: 'abdul-malik-m', name: 'Abdul-Malik M.', nameRu: 'Абдул-Малик М.', country: 'United States' },
      { id: 'belgaroui-y', name: 'Belgaroui Y.', nameRu: 'Белгаруи Ю.', country: 'Tunisia' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-10',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T03:35:00+03:00',
    endsAt: '2026-03-29T04:20:00+03:00',
    participants: [
      { id: 'erosa-j', name: 'Erosa J.', nameRu: 'Эроса Дж.', country: 'United States' },
      { id: 'douglas-l', name: 'Douglas L.', nameRu: 'Дуглас Л.', country: 'Brazil' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-11',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T04:00:00+03:00',
    endsAt: '2026-03-29T04:45:00+03:00',
    participants: [
      { id: 'grasso-a', name: 'Grasso A.', nameRu: 'Грассо А.', country: 'Mexico' },
      { id: 'barber-m', name: 'Barber M.', nameRu: 'Барбер М.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-ufc-271-12',
    title: 'Martial arts · MMA · UFC Fight Night 271: Adesanya vs Pfeifer',
    titleRu: 'Единоборства · MMA · UFC Fight Night 271: Адесанья vs Пайфер',
    startsAt: '2026-03-29T04:30:00+03:00',
    endsAt: '2026-03-29T05:15:00+03:00',
    participants: [
      { id: 'adesanya-i', name: 'Adesanya I.', nameRu: 'Адесанья И.', country: 'Ireland' },
      { id: 'pfeifer-j', name: 'Pfeifer J.', nameRu: 'Пайфер Дж.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-1',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T04:45:00+03:00',
    endsAt: '2026-06-15T05:30:00+03:00',
    participants: [
      { id: 'lopes-d', name: 'Lopes D.', nameRu: 'Лопес Д.', country: 'Brazil' },
      { id: 'garcia-jr-c', name: 'Garcia Jr. C.', nameRu: 'Гарсия Мл. С.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-2',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T05:15:00+03:00',
    endsAt: '2026-06-15T06:00:00+03:00',
    participants: [
      { id: 'nickal-b', name: 'Nickal B.', nameRu: 'Никал Б.', country: 'United States' },
      { id: 'daukaus-k', name: 'Daukaus K.', nameRu: 'Дакас К.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-3',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T05:45:00+03:00',
    endsAt: '2026-06-15T06:30:00+03:00',
    participants: [
      { id: 'ruffy-m', name: 'Ruffy M.', nameRu: 'Руффи М.', country: 'Brazil' },
      { id: 'chandler-m', name: 'Chandler M.', nameRu: 'Чендлер М.', country: 'United States' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-4',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T06:15:00+03:00',
    endsAt: '2026-06-15T07:00:00+03:00',
    participants: [
      { id: 'omalley-s', name: "O'Malley S.", nameRu: "О'Мэлли Ш.", country: 'United States' },
      { id: 'zahabi-a', name: 'Zahabi A.', nameRu: 'Захаби А.', country: 'Canada' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-5',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T06:45:00+03:00',
    endsAt: '2026-06-15T07:30:00+03:00',
    participants: [
      { id: 'pereira-a', name: 'Pereira A.', nameRu: 'Перейра А.', country: 'Brazil' },
      { id: 'gane-c', name: 'Gane C.', nameRu: 'Ган С.', country: 'France' }
    ]
  }),
  createMartialArtsEvent({
    id: 'martial-arts-freedom-250-6',
    title: 'Martial arts · MMA · UFC Freedom 250: Topuria vs Gaethje',
    titleRu: 'Единоборства · MMA · UFC Freedom 250: Топурия vs Гейджи',
    startsAt: '2026-06-15T07:20:00+03:00',
    endsAt: '2026-06-15T08:05:00+03:00',
    participants: [
      { id: 'topuria-i', name: 'Topuria I.', nameRu: 'Топурия И.', country: 'Georgia' },
      { id: 'gaethje-j', name: 'Gaethje J.', nameRu: 'Гейджи Дж.', country: 'United States' }
    ]
  })
];
