import { martialArtsEvents } from '@/data/martialArts';
import type { Language, SportEventRecord } from '@/types';

const supportedSportIds = new Set(['football', 'hockey', 'basketball', 'martial-arts', 'boxing', 'formula1']);

const genericSportEvents: Record<string, SportEventRecord[]> = {
  football: [
    {
      id: 'football-argentina-primera-1',
      sportId: 'football',
      title: 'Football · Primera Division · Argentina',
      titleRu: 'Футбол · Примера дивизион · Аргентина',
      startsAt: '2026-03-24T01:00:00+03:00',
      endsAt: '2026-03-24T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'estudiantes-la-plata', name: 'Estudiantes La Plata', nameRu: 'Эстудиантес Ла Плата' },
        { id: 'central-cordoba-sde', name: 'Central Cordoba SdE', nameRu: 'Сентраль Кордова СдЕ' }
      ]
    },
    {
      id: 'football-argentina-primera-2',
      sportId: 'football',
      title: 'Football · Primera Division · Argentina',
      titleRu: 'Футбол · Примера дивизион · Аргентина',
      startsAt: '2026-03-24T03:15:00+03:00',
      endsAt: '2026-03-24T05:15:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'huracan-ba', name: 'Huracan BA', nameRu: 'Уракан БА' },
        { id: 'barracas-central', name: 'Barracas Central', nameRu: 'Барракас Сентраль' }
      ]
    },
    {
      id: 'football-ecuador-serie-a-1',
      sportId: 'football',
      title: 'Football · Serie A · Ecuador',
      titleRu: 'Футбол · Серия A · Эквадор',
      startsAt: '2026-03-24T00:30:00+03:00',
      endsAt: '2026-03-24T02:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'guayaquil-city', name: 'Guayaquil City', nameRu: 'Гуаякиль Сити' },
        { id: 'leones-del-norte', name: 'Leones del Norte', nameRu: 'Леонес дель Норте' }
      ]
    },
    {
      id: 'football-ecuador-serie-a-2',
      sportId: 'football',
      title: 'Football · Serie A · Ecuador',
      titleRu: 'Футбол · Серия A · Эквадор',
      startsAt: '2026-03-24T03:00:00+03:00',
      endsAt: '2026-03-24T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'aucas', name: 'Aucas', nameRu: 'Аукас' },
        { id: 'orense', name: 'Orense', nameRu: 'Оренсе' }
      ]
    },
    {
      id: 'football-colombia-primera-a-1',
      sportId: 'football',
      title: 'Football · Primera A · Colombia',
      titleRu: 'Футбол · Примера A · Колумбия',
      startsAt: '2026-03-24T00:10:00+03:00',
      endsAt: '2026-03-24T02:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'santa-fe', name: 'Santa Fe', nameRu: 'Санта Фе' },
        { id: 'independiente-medellin', name: 'Independiente Medellin', nameRu: 'Индепендьенте Медельин' }
      ]
    },
    {
      id: 'football-colombia-primera-a-2',
      sportId: 'football',
      title: 'Football · Primera A · Colombia',
      titleRu: 'Футбол · Примера A · Колумбия',
      startsAt: '2026-03-24T02:20:00+03:00',
      endsAt: '2026-03-24T04:20:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'jaguares-de-cordoba', name: 'Jaguares de Cordoba', nameRu: 'Хагуарес де Кордова' },
        { id: 'rionegro-aguilas', name: 'Rionegro Aguilas', nameRu: 'Рионегро Агилас' }
      ]
    },
    {
      id: 'football-guatemala-national-league-1',
      sportId: 'football',
      title: 'Football · National League · Guatemala',
      titleRu: 'Футбол · Национальная лига · Гватемала',
      startsAt: '2026-03-24T04:00:00+03:00',
      endsAt: '2026-03-24T06:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'antigua-gfc', name: 'Antigua GFC', nameRu: 'Антигуа ГФК' },
        { id: 'deportivo-marquense', name: 'Deportivo Marquense', nameRu: 'Депортиво Маркенсе' }
      ]
    },
    {
      id: 'football-paraguay-primera-1',
      sportId: 'football',
      title: 'Football · Primera Division · Paraguay',
      titleRu: 'Футбол · Примера дивизион · Парагвай',
      startsAt: '2026-03-24T00:30:00+03:00',
      endsAt: '2026-03-24T02:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'sportivo-trinidense', name: 'Sportivo Trinidense', nameRu: 'Спортиво Триниденсе' },
        { id: 'recoleta', name: 'Recoleta', nameRu: 'Реколета' }
      ]
    },
    {
      id: 'football-paraguay-primera-2',
      sportId: 'football',
      title: 'Football · Primera Division · Paraguay',
      titleRu: 'Футбол · Примера дивизион · Парагвай',
      startsAt: '2026-03-24T02:30:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'rubio-nu', name: 'Rubio Nu', nameRu: 'Рубио Нью' },
        { id: 'ameliano', name: 'Ameliano', nameRu: 'Амелиано' }
      ]
    },
    {
      id: 'football-chile-primera-b-1',
      sportId: 'football',
      title: 'Football · Primera B · Chile',
      titleRu: 'Футбол · Примера B · Чили',
      startsAt: '2026-03-24T00:00:00+03:00',
      endsAt: '2026-03-24T02:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'union-san-felipe', name: 'Union San Felipe', nameRu: 'Унион Сан Фелипе' },
        { id: 'san-marcos-de-arica', name: 'San Marcos de Arica', nameRu: 'Сан Маркос Де Арика' }
      ]
    },
    {
      id: 'football-chile-primera-b-2',
      sportId: 'football',
      title: 'Football · Primera B · Chile',
      titleRu: 'Футбол · Примера B · Чили',
      startsAt: '2026-03-24T02:30:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'cobreloa', name: 'Cobreloa', nameRu: 'Кобрелоа' },
        { id: 'magallanes', name: 'Magallanes', nameRu: 'Магальянес' }
      ]
    },
    {
      id: 'football-venezuela-primera-1',
      sportId: 'football',
      title: 'Football · Primera · Venezuela',
      titleRu: 'Футбол · Примера · Венесуэла',
      startsAt: '2026-03-24T01:00:00+03:00',
      endsAt: '2026-03-24T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'carabobo', name: 'Carabobo', nameRu: 'Карабобо' },
        { id: 'academia-puerto-cabello', name: 'Academia Puerto Cabello', nameRu: 'Академия Пуэрто Кабельо' }
      ]
    },
    {
      id: 'football-venezuela-primera-2',
      sportId: 'football',
      title: 'Football · Primera · Venezuela',
      titleRu: 'Футбол · Примера · Венесуэла',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'metropolitanos', name: 'Metropolitanos', nameRu: 'Метрополитанос' },
        { id: 'academia-anzoategui', name: 'Academia Anzoategui', nameRu: 'Академия Ансоатеги' }
      ]
    },
    {
      id: 'football-mexico-liga-mx-women-1',
      sportId: 'football',
      title: 'Football · Liga MX. Women · Mexico',
      titleRu: 'Футбол · Лига MX. Женщины · Мексика',
      startsAt: '2026-03-24T04:00:00+03:00',
      endsAt: '2026-03-24T06:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'leon-w', name: 'Leon (w)', nameRu: 'Леон (ж)' },
        { id: 'atlas-w', name: 'Atlas (w)', nameRu: 'Атлас (ж)' }
      ]
    },
    {
      id: 'football-brazil-serie-a-women-1',
      sportId: 'football',
      title: 'Football · Serie A. Women · Brazil',
      titleRu: 'Футбол · Серия A. Женщины · Бразилия',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'fluminense-rj-w', name: 'Fluminense RJ (w)', nameRu: 'Флуминенсе РЖ (ж)' },
        { id: 'sao-paulo-sp-w', name: 'Sao Paulo SP (w)', nameRu: 'Сан Пауло СП (ж)' }
      ]
    },
    {
      id: 'football-brazil-serie-a-women-2',
      sportId: 'football',
      title: 'Football · Serie A. Women · Brazil',
      titleRu: 'Футбол · Серия A. Женщины · Бразилия',
      startsAt: '2026-03-24T03:00:00+03:00',
      endsAt: '2026-03-24T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'corinthians-w', name: 'Corinthians (w)', nameRu: 'Коринтианс (ж)' },
        { id: 'america-mineiro-w', name: 'America Mineiro (w)', nameRu: 'Америка Минейро (ж)' }
      ]
    },
    {
      id: 'football-panama-liga-panamena-1',
      sportId: 'football',
      title: 'Football · Liga Panamena · Panama',
      titleRu: 'Футбол · Лига Панаменья · Панама',
      startsAt: '2026-03-24T04:30:00+03:00',
      endsAt: '2026-03-24T06:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'umesit', name: 'Umesit', nameRu: 'Умесит' },
        { id: 'herrera', name: 'Herrera', nameRu: 'Эррера' }
      ]
    },
    {
      id: 'football-queensland-npl-u23-1',
      sportId: 'football',
      title: 'Football · National Premier League Queensland. Under 23 · Australia',
      titleRu: 'Футбол · Национальная Премьер-Лига Квинсленда. До 23 лет · Австралия',
      startsAt: '2026-03-24T12:30:00+03:00',
      endsAt: '2026-03-24T14:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'eastern-suburbs-u23', name: 'Eastern Suburbs (youth)', nameRu: 'Истерн Сабербс (мол)' },
        { id: 'gold-coast-knights-u23', name: 'Gold Coast Knights (youth)', nameRu: 'Голд Кост Найтс (мол)' }
      ]
    },
    {
      id: 'football-mls-next-pro-1',
      sportId: 'football',
      title: 'Football · MLS Next Pro · USA',
      titleRu: 'Футбол · MLS Next Pro · США',
      startsAt: '2026-03-24T05:00:00+03:00',
      endsAt: '2026-03-24T07:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'portland-timbers-ii', name: 'Portland Timbers II', nameRu: 'Портленд Тимберс II' },
        { id: 'ventura-county', name: 'Ventura County', nameRu: 'Вентура Каунти' }
      ]
    },
    {
      id: 'football-brazil-mineiro-u20-1',
      sportId: 'football',
      title: 'Football · Mineiro. 1st Division. Under 20 · Brazil',
      titleRu: 'Футбол · Минейро. 1-й дивизион. До 20 лет · Бразилия',
      startsAt: '2026-03-24T01:30:00+03:00',
      endsAt: '2026-03-24T03:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'athletic-mg-u20', name: 'Athletic MG (youth)', nameRu: 'Атлетик МЖ (мол)' },
        { id: 'sao-joao-del-rei-mg-u20', name: 'Sao Joao del Rei MG (youth)', nameRu: 'Сан Хуан дел Рей МЖ (мол)' }
      ]
    },
    {
      id: 'football-honduras-national-league-1',
      sportId: 'football',
      title: 'Football · National League · Honduras',
      titleRu: 'Футбол · Национальная лига · Гондурас',
      startsAt: '2026-03-24T04:00:00+03:00',
      endsAt: '2026-03-24T06:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'lobos-upnfm', name: 'Lobos UPNFM', nameRu: 'Лобос УПНФМ' },
        { id: 'olancho', name: 'Olancho', nameRu: 'Оланчо' }
      ]
    },
    {
      id: 'football-argentina-primera-b-1',
      sportId: 'football',
      title: 'Football · Primera B · Argentina',
      titleRu: 'Футбол · Примера B · Аргентина',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'comunicaciones-ba', name: 'Comunicaciones BA', nameRu: 'Комуникасьонес БА' },
        { id: 'deportivo-liniers', name: 'Deportivo Liniers', nameRu: 'Депортиво Линьерс' }
      ]
    },
    {
      id: 'football-jamaica-premier-league-1',
      sportId: 'football',
      title: 'Football · Premier League · Jamaica',
      titleRu: 'Футбол · Премьер-Лига · Ямайка',
      startsAt: '2026-03-24T03:30:00+03:00',
      endsAt: '2026-03-24T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'mount-pleasant', name: 'Mount Pleasant', nameRu: 'Маунт Плезант' },
        { id: 'portmore-united', name: 'Portmore United', nameRu: 'Портмор Юнайтед' }
      ]
    },
    {
      id: 'football-jamaica-premier-league-2',
      sportId: 'football',
      title: 'Football · Premier League · Jamaica',
      titleRu: 'Футбол · Премьер-Лига · Ямайка',
      startsAt: '2026-03-24T01:00:00+03:00',
      endsAt: '2026-03-24T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'spanish-town-police', name: 'Spanish Town Police', nameRu: 'Спэниш Таун Полис' },
        { id: 'treasure-beach', name: 'Treasure Beach', nameRu: 'Треже Бич' }
      ]
    },
    {
      id: 'football-australia-queensland-premier-league-1',
      sportId: 'football',
      title: 'Football · Queensland Premier League · Australia',
      titleRu: 'Футбол · Премьер-Лига Квинсленда · Австралия',
      startsAt: '2026-03-24T12:30:00+03:00',
      endsAt: '2026-03-24T14:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'brisbane-strikers', name: 'Brisbane Strikers', nameRu: 'Брисбен Страйкерс' },
        { id: 'caboolture', name: 'Caboolture', nameRu: 'Кабултур' }
      ]
    },
    {
      id: 'football-turkey-amateur-2-lig-1',
      sportId: 'football',
      title: 'Football · Amateur. 2nd League · Turkey',
      titleRu: 'Футбол · Любители. 2-я Лига · Турция',
      startsAt: '2026-03-24T13:30:00+03:00',
      endsAt: '2026-03-24T15:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'erzincanspor', name: 'Erzincanspor', nameRu: 'Эрзинджанспор' },
        { id: 'kepez-belediyespor', name: 'Kepez Belediyespor', nameRu: 'Кепез Беледьеспор' }
      ]
    },
    {
      id: 'football-turkey-amateur-2-lig-2',
      sportId: 'football',
      title: 'Football · Amateur. 2nd League · Turkey',
      titleRu: 'Футбол · Любители. 2-я Лига · Турция',
      startsAt: '2026-03-24T14:00:00+03:00',
      endsAt: '2026-03-24T16:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'iskenderun', name: 'Iskenderun', nameRu: 'Искендерун' },
        { id: 'inegolspor', name: 'Inegolspor', nameRu: 'Ингёльспор' }
      ]
    },
    {
      id: 'football-turkey-amateur-2-lig-3',
      sportId: 'football',
      title: 'Football · Amateur. 2nd League · Turkey',
      titleRu: 'Футбол · Любители. 2-я Лига · Турция',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'isparta-32-spor', name: 'Isparta 32 Spor', nameRu: 'Испарта 32 Спор' },
        { id: 'somaspor', name: 'Somaspor', nameRu: 'Сомаспор' }
      ]
    },
    {
      id: 'football-turkey-amateur-2-lig-4',
      sportId: 'football',
      title: 'Football · Amateur. 2nd League · Turkey',
      titleRu: 'Футбол · Любители. 2-я Лига · Турция',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'kirklarelispor', name: 'Kirklarelispor', nameRu: 'Кыркларелиспор' },
        { id: 'ankara-demirspor', name: 'Ankara Demirspor', nameRu: 'Анкара Демирспор' }
      ]
    },
    {
      id: 'football-england-pdl-u21-1',
      sportId: 'football',
      title: 'Football · Amateur. PDL. Under 21 · England',
      titleRu: 'Футбол · Любители. PDL. До 21 года · Англия',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'peterborough-united-u21', name: 'Peterborough United (youth)', nameRu: 'Питерборо Юнайтед (мол)' },
        { id: 'watford-u21', name: 'Watford (youth)', nameRu: 'Уотфорд (мол)' }
      ]
    },
    {
      id: 'football-england-pdl-u21-2',
      sportId: 'football',
      title: 'Football · Amateur. PDL. Under 21 · England',
      titleRu: 'Футбол · Любители. PDL. До 21 года · Англия',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'wigan-athletic-u21', name: 'Wigan Athletic (youth)', nameRu: 'Уиган Атлетик (мол)' },
        { id: 'bristol-city-u21', name: 'Bristol City (youth)', nameRu: 'Бристоль Сити (мол)' }
      ]
    },
    {
      id: 'football-england-pdl-u21-3',
      sportId: 'football',
      title: 'Football · Amateur. PDL. Under 21 · England',
      titleRu: 'Футбол · Любители. PDL. До 21 года · Англия',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'huddersfield-town-u21', name: 'Huddersfield Town (youth)', nameRu: 'Хаддерсфилд Таун (мол)' },
        { id: 'queens-park-rangers-u21', name: 'Queens Park Rangers (youth)', nameRu: 'Куинз Парк Рейнджерс (мол)' }
      ]
    },
    {
      id: 'football-england-pdl-u21-4',
      sportId: 'football',
      title: 'Football · Amateur. PDL. Under 21 · England',
      titleRu: 'Футбол · Любители. PDL. До 21 года · Англия',
      startsAt: '2026-03-24T16:00:00+03:00',
      endsAt: '2026-03-24T18:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'hull-city-u21', name: 'Hull City (youth)', nameRu: 'Халл Сити (мол)' },
        { id: 'swansea-city-u21', name: 'Swansea City (youth)', nameRu: 'Суонси Сити (мол)' }
      ]
    },
    {
      id: 'football-portugal-youth-u23-1',
      sportId: 'football',
      title: 'Football · Youth League. Under 23 · Portugal',
      titleRu: 'Футбол · Молодежная лига. До 23 лет · Португалия',
      startsAt: '2026-03-24T18:00:00+03:00',
      endsAt: '2026-03-24T20:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'ud-leiria-u23', name: 'UD Leiria (youth)', nameRu: 'УД Лейрия (мол)' },
        { id: 'farense-u23', name: 'Farense (youth)', nameRu: 'Фаренсе (мол)' }
      ]
    },
    {
      id: 'football-turkey-amateur-2-lig-5',
      sportId: 'football',
      title: 'Football · Amateur. 2nd League · Turkey',
      titleRu: 'Футбол · Любители. 2-я Лига · Турция',
      startsAt: '2026-03-24T19:00:00+03:00',
      endsAt: '2026-03-24T21:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'bursaspor', name: 'Bursaspor', nameRu: 'Бурсаспор' },
        { id: 'gozide-gebzespor', name: 'Gozide Gebzespor', nameRu: 'Гёзиде Гебзеспор' }
      ]
    },
      {
        id: 'football-uruguay-primera-1',
        sportId: 'football',
        title: 'Football · Primera Division · Uruguay',
        titleRu: 'Футбол · Примера дивизион · Уругвай',
      startsAt: '2026-03-24T20:00:00+03:00',
      endsAt: '2026-03-24T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
        participants: [
          { id: 'deportivo-maldonado', name: 'Deportivo Maldonado', nameRu: 'Депортиво Мальдонадо' },
          { id: 'montevideo-city-torque', name: 'Montevideo City Torque', nameRu: 'Монтевидео Сити Торке' }
        ]
      },
      {
        id: 'football-uefa-wcl-women-1',
        sportId: 'football',
        title: 'Football · UEFA Champions League. Women · International. Clubs',
        titleRu: 'Футбол · Лига чемпионов УЕФА. Женщины · Международные. Клубы',
        startsAt: '2026-03-24T20:45:00+03:00',
        endsAt: '2026-03-24T22:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'wolfsburg-w', name: 'Wolfsburg (w)', nameRu: 'Вольфсбург (ж)' },
          { id: 'lyon-w', name: 'Lyon (w)', nameRu: 'Лион (ж)' }
        ]
      },
      {
        id: 'football-netherlands-eerste-divisie-1',
        sportId: 'football',
        title: 'Football · Eerste divisie · Netherlands',
        titleRu: 'Футбол · Эрсте дивизион · Нидерланды',
        startsAt: '2026-03-24T22:00:00+03:00',
        endsAt: '2026-03-25T00:00:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'emmen', name: 'Emmen', nameRu: 'Эммен' },
          { id: 'cambuur', name: 'Cambuur', nameRu: 'Камбюр' }
        ]
      },
      {
        id: 'football-england-southern-premier-6',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'alvechurch', name: 'Alvechurch', nameRu: 'Алвечёрч' },
          { id: 'ives-town', name: 'Ives Town', nameRu: 'Ивес Таун' }
        ]
      },
      {
        id: 'football-england-south-national-1',
        sportId: 'football',
        title: 'Football · Amateur. South National League · England',
        titleRu: 'Футбол · Любители. Южная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'bath-city', name: 'Bath City', nameRu: 'Бат Сити' },
          { id: 'hemel-hempstead-town', name: 'Hemel Hempstead Town', nameRu: 'Хемел Хемпстед Таун' }
        ]
      },
      {
        id: 'football-qatar-cup-of-stars-1',
        sportId: 'football',
        title: 'Football · Cup of Stars · Qatar',
        titleRu: 'Футбол · Кубок Звёзд · Катар',
        startsAt: '2026-03-24T18:15:00+03:00',
        endsAt: '2026-03-24T20:15:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'al-rayyan', name: 'Al Rayyan', nameRu: 'Аль Райян' },
          { id: 'al-shahania', name: 'Al Shahania', nameRu: 'Аль Шахания' }
        ]
      },
      {
        id: 'football-england-national-league-1',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'boston-united', name: 'Boston United', nameRu: 'Бостон Юнайтед' },
          { id: 'altrincham', name: 'Altrincham', nameRu: 'Олтрингем' }
        ]
      },
      {
        id: 'football-england-national-league-2',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'brackley-town', name: 'Brackley Town', nameRu: 'Брэкли Таун' },
          { id: 'braintree-town', name: 'Braintree Town', nameRu: 'Брейнтри Таун' }
        ]
      },
      {
        id: 'football-england-national-league-3',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'halifax-town', name: 'Halifax Town', nameRu: 'Галифакс Таун' },
          { id: 'carlisle-united', name: 'Carlisle United', nameRu: 'Карлайл Юнайтед' }
        ]
      },
      {
        id: 'football-england-northern-premier-1',
        sportId: 'football',
        title: 'Football · Amateur. Northern Premier League · England',
        titleRu: 'Футбол · Любители. Северная Премьер-Лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'gainsborough-trinity', name: 'Gainsborough Trinity', nameRu: 'Гейнсборо Тринити' },
          { id: 'bamber-bridge', name: 'Bamber Bridge', nameRu: 'Бамбер Бридж' }
        ]
      },
      {
        id: 'football-england-national-league-4',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'gateshead', name: 'Gateshead', nameRu: 'Гейтсхед' },
          { id: 'york-city', name: 'York City', nameRu: 'Йорк Сити' }
        ]
      },
      {
        id: 'football-england-northern-national-1',
        sportId: 'football',
        title: 'Football · Amateur. Northern National League · England',
        titleRu: 'Футбол · Любители. Северная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'darlington', name: 'Darlington', nameRu: 'Дарлингтон' },
          { id: 'kidderminster-harriers', name: 'Kidderminster Harriers', nameRu: 'Киддерминстер Харриерс' }
        ]
      },
      {
        id: 'football-england-league-1-1',
        sportId: 'football',
        title: 'Football · League 1 · England',
        titleRu: 'Футбол · Лига 1 · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'doncaster-rovers', name: 'Doncaster Rovers', nameRu: 'Донкастер Роверс' },
          { id: 'port-vale', name: 'Port Vale', nameRu: 'Порт Вейл' }
        ]
      },
      {
        id: 'football-england-national-league-5',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'eastleigh', name: 'Eastleigh', nameRu: 'Истли' },
          { id: 'sutton-united', name: 'Sutton United', nameRu: 'Саттон Юнайтед' }
        ]
      },
      {
        id: 'football-england-southern-premier-7',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'yate-town', name: 'Yate Town', nameRu: 'Йейт Таун' },
          { id: 'poole-town', name: 'Poole Town', nameRu: 'Пул Таун' }
        ]
      },
      {
        id: 'football-england-southern-premier-8',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'kettering-town', name: 'Kettering Town', nameRu: 'Кеттеринг Таун' },
          { id: 'banbury-united', name: 'Banbury United', nameRu: 'Банбери Юнайтед' }
        ]
      },
      {
        id: 'football-england-northern-premier-2',
        sportId: 'football',
        title: 'Football · Amateur. Northern Premier League · England',
        titleRu: 'Футбол · Любители. Северная Премьер-Лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'cleethorpes-town', name: 'Cleethorpes Town', nameRu: 'Клитхорпс Таун' },
          { id: 'guiseley', name: 'Guiseley', nameRu: 'Гайзли' }
        ]
      },
      {
        id: 'football-england-northern-national-2',
        sportId: 'football',
        title: 'Football · Amateur. Northern National League · England',
        titleRu: 'Футбол · Любители. Северная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'leamington', name: 'Leamington', nameRu: 'Лемингтон' },
          { id: 'kings-lynn-town', name: 'Kings Lynn Town', nameRu: 'Кингс Линн Таун' }
        ]
      },
      {
        id: 'football-england-league-2-1',
        sportId: 'football',
        title: 'Football · League 2 · England',
        titleRu: 'Футбол · Лига 2 · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'oldham-athletic', name: 'Oldham Athletic', nameRu: 'Олдем Атлетик' },
          { id: 'notts-county', name: 'Notts County', nameRu: 'Ноттс Каунти' }
        ]
      },
      {
        id: 'football-england-national-league-6',
        sportId: 'football',
        title: 'Football · National League · England',
        titleRu: 'Футбол · Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'aldershot-town', name: 'Aldershot Town', nameRu: 'Олдершот Таун' },
          { id: 'boreham-wood', name: 'Boreham Wood', nameRu: 'Борэм Вуд' }
        ]
      },
      {
        id: 'football-england-northern-national-3',
        sportId: 'football',
        title: 'Football · Amateur. Northern National League · England',
        titleRu: 'Футбол · Любители. Северная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'alfreton-town', name: 'Alfreton Town', nameRu: 'Олфретон Таун' },
          { id: 'macclesfield', name: 'Macclesfield', nameRu: 'Маклсфилд' }
        ]
      },
      {
        id: 'football-england-southern-premier-9',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'plymouth-parkway', name: 'Plymouth Parkway', nameRu: 'Плимут Парквей' },
          { id: 'farnham-town', name: 'Farnham Town', nameRu: 'Фарнхам Таун' }
        ]
      },
      {
        id: 'football-england-southern-premier-10',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'real-bedford', name: 'Real Bedford', nameRu: 'Реал Бедфорд' },
          { id: 'harborough-town', name: 'Harborough Town', nameRu: 'Харборо Таун' }
        ]
      },
      {
        id: 'football-scotland-championship-1',
        sportId: 'football',
        title: 'Football · Championship · Scotland',
        titleRu: 'Футбол · Чемпионшип · Шотландия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'raith-rovers', name: 'Raith Rovers', nameRu: 'Рэйт Роверс' },
          { id: 'partick-thistle', name: 'Partick Thistle', nameRu: 'Партик Тисл' }
        ]
      },
      {
        id: 'football-scotland-league-2-1',
        sportId: 'football',
        title: 'Football · League 2 · Scotland',
        titleRu: 'Футбол · 2-я лига · Шотландия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'stranraer', name: 'Stranraer', nameRu: 'Странраер' },
          { id: 'clyde', name: 'Clyde', nameRu: 'Клайд' }
        ]
      },
      {
        id: 'football-england-southern-premier-11',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'stratford-town', name: 'Stratford Town', nameRu: 'Стратфорд Таун' },
          { id: 'stamford', name: 'Stamford', nameRu: 'Стэмфорд' }
        ]
      },
      {
        id: 'football-england-southern-premier-12',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'tiverton-town', name: 'Tiverton Town', nameRu: 'Тивертон Таун' },
          { id: 'gloucester-city', name: 'Gloucester City', nameRu: 'Глостер Сити' }
        ]
      },
      {
        id: 'football-england-south-national-2',
        sportId: 'football',
        title: 'Football · Amateur. South National League · England',
        titleRu: 'Футбол · Любители. Южная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'torquay-united', name: 'Torquay United', nameRu: 'Торки Юнайтед' },
          { id: 'dorking-wanderers', name: 'Dorking Wanderers', nameRu: 'Доркинг Уондерерс' }
        ]
      },
      {
        id: 'football-england-south-national-3',
        sportId: 'football',
        title: 'Football · Amateur. South National League · England',
        titleRu: 'Футбол · Любители. Южная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'weston-super-mare', name: 'Weston-super-Mare', nameRu: 'Уэстон Сьюпер Мэр' },
          { id: 'worthing', name: 'Worthing', nameRu: 'Уортинг' }
        ]
      },
      {
        id: 'football-england-northern-national-4',
        sportId: 'football',
        title: 'Football · Amateur. Northern National League · England',
        titleRu: 'Футбол · Любители. Северная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'fylde', name: 'Fylde', nameRu: 'Файлд' },
          { id: 'marine', name: 'Marine', nameRu: 'Марин' }
        ]
      },
      {
        id: 'football-england-southern-premier-13',
        sportId: 'football',
        title: 'Football · Amateur. Southern Premier League. Premier Division · England',
        titleRu: 'Футбол · Любители. Южная Премьер-Лига. Премьер Дивизион · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'hanwell-town', name: 'Hanwell Town', nameRu: 'Ханвелл Таун' },
          { id: 'evesham-united', name: 'Evesham United', nameRu: 'Ившем Юнайтед' }
        ]
      },
      {
        id: 'football-england-northern-national-5',
        sportId: 'football',
        title: 'Football · Amateur. Northern National League · England',
        titleRu: 'Футбол · Любители. Северная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'hereford', name: 'Hereford', nameRu: 'Херефорд' },
          { id: 'spennymoor-town', name: 'Spennymoor Town', nameRu: 'Спеннимур Таун' }
        ]
      },
      {
        id: 'football-england-south-national-4',
        sportId: 'football',
        title: 'Football · Amateur. South National League · England',
        titleRu: 'Футбол · Любители. Южная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'chesham-united', name: 'Chesham United', nameRu: 'Чешем Юнайтед' },
          { id: 'hornchurch', name: 'Hornchurch', nameRu: 'Хорнчерч' }
        ]
      },
      {
        id: 'football-scotland-league-2-2',
        sportId: 'football',
        title: 'Football · League 2 · Scotland',
        titleRu: 'Футбол · 2-я лига · Шотландия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'elgin-city', name: 'Elgin City', nameRu: 'Элгин Сити' },
          { id: 'forfar-athletic', name: 'Forfar Athletic', nameRu: 'Форфар Атлетик' }
        ]
      },
      {
        id: 'football-england-south-national-5',
        sportId: 'football',
        title: 'Football · Amateur. South National League · England',
        titleRu: 'Футбол · Любители. Южная Национальная лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'enfield-town', name: 'Enfield Town', nameRu: 'Энфилд Таун' },
          { id: 'dover-athletic', name: 'Dover Athletic', nameRu: 'Дувр Атлетик' }
        ]
      },
      {
        id: 'football-england-northern-premier-3',
        sportId: 'football',
        title: 'Football · Amateur. Northern Premier League · England',
        titleRu: 'Футбол · Любители. Северная Премьер-Лига · Англия',
        startsAt: '2026-03-24T22:45:00+03:00',
        endsAt: '2026-03-25T00:45:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'fc-united-of-manchester', name: 'FC United of Manchester', nameRu: 'Юнайтед оф Манчестер' },
          { id: 'stockton-town', name: 'Stockton Town', nameRu: 'Стоктон Таун' }
        ]
      },
      {
        id: 'football-uefa-wcl-women-2',
        sportId: 'football',
        title: 'Football · UEFA Champions League. Women · International. Clubs',
        titleRu: 'Футбол · Лига чемпионов УЕФА. Женщины · Международные. Клубы',
        startsAt: '2026-03-24T23:00:00+03:00',
        endsAt: '2026-03-25T01:00:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'arsenal-london-w', name: 'Arsenal London (w)', nameRu: 'Арсенал Лондон (ж)' },
          { id: 'chelsea-w', name: 'Chelsea (w)', nameRu: 'Челси (ж)' }
        ]
      },
      {
        id: 'football-uruguay-primera-2',
        sportId: 'football',
        title: 'Football · Primera Division · Uruguay',
        titleRu: 'Футбол · Примера дивизион · Уругвай',
        startsAt: '2026-03-24T23:00:00+03:00',
        endsAt: '2026-03-25T01:00:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'liverpool-montevideo', name: 'Liverpool Montevideo', nameRu: 'Ливерпуль Монтевидео' },
          { id: 'central-espanol', name: 'Central Espanol', nameRu: 'Сентраль Эспаньол' }
        ]
      },
      {
        id: 'football-colombia-primera-a-3',
        sportId: 'football',
        title: 'Football · Primera A · Colombia',
        titleRu: 'Футбол · Примера A · Колумбия',
        startsAt: '2026-03-24T23:30:00+03:00',
        endsAt: '2026-03-25T01:30:00+03:00',
        displayDateEn: 'Tomorrow at',
        displayDateRu: 'Завтра в',
        participants: [
          { id: 'deportivo-pereira', name: 'Deportivo Pereira', nameRu: 'Депортиво Перейра' },
          { id: 'cucuta-deportivo', name: 'Cucuta Deportivo', nameRu: 'Кукута Депортиво' }
        ]
      }
  ],
  hockey: [
    {
      id: 'hockey-nhl-1',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'montreal-canadiens', name: 'Montreal', nameRu: 'РњРѕРЅСЂРµР°Р»СЊ' },
        { id: 'boston-bruins', name: 'Boston', nameRu: 'Р‘РѕСЃС‚РѕРЅ' }
      ]
    },
    {
      id: 'hockey-nhl-2',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'toronto-maple-leafs', name: 'Toronto', nameRu: 'РўРѕСЂРѕРЅС‚Рѕ' },
        { id: 'new-york-islanders', name: 'NY Islanders', nameRu: 'РќР™ РђР№Р»РµРЅРґРµСЂСЃ' }
      ]
    },
    {
      id: 'hockey-nhl-3',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'columbus-blue-jackets', name: 'Columbus', nameRu: 'РљРѕР»Р°РјР±СѓСЃ' },
        { id: 'carolina-hurricanes', name: 'Carolina', nameRu: 'РљР°СЂРѕР»РёРЅР°' }
      ]
    },
    {
      id: 'hockey-nhl-4',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T02:30:00+03:00',
      endsAt: '2026-03-18T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'chicago-blackhawks', name: 'Chicago', nameRu: 'Р§РёРєР°РіРѕ' },
        { id: 'minnesota-wild', name: 'Minnesota', nameRu: 'РњРёРЅРЅРµСЃРѕС‚Р°' }
      ]
    },
    {
      id: 'hockey-nhl-5',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T03:00:00+03:00',
      endsAt: '2026-03-18T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'winnipeg-jets', name: 'Winnipeg', nameRu: 'Р’РёРЅРЅРёРїРµРі' },
        { id: 'nashville-predators', name: 'Nashville', nameRu: 'РќСЌС€РІРёР»Р»' }
      ]
    },
    {
      id: 'hockey-nhl-6',
      sportId: 'hockey',
      title: 'Hockey В· NHL В· USA',
      titleRu: 'РҐРѕРєРєРµР№ В· NHL В· РЎРЁРђ',
      startsAt: '2026-03-18T04:00:00+03:00',
      endsAt: '2026-03-18T06:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'edmonton-oilers', name: 'Edmonton', nameRu: 'Р­РґРјРѕРЅС‚РѕРЅ' },
        { id: 'san-jose-sharks', name: 'San Jose', nameRu: 'РЎР°РЅ РҐРѕСЃРµ' }
      ]
    }
  ],
  tennis: [
    {
      id: 'tennis-wta-miami-1',
      sportId: 'tennis',
      title: 'Tennis В· WTA В· WTA1000. Miami. USA',
      titleRu: 'РўРµРЅРЅРёСЃ В· WTA В· WTA1000. РњР°Р№Р°РјРё. РЎРЁРђ',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'sonmez-z', name: 'Sonmez Z.', nameRu: 'РЎРѕРЅРјРµР· Р—.' },
        { id: 'haddad-maia-b', name: 'Haddad Maia B.', nameRu: 'РҐР°РґРґР°Рґ РњР°Р№СЏ Р‘.' }
      ]
    },
    {
      id: 'tennis-wta-miami-2',
      sportId: 'tennis',
      title: 'Tennis В· WTA В· WTA1000. Miami. USA',
      titleRu: 'РўРµРЅРЅРёСЃ В· WTA В· WTA1000. РњР°Р№Р°РјРё. РЎРЁРђ',
      startsAt: '2026-03-18T03:10:00+03:00',
      endsAt: '2026-03-18T05:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'siniakova-k', name: 'Siniakova K.', nameRu: 'РЎРёРЅСЏРєРѕРІР° Рљ.' },
        { id: 'osorio-k', name: 'Osorio K.', nameRu: 'РћСЃРѕСЂРёРѕ Рљ.' }
      ]
    },
    {
      id: 'tennis-asuncion-1',
      sportId: 'tennis',
      title: 'Tennis В· ATP. Challenger В· Asuncion. Paraguay',
      titleRu: 'РўРµРЅРЅРёСЃ В· ATP. Р§РµР»Р»РµРЅРґР¶РµСЂ В· РђСЃСѓРЅСЃСЊРѕРЅ. РџР°СЂР°РіРІР°Р№',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T02:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'bueno-g', name: 'Bueno G.', nameRu: 'Р‘СѓР·РЅРѕ Р“.' },
        { id: 'didoni-bonini-jp', name: 'Didoni Bonini J.P.', nameRu: 'Р”РёРґРѕРЅРё Р‘РѕРЅРёРЅРё Р–.Рџ.' }
      ]
    },
    {
      id: 'tennis-asuncion-2',
      sportId: 'tennis',
      title: 'Tennis В· ATP. Challenger В· Asuncion. Paraguay',
      titleRu: 'РўРµРЅРЅРёСЃ В· ATP. Р§РµР»Р»РµРЅРґР¶РµСЂ В· РђСЃСѓРЅСЃСЊРѕРЅ. РџР°СЂР°РіРІР°Р№',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T02:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'midon-l', name: 'Midon L.', nameRu: 'РњРёРґРѕРЅ Р›.' },
        { id: 'villanueva-g', name: 'Villanueva G.', nameRu: 'Р’РёР»Р»Р°РЅСѓСЌРІР° Р“.' }
      ]
    },
    {
      id: 'tennis-asuncion-3',
      sportId: 'tennis',
      title: 'Tennis В· ATP. Challenger В· Asuncion. Paraguay',
      titleRu: 'РўРµРЅРЅРёСЃ В· ATP. Р§РµР»Р»РµРЅРґР¶РµСЂ В· РђСЃСѓРЅСЃСЊРѕРЅ. РџР°СЂР°РіРІР°Р№',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'dellien-m', name: 'Dellien M.', nameRu: 'Р”РµР»Р»РёРµРЅ Рњ.' },
        { id: 'nunez-vera-ac', name: 'Nunez Vera A.C.', nameRu: 'РќСѓРЅСЊРµСЃ Р’РµСЂР° Рђ.РЎ.' }
      ]
    },
    {
      id: 'tennis-morelos-1',
      sportId: 'tennis',
      title: 'Tennis В· ATP. Challenger В· Morelos. Mexico',
      titleRu: 'РўРµРЅРЅРёСЃ В· ATP. Р§РµР»Р»РµРЅРґР¶РµСЂ В· РњРѕСЂРµР»РѕСЃ. РњРµРєСЃРёРєР°',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'hernandez-serrano-xa', name: 'Hernandez Serrano X.A.', nameRu: 'Р­СЂРЅР°РЅРґРµСЃ РЎРµСЂСЂР°РЅРѕ РҐ.Рђ.' },
        { id: 'colson-t', name: 'Colson T.', nameRu: 'РљРѕР»СЃРѕРЅ Рў.' }
      ]
    }
  ],
  'table-tennis': [
    {
      id: 'table-tennis-tt-cup-1',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T01:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'baros-a', name: 'Baros A.', nameRu: 'Р‘Р°СЂРѕС€ Рђ.', country: 'Czech Republic' },
        { id: 'zaskodny-m', name: 'Zaskodny M.', nameRu: 'Р—Р°С€РєРѕРґРЅРё Рњ.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-2',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T00:20:00+03:00',
      endsAt: '2026-03-18T01:20:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'viskocil-z', name: 'Viskocil Z.', nameRu: 'Р’РёСЃРєРѕС†РёР» Р—.', country: 'Czech Republic' },
        { id: 'barsa-t', name: 'Barsa T.', nameRu: 'Р‘Р°СЂСЃР° Рў.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-3',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T00:25:00+03:00',
      endsAt: '2026-03-18T01:25:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'kazacky-a', name: 'Kazacky A.', nameRu: 'РљР°Р·Р°С†РєРёР№ Рђ.', country: 'Czech Republic' },
        { id: 'kulisek-m-1', name: 'Kulisek M.', nameRu: 'РљСѓР»РёС€РµРє Рњ.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-4',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T00:50:00+03:00',
      endsAt: '2026-03-18T01:50:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'dvorak-martin', name: 'Dvorak Martin', nameRu: 'Р”РІРѕСЂР°Рє РњР°СЂС‚РёРЅ', country: 'Czech Republic' },
        { id: 'mach-y', name: 'Mach Y.', nameRu: 'РњР°С… РЇ.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-5',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T00:55:00+03:00',
      endsAt: '2026-03-18T01:55:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'brozek-michal', name: 'Brozek Michal', nameRu: 'Р‘СЂРѕР¶РµРє РњРёС…Р°Р»', country: 'Czech Republic' },
        { id: 'kulisek-m-2', name: 'Kulisek M.', nameRu: 'РљСѓР»РёС€РµРє Рњ.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-6',
      sportId: 'table-tennis',
      title: 'Table tennis В· International В· TT-Cup',
      titleRu: 'РќР°СЃС‚РѕР»СЊРЅС‹Р№ С‚РµРЅРЅРёСЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· TT-Cup',
      startsAt: '2026-03-18T01:25:00+03:00',
      endsAt: '2026-03-18T02:25:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'giza-d', name: 'Giza D.', nameRu: 'Р“РёР·Р° Р”.', country: 'Czech Republic' },
        { id: 'kazacky-a-2', name: 'Kazacky A.', nameRu: 'РљР°Р·Р°С†РєРёР№ Рђ.', country: 'Czech Republic' }
      ]
    }
  ],
  basketball: [
    {
      id: 'basketball-nba-1',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'orlando-magic', name: 'Orlando Magic', nameRu: 'РћСЂР»Р°РЅРґРѕ РњСЌРґР¶РёРє' },
        { id: 'oklahoma-city-thunder', name: 'Oklahoma City Thunder', nameRu: 'РћРєР»Р°С…РѕРјР° РЎРёС‚Рё РўР°РЅРґРµСЂ' }
      ]
    },
    {
      id: 'basketball-nba-2',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'charlotte-hornets', name: 'Charlotte Hornets', nameRu: 'РЁР°СЂР»РѕС‚С‚ РҐРѕСЂРЅРµС‚СЃ' },
        { id: 'miami-heat', name: 'Miami Heat', nameRu: 'РњР°Р№Р°РјРё РҐРёС‚' }
      ]
    },
    {
      id: 'basketball-nba-3',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'washington-wizards', name: 'Washington Wizards', nameRu: 'Р’Р°С€РёРЅРіС‚РѕРЅ РЈРёР·Р°СЂРґСЃ' },
        { id: 'detroit-pistons', name: 'Detroit Pistons', nameRu: 'Р”РµС‚СЂРѕР№С‚ РџРёСЃС‚РѕРЅСЃ' }
      ]
    },
    {
      id: 'basketball-nba-4',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T02:30:00+03:00',
      endsAt: '2026-03-18T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'new-york-knicks', name: 'New York Knicks', nameRu: 'РќСЊСЋ-Р™РѕСЂРє РќРёРєСЃ' },
        { id: 'indiana-pacers', name: 'Indiana Pacers', nameRu: 'РРЅРґРёР°РЅР° РџСЌР№СЃРµСЂСЃ' }
      ]
    },
    {
      id: 'basketball-nba-5',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T03:00:00+03:00',
      endsAt: '2026-03-18T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'milwaukee-bucks', name: 'Milwaukee Bucks', nameRu: 'РњРёР»СѓРѕРєРё Р‘Р°РєСЃ' },
        { id: 'cleveland-cavaliers', name: 'Cleveland Cavaliers', nameRu: 'РљР»РёРІР»РµРЅРґ РљР°РІР°Р»СЊРµСЂСЃ' }
      ]
    },
    {
      id: 'basketball-nba-6',
      sportId: 'basketball',
      title: 'Basketball В· USA В· NBA',
      titleRu: 'Р‘Р°СЃРєРµС‚Р±РѕР» В· РЎРЁРђ В· NBA',
      startsAt: '2026-03-18T03:00:00+03:00',
      endsAt: '2026-03-18T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'minnesota-timberwolves', name: 'Minnesota Timberwolves', nameRu: 'РњРёРЅРЅРµСЃРѕС‚Р° РўРёРјР±РµСЂРІСѓР»РІР·' },
        { id: 'phoenix-suns', name: 'Phoenix Suns', nameRu: 'Р¤РёРЅРёРєСЃ РЎР°РЅР·' }
      ]
    }
  ],
  cybersport: [
    {
      id: 'cybersport-dota2-epl-1',
      sportId: 'cybersport',
      title: 'Cybersport В· Dota-2 В· European Pro League. Season 35 2026',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Dota-2 В· European Pro League. Season 35 2026',
      startsAt: '2026-03-18T16:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'navi-junior', name: 'NAVI Junior', nameRu: 'NAVI Junior' },
        { id: 'astini-plus-5', name: 'Astini+5', nameRu: 'Astini+5' }
      ]
    },
    {
      id: 'cybersport-cs-aorus-1',
      sportId: 'cybersport',
      title: 'Cybersport В· Counter-strike В· Aorus League. Brazil Online Stage 2',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Counter-strike В· Aorus League. Brazil Online Stage 2',
      startsAt: '2026-03-18T00:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'galorys', name: 'Galorys', nameRu: 'Galorys' },
        { id: 'mibr-academy', name: 'MIBR Academy', nameRu: 'MIBR Academy' }
      ]
    },
    {
      id: 'cybersport-cs-aorus-2',
      sportId: 'cybersport',
      title: 'Cybersport В· Counter-strike В· Aorus League. Brazil Online Stage 2',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Counter-strike В· Aorus League. Brazil Online Stage 2',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'bounty-hunters-esports', name: 'Bounty Hunters Esports', nameRu: 'Bounty Hunters Esports' },
        { id: 'keyd', name: 'Keyd', nameRu: 'Keyd' }
      ]
    },
    {
      id: 'cybersport-cs-cct-sa-1',
      sportId: 'cybersport',
      title: 'Cybersport В· Counter-strike В· CCT South America. Series 10',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Counter-strike В· CCT South America. Series 10',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'uno-mille', name: 'UNO MILLE', nameRu: 'UNO MILLE' },
        { id: 'here-we-go-again', name: 'HereWeGoAgain', nameRu: 'HereWeGoAgain' }
      ]
    },
    {
      id: 'cybersport-valorant-ces-1',
      sportId: 'cybersport',
      title: 'Cybersport В· Valorant В· China Evolution Series. Act 1 2026',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Valorant В· China Evolution Series. Act 1 2026',
      startsAt: '2026-03-18T12:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'dragon-ranger-gaming', name: 'Dragon Ranger Gaming', nameRu: 'Dragon Ranger Gaming' },
        { id: 'any-questions-gaming', name: 'Any Questions Gaming', nameRu: 'Any Questions Gaming' }
      ]
    },
    {
      id: 'cybersport-cs-nodwin-1',
      sportId: 'cybersport',
      title: 'Cybersport В· Counter-strike В· NODWIN Clutch Series. Season 6 2026',
      titleRu: 'РљРёР±РµСЂСЃРїРѕСЂС‚ В· Counter-strike В· NODWIN Clutch Series. Season 6 2026',
      startsAt: '2026-03-18T12:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'ex-ruby', name: 'ex-RUBY', nameRu: 'ex-RUBY' },
        { id: 'the-last-resort', name: 'The Last Resort', nameRu: 'The Last Resort' }
      ]
    }
  ],
  esport: [
    {
      id: 'esport-high-cup-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. High Cup (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. High Cup (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd p., 36'",
      displayTimeRu: "2-Р№ Рї., 36'",
      participants: [
        { id: 'minnakhmetov-yel', name: 'Minnakhmetov (YEL)', nameRu: 'РњРёРЅРЅР°С…РјРµС‚РѕРІ (YEL)' },
        { id: 'idrisov-gre', name: 'Idrisov (GRE)', nameRu: 'РРґСЂРёСЃРѕРІ (GRE)' }
      ]
    },
    {
      id: 'esport-high-cup-2',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. High Cup (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. High Cup (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:05:00+03:00',
      endsAt: '2026-03-17T21:05:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'kartashov-blk', name: 'Kartashov (BLK)', nameRu: 'РљР°СЂС‚Р°С€РѕРІ (BLK)' },
        { id: 'gaibullin-blu', name: 'Gaibullin (BLU)', nameRu: 'Р“Р°Р№Р±СѓР»Р»РёРЅ (BLU)' }
      ]
    },
    {
      id: 'esport-fc-penalty-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC. Ultimate Penalty League',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC. Ultimate Penalty League',
      startsAt: '2026-03-17T19:10:00+03:00',
      endsAt: '2026-03-17T21:10:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "Penalties, 0'",
      displayTimeRu: "РџРµРЅР°Р»СЊС‚Рё, 0'",
      participants: [
        { id: 'inter-milan-lynj9r', name: 'Inter Milan (lynj9r)', nameRu: 'РРЅС‚РµСЂ РњРёР»Р°РЅ (lynj9r)' },
        { id: 'borussia-dortmund-weresk03', name: 'Borussia Dortmund (weresk03)', nameRu: 'Р‘РѕСЂСѓСЃСЃРёСЏ Р”РѕСЂС‚РјСѓРЅРґ (weresk03)' }
      ]
    },
    {
      id: 'esport-fc-penalty-2',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC. Ultimate Penalty League',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC. Ultimate Penalty League',
      startsAt: '2026-03-17T19:15:00+03:00',
      endsAt: '2026-03-17T21:15:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "Penalties, 0'",
      displayTimeRu: "РџРµРЅР°Р»СЊС‚Рё, 0'",
      participants: [
        { id: 'borussia-dortmund-weresk03-b', name: 'Borussia Dortmund (weresk03)', nameRu: 'Р‘РѕСЂСѓСЃСЃРёСЏ Р”РѕСЂС‚РјСѓРЅРґ (weresk03)' },
        { id: 'inter-milan-lynj9r-b', name: 'Inter Milan (lynj9r)', nameRu: 'РРЅС‚РµСЂ РњРёР»Р°РЅ (lynj9r)' }
      ]
    },
    {
      id: 'esport-fc-volta-high-cup-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC 24. 5x5 Volta High Cup (2x3 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC 24. 5x5 Volta High Cup (2x3 РјРёРЅ)',
      startsAt: '2026-03-17T19:20:00+03:00',
      endsAt: '2026-03-17T21:20:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd h., 4'",
      displayTimeRu: "2-Р№ С‚., 4'",
      participants: [
        { id: 'sharafulin-arsenal', name: 'Sharafullin (Arsenal)', nameRu: 'РЁР°СЂР°С„СѓР»Р»РёРЅ (РђСЂСЃРµРЅР°Р»)' },
        { id: 'strokov-juventus', name: 'Strokov (Juventus)', nameRu: 'РЎС‚СЂРѕРєРѕРІ (Р®РІРµРЅС‚СѓСЃ)' }
      ]
    },
    {
      id: 'esport-uel-hockey-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. United Esports League (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:25:00+03:00',
      endsAt: '2026-03-17T21:25:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd p., 28'",
      displayTimeRu: "2-Р№ Рї., 28'",
      participants: [
        { id: 'buffalo-deer69', name: 'Buffalo Sabres (deer69)', nameRu: 'Р‘Р°С„С„Р°Р»Рѕ РЎРµР№Р±СЂР· (deer69)' },
        { id: 'anaheim-pat95', name: 'Anaheim Ducks (Pat95)', nameRu: 'РђРЅР°С…Р°Р№Рј Р”Р°РєСЃ (Pat95)' }
      ]
    },
    {
      id: 'esport-uel-hockey-2',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. United Esports League (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 5'",
      displayTimeRu: "1-Р№ Рї., 5'",
      participants: [
        { id: 'philadelphia-kurt', name: 'Philadelphia Flyers (KURT COBAI...)', nameRu: 'Р¤РёР»Р°РґРµР»СЊС„РёСЏ Р¤Р»Р°Р№РµСЂСЃ (KURT COBAI...)' },
        { id: 'tampa-bay-aleex', name: 'Tampa-Bay Lightning (ALEEX)', nameRu: 'РўР°РјРїР°-Р‘СЌР№ Р›Р°Р№С‚РЅРёРЅРі (ALEEX)' }
      ]
    },
    {
      id: 'esport-uel-hockey-3',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. United Esports League (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:35:00+03:00',
      endsAt: '2026-03-17T21:35:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 19'",
      displayTimeRu: "1-Р№ Рї., 19'",
      participants: [
        { id: 'chicago-oil76', name: 'Chicago Blackhawks (OIL76)', nameRu: 'Р§РёРєР°РіРѕ Р‘Р»СЌРєС…РѕРєСЃ (OIL76)' },
        { id: 'islanders-puck', name: 'New York Islanders (puck)', nameRu: 'РќСЊСЋ-Р™РѕСЂРє РђР№Р»РµРЅРґРµСЂСЃ (puck)' }
      ]
    },
    {
      id: 'esport-h2h2-hockey-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. H2H-2 League (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. H2H-2 Р›РёРіР° (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:40:00+03:00',
      endsAt: '2026-03-17T21:40:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'edmonton-master-ily', name: 'Edmonton Oilers (MASTER_ILY)', nameRu: 'Р­РґРјРѕРЅС‚РѕРЅ РћР№Р»РµСЂР· (MASTER_ILY)' },
        { id: 'ottawa-garage10', name: 'Ottawa Senators (Garage10)', nameRu: 'РћС‚С‚Р°РІР° РЎРµРЅР°С‚РѕСЂР· (Garage10)' }
      ]
    },
    {
      id: 'esport-h2h-hockey-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberhockey В· NHL. H2H League (3x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС…РѕРєРєРµР№ В· NHL. H2H Р›РёРіР° (3x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:45:00+03:00',
      endsAt: '2026-03-17T21:45:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 17'",
      displayTimeRu: "1-Р№ Рї., 17'",
      participants: [
        { id: 'la-kings-arm-ava23', name: 'Los Angeles Kings (ARM_AVA23)', nameRu: 'Р›РѕСЃ-РђРЅРґР¶РµР»РµСЃ РљРёРЅРіР· (ARM_AVA23)' },
        { id: 'nashville-mukha', name: 'Nashville Predators (Mukha)', nameRu: 'РќСЌС€РІРёР»Р» РџСЂРµРґР°С‚РѕСЂР· (Mukha)' }
      ]
    },
    {
      id: 'esport-h2h-football-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· H2H Liga-2 (2x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· H2H Liga-2 (2x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:50:00+03:00',
      endsAt: '2026-03-17T21:50:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st h., 2'",
      displayTimeRu: "1-Р№ С‚., 2'",
      participants: [
        { id: 'germany-ivanoffstyle', name: 'Germany (ivanoffstyle)', nameRu: 'Р“РµСЂРјР°РЅРёСЏ (ivanoffstyle)', country: 'Germany' },
        { id: 'france-sfp', name: 'France (Sfp)', nameRu: 'Р¤СЂР°РЅС†РёСЏ (Sfp)', country: 'France' }
      ]
    },
    {
      id: 'esport-liga1-khabarovsk-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC. Liga-1. Khabarovsk (2x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC. Р›РёРіР°-1. РҐР°Р±Р°СЂРѕРІСЃРє (2x4 РјРёРЅ)',
      startsAt: '2026-03-17T19:55:00+03:00',
      endsAt: '2026-03-17T21:55:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Match finished',
      displayTimeRu: 'РњР°С‚С‡ Р·Р°РІРµСЂС€РµРЅ',
      participants: [
        { id: 'italy-gamekova', name: 'Italy (GAMEKOVA)', nameRu: 'РС‚Р°Р»РёСЏ (GAMEKOVA)', country: 'Italy' },
        { id: 'spain-maverick', name: 'Spain (MAVERICK)', nameRu: 'РСЃРїР°РЅРёСЏ (MAVERICK)', country: 'Spain' }
      ]
    },
    {
      id: 'esport-h2h-volta-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· H2H Volta (2x3 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· H2H Volta (2x3 РјРёРЅ)',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'morocco-indifference', name: 'Morocco (Indifference)', nameRu: 'РњР°СЂРѕРєРєРѕ (Indifference)', country: 'Morocco' },
        { id: 'denmark-pritistreet', name: 'Denmark (PRITISTREET)', nameRu: 'Р”Р°РЅРёСЏ (PRITISTREET)', country: 'Denmark' }
      ]
    },
    {
      id: 'esport-fc-volta-high-cup-2',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC 24. 5x5 Volta High Cup (2x3 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC 24. 5x5 Volta High Cup (2x3 РјРёРЅ)',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T22:05:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'petrov-atletico', name: 'Petrov (Atletico M)', nameRu: 'РџРµС‚СЂРѕРІ (РђС‚Р»РµС‚РёРєРѕ Рњ)' },
        { id: 'sharafulin-arsenal-b', name: 'Sharafullin (Arsenal)', nameRu: 'РЁР°СЂР°С„СѓР»РёРЅ (РђСЂСЃРµРЅР°Р»)' }
      ]
    },
    {
      id: 'esport-fc-united-esports-1',
      sportId: 'esport',
      title: 'E-sport В· Cyberfootball В· FC. United Esports Leagues (2x4 min)',
      titleRu: 'E-sport В· РљРёР±РµСЂС„СѓС‚Р±РѕР» В· FC. United Esports Leagues (2x4 РјРёРЅ)',
      startsAt: '2026-03-17T20:10:00+03:00',
      endsAt: '2026-03-17T22:10:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'borussia-dortmund-makelele', name: 'Borussia Dortmund (Makelele)', nameRu: 'Р‘РѕСЂСѓСЃСЃРёСЏ Р”РѕСЂС‚РјСѓРЅРґ (Makelele)' },
        { id: 'tottenham-isco', name: 'Tottenham (ISCO)', nameRu: 'РўРѕС‚С‚РµРЅС…СЌРј (ISCO)' }
      ]
    }
  ],
  volleyball: [
    {
      id: 'volleyball-russia-superleague-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· Super League',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-17T17:00:00+03:00',
      endsAt: '2026-03-17T19:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'dynamo-ufa', name: 'Dynamo Ural Ufa', nameRu: 'Р”РёРЅР°РјРѕ РЈСЂР°Р» РЈС„Р°' },
        { id: 'belogorie', name: 'Belogorie', nameRu: 'Р‘РµР»РѕРіРѕСЂСЊРµ' }
      ]
    },
    {
      id: 'volleyball-poland-plusliga-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Poland В· PlusLiga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РџРѕР»СЊС€Р° В· РџР»СЋСЃ-Р»РёРіР°',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'cuprum-lubin', name: 'Cuprum Lubin', nameRu: 'РљСѓРїСЂСѓРј Р›СЋР±РёРЅ' },
        { id: 'kedzierzyn-kozle', name: 'Kedzierzyn Kozle', nameRu: 'РљРµРЅРґР·РµР¶РёРЅ РљРѕР·Р»Рµ' }
      ]
    },
    {
      id: 'volleyball-poland-plusliga-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Poland В· PlusLiga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РџРѕР»СЊС€Р° В· РџР»СЋСЃ-Р»РёРіР°',
      startsAt: '2026-03-17T22:00:00+03:00',
      endsAt: '2026-03-18T00:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'trefl-gdansk', name: 'Trefl Gdansk', nameRu: 'РўСЂРµС„Р» Р“РґР°РЅСЊСЃРє' },
        { id: 'politechnika-lublin', name: 'Politechnika Lublin', nameRu: 'РџРѕР»РёС‚РµС…РЅРёРєР° Р›СЋР±Р»РёРЅ' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Italy В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РС‚Р°Р»РёСЏ В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-17T22:30:00+03:00',
      endsAt: '2026-03-18T00:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'modena', name: 'Modena', nameRu: 'РњРѕРґРµРЅР°' },
        { id: 'piacenza', name: 'Piacenza', nameRu: 'РџСЊСЏС‡РµРЅС†Р°' }
      ]
    },
    {
      id: 'volleyball-brazil-superliga-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Brazil В· Superliga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р‘СЂР°Р·РёР»РёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'sao-jose-dos-campos', name: 'Sao Jose dos Campos', nameRu: 'РЎР°РЅ Р–РѕР·Рµ РґСѓСЃ РљР°РјРїСѓСЃ' },
        { id: 'joinville', name: 'Joinville', nameRu: 'Р–РѕРёРЅРІРёР»Р»Рµ' }
      ]
    },
    {
      id: 'volleyball-czech-extraliga-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Czech Republic В· Extraliga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р§РµС…РёСЏ В· Р­РєСЃС‚СЂР°Р»РёРіР°',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'benatky', name: 'Benatky nad Jizerou', nameRu: 'Р‘РµРЅР°С‚РєРё РЅР°Рґ Р™РёР·РµСЂРѕСѓ' },
        { id: 'brno', name: 'Brno', nameRu: 'Р‘СЂРЅРѕ' }
      ]
    },
    {
      id: 'volleyball-czech-extraliga-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Czech Republic В· Extraliga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р§РµС…РёСЏ В· Р­РєСЃС‚СЂР°Р»РёРіР°',
      startsAt: '2026-03-17T21:30:00+03:00',
      endsAt: '2026-03-17T23:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'pribram', name: 'Pribram', nameRu: 'РџСЂРёР±СЂР°Рј' },
        { id: 'ostrava', name: 'Ostrava', nameRu: 'РћСЃС‚СЂР°РІР°' }
      ]
    },
    {
      id: 'volleyball-russia-upvl-live',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· UPVL. Nations League (best of 3 sets)',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· UPVL. Р›РёРіР° РќР°С†РёР№ (РјР°С‚С‡ РёР· 3-С… СЃРµС‚РѕРІ)',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Match finished',
      displayTimeRu: 'РњР°С‚С‡ Р·Р°РІРµСЂС€РµРЅ',
      participants: [
        { id: 'france-pro', name: 'France (Pro)', nameRu: 'Р¤СЂР°РЅС†РёСЏ (Pro)', country: 'France' },
        { id: 'belgium-pro', name: 'Belgium (Pro)', nameRu: 'Р‘РµР»СЊРіРёСЏ (Pro)', country: 'Belgium' }
      ]
    },
    {
      id: 'volleyball-philippines-pvl-live',
      sportId: 'volleyball',
      title: 'Volleyball В· Philippines В· PVL. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р¤РёР»РёРїРїРёРЅС‹ В· PVL. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T18:30:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: '2nd set',
      displayTimeRu: '2-Р№ СЃРµС‚',
      participants: [
        { id: 'farm-fresh-w', name: 'Farm Fresh (W)', nameRu: 'Р¤Р°СЂРј Р¤СЂСЌС€ (Р¶)' },
        { id: 'cool-smashers-w', name: 'Cool Smashers (W)', nameRu: 'РљСѓР» РЎРјСЌС€РµСЂСЃ (Р¶)' }
      ]
    },
    {
      id: 'volleyball-russia-youth-live',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· Youth League. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· РњРѕР»РѕРґРµР¶РЅР°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T18:45:00+03:00',
      endsAt: '2026-03-17T20:45:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: '3rd set',
      displayTimeRu: '3-Р№ СЃРµС‚',
      participants: [
        { id: 'zarechie-odintsovo-2-w', name: 'Zarechie Odintsovo 2 (Youth) (W)', nameRu: 'Р—Р°СЂРµС‡СЊРµ РћРґРёРЅС†РѕРІРѕ 2 (РјРѕР») (Р¶)' },
        { id: 'dinamo-metar-3-w', name: 'Dinamo Metar 3 (Youth) (W)', nameRu: 'Р”РёРЅР°РјРѕ РњРµС‚Р°СЂ 3 (РјРѕР») (Р¶)' }
      ]
    },
    {
      id: 'volleyball-finland-w-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Finland В· Mestaruusliiga. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р¤РёРЅР»СЏРЅРґРёСЏ В· РњРµСЃС‚Р°СЂСѓСѓСЃР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'kangasala-w', name: 'Kangasala (W)', nameRu: 'РљР°РЅРіР°СЃР°Р»Р° (Р¶)' },
        { id: 'vampula-w', name: 'Vampula (W)', nameRu: 'Р’Р°РјРїСѓР»Р° (Р¶)' }
      ]
    },
    {
      id: 'volleyball-finland-w-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Finland В· Mestaruusliiga. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р¤РёРЅР»СЏРЅРґРёСЏ В· РњРµСЃС‚Р°СЂСѓСѓСЃР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'liigalokki-w', name: 'Liigalokki (W)', nameRu: 'Р›РёРіР°Р»Р»РѕРєРё (Р¶)' },
        { id: 'viesti-salo-w', name: 'Viesti Salo (W)', nameRu: 'Р’РёРµСЃС‚Рё РЎР°Р»Рѕ (Р¶)' }
      ]
    },
    {
      id: 'volleyball-finland-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Finland В· Mestaruusliiga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р¤РёРЅР»СЏРЅРґРёСЏ В· РњРµСЃС‚Р°СЂСѓСѓСЃР»РёРіР°',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'hurrikaani', name: 'Hurrikaani', nameRu: 'РҐСѓСЂСЂРёРєР°Р°РЅРё' },
        { id: 'savo', name: 'Savo', nameRu: 'РЎР°РІРѕ' }
      ]
    },
    {
      id: 'volleyball-switzerland-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Switzerland В· NLA',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РЁРІРµР№С†Р°СЂРёСЏ В· NLA',
      startsAt: '2026-03-17T21:30:00+03:00',
      endsAt: '2026-03-17T23:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'volley-nafels', name: 'Volley Nafels', nameRu: 'Р’РѕР»Р»РµР№ РќР°РµС„РµР»СЃ' },
        { id: 'chenois-geneve', name: 'Chenois Geneve', nameRu: 'Р§РµРЅРѕР№СЃ Р–РµРЅРµРІР°' }
      ]
    },
    {
      id: 'volleyball-rwanda-live',
      sportId: 'volleyball',
      title: 'Volleyball В· Rwanda В· National League. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р СѓР°РЅРґР° В· РќР°С†РёРѕРЅР°Р»СЊРЅР°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'РњР°С‚С‡ РёРґРµС‚',
      participants: [
        { id: 'polis-w', name: 'Polis (W)', nameRu: 'РџРѕР»РёСЃ (Р¶)' },
        { id: 'kepler-w', name: 'Kepler (W)', nameRu: 'РљРµРїР»РµСЂ (Р¶)' }
      ]
    },
    {
      id: 'volleyball-sweden-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Sweden В· Elitserien',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РЁРІРµС†РёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'habo', name: 'Habo', nameRu: 'РҐР°Р±Рѕ' },
        { id: 'sodertalje', name: 'Sodertalje', nameRu: 'РЎРµРґРµСЂС‚РµР»СЊРµ' }
      ]
    },
    {
      id: 'volleyball-slovakia-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Slovakia В· Extraliga',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РЎР»РѕРІР°РєРёСЏ В· Р­РєСЃС‚СЂР°Р»РёРіР°',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'spartak-myjava', name: 'Spartak Myjava', nameRu: 'РЎРїР°СЂС‚Р°Рє РњРёСЏРІР°' },
        { id: 'vkp-bratislava', name: 'VKP Bratislava', nameRu: 'Р’РљРџ Р‘СЂР°С‚РёСЃР»Р°РІР°' }
      ]
    },
    {
      id: 'volleyball-china-live',
      sportId: 'volleyball',
      title: 'Volleyball В· China В· CVL. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РљРёС‚Р°Р№ В· CVL. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Break',
      displayTimeRu: 'РџРµСЂРµСЂС‹РІ',
      participants: [
        { id: 'shandong-w', name: 'Shandong (W)', nameRu: 'РЁР°РЅСЊРґСѓРЅ (Р¶)' },
        { id: 'shanghai-w', name: 'Shanghai (W)', nameRu: 'РЁР°РЅС…Р°Р№ (Р¶)' }
      ]
    },
    {
      id: 'volleyball-argentina-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Argentina В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РђСЂРіРµРЅС‚РёРЅР° В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-18T00:30:00+03:00',
      endsAt: '2026-03-18T02:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'tucuman-gimnasia', name: 'Tucuman Gimnasia', nameRu: 'РўСѓРєСѓРјР°РЅ РҐРёРјРЅР°Р·РёСЏ' },
        { id: 'ciudad-buenos-aires', name: 'Ciudad de Buenos Aires', nameRu: 'РЎСЊСЋРґР°Рґ РґРµ Р‘СѓСЌРЅРѕСЃ РђР№СЂРµСЃ' }
      ]
    },
    {
      id: 'volleyball-argentina-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Argentina В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РђСЂРіРµРЅС‚РёРЅР° В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-18T03:30:00+03:00',
      endsAt: '2026-03-18T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'monteros', name: 'Monteros', nameRu: 'РњРѕРЅС‚РµСЂРѕСЃ' },
        { id: 'upln-san-juan', name: 'UPLN San Juan', nameRu: 'РЈРџР›Рќ РЎР°РЅ РҐСѓР°РЅ' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· Super League',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-18T17:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'gazprom-ugra-volley', name: 'Gazprom Ugra', nameRu: 'Р“Р°Р·РїСЂРѕРј Р®РіСЂР°' },
        { id: 'yenisey', name: 'Yenisey', nameRu: 'Р•РЅРёСЃРµР№' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-3',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· Super League',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-18T17:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'fakel-yamal', name: 'Fakel Yamal', nameRu: 'Р¤Р°РєРµР» РЇРјР°Р»' },
        { id: 'nova', name: 'Nova', nameRu: 'РќРѕРІР°' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-4',
      sportId: 'volleyball',
      title: 'Volleyball В· Russia В· Super League',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-18T19:00:00+03:00',
      endsAt: '2026-03-18T21:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'gorkiy', name: 'Gorkiy', nameRu: 'Р“РѕСЂСЊРєРёР№' },
        { id: 'dinamo-lo', name: 'Dinamo-LO', nameRu: 'Р”РёРЅР°РјРѕ-Р›Рћ' }
      ]
    },
    {
      id: 'volleyball-challenge-cup-w',
      sportId: 'volleyball',
      title: 'Volleyball В· International Clubs В· Challenge Cup. Women',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· РљСѓР±РѕРє РІС‹Р·РѕРІР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'panathinaikos-w-volley', name: 'Panathinaikos (W)', nameRu: 'РџР°РЅР°С‚РёРЅР°РёРєРѕСЃ (Р¶)' },
        { id: 'vallefoglia-w', name: 'Vallefoglia (W)', nameRu: 'Р’Р°Р»Р»РµС„РѕР»СЊСЏ (Р¶)' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-2',
      sportId: 'volleyball',
      title: 'Volleyball В· Italy В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РС‚Р°Р»РёСЏ В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'verona', name: 'Verona', nameRu: 'Р’РµСЂРѕРЅР°' },
        { id: 'milan', name: 'Milan', nameRu: 'РњРёР»Р°РЅ' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-3',
      sportId: 'volleyball',
      title: 'Volleyball В· Italy В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РС‚Р°Р»РёСЏ В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'perugia', name: 'Perugia', nameRu: 'РџРµСЂСѓРґР¶Р°' },
        { id: 'vero-monza', name: 'Vero Monza', nameRu: 'Р’РµСЂРѕ РњРѕРЅС†Р°' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-4',
      sportId: 'volleyball',
      title: 'Volleyball В· Italy В· Serie A1',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· РС‚Р°Р»РёСЏ В· РЎРµСЂРёСЏ A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'trentino', name: 'Trentino', nameRu: 'РўСЂРµРЅС‚РёРЅРѕ' },
        { id: 'cucine-lube', name: 'Cucine Lube', nameRu: 'РљСѓС‡РёРЅРµ Р›СѓР±Рµ' }
      ]
    },
    {
      id: 'volleyball-greece-cup-1',
      sportId: 'volleyball',
      title: 'Volleyball В· Greece В· Cup',
      titleRu: 'Р’РѕР»РµР№Р±РѕР» В· Р“СЂРµС†РёСЏ В· РљСѓР±РѕРє',
      startsAt: '2026-03-19T18:00:00+03:00',
      endsAt: '2026-03-19T20:00:00+03:00',
      participants: [
        { id: 'ofi', name: 'OFI', nameRu: 'РћР¤Р' },
        { id: 'panathinaikos', name: 'Panathinaikos', nameRu: 'РџР°РЅР°С‚РёРЅР°РёРєРѕСЃ' }
      ]
    }
  ],
  boxing: [
    {
      id: 'boxing-international-1',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-24T10:00:00+03:00',
      endsAt: '2026-03-24T13:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'mori-k', name: 'Mori K.', nameRu: 'Мори К.' },
        { id: 'okada-m', name: 'Okada M.', nameRu: 'Окада М.' }
      ]
    },
    {
      id: 'boxing-international-2',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-24T10:00:00+03:00',
      endsAt: '2026-03-24T13:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'narai-c', name: 'Narai C.', nameRu: 'Нарай Ц.' },
        { id: 'sunagawa-r', name: 'Sunagawa R.', nameRu: 'Сунагава Р.' }
      ]
    },
    {
      id: 'boxing-international-3',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-24T10:00:00+03:00',
      endsAt: '2026-03-24T13:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'nogami-s', name: 'Nogami S.', nameRu: 'Ногами С.' },
        { id: 'asami-s', name: 'Asami S.', nameRu: 'Асами С.' }
      ]
    },
    {
      id: 'boxing-international-4',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-24T11:00:00+03:00',
      endsAt: '2026-03-24T14:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'ssemudju-j', name: 'Ssemudju J.', nameRu: 'Ссемуджу Д.' },
        { id: 'urashima-m', name: 'Urashima M.', nameRu: 'Урасима М.' }
      ]
    },
    {
      id: 'boxing-international-5',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-25T20:00:00+03:00',
      endsAt: '2026-03-25T23:00:00+03:00',
      participants: [
        { id: 'vykhryst-v', name: 'Vykhryst V.', nameRu: 'Выхрист В.', country: 'Ukraine' },
        { id: 'wach-m', name: 'Wach M.', nameRu: 'Вах М.', country: 'Poland' }
      ]
    },
    {
      id: 'boxing-international-6',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-26T02:00:00+03:00',
      endsAt: '2026-03-26T05:00:00+03:00',
      participants: [
        { id: 'akdeniz-m', name: 'Akdeniz M.', nameRu: 'Акдениз М.', country: 'Canada' },
        { id: 'maclellan-s', name: 'MacLellan S.', nameRu: 'МакЛеллан С.' }
      ]
    },
    {
      id: 'boxing-international-7',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-26T03:00:00+03:00',
      endsAt: '2026-03-26T06:00:00+03:00',
      participants: [
        { id: 'barber-a', name: 'Barber A.', nameRu: 'Баррьер А.', country: 'Canada' },
        { id: 'simmons-r', name: 'Simmons R.', nameRu: 'Симмс Р.', country: 'United States' }
      ]
    },
    {
      id: 'boxing-international-8',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-28T22:30:00+03:00',
      endsAt: '2026-03-29T01:30:00+03:00',
      participants: [
        { id: 'itauma-m', name: 'Itauma M.', nameRu: 'Итаума М.', country: 'United Kingdom' },
        { id: 'franklin-j', name: 'Franklin J.', nameRu: 'Франклин Дж.', country: 'United States' }
      ]
    },
    {
      id: 'boxing-international-9',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-03-29T05:30:00+03:00',
      endsAt: '2026-03-29T08:30:00+03:00',
      participants: [
        { id: 'fundora-s', name: 'Fundora S.', nameRu: 'Фундора С.' },
        { id: 'thurman-k', name: 'Thurman K.', nameRu: 'Турман К.', country: 'United States' }
      ]
    },
    {
      id: 'boxing-international-10',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-04T19:30:00+03:00',
      endsAt: '2026-04-04T22:30:00+03:00',
      participants: [
        { id: 'bentley-d', name: 'Bentley D.', nameRu: 'Бентли Д.', country: 'United Kingdom' },
        { id: 'saavedra-e', name: 'Saavedra E.', nameRu: 'Сааведра Э.', country: 'Venezuela' }
      ]
    },
    {
      id: 'boxing-international-11',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-04T20:30:00+03:00',
      endsAt: '2026-04-04T23:30:00+03:00',
      participants: [
        { id: 'riley-v', name: 'Riley V.', nameRu: 'Райли В.', country: 'United Kingdom' },
        { id: 'masternak-m', name: 'Masternak M.', nameRu: 'Мастернак М.', country: 'Poland' }
      ]
    },
    {
      id: 'boxing-international-12',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-04T23:00:00+03:00',
      endsAt: '2026-04-05T02:00:00+03:00',
      participants: [
        { id: 'wilder-d', name: 'Wilder D.', nameRu: 'Уайлдер Д.' },
        { id: 'chisora-d', name: 'Chisora D.', nameRu: 'Чисора Д.' }
      ]
    },
    {
      id: 'boxing-international-13',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-10T00:30:00+03:00',
      endsAt: '2026-04-10T03:30:00+03:00',
      participants: [
        { id: 'iglesias-o', name: 'Iglesias O.', nameRu: 'Иглесиас О.', country: 'Cuba' },
        { id: 'silyagin-p', name: 'Silyagin P.', nameRu: 'Силягин П.', country: 'Russia' }
      ]
    },
    {
      id: 'boxing-international-14',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-11T08:30:00+03:00',
      endsAt: '2026-04-11T11:30:00+03:00',
      participants: [
        { id: 'takami-k', name: 'Takami K.', nameRu: 'Таками К.', country: 'Japan' },
        { id: 'lardizabal-aa', name: 'Lardizabal A. A.', nameRu: 'Лардисабаль А. А.', country: 'Mexico' }
      ]
    },
    {
      id: 'boxing-international-15',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-11T10:00:00+03:00',
      endsAt: '2026-04-11T13:00:00+03:00',
      participants: [
        { id: 'tsuboi-t', name: 'Tsuboi T.', nameRu: 'Цубой Т.', country: 'Japan' },
        { id: 'guevara-p', name: 'Guevara P.', nameRu: 'Гевара П.', country: 'Mexico' }
      ]
    },
    {
      id: 'boxing-international-16',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-11T20:15:00+03:00',
      endsAt: '2026-04-11T23:15:00+03:00',
      participants: [
        { id: 'benn-k', name: 'Benn K.', nameRu: 'Бенн К.', country: 'United Kingdom' },
        { id: 'prograis-r', name: 'Prograis R.', nameRu: 'Програйс Р.', country: 'United States' }
      ]
    },
    {
      id: 'boxing-international-17',
      sportId: 'boxing',
      title: 'Boxing · International · Fights',
      titleRu: 'Бокс · Международные · Бои',
      startsAt: '2026-04-11T23:00:00+03:00',
      endsAt: '2026-04-12T02:00:00+03:00',
      participants: [
        { id: 'tyson-fury', name: 'Tyson Fury', nameRu: 'Фьюри Тайсон' },
        { id: 'makhmudov-a', name: 'Makhmudov A.', nameRu: 'Махмудов А.', country: 'Russia' }
      ]
    }
  ],
  baseball: [
    {
      id: 'baseball-mlb-preseason-1',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'detroit-tigers', name: 'Detroit Tigers', nameRu: 'Р”РµС‚СЂРѕР№С‚ РўР°Р№РіРµСЂР·' },
        { id: 'baltimore-orioles', name: 'Baltimore Orioles', nameRu: 'Р‘Р°Р»С‚РёРјРѕСЂ РћСЂРёРѕР»СЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-2',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'philadelphia-phillies', name: 'Philadelphia Phillies', nameRu: 'Р¤РёР»Р°РґРµР»СЊС„РёСЏ Р¤РёР»Р»РёСЃ' },
        { id: 'minnesota-twins', name: 'Minnesota Twins', nameRu: 'РњРёРЅРЅРµСЃРѕС‚Р° РўРІРёРЅСЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-3',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'pittsburgh-pirates', name: 'Pittsburgh Pirates', nameRu: 'РџРёС‚С‚СЃР±СѓСЂРі РџР°Р№СЂРµС‚СЃ' },
        { id: 'houston-astros', name: 'Houston Astros', nameRu: 'РҐСЊСЋСЃС‚РѕРЅ РђСЃС‚СЂРѕСЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-4',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'tampa-bay-rays', name: 'Tampa Bay Rays', nameRu: 'РўР°РјРїР° Р‘СЌР№ Р РµР№СЃ' },
        { id: 'new-york-yankees-1', name: 'New York Yankees', nameRu: 'РќСЊСЋ Р™РѕСЂРє РЇРЅРєРёР·' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-5',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'boston-red-sox', name: 'Boston Red Sox', nameRu: 'Р‘РѕСЃС‚РѕРЅ Р СЌРґ РЎРѕРєСЃ' },
        { id: 'atlanta-braves', name: 'Atlanta Braves', nameRu: 'РђС‚Р»Р°РЅС‚Р° Р‘СЂСЌР№РІР·' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-6',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'washington-nationals', name: 'Washington Nationals', nameRu: 'Р’Р°С€РёРЅРіС‚РѕРЅ РќСЌС€РёРѕРЅР°Р»СЃ' },
        { id: 'st-louis-cardinals', name: 'St. Louis Cardinals', nameRu: 'РЎРµРЅС‚ Р›СѓРёСЃ РљР°СЂРґРёРЅР°Р»СЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-7',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T20:10:00+03:00',
      endsAt: '2026-03-17T23:10:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'miami-marlins', name: 'Miami Marlins', nameRu: 'РњР°Р№Р°РјРё РњР°СЂР»РёРЅР·' },
        { id: 'new-york-mets', name: 'New York Mets', nameRu: 'РќСЊСЋ Р™РѕСЂРє РњРµС‚СЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-8',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-17T23:05:00+03:00',
      endsAt: '2026-03-18T02:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'chicago-white-sox', name: 'Chicago White Sox', nameRu: 'Р§РёРєР°РіРѕ РЈР°Р№С‚ РЎРѕРєСЃ' },
        { id: 'oakland-athletics', name: 'Oakland Athletics', nameRu: 'РћРєР»РµРЅРґ РђС‚Р»РµС‚РёРєСЃ' }
      ]
    },
    {
      id: 'baseball-world-classic-1',
      sportId: 'baseball',
      title: 'Baseball В· International В· World Classic',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· РњРёСЂРѕРІР°СЏ РљР»Р°СЃСЃРёРєР°',
      startsAt: '2026-03-18T03:00:00+03:00',
      endsAt: '2026-03-18T06:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'usa-baseball', name: 'USA', nameRu: 'РЎРЁРђ', country: 'United States' },
        { id: 'venezuela-baseball', name: 'Venezuela', nameRu: 'Р’РµРЅРµСЃСѓСЌР»Р°', country: 'Venezuela' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-9',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'chicago-cubs', name: 'Chicago Cubs', nameRu: 'Р§РёРєР°РіРѕ РљР°Р±СЃ' },
        { id: 'los-angeles-angels', name: 'Los Angeles Angels', nameRu: 'Р›РѕСЃ РђРЅРґР¶РµР»РµСЃ Р­Р№РЅРґР¶РµР»Р·' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-10',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'kansas-city-royals', name: 'Kansas City Royals', nameRu: 'РљР°РЅР·Р°СЃ РЎРёС‚Рё Р РѕСЏР»СЃ' },
        { id: 'los-angeles-dodgers', name: 'Los Angeles Dodgers', nameRu: 'Р›РѕСЃ РђРЅРґР¶РµР»РµСЃ Р”РѕРґР¶РµСЂСЃ' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-11',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB. Preseason Games',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB. РџСЂРµРґСЃРµР·РѕРЅРЅС‹Рµ РёРіСЂС‹',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'cincinnati-reds', name: 'Cincinnati Reds', nameRu: 'Р¦РёРЅС†РёРЅРЅР°С‚Рё Р РµРґР·' },
        { id: 'cleveland-guardians', name: 'Cleveland Guardians', nameRu: 'РљР»РёРІР»РµРЅРґ Р“Р°СЂРґРёР°РЅСЃ' }
      ]
    },
    {
      id: 'baseball-mlb-1',
      sportId: 'baseball',
      title: 'Baseball В· USA В· MLB',
      titleRu: 'Р‘РµР№СЃР±РѕР» В· РЎРЁРђ В· MLB',
      startsAt: '2026-03-26T03:05:00+03:00',
      endsAt: '2026-03-26T06:05:00+03:00',
      participants: [
        { id: 'san-francisco-giants', name: 'San Francisco Giants', nameRu: 'РЎР°РЅ Р¤СЂР°РЅС†РёСЃРєРѕ Р”Р¶Р°Р№РµРЅС‚СЃ' },
        { id: 'new-york-yankees-2', name: 'New York Yankees', nameRu: 'РќСЊСЋ Р™РѕСЂРє РЇРЅРєРёР·' }
      ]
    }
  ],
  rugby: [
    {
      id: 'rugby-nrl-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-19T12:00:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'canberra-raiders-1', name: 'Canberra Raiders', nameRu: 'РљР°РЅР±РµСЂСЂР° Р Р°Р№РґРµСЂР·' },
        { id: 'canterbury-bulldogs-1', name: 'Canterbury Bulldogs', nameRu: 'РљР°РЅС‚РµСЂР±Р°СЂРё Р‘СѓР»РґРѕРіСЃ' }
      ]
    },
    {
      id: 'rugby-superleague-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-19T23:00:00+03:00',
      endsAt: '2026-03-20T01:00:00+03:00',
      participants: [
        { id: 'wigan-warriors', name: 'Wigan Warriors', nameRu: 'РЈРёРіР°РЅ РЈРѕСЂСЂРёРѕСЂР·' },
        { id: 'york-knights', name: 'York Knights', nameRu: 'Р™РѕСЂРє РќР°Р№С‚СЃ' }
      ]
    },
    {
      id: 'rugby-super-rugby-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· Super Rugby',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РЎСѓРїРµСЂ Р РµРіР±Рё',
      startsAt: '2026-03-20T09:05:00+03:00',
      endsAt: '2026-03-20T11:05:00+03:00',
      participants: [
        { id: 'highlanders', name: 'Highlanders', nameRu: 'РҐР°Р№Р»РµРЅРґРµСЂСЃ' },
        { id: 'hurricanes', name: 'Hurricanes', nameRu: 'РҐР°СЂСЂРёРєРµР№РЅР·' }
      ]
    },
    {
      id: 'rugby-nrl-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-20T10:00:00+03:00',
      endsAt: '2026-03-20T12:00:00+03:00',
      participants: [
        { id: 'sydney-roosters', name: 'Sydney Roosters', nameRu: 'РЎРёРґРЅРµР№ Р СѓСЃС‚РµСЂСЃ' },
        { id: 'penrith-panthers-1', name: 'Penrith Panthers', nameRu: 'РџРµРЅСЂРёС‚ РџР°РЅС‚РµСЂР·' }
      ]
    },
    {
      id: 'rugby-super-rugby-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· Super Rugby',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РЎСѓРїРµСЂ Р РµРіР±Рё',
      startsAt: '2026-03-20T11:35:00+03:00',
      endsAt: '2026-03-20T13:35:00+03:00',
      participants: [
        { id: 'brumbies', name: 'Brumbies', nameRu: 'Р‘СЂР°РјР±РёР·' },
        { id: 'chiefs', name: 'Chiefs', nameRu: 'Р§РёС„Р·' }
      ]
    },
    {
      id: 'rugby-nrl-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-20T12:00:00+03:00',
      endsAt: '2026-03-20T14:00:00+03:00',
      participants: [
        { id: 'melbourne-storm', name: 'Melbourne Storm', nameRu: 'РњРµР»СЊР±СѓСЂРЅ РЁС‚РѕСЂРј' },
        { id: 'brisbane-broncos-1', name: 'Brisbane Broncos', nameRu: 'Р‘СЂРёСЃР±РµР№РЅ Р‘СЂРѕРЅРєРѕСЃ' }
      ]
    },
    {
      id: 'rugby-urc-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-20T20:00:00+03:00',
      endsAt: '2026-03-20T22:00:00+03:00',
      participants: [
        { id: 'vodacom-blue-bulls', name: 'Vodacom Blue Bulls', nameRu: 'Р’РѕРґР°РєРѕРј Р‘Р»СЋ Р‘СѓР»Р»Р·' },
        { id: 'cardiff', name: 'Cardiff', nameRu: 'РљР°СЂРґРёС„С„' }
      ]
    },
    {
      id: 'rugby-superleague-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T22:00:00+03:00',
      endsAt: '2026-03-21T00:00:00+03:00',
      participants: [
        { id: 'toulouse-olympique-xiii', name: 'Toulouse Olympique XIII', nameRu: 'РўСѓР»СѓР·Р° РћР»РёРјРїРёРє XIII' },
        { id: 'saint-helens', name: 'Saint Helens', nameRu: 'РЎРµР№РЅС‚ Р­Р»РµРЅСЃ' }
      ]
    },
    {
      id: 'rugby-urc-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'ulster', name: 'Ulster', nameRu: 'РђР»СЃС‚РµСЂ' },
        { id: 'connacht', name: 'Connacht', nameRu: 'РљРѕРЅРЅР°С…С‚' }
      ]
    },
    {
      id: 'rugby-premiership-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· England. Premiership',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РђРЅРіР»РёСЏ. РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'bath-rugby', name: 'Bath Rugby', nameRu: 'Р‘Р°С‚ Р РµРіР±Рё' },
        { id: 'saracens', name: 'Saracens', nameRu: 'РЎР°СЂР°РєРµРЅСЃ' }
      ]
    },
    {
      id: 'rugby-urc-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'scarlets', name: 'Scarlets', nameRu: 'РЎРєР°СЂР»РµС‚СЃ' },
        { id: 'zebre', name: 'Zebre', nameRu: 'Р¦РµР±СЂРµ' }
      ]
    },
    {
      id: 'rugby-superleague-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T23:00:00+03:00',
      endsAt: '2026-03-21T01:00:00+03:00',
      participants: [
        { id: 'bradford-bulls', name: 'Bradford Bulls', nameRu: 'Р‘СЂР°РґС„РѕСЂРґ Р‘СѓР»Р»СЃ' },
        { id: 'huddersfield-giants', name: 'Huddersfield Giants', nameRu: 'РҐР°РґРґРµСЂСЃС„РёР»Рґ Р”Р¶Р°Р№РЅС‚СЃ' }
      ]
    },
    {
      id: 'rugby-superleague-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T23:00:00+03:00',
      endsAt: '2026-03-21T01:00:00+03:00',
      participants: [
        { id: 'wakefield-trinity', name: 'Wakefield Trinity', nameRu: 'РЈСЌР№РєС„РёР»Рґ РўСЂРёРЅРёС‚Рё' },
        { id: 'leigh-leopards', name: 'Leigh Leopards', nameRu: 'Р›Рё Р›РµРѕРїР°СЂРґСЃ' }
      ]
    },
    {
      id: 'rugby-super-rugby-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· Super Rugby',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РЎСѓРїРµСЂ Р РµРіР±Рё',
      startsAt: '2026-03-21T06:35:00+03:00',
      endsAt: '2026-03-21T08:35:00+03:00',
      participants: [
        { id: 'fijian-drua', name: 'Fijian Drua', nameRu: 'Р¤РёРґР¶РёР№СЃРєР°СЏ РґСЂСѓР°' },
        { id: 'queensland-reds', name: 'Queensland Reds', nameRu: 'РљРІРёРЅСЃР»РµРЅРґ Р РµРґСЃ' }
      ]
    },
    {
      id: 'rugby-nrl-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-21T07:00:00+03:00',
      endsAt: '2026-03-21T09:00:00+03:00',
      participants: [
        { id: 'newcastle-knights-1', name: 'Newcastle Knights', nameRu: 'РќСЊСЋРєР°СЃР» РќР°Р№С‚СЃ' },
        { id: 'new-zealand-warriors-1', name: 'New Zealand Warriors', nameRu: 'Р’Р°СЂСЂРёРѕСЂР· РќРѕРІР°СЏ Р—РµР»Р°РЅРґРёСЏ' }
      ]
    },
    {
      id: 'rugby-super-rugby-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· Super Rugby',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РЎСѓРїРµСЂ Р РµРіР±Рё',
      startsAt: '2026-03-21T09:05:00+03:00',
      endsAt: '2026-03-21T11:05:00+03:00',
      participants: [
        { id: 'moana-pasifika', name: 'Moana Pasifika', nameRu: 'РњРѕР°РЅР° РџР°СЃРёС„РёРєР°' },
        { id: 'crusaders', name: 'Crusaders', nameRu: 'РљСЂСѓСЃР°РґРµСЂСЃ' }
      ]
    },
    {
      id: 'rugby-nrl-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-21T09:30:00+03:00',
      endsAt: '2026-03-21T11:30:00+03:00',
      participants: [
        { id: 'cronulla-sharks-1', name: 'Cronulla Sutherland Sharks', nameRu: 'РљСЂРѕРЅР°Р»Р»Р° РЎР°Р·РµСЂР»РµРЅРґ РЁР°СЂРєСЃ' },
        { id: 'dolphins-1', name: 'Dolphins', nameRu: 'Р”РѕР»С„РёРЅСЃ' }
      ]
    },
    {
      id: 'rugby-super-rugby-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· Super Rugby',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РЎСѓРїРµСЂ Р РµРіР±Рё',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T13:35:00+03:00',
      participants: [
        { id: 'waratahs', name: 'Waratahs', nameRu: 'Р’Р°СЂР°С‚Р°СЃ' },
        { id: 'blues', name: 'Blues', nameRu: 'Р‘Р»СЋР·' }
      ]
    },
    {
      id: 'rugby-nrl-6',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T13:35:00+03:00',
      participants: [
        { id: 'south-sydney-rabbitohs', name: 'South Sydney Rabbitohs', nameRu: 'Р РµР±Р±РёС‚РѕР· Р®Р¶РЅС‹Р№ РЎРёРґРЅРµР№' },
        { id: 'wests-tigers-1', name: 'Wests Tigers', nameRu: 'Р’РµСЃС‚СЃ РўР°Р№РіРµСЂР·' }
      ]
    },
    {
      id: 'rugby-urc-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-21T15:45:00+03:00',
      endsAt: '2026-03-21T17:45:00+03:00',
      participants: [
        { id: 'lions', name: 'Lions', nameRu: 'Р›Р°Р№РѕРЅР·' },
        { id: 'edinburgh', name: 'Edinburgh', nameRu: 'Р­РґРёРЅР±СѓСЂРі' }
      ]
    },
    {
      id: 'rugby-top14-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T16:30:00+03:00',
      endsAt: '2026-03-21T18:30:00+03:00',
      participants: [
        { id: 'clermont', name: 'Clermont', nameRu: 'РљР»РµСЂРјРѕРЅ' },
        { id: 'montpellier-1', name: 'Montpellier', nameRu: 'РњРѕРЅРїРµР»СЊРµ' }
      ]
    },
    {
      id: 'rugby-urc-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'benetton-treviso', name: 'Benetton Treviso', nameRu: 'Р‘РµРЅРµС‚С‚РѕРЅ РўСЂРµРІРёР·Рѕ' },
        { id: 'ospreys', name: 'Ospreys', nameRu: 'РћСЃРїСЂРµР№Р·' }
      ]
    },
    {
      id: 'rugby-superleague-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'warrington-wolves', name: 'Warrington Wolves', nameRu: 'Р’Р°СЂСЂРёРЅРіС‚РѕРЅ Р’СѓР»С„Р·' },
        { id: 'castleford-tigers', name: 'Castleford Tigers', nameRu: 'РљР°СЃР»С„РѕСЂРґ РўР°Р№РіРµСЂР·' }
      ]
    },
    {
      id: 'rugby-premiership-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· England. Premiership',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РђРЅРіР»РёСЏ. РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'northampton-saints', name: 'Northampton Saints', nameRu: 'РќРѕСЂС‚РіРµРјРїС‚РѕРЅ РЎСЌР№РЅС‚СЃ' },
        { id: 'newcastle-rad-bulls', name: 'Newcastle Rad Bulls', nameRu: 'РќСЊСЋРєР°СЃР» Р Р°Рґ Р‘СѓР»Р»СЃ' }
      ]
    },
    {
      id: 'rugby-premiership-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· England. Premiership',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РђРЅРіР»РёСЏ. РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'harlequins', name: 'Harlequins', nameRu: 'РҐР°СЂР»РµРєРёРЅ' },
        { id: 'gloucester', name: 'Gloucester', nameRu: 'Р“Р»РѕСЃС‚РµСЂ' }
      ]
    },
    {
      id: 'rugby-urc-6',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'sharks', name: 'Sharks', nameRu: 'РЁР°СЂРєСЃ' },
        { id: 'munster', name: 'Munster', nameRu: 'РњР°РЅСЃС‚РµСЂ' }
      ]
    },
    {
      id: 'rugby-premiership-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· England. Premiership',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РђРЅРіР»РёСЏ. РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-21T18:05:00+03:00',
      endsAt: '2026-03-21T20:05:00+03:00',
      participants: [
        { id: 'exeter-chiefs', name: 'Exeter Chiefs', nameRu: 'Р­РєСЃРµС‚РµСЂ Р§РёС„СЃ' },
        { id: 'sale-sharks', name: 'Sale Sharks', nameRu: 'РЎРµР№Р» РЁР°СЂРєСЃ' }
      ]
    },
    {
      id: 'rugby-top14-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'perpignan', name: 'Perpignan', nameRu: 'РџРµСЂРїРёРЅСЊСЏРЅ' },
        { id: 'lyon-ou', name: 'Lyon Olympique Universitaire', nameRu: 'Р›РёРѕРЅ РћР»РёРјРїРёРє РЈРЅРёРІРµСЂСЃРёС‚РµС‚РµСЂ' }
      ]
    },
    {
      id: 'rugby-top14-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'racing-92', name: 'Racing 92', nameRu: 'Р Р°СЃРёРЅРі 92' },
        { id: 'castres-olympique', name: 'Castres Olympique', nameRu: 'РљР°СЃС‚СЂРµСЃ РћР»РёРјРїРёРє' }
      ]
    },
    {
      id: 'rugby-top14-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'toulon', name: 'Toulon', nameRu: 'РўСѓР»РѕРЅ' },
        { id: 'stade-francais', name: 'Stade Francais Paris', nameRu: 'РЎС‚РµР№Рґ Р¤СЂР°РЅСЃРµ РџР°СЂРёР¶' }
      ]
    },
    {
      id: 'rugby-top14-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'us-montalbanais', name: 'US Montalbanais', nameRu: 'РЈРЎ РњРѕРЅС‚Р°Р»СЊР±Р°РЅР°Р№Р·' },
        { id: 'aviron-bayonne', name: 'Aviron Bayonne', nameRu: 'РђРІРёСЂРѕРЅ Р‘Р°Р№РѕРЅРЅРµ' }
      ]
    },
    {
      id: 'rugby-urc-7',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-21T20:30:00+03:00',
      endsAt: '2026-03-21T22:30:00+03:00',
      participants: [
        { id: 'glasgow-warriors', name: 'Glasgow Warriors', nameRu: 'Р“Р»Р°Р·РіРѕ РЈРѕСЂСЂРёРѕСЂР·' },
        { id: 'leinster', name: 'Leinster', nameRu: 'Р›РµРЅСЃС‚РµСЂ' }
      ]
    },
    {
      id: 'rugby-superleague-6',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-21T20:30:00+03:00',
      endsAt: '2026-03-21T22:30:00+03:00',
      participants: [
        { id: 'catalans-dragons', name: 'Catalans Dragons', nameRu: 'РљР°С‚Р°Р»Р°РЅСЃ Р”СЂР°РіРѕРЅСЃ' },
        { id: 'hull-kr', name: 'Hull Kingston Rovers', nameRu: 'РҐР°Р»Р» РљРёРЅРіСЃС‚РѕРЅ Р РѕРІРµСЂСЃ' }
      ]
    },
    {
      id: 'rugby-top14-6',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-21T23:00:00+03:00',
      endsAt: '2026-03-22T01:00:00+03:00',
      participants: [
        { id: 'la-rochelle', name: 'La Rochelle', nameRu: 'Р›Р° Р РѕС€РµР»Р»СЊ' },
        { id: 'section-paloise', name: 'Section Paloise', nameRu: 'РЎРµРєСЃСЊРѕРЅ РџР°Р»СѓР°' }
      ]
    },
    {
      id: 'rugby-nrl-7',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-22T08:05:00+03:00',
      endsAt: '2026-03-22T10:05:00+03:00',
      participants: [
        { id: 'parramatta-eels-1', name: 'Parramatta Eels', nameRu: 'РџР°СЂСЂР°РјР°С‚С‚Р° Р­Р»СЃ' },
        { id: 'st-george-illawarra-1', name: 'St George Illawarra', nameRu: 'РЎРµРЅС‚ Р”Р¶РѕСЂРґР¶ РР»Р»Р°РІР°СЂР°' }
      ]
    },
    {
      id: 'rugby-nrl-8',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-22T10:15:00+03:00',
      endsAt: '2026-03-22T12:15:00+03:00',
      participants: [
        { id: 'north-queensland-cowboys-1', name: 'North Queensland Cowboys', nameRu: 'РќРѕСЂС‚ РљРІРёРЅСЃР»РµРЅРґ РљР°СѓР±РѕР№СЃ' },
        { id: 'gold-coast-titans-1', name: 'Gold Coast Titans', nameRu: 'Р“РѕР»Рґ РљРѕСЃС‚ РўРёС‚Р°РЅСЃ' }
      ]
    },
    {
      id: 'rugby-urc-8',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· United Rugby Championship',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р®РЅР°Р№С‚РµРґ Р§РµРјРїРёРѕРЅС€РёРї',
      startsAt: '2026-03-22T16:00:00+03:00',
      endsAt: '2026-03-22T18:00:00+03:00',
      participants: [
        { id: 'stormers', name: 'Stormers', nameRu: 'РЎС‚РѕСЂРјРµСЂР·' },
        { id: 'dragons', name: 'Dragons', nameRu: 'Р”СЂСЌРіРѕРЅСЃ' }
      ]
    },
    {
      id: 'rugby-premiership-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· England. Premiership',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· РђРЅРіР»РёСЏ. РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'leicester-tigers', name: 'Leicester Tigers', nameRu: 'Р›РµСЃС‚РµСЂ РўР°Р№РіРµСЂР·' },
        { id: 'bristol-bears', name: 'Bristol Bears', nameRu: 'Р‘СЂРёСЃС‚РѕР»СЊ Р‘СЌСЂСЃ' }
      ]
    },
    {
      id: 'rugby-superleague-7',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· England. Super League',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· РђРЅРіР»РёСЏ. РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'hull-fc', name: 'Hull', nameRu: 'РҐР°Р»Р»' },
        { id: 'leeds-rhinos', name: 'Leeds Rhinos', nameRu: 'Р›РёРґСЃ Р РёРЅРѕСЃ' }
      ]
    },
    {
      id: 'rugby-top14-7',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Top 14',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РўРѕРї 14',
      startsAt: '2026-03-22T23:05:00+03:00',
      endsAt: '2026-03-23T01:05:00+03:00',
      participants: [
        { id: 'bordeaux-begles', name: 'Bordeaux Begles', nameRu: 'Р‘РѕСЂРґРѕ Р‘РµРіР»СЊ' },
        { id: 'toulouse', name: 'Toulouse', nameRu: 'РўСѓР»СѓР·Р°' }
      ]
    },
    {
      id: 'rugby-nrl-9',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-26T12:00:00+03:00',
      endsAt: '2026-03-26T14:00:00+03:00',
      participants: [
        { id: 'manly-sea-eagles', name: 'Manly Sea Eagles', nameRu: 'РњСЌРЅР»Рё РЎРё РРіР»Р·' },
        { id: 'sydney-roosters-2', name: 'Sydney Roosters', nameRu: 'РЎРёРґРЅРµР№ Р СѓСЃС‚РµСЂСЃ' }
      ]
    },
    {
      id: 'rugby-pro-d2-1',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-26T23:00:00+03:00',
      endsAt: '2026-03-27T01:00:00+03:00',
      participants: [
        { id: 'provence', name: 'Provence', nameRu: 'РџСЂРѕРІР°РЅСЃ' },
        { id: 'colomiers', name: 'Colomiers', nameRu: 'РљРѕР»РѕРјСЊРµ' }
      ]
    },
    {
      id: 'rugby-nrl-10',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-27T10:00:00+03:00',
      endsAt: '2026-03-27T12:00:00+03:00',
      participants: [
        { id: 'new-zealand-warriors-2', name: 'New Zealand Warriors', nameRu: 'Р’Р°СЂСЂРёРѕСЂР· РќРѕРІР°СЏ Р—РµР»Р°РЅРґРёСЏ' },
        { id: 'wests-tigers-2', name: 'Wests Tigers', nameRu: 'Р’РµСЃС‚СЃ РўР°Р№РіРµСЂР·' }
      ]
    },
    {
      id: 'rugby-nrl-11',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-27T12:00:00+03:00',
      endsAt: '2026-03-27T14:00:00+03:00',
      participants: [
        { id: 'brisbane-broncos-2', name: 'Brisbane Broncos', nameRu: 'Р‘СЂРёСЃР±РµР№РЅ Р‘СЂРѕРЅРєРѕСЃ' },
        { id: 'dolphins-2', name: 'Dolphins', nameRu: 'Р”РѕР»С„РёРЅСЃ' }
      ]
    },
    {
      id: 'rugby-pro-d2-2',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'beziers-herault', name: 'Beziers Herault', nameRu: 'Р‘РµР·СЊРµ Р­СЂРѕ' },
        { id: 'agen', name: 'Agen', nameRu: 'РђРіРµРЅ' }
      ]
    },
    {
      id: 'rugby-pro-d2-3',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'vannes', name: 'Vannes', nameRu: 'Р’Р°РЅРЅ' },
        { id: 'uson-nevers', name: 'USON Nevers', nameRu: 'РЈСЃРѕРЅ РќРµРІРµСЂ' }
      ]
    },
    {
      id: 'rugby-pro-d2-4',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'dax', name: 'Dax', nameRu: 'Р”Р°РєСЃ' },
        { id: 'grenoble', name: 'Grenoble', nameRu: 'Р“СЂРµРЅРѕР±Р»СЊ' }
      ]
    },
    {
      id: 'rugby-pro-d2-5',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'carcassonne', name: 'Carcassonne', nameRu: 'РљР°СЂРєР°СЃСЃРѕРЅ' },
        { id: 'stade-montois', name: 'Stade Montois', nameRu: 'РЎС‚Р°Рґ РњРѕРЅС‚СѓР°' }
      ]
    },
    {
      id: 'rugby-pro-d2-6',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'stade-aurillacois', name: 'Stade Aurillacois', nameRu: 'РЎС‚РµР№Рґ РћСЂРёР№Р°Рє' },
        { id: 'biarritz', name: 'Biarritz', nameRu: 'Р‘РёР°СЂСЂРёС†' }
      ]
    },
    {
      id: 'rugby-pro-d2-7',
      sportId: 'rugby',
      title: 'Rugby В· Rugby Union В· France. Pro D2',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-15 В· Р¤СЂР°РЅС†РёСЏ. РџСЂРѕ Р”2',
      startsAt: '2026-03-27T23:00:00+03:00',
      endsAt: '2026-03-28T01:00:00+03:00',
      participants: [
        { id: 'soyaux-angouleme', name: 'Soyaux Angouleme', nameRu: 'РЎСѓР°Р№Рѕ РђРЅРіСѓР»РµРј' },
        { id: 'brive', name: 'Brive', nameRu: 'Р‘СЂРёРІ' }
      ]
    },
    {
      id: 'rugby-nrl-12',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-28T07:00:00+03:00',
      endsAt: '2026-03-28T09:00:00+03:00',
      participants: [
        { id: 'canterbury-bulldogs-2', name: 'Canterbury Bulldogs', nameRu: 'РљР°РЅС‚РµСЂР±Р°СЂРё Р‘СѓР»РґРѕРіСЃ' },
        { id: 'newcastle-knights-2', name: 'Newcastle Knights', nameRu: 'РќСЊСЋРєР°СЃР» РќР°Р№С‚СЃ' }
      ]
    },
    {
      id: 'rugby-nrl-13',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-28T09:30:00+03:00',
      endsAt: '2026-03-28T11:30:00+03:00',
      participants: [
        { id: 'penrith-panthers-2', name: 'Penrith Panthers', nameRu: 'РџРµРЅСЂРёС‚ РџР°РЅС‚РµСЂР·' },
        { id: 'parramatta-eels-2', name: 'Parramatta Eels', nameRu: 'РџР°СЂСЂР°РјР°С‚С‚Р° Р­Р»СЃ' }
      ]
    },
    {
      id: 'rugby-nrl-14',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-28T11:35:00+03:00',
      endsAt: '2026-03-28T13:35:00+03:00',
      participants: [
        { id: 'north-queensland-cowboys-2', name: 'North Queensland Cowboys', nameRu: 'РќРѕСЂС‚ РљРІРёРЅСЃР»РµРЅРґ РљР°СѓР±РѕР№СЃ' },
        { id: 'melbourne-storm-2', name: 'Melbourne Storm', nameRu: 'РњРµР»СЊР±СѓСЂРЅ РЁС‚РѕСЂРј' }
      ]
    },
    {
      id: 'rugby-nrl-15',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-29T08:05:00+03:00',
      endsAt: '2026-03-29T10:05:00+03:00',
      participants: [
        { id: 'canberra-raiders-2', name: 'Canberra Raiders', nameRu: 'РљР°РЅР±РµСЂСЂР° Р Р°Р№РґРµСЂР·' },
        { id: 'cronulla-sharks-2', name: 'Cronulla Sutherland Sharks', nameRu: 'РљСЂРѕРЅР°Р»Р»Р° РЎР°Р·РµСЂР»РµРЅРґ РЁР°СЂРєСЃ' }
      ]
    },
    {
      id: 'rugby-nrl-16',
      sportId: 'rugby',
      title: 'Rugby В· Rugby League В· NRL',
      titleRu: 'Р РµРіР±Рё В· Р РµРіР±Рё-13 В· NRL',
      startsAt: '2026-03-29T10:15:00+03:00',
      endsAt: '2026-03-29T12:15:00+03:00',
      participants: [
        { id: 'gold-coast-titans-2', name: 'Gold Coast Titans', nameRu: 'Р“РѕР»Рґ РљРѕСЃС‚ РўРёС‚Р°РЅСЃ' },
        { id: 'st-george-illawarra-2', name: 'St George Illawarra', nameRu: 'РЎРµРЅС‚ Р”Р¶РѕСЂРґР¶ РР»Р»Р°РІР°СЂР°' }
      ]
    }
  ],
  formula1: [
    {
      id: 'formula1-japan-gp-winning-team-driver',
      sportId: 'formula1',
      title: 'Formula 1 · Grand Prix · Japan. Race',
      titleRu: 'Формула 1 · Гран-при · Япония. Гонка',
      detailPath: '/sports/formula1/japan-gp-race',
      startsAt: '2026-03-29T08:00:00+03:00',
      endsAt: '2026-03-29T10:00:00+03:00',
      participants: [
        {
          id: 'japan-gp-race-winning-team-driver',
          name: 'Japanese Grand Prix 2026. Race. Which team driver wins',
          nameRu: 'Гран-при Японии 2026. Гонка. Пилот какой команды победит'
        }
      ]
    }
    ],
  'australian-football': [
    {
      id: 'afl-1',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-19T11:30:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'hawthorn-hawks', name: 'Hawthorn Hawks', nameRu: 'РҐРѕС‚РѕСЂРЅ РҐРѕРєСЃ' },
        { id: 'sydney-swans', name: 'Sydney Swans', nameRu: 'РЎРёРґРЅРµР№ РЎСѓРѕРЅСЃ' }
      ]
    },
    {
      id: 'afl-2',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-20T11:40:00+03:00',
      endsAt: '2026-03-20T14:10:00+03:00',
      participants: [
        { id: 'adelaide-crows', name: 'Adelaide Crows', nameRu: 'РђРґРµР»Р°РёРґР° РљСЂРѕСѓСЃ' },
        { id: 'western-bulldogs', name: 'Western Bulldogs', nameRu: 'Р’РµСЃС‚РµСЂРЅ Р‘СѓР»Р»РґРѕРіСЃ' }
      ]
    },
    {
      id: 'afl-3',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-21T05:15:00+03:00',
      endsAt: '2026-03-21T07:45:00+03:00',
      participants: [
        { id: 'richmond-tigers', name: 'Richmond Tigers', nameRu: 'Р РёС‡РјРѕРЅРґ РўР°Р№РіРµСЂСЃ' },
        { id: 'gold-coast-suns', name: 'Gold Coast Suns', nameRu: 'Р“РѕР»Рґ РљРѕСЃС‚ РЎР°РЅСЃ' }
      ]
    },
    {
      id: 'afl-4',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-21T08:15:00+03:00',
      endsAt: '2026-03-21T10:45:00+03:00',
      participants: [
        { id: 'gws-giants', name: 'GWS Giants', nameRu: 'Р“Р’РЎ Р”Р¶Р°Р№РµРЅС‚СЃ' },
        { id: 'st-kilda-saints', name: 'St. Kilda Saints', nameRu: 'РЎС‚. РљРёР»СЊРґР° РЎРµР№РЅС‚СЃ' }
      ]
    },
    {
      id: 'afl-5',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T14:05:00+03:00',
      participants: [
        { id: 'fremantle-dockers', name: 'Fremantle Dockers', nameRu: 'Р¤СЂРёРјР°РЅС‚Р» Р”РѕРєРµСЂСЃ' },
        { id: 'melbourne-demons', name: 'Melbourne Demons', nameRu: 'РњРµР»СЊР±СѓСЂРЅ Р”РµРјРѕРЅСЃ' }
      ]
    },
    {
      id: 'afl-6',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-22T07:15:00+03:00',
      endsAt: '2026-03-22T09:45:00+03:00',
      participants: [
        { id: 'port-adelaide-power', name: 'Port Adelaide Power', nameRu: 'РџРѕСЂС‚ РђРґРµР»Р°РёРґР° РџР°СѓСЌСЂ' },
        { id: 'essendon-bombers', name: 'Essendon Bombers', nameRu: 'Р­СЃСЃРµРЅРґРѕРЅ Р‘РѕРјР±РµСЂСЃ' }
      ]
    },
    {
      id: 'afl-7',
      sportId: 'australian-football',
      title: 'Australian football В· Australia В· AFL',
      titleRu: 'РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ С„СѓС‚Р±РѕР» В· РђРІСЃС‚СЂР°Р»РёСЏ В· AFL',
      startsAt: '2026-03-22T10:10:00+03:00',
      endsAt: '2026-03-22T12:40:00+03:00',
      participants: [
        { id: 'west-coast-eagles', name: 'West Coast Eagles', nameRu: 'Р’РµСЃС‚ РљРѕСЃС‚ РРіР»Р·' },
        { id: 'north-melbourne-kangaroos', name: 'North Melbourne Kangaroos', nameRu: 'РќРѕСЂС‚ РњРµР»СЊР±СѓСЂРЅ РљРµРЅРіСѓСЂСѓР·' }
      ]
    }
  ],
  'water-polo': [
    {
      id: 'water-polo-len-euro-cup-1',
      sportId: 'water-polo',
      title: 'Water polo В· International Clubs В· LEN Euro Cup',
      titleRu: 'Р’РѕРґРЅРѕРµ РїРѕР»Рѕ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'bvsc-zuglo', name: 'BVSC Zuglo', nameRu: 'Р‘Р‘РЎРљ Р—СѓРіР»Рѕ' },
        { id: 'orad', name: 'Orad', nameRu: 'РћСЂР°Рґ' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-2',
      sportId: 'water-polo',
      title: 'Water polo В· International Clubs В· LEN Euro Cup',
      titleRu: 'Р’РѕРґРЅРѕРµ РїРѕР»Рѕ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'primorac-kotor', name: 'VK Primorac Kotor', nameRu: 'Р’Рљ РџСЂРёРјРѕСЂР°С† РљРѕС‚РѕСЂ' },
        { id: 'radnicki-kragujevac', name: 'Radnicki Kragujevac', nameRu: 'Р Р°РґРЅРёС‡РєРё РљСЂР°РіСѓРµРІР°С†' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-3',
      sportId: 'water-polo',
      title: 'Water polo В· International Clubs В· LEN Euro Cup',
      titleRu: 'Р’РѕРґРЅРѕРµ РїРѕР»Рѕ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'marseille', name: 'Marseille', nameRu: 'РњР°СЂСЃРµР»СЊ' },
        { id: 'sabadell', name: 'Sabadell', nameRu: 'РЎР°Р±Р°РґРµР»СЊ' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-4',
      sportId: 'water-polo',
      title: 'Water polo В· International Clubs В· LEN Euro Cup',
      titleRu: 'Р’РѕРґРЅРѕРµ РїРѕР»Рѕ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· LEN Euro Cup',
      startsAt: '2026-03-19T20:00:00+03:00',
      endsAt: '2026-03-19T22:00:00+03:00',
      participants: [
        { id: 'panathinaikos', name: 'Panathinaikos', nameRu: 'РџР°РЅР°С‚РёРЅР°РёРєРѕСЃ' },
        { id: 'jadran-split', name: 'Jadran Split', nameRu: 'РЇРґСЂР°РЅ РЎРїР»РёС‚' }
      ]
    }
  ],
  handball: [
    {
      id: 'handball-hungary-1',
      sportId: 'handball',
      title: 'Handball В· Hungary В· NB I. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р’РµРЅРіСЂРёСЏ В· NB I. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'dvsc-w', name: 'DVSC (W)', nameRu: 'Р”Р’РЎРљ (Р¶)' },
        { id: 'moyra-budaors-w', name: 'Moyra Budaors (W)', nameRu: 'РњРѕР№СЂР° Р‘СѓРґР°РѕСЂС€ (Р¶)' }
      ]
    },
    {
      id: 'handball-sweden-1',
      sportId: 'handball',
      title: 'Handball В· Sweden В· Allsvenskan',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РЁРІРµС†РёСЏ В· РђР»Р»СЃРІРµРЅСЃРєР°РЅ',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'tyreso', name: 'Tyreso', nameRu: 'РўСЋСЂРµСЃС‘' },
        { id: 'aranas', name: 'Aranas', nameRu: 'РђСЂР°РЅР°СЃ' }
      ]
    },
    {
      id: 'handball-norway-1',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'baerum-w', name: 'Baerum (W)', nameRu: 'Р‘РµСЂСѓРј (Р¶)' },
        { id: 'fana-w', name: 'Fana (W)', nameRu: 'Р¤Р°РЅР° (Р¶)' }
      ]
    },
    {
      id: 'handball-norway-2',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'byasen-w', name: 'Byasen (W)', nameRu: 'Р‘СЊСЏСЃРµРЅ (Р¶)' },
        { id: 'fredrikstad-w', name: 'Fredrikstad (W)', nameRu: 'Р¤СЂРµРґСЂРёРєСЃС‚Р°Рґ (Р¶)' }
      ]
    },
    {
      id: 'handball-norway-3',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'larvik-w', name: 'Larvik (W)', nameRu: 'Р›Р°СЂРІРёРє (Р¶)' },
        { id: 'oppsal-w', name: 'Oppsal (W)', nameRu: 'РћРїСЃР°Р»СЊ (Р¶)' }
      ]
    },
    {
      id: 'handball-norway-4',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'molde-w', name: 'Molde (W)', nameRu: 'РњРµР»СЊРґРµ (Р¶)' },
        { id: 'fjellhammer-w', name: 'Fjellhammer (W)', nameRu: 'Р¤СЊРµР»С…Р°РјРјРµСЂ (Р¶)' }
      ]
    },
    {
      id: 'handball-norway-5',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'tertnes-w', name: 'Tertnes (W)', nameRu: 'РўРµСЂС‚РЅРµСЃ (Р¶)' },
        { id: 'relingen-w', name: 'Relingen (W)', nameRu: 'Р РµР»РёРЅРіРµРЅ (Р¶)' }
      ]
    },
    {
      id: 'handball-norway-6',
      sportId: 'handball',
      title: 'Handball В· Norway В· Eliteserien. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РќРѕСЂРІРµРіРёСЏ В· Р­Р»РёС‚СЃРµСЂРёСЏ. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T20:15:00+03:00',
      endsAt: '2026-03-18T22:15:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'storhamar-w', name: 'Storhamar (W)', nameRu: 'РЎС‚РѕСЂС…Р°РјР°СЂ (Р¶)' },
        { id: 'sola-w', name: 'Sola (W)', nameRu: 'РЎРѕР»Р° (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-1',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'bjerringbro-w', name: 'Bjerringbro (W)', nameRu: 'Р‘СЊРµСЂСЂРёРЅРіР±СЂРѕ (Р¶)' },
        { id: 'esbjerg-domestic-w', name: 'Esbjerg (W)', nameRu: 'Р­СЃР±СЊРµСЂРі (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-2',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'viborg-w', name: 'Viborg (W)', nameRu: 'Р’РёР±РѕСЂРі (Р¶)' },
        { id: 'hoj-elite-w', name: 'Hoj Elite (W)', nameRu: 'РҐРѕР№ Р­Р»РёС‚ (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-3',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'nykobing-w', name: 'Nykobing (W)', nameRu: 'РќСЋРєРµР±РёРЅРі (Р¶)' },
        { id: 'skanderborg-domestic-w', name: 'Skanderborg (W)', nameRu: 'РЎРєР°РЅРґРµСЂР±РѕСЂРі (Р¶)' }
      ]
    },
    {
      id: 'handball-sweden-2',
      sportId: 'handball',
      title: 'Handball В· Sweden В· Allsvenskan',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РЁРІРµС†РёСЏ В· РђР»Р»СЃРІРµРЅСЃРєР°РЅ',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'skanela-if', name: 'Skanela IF', nameRu: 'РЎРєР°РЅРµР»Р° РР¤' },
        { id: 'sk-tumba', name: 'SK Tumba', nameRu: 'РЎРљ РўСѓРјР±Р°' }
      ]
    },
    {
      id: 'handball-germany-1',
      sportId: 'handball',
      title: 'Handball В· Germany В· Bundesliga. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р“РµСЂРјР°РЅРёСЏ В· Р‘СѓРЅРґРµСЃР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'frisch-auf-goppingen-w', name: 'Frisch Auf Goppingen (W)', nameRu: 'Р¤СЂРёС€ Р“С‘РїРїРёРЅРіРµРЅ (Р¶)' },
        { id: 'borussia-dortmund-domestic-w', name: 'Borussia Dortmund (W)', nameRu: 'Р‘РѕСЂСѓСЃСЃРёСЏ Р”РѕСЂС‚РјСѓРЅРґ (Р¶)' }
      ]
    },
    {
      id: 'handball-germany-2',
      sportId: 'handball',
      title: 'Handball В· Germany В· Bundesliga. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р“РµСЂРјР°РЅРёСЏ В· Р‘СѓРЅРґРµСЃР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'union-halle-neustadt-w', name: 'Union Halle-Neustadt (W)', nameRu: 'Р®РЅРёРѕРЅ Р“Р°Р»Р»Рµ РќСЊРѕС€С‚Р°РґС‚ (Р¶)' },
        { id: 'bensheim-auerbach-w', name: 'Bensheim Auerbach (W)', nameRu: 'Р‘РµРЅС€Р°Р№Рј РђСѓСЂР±Р°С… (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-4',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T22:00:00+03:00',
      endsAt: '2026-03-19T00:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'horsens-w', name: 'Horsens (W)', nameRu: 'РҐРѕСЂСЃРµРЅСЃ (Р¶)' },
        { id: 'copenhagen-w', name: 'Copenhagen (W)', nameRu: 'РљРѕРїРµРЅРіР°РіРµРЅ (Р¶)' }
      ]
    },
    {
      id: 'handball-poland-1',
      sportId: 'handball',
      title: 'Handball В· Poland В· Superliga. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РџРѕР»СЊС€Р° В· РЎСѓРїРµСЂР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Р—Р°РІС‚СЂР° РІ',
      participants: [
        { id: 'zaglebie-lubin-w', name: 'Zaglebie Lubin (W)', nameRu: 'Р—Р°РіР»РµРјР±Рµ Р›СЋР±РёРЅ (Р¶)' },
        { id: 'mks-piotrcovia-w', name: 'MKS Piotrcovia (W)', nameRu: 'РњРљРЎ РџРµС‚СЂРѕРєРѕРІРёСЏ (Р¶)' }
      ]
    },
    {
      id: 'handball-korea-1',
      sportId: 'handball',
      title: 'Handball В· South Korea В· National League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р®Р¶РЅР°СЏ РљРѕСЂРµСЏ В· РќР°С†РёРѕРЅР°Р»СЊРЅР°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-19T12:00:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'busan-w', name: 'Busan (W)', nameRu: 'РџСѓСЃР°РЅ (Р¶)' },
        { id: 'gyeongnam-w', name: 'Gyeongnam (W)', nameRu: 'РљС‘РЅРЅР°Рј (Р¶)' }
      ]
    },
    {
      id: 'handball-korea-2',
      sportId: 'handball',
      title: 'Handball В· South Korea В· National League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р®Р¶РЅР°СЏ РљРѕСЂРµСЏ В· РќР°С†РёРѕРЅР°Р»СЊРЅР°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-19T14:00:00+03:00',
      endsAt: '2026-03-19T16:00:00+03:00',
      participants: [
        { id: 'incheon-w', name: 'Incheon (W)', nameRu: 'РРЅС‡С…РѕРЅ (Р¶)' },
        { id: 'seoul-w', name: 'Seoul (W)', nameRu: 'РЎРµСѓР» (Р¶)' }
      ]
    },
    {
      id: 'handball-poland-2',
      sportId: 'handball',
      title: 'Handball В· Poland В· Superliga. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РџРѕР»СЊС€Р° В· РЎСѓРїРµСЂР»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-19T20:00:00+03:00',
      endsAt: '2026-03-19T22:00:00+03:00',
      participants: [
        { id: 'energa-koszalin-w', name: 'Energa Koszalin (W)', nameRu: 'Р­РЅРµСЂРіР° РљРѕС€Р°Р»РёРЅ (Р¶)' },
        { id: 'gmina-kobierzyce-w', name: 'Gmina Kobierzyce (W)', nameRu: 'Р“РјРёРЅР° РљРѕР±РµР¶РёС†Рµ (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-5',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-19T21:00:00+03:00',
      endsAt: '2026-03-19T23:00:00+03:00',
      participants: [
        { id: 'sonderjyske-w', name: 'Sonderjyske (W)', nameRu: 'РЎРµРЅРґРµСЂСЋСЃРєРµ (Р¶)' },
        { id: 'herning-ikast-domestic-w', name: 'Herning Ikast (W)', nameRu: 'РҐРµСЂРЅРёРЅРі РРєР°СЃС‚ (Р¶)' }
      ]
    },
    {
      id: 'handball-denmark-6',
      sportId: 'handball',
      title: 'Handball В· Denmark В· Top League. Women',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· Р”Р°РЅРёСЏ В· Р’С‹СЃС€Р°СЏ Р»РёРіР°. Р–РµРЅС‰РёРЅС‹',
      startsAt: '2026-03-20T20:30:00+03:00',
      endsAt: '2026-03-20T22:30:00+03:00',
      participants: [
        { id: 'silkeborg-voel-w', name: 'Silkeborg-Voel (W)', nameRu: 'РЎРёР»СЊРєРµР±РѕСЂРі Р’РѕСЌР»СЊ (Р¶)' },
        { id: 'eh-aalborg-w', name: 'EH Aalborg (W)', nameRu: 'EH РћР»СЊР±РѕСЂРі (Р¶)' }
      ]
    },
    {
      id: 'handball-cl-1',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· Champions League 2025/2026',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° С‡РµРјРїРёРѕРЅРѕРІ 2025/2026',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'podravka-vegeta-w', name: 'Podravka Vegeta (W)', nameRu: 'РџРѕРґСЂР°РІРєР° Р’РµРіРµС‚Р° (Р¶)' },
        { id: 'esbjerg-cl-w', name: 'Esbjerg (W)', nameRu: 'Р­СЃР±СЊРµСЂРі (Р¶)' }
      ]
    },
    {
      id: 'handball-cl-2',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· Champions League 2025/2026',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° С‡РµРјРїРёРѕРЅРѕРІ 2025/2026',
      startsAt: '2026-03-21T20:00:00+03:00',
      endsAt: '2026-03-21T22:00:00+03:00',
      participants: [
        { id: 'dvsc-cl-w', name: 'DVSC (W)', nameRu: 'Р”Р’РЎРљ (Р¶)' },
        { id: 'odense-w', name: 'Odense (W)', nameRu: 'Р”РҐР“ РћРґРµРЅСЃРµ (Р¶)' }
      ]
    },
    {
      id: 'handball-cl-3',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· Champions League 2025/2026',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° С‡РµРјРїРёРѕРЅРѕРІ 2025/2026',
      startsAt: '2026-03-22T16:00:00+03:00',
      endsAt: '2026-03-22T18:00:00+03:00',
      participants: [
        { id: 'borussia-dortmund-cl-w', name: 'Borussia Dortmund (W)', nameRu: 'Р‘РѕСЂСѓСЃСЃРёСЏ Р”РѕСЂС‚РјСѓРЅРґ (Р¶)' },
        { id: 'ferencvaros-w', name: 'Ferencvaros (W)', nameRu: 'Р¤РµСЂРµРЅС†РІР°СЂРѕС€ (Р¶)' }
      ]
    },
    {
      id: 'handball-cl-4',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· Champions League 2025/2026',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° С‡РµРјРїРёРѕРЅРѕРІ 2025/2026',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'herning-ikast-cl-w', name: 'Herning Ikast (W)', nameRu: 'РҐРµСЂРЅРёРЅРі РРєР°СЃС‚ (Р¶)' },
        { id: 'gloria-bistrita-w', name: 'Gloria Bistrita Nasaud (W)', nameRu: 'Р“Р»РѕСЂРёСЏ Р‘РёСЃС‚СЂРёС†Р° РќСЌСЃСЌСѓРґ (Р¶)' }
      ]
    },
    {
      id: 'handball-ehf-europe-1',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· EHF European League',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° Р•РІСЂРѕРїС‹ Р•Р“Р¤',
      startsAt: '2026-03-31T19:45:00+03:00',
      endsAt: '2026-03-31T21:15:00+03:00',
      participants: [
        { id: 'kristianstad', name: 'Kristianstad', nameRu: 'РљСЂРёСЃС‚РёР°РЅСЃС‚Р°Рґ' },
        { id: 'nasic-nexe', name: 'Nasic Nexe', nameRu: 'РќР°СЃРёС‡ РќРµРєСЃ' }
      ]
    },
    {
      id: 'handball-ehf-europe-2',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· EHF European League',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° Р•РІСЂРѕРїС‹ Р•Р“Р¤',
      startsAt: '2026-03-31T19:45:00+03:00',
      endsAt: '2026-03-31T21:15:00+03:00',
      participants: [
        { id: 'skanderborg-ehf', name: 'Skanderborg', nameRu: 'РЎРєР°РЅРґРµСЂР±РѕСЂРі' },
        { id: 'flensburg-handewitt', name: 'Flensburg-Handewitt', nameRu: 'Р¤Р»РµРЅСЃР±СѓСЂРі РҐР°РЅРґСЌРІРёРёС‚' }
      ]
    },
    {
      id: 'handball-ehf-europe-3',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· EHF European League',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° Р•РІСЂРѕРїС‹ Р•Р“Р¤',
      startsAt: '2026-03-31T21:45:00+03:00',
      endsAt: '2026-03-31T23:15:00+03:00',
      participants: [
        { id: 'montpellier', name: 'Montpellier', nameRu: 'РњРѕРЅРїРµР»СЊРµ' },
        { id: 'elverum', name: 'Elverum', nameRu: 'Р­Р»СЊРІРµСЂСѓРј' }
      ]
    },
    {
      id: 'handball-ehf-europe-4',
      sportId: 'handball',
      title: 'Handball В· International Clubs В· EHF European League',
      titleRu: 'Р“Р°РЅРґР±РѕР» В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ. РљР»СѓР±С‹ В· Р›РёРіР° Р•РІСЂРѕРїС‹ Р•Р“Р¤',
      startsAt: '2026-03-31T21:45:00+03:00',
      endsAt: '2026-03-31T23:15:00+03:00',
      participants: [
        { id: 'fredericia-1990', name: 'Fredericia 1990', nameRu: 'Р¤СЂРµРґРµСЂРёСЃРёСЏ 1990' },
        { id: 'melsungen', name: 'Melsungen', nameRu: 'РњРµР»СЊР·СѓРЅРіРµРЅ' }
      ]
    }
  ],
  darts: [
    {
      id: 'darts-modus-1',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T12:00:00+03:00',
      endsAt: '2026-03-17T13:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Р’ РёРіСЂРµ',
      participants: [
        { id: 'cottiss-k', name: 'Cottiss K.', nameRu: 'РљРѕС‚С‚РёСЃСЃ Рљ.', country: 'England' },
        { id: 'walker-j', name: 'Walker J.', nameRu: 'РЈРѕР»РєРµСЂ Р”Р¶.', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-2',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T15:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'spee-a-1', name: 'Spee A.', nameRu: 'РЁРїРµРµ Рђ.', country: 'Netherlands' },
        { id: 'hunt-joe-1', name: 'Hunt, Joe', nameRu: 'Hunt, Joe', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-3',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T14:45:00+03:00',
      endsAt: '2026-03-17T15:15:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'drayton-jack-1', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' },
        { id: 'hunt-a-1', name: 'Hunt A.', nameRu: 'РҐР°РЅС‚ Рђ.', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-4',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T15:05:00+03:00',
      endsAt: '2026-03-17T15:35:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'spee-a-2', name: 'Spee A.', nameRu: 'РЁРїРµРµ Рђ.', country: 'Netherlands' },
        { id: 'cottiss-kevin-1', name: 'Cottiss, Kevin', nameRu: 'Cottiss, Kevin', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-5',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T15:20:00+03:00',
      endsAt: '2026-03-17T15:50:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'walker-j-2', name: 'Walker J.', nameRu: 'РЈРѕР»РєРµСЂ Р”Р¶.', country: 'England' },
        { id: 'drayton-jack-2', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-6',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T15:55:00+03:00',
      endsAt: '2026-03-17T16:25:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'drayton-jack-3', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' },
        { id: 'spee-a-3', name: 'Spee A.', nameRu: 'РЁРїРµРµ Рђ.', country: 'Netherlands' }
      ]
    },
    {
      id: 'darts-modus-7',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T16:15:00+03:00',
      endsAt: '2026-03-17T16:45:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'cottiss-kevin-2', name: 'Cottiss, Kevin', nameRu: 'Cottiss, Kevin', country: 'England' },
        { id: 'hunt-joe-2', name: 'Hunt, Joe', nameRu: 'Hunt, Joe', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-8',
      sportId: 'darts',
      title: 'Darts В· International В· Modus Super Series',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· Modus Super Series',
      startsAt: '2026-03-17T16:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'РЎРµРіРѕРґРЅСЏ РІ',
      participants: [
        { id: 'hunt-a-2', name: 'Hunt A.', nameRu: 'РҐР°РЅС‚ Рђ.', country: 'England' },
        { id: 'walker-j-3', name: 'Walker J.', nameRu: 'РЈРѕР»РєРµСЂ Р”Р¶.', country: 'England' }
      ]
    },
    {
      id: 'darts-premier-league-1',
      sportId: 'darts',
      title: 'Darts В· International В· Premier League',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-19T22:15:00+03:00',
      endsAt: '2026-03-19T22:45:00+03:00',
      participants: [
        { id: 'van-vin', name: 'Van Vin J.', nameRu: 'Р’Р°РЅ Р’РёРЅ Р”Р¶.', country: 'Netherlands' },
        { id: 'van-gerven', name: 'Van Gerven M.', nameRu: 'Р’Р°РЅ Р“РµСЂРІРµРЅ Рњ.', country: 'Netherlands' }
      ]
    },
    {
      id: 'darts-premier-league-2',
      sportId: 'darts',
      title: 'Darts В· International В· Premier League',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-19T22:45:00+03:00',
      endsAt: '2026-03-19T23:15:00+03:00',
      participants: [
        { id: 'bunting', name: 'Bunting S.', nameRu: 'Р‘Р°РЅС‚РёРЅРі РЎ.', country: 'England' },
        { id: 'littler', name: 'Littler L.', nameRu: 'Р›РёС‚С‚Р»РµСЂ Р›.', country: 'England' }
      ]
    },
    {
      id: 'darts-premier-league-3',
      sportId: 'darts',
      title: 'Darts В· International В· Premier League',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-19T23:15:00+03:00',
      endsAt: '2026-03-19T23:45:00+03:00',
      participants: [
        { id: 'rock', name: 'Rock J.', nameRu: 'Р РѕРє Р”Р¶.', country: 'United Kingdom' },
        { id: 'price', name: 'Price G.', nameRu: 'РџСЂР°Р№СЃ Р“.', country: 'Wales' }
      ]
    },
    {
      id: 'darts-premier-league-4',
      sportId: 'darts',
      title: 'Darts В· International В· Premier League',
      titleRu: 'Р”Р°СЂС‚СЃ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-19T23:45:00+03:00',
      endsAt: '2026-03-20T00:15:00+03:00',
      participants: [
        { id: 'clayton', name: 'Clayton J.', nameRu: 'РљР»РµР№С‚РѕРЅ Р”Р¶.', country: 'Wales' },
        { id: 'humphries', name: 'Humphries L.', nameRu: 'РҐР°РјС„СЂРёСЃ Р›.', country: 'England' }
      ]
    }
  ],
  cricket: [
    {
      id: 'cricket-ipl-1',
      sportId: 'cricket',
      title: 'Cricket В· India В· Premier League',
      titleRu: 'РљСЂРёРєРµС‚ В· РРЅРґРёСЏ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-28T17:00:00+03:00',
      endsAt: '2026-03-28T21:00:00+03:00',
      participants: [
        { id: 'rcb', name: 'Royal Challengers Bangalore', nameRu: 'Р РѕСЏР» Р§РµР»Р»РµРЅРґР¶РµСЂСЃ Р‘Р°РЅРіР°Р»РѕСЂ' },
        { id: 'srh', name: 'Sunrisers Hyderabad', nameRu: 'РЎР°РЅСЂР°Р№Р·РµСЂСЃ РҐР°Р№РґР°СЂР°Р±Р°Рґ' }
      ]
    },
    {
      id: 'cricket-ipl-2',
      sportId: 'cricket',
      title: 'Cricket В· India В· Premier League',
      titleRu: 'РљСЂРёРєРµС‚ В· РРЅРґРёСЏ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-29T17:00:00+03:00',
      endsAt: '2026-03-29T21:00:00+03:00',
      participants: [
        { id: 'mi', name: 'Mumbai Indians', nameRu: 'РњСѓРјР±Р°Рё РРЅРґРёР°РЅСЃ' },
        { id: 'kkr', name: 'Kolkata Knight Riders', nameRu: 'РљРѕР»РєР°С‚Р° РќР°Р№С‚ Р Р°Р№РґРµСЂР·' }
      ]
    },
    {
      id: 'cricket-ipl-3',
      sportId: 'cricket',
      title: 'Cricket В· India В· Premier League',
      titleRu: 'РљСЂРёРєРµС‚ В· РРЅРґРёСЏ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-30T17:00:00+03:00',
      endsAt: '2026-03-30T21:00:00+03:00',
      participants: [
        { id: 'rr', name: 'Rajasthan Royals', nameRu: 'Р Р°РґР¶Р°СЃС‚Р°РЅ Р РѕСЏР»СЃ' },
        { id: 'csk', name: 'Chennai Super Kings', nameRu: 'Р§РµРЅРЅР°Рё РЎСѓРїРµСЂ РљРёРЅРіР·' }
      ]
    },
    {
      id: 'cricket-ipl-4',
      sportId: 'cricket',
      title: 'Cricket В· India В· Premier League',
      titleRu: 'РљСЂРёРєРµС‚ В· РРЅРґРёСЏ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-03-31T17:00:00+03:00',
      endsAt: '2026-03-31T21:00:00+03:00',
      participants: [
        { id: 'pbks', name: 'Punjab Kings', nameRu: 'РџРµРЅРґР¶Р°Р± РљРёРЅРіР·' },
        { id: 'gt', name: 'Gujarat Titans', nameRu: 'Р“СѓРґР¶Р°СЂР°С‚ РўРёС‚Р°РЅСЃ' }
      ]
    },
    {
      id: 'cricket-ipl-5',
      sportId: 'cricket',
      title: 'Cricket В· India В· Premier League',
      titleRu: 'РљСЂРёРєРµС‚ В· РРЅРґРёСЏ В· РџСЂРµРјСЊРµСЂ-Р›РёРіР°',
      startsAt: '2026-04-01T17:00:00+03:00',
      endsAt: '2026-04-01T21:00:00+03:00',
      participants: [
        { id: 'lsg', name: 'Lucknow Super Giants', nameRu: 'Р›Р°РєС…РЅР°Сѓ РЎСѓРїРµСЂ Р”Р¶Р°Р№Р°РЅС‚СЃ' },
        { id: 'dc', name: 'Delhi Capitals', nameRu: 'Р”РµР»Рё РљСЌРїРёС‚Р°Р»СЃ' }
      ]
    }
  ],
  curling: [
    {
      id: 'curling-worlds-women-1',
      sportId: 'curling',
      title: 'Curling В· National teams В· World Championship 2026. Women. Canada',
      titleRu: 'РљС‘СЂР»РёРЅРі В· РЎР±РѕСЂРЅС‹Рµ В· Р§Рњ-2026. Р–РµРЅС‰РёРЅС‹. РљР°РЅР°РґР°',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'japan-women', name: 'Japan (W)', nameRu: 'РЇРїРѕРЅРёСЏ (Р¶)', country: 'Japan' },
        { id: 'australia-women', name: 'Australia (W)', nameRu: 'РђРІСЃС‚СЂР°Р»РёСЏ (Р¶)', country: 'Australia' }
      ]
    },
    {
      id: 'curling-worlds-women-2',
      sportId: 'curling',
      title: 'Curling В· National teams В· World Championship 2026. Women. Canada',
      titleRu: 'РљС‘СЂР»РёРЅРі В· РЎР±РѕСЂРЅС‹Рµ В· Р§Рњ-2026. Р–РµРЅС‰РёРЅС‹. РљР°РЅР°РґР°',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'italy-women', name: 'Italy (W)', nameRu: 'РС‚Р°Р»РёСЏ (Р¶)', country: 'Italy' },
        { id: 'canada-women', name: 'Canada (W)', nameRu: 'РљР°РЅР°РґР° (Р¶)', country: 'Canada' }
      ]
    },
    {
      id: 'curling-worlds-women-3',
      sportId: 'curling',
      title: 'Curling В· National teams В· World Championship 2026. Women. Canada',
      titleRu: 'РљС‘СЂР»РёРЅРі В· РЎР±РѕСЂРЅС‹Рµ В· Р§Рњ-2026. Р–РµРЅС‰РёРЅС‹. РљР°РЅР°РґР°',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'sweden-women', name: 'Sweden (W)', nameRu: 'РЁРІРµС†РёСЏ (Р¶)', country: 'Sweden' },
        { id: 'scotland-women', name: 'Scotland (W)', nameRu: 'РЁРѕС‚Р»Р°РЅРґРёСЏ (Р¶)', country: 'Scotland' }
      ]
    }
  ],
  snooker: [
    {
      id: 'snooker-world-open-1',
      sportId: 'snooker',
      title: 'Snooker В· International В· World Open. Yushan',
      titleRu: 'РЎРЅСѓРєРµСЂ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· World Open. Р®С€Р°РЅСЊ',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'yao-pengcheng', name: 'Yao Pengcheng', nameRu: 'РџСЌРЅСЉС‡СЌРЅ РЇРѕ', country: 'China' },
        { id: 'craigie', name: 'Craigie S.', nameRu: 'РљСЂРµР№РіРё РЎ.', country: 'England' }
      ]
    },
    {
      id: 'snooker-world-open-2',
      sportId: 'snooker',
      title: 'Snooker В· International В· World Open. Yushan',
      titleRu: 'РЎРЅСѓРєРµСЂ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· World Open. Р®С€Р°РЅСЊ',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'walden', name: 'Walden R.', nameRu: 'РЈРѕР»РґРµРЅ Р .', country: 'England' },
        { id: 'williams', name: 'Williams M.', nameRu: 'РЈРёР»СЊСЏРјСЃ Рњ.', country: 'Wales' }
      ]
    },
    {
      id: 'snooker-world-open-3',
      sportId: 'snooker',
      title: 'Snooker В· International В· World Open. Yushan',
      titleRu: 'РЎРЅСѓРєРµСЂ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· World Open. Р®С€Р°РЅСЊ',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'hill', name: 'Hill A.', nameRu: 'РҐРёР»Р» Рђ.', country: 'Ireland' },
        { id: 'wilson', name: 'Wilson G.', nameRu: 'РЈРёР»СЃРѕРЅ Р“.', country: 'England' }
      ]
    },
    {
      id: 'snooker-world-open-4',
      sportId: 'snooker',
      title: 'Snooker В· International В· World Open. Yushan',
      titleRu: 'РЎРЅСѓРєРµСЂ В· РњРµР¶РґСѓРЅР°СЂРѕРґРЅС‹Рµ В· World Open. Р®С€Р°РЅСЊ',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'zhuang', name: 'Zhuang L.', nameRu: 'Р§Р¶СѓР°РЅРі Р›.', country: 'China' },
        { id: 'zhao-xintong', name: 'Zhao Xintong', nameRu: 'Р§Р¶Р°Рѕ РЎРёРЅСЊС‚СѓРЅ', country: 'China' }
      ]
    }
  ],
  futsal: [
    {
      id: 'futsal-russia-superleague-1',
      sportId: 'futsal',
      title: 'Futsal В· Russia В· Super League',
      titleRu: 'Р¤СѓС‚Р·Р°Р» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-19T17:00:00+03:00',
      endsAt: '2026-03-19T19:00:00+03:00',
      participants: [
        { id: 'sinara', name: 'Sinara', nameRu: 'РЎРёРЅР°СЂР°', country: 'Russia' },
        { id: 'fakel', name: 'Fakel', nameRu: 'Р¤Р°РєРµР»', country: 'Russia' }
      ]
    },
    {
      id: 'futsal-russia-superleague-2',
      sportId: 'futsal',
      title: 'Futsal В· Russia В· Super League',
      titleRu: 'Р¤СѓС‚Р·Р°Р» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T16:30:00+03:00',
      endsAt: '2026-03-20T18:30:00+03:00',
      participants: [
        { id: 'gazprom-ugra', name: 'Gazprom-Ugra', nameRu: 'Р“Р°Р·РїСЂРѕРј-Р®РіСЂР°', country: 'Russia' },
        { id: 'norilsk-nickel', name: 'Norilsk Nickel', nameRu: 'РќРѕСЂРёР»СЊСЃРєРёР№ РќРёРєРµР»СЊ', country: 'Russia' }
      ]
    },
    {
      id: 'futsal-russia-superleague-3',
      sportId: 'futsal',
      title: 'Futsal В· Russia В· Super League',
      titleRu: 'Р¤СѓС‚Р·Р°Р» В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T19:00:00+03:00',
      endsAt: '2026-03-20T21:00:00+03:00',
      participants: [
        { id: 'novaya-generatsiya', name: 'Novaya Generatsiya', nameRu: 'РќРѕРІР°СЏ Р“РµРЅРµСЂР°С†РёСЏ', country: 'Russia' },
        { id: 'torpedo-nn', name: 'Torpedo NN', nameRu: 'РўРѕСЂРїРµРґРѕ РќРќ', country: 'Russia' }
      ]
    }
  ],
  'field-hockey': [
    {
      id: 'bandy-russia-superleague-1',
      sportId: 'field-hockey',
      title: 'Bandy В· Russia В· Super League',
      titleRu: 'РҐРѕРєРєРµР№ СЃ РјСЏС‡РѕРј В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-20T12:00:00+03:00',
      endsAt: '2026-03-20T14:00:00+03:00',
      participants: [
        { id: 'kuzbass', name: 'Kuzbass', nameRu: 'РљСѓР·Р±Р°СЃСЃ', country: 'Russia' },
        { id: 'vodnik', name: 'Vodnik', nameRu: 'Р’РѕРґРЅРёРє', country: 'Russia' }
      ]
    },
    {
      id: 'bandy-russia-superleague-2',
      sportId: 'field-hockey',
      title: 'Bandy В· Russia В· Super League',
      titleRu: 'РҐРѕРєРєРµР№ СЃ РјСЏС‡РѕРј В· Р РѕСЃСЃРёСЏ В· РЎСѓРїРµСЂР»РёРіР°',
      startsAt: '2026-03-21T10:00:00+03:00',
      endsAt: '2026-03-21T12:00:00+03:00',
      participants: [
        { id: 'ska-neftyanik', name: 'SKA-Neftyanik', nameRu: 'РЎРљРђ РќРµС„С‚СЏРЅРёРє', country: 'Russia' },
        { id: 'dynamo-moscow', name: 'Dynamo Moscow', nameRu: 'Р”РёРЅР°РјРѕ РњРѕСЃРєРІР°', country: 'Russia' }
      ]
    }
  ]
};

for (const sportId of Object.keys(genericSportEvents)) {
  if (!supportedSportIds.has(sportId)) {
    genericSportEvents[sportId] = [];
  }
}

export const sportEventCatalog: Record<string, SportEventRecord[]> = {
  ...genericSportEvents,
  'martial-arts': martialArtsEvents
};

export function getSportEvents(sportId: string) {
  return sportEventCatalog[sportId] ?? [];
}

export function getAllSportEvents() {
  return Object.values(sportEventCatalog)
    .flat()
    .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime());
}

export function getSportEventById(eventId: string) {
  return getAllSportEvents().find((event) => event.id === eventId);
}

export function isSportEventActive(event: SportEventRecord, now = Date.now()) {
  return new Date(event.endsAt).getTime() > now;
}

export function isSportEventLive(event: SportEventRecord, now = Date.now()) {
  const startsAt = new Date(event.startsAt).getTime();
  const endsAt = new Date(event.endsAt).getTime();

  return startsAt <= now && endsAt > now;
}

export function formatSportEventDate(startsAt: string, language: Language) {
  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(startsAt));
}

export function formatSportEventTime(startsAt: string, language: Language) {
  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(new Date(startsAt));
}




