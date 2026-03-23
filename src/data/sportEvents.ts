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
      title: 'Hockey · NHL · USA',
      titleRu: 'Хоккей · NHL · США',
      startsAt: '2026-03-24T02:30:00+03:00',
      endsAt: '2026-03-24T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'new-york-rangers', name: 'NY Rangers', nameRu: 'НЙ Рейнджерс' },
        { id: 'ottawa-senators', name: 'Ottawa', nameRu: 'Оттава' }
      ]
    },
    {
      id: 'hockey-khl-gagarin-1',
      sportId: 'hockey',
      title: 'Hockey · KHL. Gagarin Cup · Russia',
      titleRu: 'Хоккей · КХЛ. Кубок Гагарина · Россия',
      startsAt: '2026-03-24T16:30:00+03:00',
      endsAt: '2026-03-24T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'avangard', name: 'Avangard', nameRu: 'Авангард' },
        { id: 'neftekhimik', name: 'Neftekhimik', nameRu: 'Нефтехимик' }
      ]
    },
    {
      id: 'hockey-khl-gagarin-2',
      sportId: 'hockey',
      title: 'Hockey · KHL. Gagarin Cup · Russia',
      titleRu: 'Хоккей · КХЛ. Кубок Гагарина · Россия',
      startsAt: '2026-03-24T17:00:00+03:00',
      endsAt: '2026-03-24T19:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'metallurg-magnitogorsk', name: 'Metallurg Magnitogorsk', nameRu: 'Металлург Магнитогорск' },
        { id: 'sibir', name: 'Sibir', nameRu: 'Сибирь' }
      ]
    },
    {
      id: 'hockey-khl-gagarin-3',
      sportId: 'hockey',
      title: 'Hockey · KHL. Gagarin Cup · Russia',
      titleRu: 'Хоккей · КХЛ. Кубок Гагарина · Россия',
      startsAt: '2026-03-24T19:30:00+03:00',
      endsAt: '2026-03-24T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'lokomotiv-yaroslavl', name: 'Lokomotiv', nameRu: 'Локомотив' },
        { id: 'spartak', name: 'Spartak', nameRu: 'Спартак' }
      ]
    },
    {
      id: 'hockey-khl-gagarin-4',
      sportId: 'hockey',
      title: 'Hockey · KHL. Gagarin Cup · Russia',
      titleRu: 'Хоккей · КХЛ. Кубок Гагарина · Россия',
      startsAt: '2026-03-24T19:30:00+03:00',
      endsAt: '2026-03-24T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'dinamo-minsk', name: 'Dinamo Minsk', nameRu: 'Динамо Минск' },
        { id: 'dinamo-moscow', name: 'Dinamo Moscow', nameRu: 'Динамо Москва' }
      ]
    },
    {
      id: 'hockey-ahl-1',
      sportId: 'hockey',
      title: 'Hockey · AHL · USA',
      titleRu: 'Хоккей · AHL · США',
      startsAt: '2026-03-24T03:00:00+03:00',
      endsAt: '2026-03-24T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'manitoba-moose', name: 'Manitoba Moose', nameRu: 'Манитоба Муз' },
        { id: 'tucson-roadrunners', name: 'Tucson Roadrunners', nameRu: 'Тусон Роадраннерз' }
      ]
    },
    {
      id: 'hockey-vhl-playoff-1',
      sportId: 'hockey',
      title: 'Hockey · VHL. Playoff · Russia',
      titleRu: 'Хоккей · ВХЛ. Плей-офф · Россия',
      startsAt: '2026-03-24T11:00:00+03:00',
      endsAt: '2026-03-24T13:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'magnitka', name: 'Magnitka', nameRu: 'Магнитка' },
        { id: 'torpedo-gorky', name: 'Torpedo Gorky', nameRu: 'Торпедо Горький' }
      ]
    },
    {
      id: 'hockey-vhl-playoff-2',
      sportId: 'hockey',
      title: 'Hockey · VHL. Playoff · Russia',
      titleRu: 'Хоккей · ВХЛ. Плей-офф · Россия',
      startsAt: '2026-03-24T15:00:00+03:00',
      endsAt: '2026-03-24T17:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'metallurg-novokuznetsk', name: 'Metallurg Novokuznetsk', nameRu: 'Металлург Новокузнецк' },
        { id: 'csk-vvs', name: 'CSK VVS', nameRu: 'ЦСК ВВС' }
      ]
    },
    {
      id: 'hockey-kazakhstan-high-league-1',
      sportId: 'hockey',
      title: 'Hockey · Higher League · Kazakhstan',
      titleRu: 'Хоккей · Высшая лига · Казахстан',
      startsAt: '2026-03-24T15:00:00+03:00',
      endsAt: '2026-03-24T17:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'saryarka', name: 'Saryarka', nameRu: 'Сарыарка' },
        { id: 'torpedo-uk', name: 'Torpedo UK', nameRu: 'Торпедо УК' }
      ]
    },
    {
      id: 'hockey-khl-gagarin-5',
      sportId: 'hockey',
      title: 'Hockey · KHL. Gagarin Cup · Russia',
      titleRu: 'Хоккей · КХЛ. Кубок Гагарина · Россия',
      startsAt: '2026-03-24T16:29:00+03:00',
      endsAt: '2026-03-24T18:59:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'hosts-placeholder', name: 'Hosts', nameRu: 'Хозяева' },
        { id: 'guests-placeholder', name: 'Guests', nameRu: 'Гости' }
      ]
    },
    {
      id: 'hockey-vhl-playoff-3',
      sportId: 'hockey',
      title: 'Hockey · VHL. Playoff · Russia',
      titleRu: 'Хоккей · ВХЛ. Плей-офф · Россия',
      startsAt: '2026-03-24T16:30:00+03:00',
      endsAt: '2026-03-24T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'chelmet', name: 'Chelmet', nameRu: 'Челмет' },
        { id: 'omskie-krylia', name: 'Omskie Krylia', nameRu: 'Омские Крылья' }
      ]
    },
    {
      id: 'hockey-belarus-extraliga-1',
      sportId: 'hockey',
      title: 'Hockey · Extraliga · Belarus',
      titleRu: 'Хоккей · Экстралига · Беларусь',
      startsAt: '2026-03-24T18:00:00+03:00',
      endsAt: '2026-03-24T20:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'metallurg-zhlobin', name: 'Metallurg Zhlobin', nameRu: 'Металлург Жлобин' },
        { id: 'vitebsk', name: 'Vitebsk', nameRu: 'Витебск' }
      ]
    }
  ],
  tennis: [
    {
      id: 'tennis-wta-miami-1',
      sportId: 'tennis',
      title: 'Tennis · WTA · WTA1000. Miami. USA',
      titleRu: 'Теннис · WTA · WTA1000. Майами. США',
      startsAt: '2026-03-18T02:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'sonmez-z', name: 'Sonmez Z.', nameRu: 'Сонмез З.' },
        { id: 'haddad-maia-b', name: 'Haddad Maia B.', nameRu: 'Хаддад Майя Б.' }
      ]
    },
    {
      id: 'tennis-wta-miami-2',
      sportId: 'tennis',
      title: 'Tennis · WTA · WTA1000. Miami. USA',
      titleRu: 'Теннис · WTA · WTA1000. Майами. США',
      startsAt: '2026-03-18T03:10:00+03:00',
      endsAt: '2026-03-18T05:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'siniakova-k', name: 'Siniakova K.', nameRu: 'Синякова К.' },
        { id: 'osorio-k', name: 'Osorio K.', nameRu: 'РћСЃРѕСЂРёРѕ Рљ.' }
      ]
    },
    {
      id: 'tennis-asuncion-1',
      sportId: 'tennis',
      title: 'Tennis · ATP. Challenger · Asuncion. Paraguay',
      titleRu: 'Теннис · ATP. Челленджер · Асунсьон. Парагвай',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T02:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'bueno-g', name: 'Bueno G.', nameRu: 'Бузно Г.' },
        { id: 'didoni-bonini-jp', name: 'Didoni Bonini J.P.', nameRu: 'Дидони Бонини Ж.П.' }
      ]
    },
    {
      id: 'tennis-asuncion-2',
      sportId: 'tennis',
      title: 'Tennis · ATP. Challenger · Asuncion. Paraguay',
      titleRu: 'Теннис · ATP. Челленджер · Асунсьон. Парагвай',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T02:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'midon-l', name: 'Midon L.', nameRu: 'Мидон Л.' },
        { id: 'villanueva-g', name: 'Villanueva G.', nameRu: 'Виллануэва Г.' }
      ]
    },
    {
      id: 'tennis-asuncion-3',
      sportId: 'tennis',
      title: 'Tennis · ATP. Challenger · Asuncion. Paraguay',
      titleRu: 'Теннис · ATP. Челленджер · Асунсьон. Парагвай',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'dellien-m', name: 'Dellien M.', nameRu: 'Деллиен М.' },
        { id: 'nunez-vera-ac', name: 'Nunez Vera A.C.', nameRu: 'Нуньес Вера А.С.' }
      ]
    },
    {
      id: 'tennis-morelos-1',
      sportId: 'tennis',
      title: 'Tennis · ATP. Challenger · Morelos. Mexico',
      titleRu: 'Теннис · ATP. Челленджер · Морелос. Мексика',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'hernandez-serrano-xa', name: 'Hernandez Serrano X.A.', nameRu: 'Эрнандес Серрано Х.А.' },
        { id: 'colson-t', name: 'Colson T.', nameRu: 'Колсон Т.' }
      ]
    }
  ],
  'table-tennis': [
    {
      id: 'table-tennis-tt-cup-1',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T00:10:00+03:00',
      endsAt: '2026-03-18T01:10:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'baros-a', name: 'Baros A.', nameRu: 'Барош А.', country: 'Czech Republic' },
        { id: 'zaskodny-m', name: 'Zaskodny M.', nameRu: 'Зашкодни М.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-2',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T00:20:00+03:00',
      endsAt: '2026-03-18T01:20:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'viskocil-z', name: 'Viskocil Z.', nameRu: 'Вискоцил З.', country: 'Czech Republic' },
        { id: 'barsa-t', name: 'Barsa T.', nameRu: 'Барса Т.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-3',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T00:25:00+03:00',
      endsAt: '2026-03-18T01:25:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'kazacky-a', name: 'Kazacky A.', nameRu: 'Казацкий А.', country: 'Czech Republic' },
        { id: 'kulisek-m-1', name: 'Kulisek M.', nameRu: 'Кулишек М.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-4',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T00:50:00+03:00',
      endsAt: '2026-03-18T01:50:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'dvorak-martin', name: 'Dvorak Martin', nameRu: 'Дворак Мартин', country: 'Czech Republic' },
        { id: 'mach-y', name: 'Mach Y.', nameRu: 'Мах Я.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-5',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T00:55:00+03:00',
      endsAt: '2026-03-18T01:55:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'brozek-michal', name: 'Brozek Michal', nameRu: 'Брожек Михал', country: 'Czech Republic' },
        { id: 'kulisek-m-2', name: 'Kulisek M.', nameRu: 'Кулишек М.', country: 'Czech Republic' }
      ]
    },
    {
      id: 'table-tennis-tt-cup-6',
      sportId: 'table-tennis',
      title: 'Table tennis · International · TT-Cup',
      titleRu: 'Настольный теннис · Международные · TT-Cup',
      startsAt: '2026-03-18T01:25:00+03:00',
      endsAt: '2026-03-18T02:25:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'giza-d', name: 'Giza D.', nameRu: 'Гиза Д.', country: 'Czech Republic' },
        { id: 'kazacky-a-2', name: 'Kazacky A.', nameRu: 'Казацкий А.', country: 'Czech Republic' }
      ]
    }
  ],
  basketball: [
    {
      id: 'basketball-nba-1',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'detroit-pistons', name: 'Detroit Pistons', nameRu: 'Детройт Пистонс' },
        { id: 'los-angeles-lakers', name: 'Los Angeles Lakers', nameRu: 'Лос-Анджелес Лейкерс' }
      ]
    },
    {
      id: 'basketball-nba-2',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'orlando-magic', name: 'Orlando Magic', nameRu: 'Орландо Мэджик' },
        { id: 'indiana-pacers', name: 'Indiana Pacers', nameRu: 'Индиана Пэйсерс' }
      ]
    },
    {
      id: 'basketball-nba-3',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'miami-heat', name: 'Miami Heat', nameRu: 'Майами Хит' },
        { id: 'san-antonio-spurs', name: 'San Antonio Spurs', nameRu: 'Сан-Антонио Спёрс' }
      ]
    },
    {
      id: 'basketball-nba-4',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'philadelphia-76ers', name: 'Philadelphia 76ers', nameRu: 'Филадельфия 76-е' },
        { id: 'oklahoma-city-thunder', name: 'Oklahoma City Thunder', nameRu: 'Оклахома Сити Тандер' }
      ]
    },
    {
      id: 'basketball-nba-5',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T02:30:00+03:00',
      endsAt: '2026-03-24T05:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'atlanta-hawks', name: 'Atlanta Hawks', nameRu: 'Атланта Хокс' },
        { id: 'memphis-grizzlies', name: 'Memphis Grizzlies', nameRu: 'Мемфис Гриззлис' }
      ]
    },
    {
      id: 'basketball-nba-6',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T03:00:00+03:00',
      endsAt: '2026-03-24T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'chicago-bulls', name: 'Chicago Bulls', nameRu: 'Чикаго Буллз' },
        { id: 'houston-rockets', name: 'Houston Rockets', nameRu: 'Хьюстон Рокетс' }
      ]
    },
    {
      id: 'basketball-nba-7',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T04:00:00+03:00',
      endsAt: '2026-03-24T06:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'utah-jazz', name: 'Utah Jazz', nameRu: 'Юта Джаз' },
        { id: 'toronto-raptors', name: 'Toronto Raptors', nameRu: 'Торонто Рэпторс' }
      ]
    },
    {
      id: 'basketball-nba-8',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T04:30:00+03:00',
      endsAt: '2026-03-24T07:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'dallas-mavericks', name: 'Dallas Mavericks', nameRu: 'Даллас Маверикс' },
        { id: 'golden-state-warriors', name: 'Golden State Warriors', nameRu: 'Голден Стэйт Уорриорз' }
      ]
    },
    {
      id: 'basketball-nba-9',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T05:00:00+03:00',
      endsAt: '2026-03-24T07:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'portland-trail-blazers', name: 'Portland Trail Blazers', nameRu: 'Портленд Трэйл Блэйзерс' },
        { id: 'brooklyn-nets', name: 'Brooklyn Nets', nameRu: 'Бруклин Нетс' }
      ]
    },
    {
      id: 'basketball-nba-10',
      sportId: 'basketball',
      title: 'Basketball · USA · NBA',
      titleRu: 'Баскетбол · США · NBA',
      startsAt: '2026-03-24T05:30:00+03:00',
      endsAt: '2026-03-24T08:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'los-angeles-clippers', name: 'Los Angeles Clippers', nameRu: 'Лос-Анджелес Клипперс' },
        { id: 'milwaukee-bucks', name: 'Milwaukee Bucks', nameRu: 'Милуоки Бакс' }
      ]
    },
    {
      id: 'basketball-nbb-1',
      sportId: 'basketball',
      title: 'Basketball · Brazil · NBB',
      titleRu: 'Баскетбол · Бразилия · NBB',
      startsAt: '2026-03-24T02:00:00+03:00',
      endsAt: '2026-03-24T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'flamengo', name: 'Flamengo', nameRu: 'Фламенго' },
        { id: 'paulistano', name: 'Paulistano', nameRu: 'Паулистано' }
      ]
    },
    {
      id: 'basketball-nbb-2',
      sportId: 'basketball',
      title: 'Basketball · Brazil · NBB',
      titleRu: 'Баскетбол · Бразилия · NBB',
      startsAt: '2026-03-24T02:15:00+03:00',
      endsAt: '2026-03-24T04:15:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'brasilia-basket', name: 'Brasilia Basket', nameRu: 'Бразилиа Баскет' },
        { id: 'mogi-das-cruzes', name: 'Mogi das Cruzes', nameRu: 'Можи дас Крузис' }
      ]
    }
  ],
  cybersport: [
    {
      id: 'cybersport-dota2-epl-1',
      sportId: 'cybersport',
      title: 'Cybersport · Dota-2 · European Pro League. Season 35 2026',
      titleRu: 'Киберспорт · Dota-2 · European Pro League. Season 35 2026',
      startsAt: '2026-03-18T16:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'navi-junior', name: 'NAVI Junior', nameRu: 'NAVI Junior' },
        { id: 'astini-plus-5', name: 'Astini+5', nameRu: 'Astini+5' }
      ]
    },
    {
      id: 'cybersport-cs-aorus-1',
      sportId: 'cybersport',
      title: 'Cybersport · Counter-strike · Aorus League. Brazil Online Stage 2',
      titleRu: 'Киберспорт · Counter-strike · Aorus League. Brazil Online Stage 2',
      startsAt: '2026-03-18T00:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'galorys', name: 'Galorys', nameRu: 'Galorys' },
        { id: 'mibr-academy', name: 'MIBR Academy', nameRu: 'MIBR Academy' }
      ]
    },
    {
      id: 'cybersport-cs-aorus-2',
      sportId: 'cybersport',
      title: 'Cybersport · Counter-strike · Aorus League. Brazil Online Stage 2',
      titleRu: 'Киберспорт · Counter-strike · Aorus League. Brazil Online Stage 2',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'bounty-hunters-esports', name: 'Bounty Hunters Esports', nameRu: 'Bounty Hunters Esports' },
        { id: 'keyd', name: 'Keyd', nameRu: 'Keyd' }
      ]
    },
    {
      id: 'cybersport-cs-cct-sa-1',
      sportId: 'cybersport',
      title: 'Cybersport · Counter-strike · CCT South America. Series 10',
      titleRu: 'Киберспорт · Counter-strike · CCT South America. Series 10',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T04:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'uno-mille', name: 'UNO MILLE', nameRu: 'UNO MILLE' },
        { id: 'here-we-go-again', name: 'HereWeGoAgain', nameRu: 'HereWeGoAgain' }
      ]
    },
    {
      id: 'cybersport-valorant-ces-1',
      sportId: 'cybersport',
      title: 'Cybersport · Valorant · China Evolution Series. Act 1 2026',
      titleRu: 'Киберспорт · Valorant · China Evolution Series. Act 1 2026',
      startsAt: '2026-03-18T12:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'dragon-ranger-gaming', name: 'Dragon Ranger Gaming', nameRu: 'Dragon Ranger Gaming' },
        { id: 'any-questions-gaming', name: 'Any Questions Gaming', nameRu: 'Any Questions Gaming' }
      ]
    },
    {
      id: 'cybersport-cs-nodwin-1',
      sportId: 'cybersport',
      title: 'Cybersport · Counter-strike · NODWIN Clutch Series. Season 6 2026',
      titleRu: 'Киберспорт · Counter-strike · NODWIN Clutch Series. Season 6 2026',
      startsAt: '2026-03-18T12:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
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
      title: 'E-sport · Cyberhockey · NHL. High Cup (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. High Cup (3x4 мин)',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd p., 36'",
      displayTimeRu: "2-Р№ Рї., 36'",
      participants: [
        { id: 'minnakhmetov-yel', name: 'Minnakhmetov (YEL)', nameRu: 'Миннахметов (YEL)' },
        { id: 'idrisov-gre', name: 'Idrisov (GRE)', nameRu: 'РРґСЂРёСЃРѕРІ (GRE)' }
      ]
    },
    {
      id: 'esport-high-cup-2',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. High Cup (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. High Cup (3x4 мин)',
      startsAt: '2026-03-17T19:05:00+03:00',
      endsAt: '2026-03-17T21:05:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'kartashov-blk', name: 'Kartashov (BLK)', nameRu: 'Карташов (BLK)' },
        { id: 'gaibullin-blu', name: 'Gaibullin (BLU)', nameRu: 'Гайбуллин (BLU)' }
      ]
    },
    {
      id: 'esport-fc-penalty-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC. Ultimate Penalty League',
      titleRu: 'E-sport · Киберфутбол · FC. Ultimate Penalty League',
      startsAt: '2026-03-17T19:10:00+03:00',
      endsAt: '2026-03-17T21:10:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "Penalties, 0'",
      displayTimeRu: "Пенальти, 0'",
      participants: [
        { id: 'inter-milan-lynj9r', name: 'Inter Milan (lynj9r)', nameRu: 'Интер Милан (lynj9r)' },
        { id: 'borussia-dortmund-weresk03', name: 'Borussia Dortmund (weresk03)', nameRu: 'Боруссия Дортмунд (weresk03)' }
      ]
    },
    {
      id: 'esport-fc-penalty-2',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC. Ultimate Penalty League',
      titleRu: 'E-sport · Киберфутбол · FC. Ultimate Penalty League',
      startsAt: '2026-03-17T19:15:00+03:00',
      endsAt: '2026-03-17T21:15:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "Penalties, 0'",
      displayTimeRu: "Пенальти, 0'",
      participants: [
        { id: 'borussia-dortmund-weresk03-b', name: 'Borussia Dortmund (weresk03)', nameRu: 'Боруссия Дортмунд (weresk03)' },
        { id: 'inter-milan-lynj9r-b', name: 'Inter Milan (lynj9r)', nameRu: 'Интер Милан (lynj9r)' }
      ]
    },
    {
      id: 'esport-fc-volta-high-cup-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC 24. 5x5 Volta High Cup (2x3 min)',
      titleRu: 'E-sport · Киберфутбол · FC 24. 5x5 Volta High Cup (2x3 мин)',
      startsAt: '2026-03-17T19:20:00+03:00',
      endsAt: '2026-03-17T21:20:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd h., 4'",
      displayTimeRu: "2-й т., 4'",
      participants: [
        { id: 'sharafulin-arsenal', name: 'Sharafullin (Arsenal)', nameRu: 'Шарафуллин (Арсенал)' },
        { id: 'strokov-juventus', name: 'Strokov (Juventus)', nameRu: 'Строков (Ювентус)' }
      ]
    },
    {
      id: 'esport-uel-hockey-1',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. United Esports League (3x4 мин)',
      startsAt: '2026-03-17T19:25:00+03:00',
      endsAt: '2026-03-17T21:25:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "2nd p., 28'",
      displayTimeRu: "2-Р№ Рї., 28'",
      participants: [
        { id: 'buffalo-deer69', name: 'Buffalo Sabres (deer69)', nameRu: 'Баффало Сейбрз (deer69)' },
        { id: 'anaheim-pat95', name: 'Anaheim Ducks (Pat95)', nameRu: 'Анахайм Дакс (Pat95)' }
      ]
    },
    {
      id: 'esport-uel-hockey-2',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. United Esports League (3x4 мин)',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 5'",
      displayTimeRu: "1-Р№ Рї., 5'",
      participants: [
        { id: 'philadelphia-kurt', name: 'Philadelphia Flyers (KURT COBAI...)', nameRu: 'Филадельфия Флайерс (KURT COBAI...)' },
        { id: 'tampa-bay-aleex', name: 'Tampa-Bay Lightning (ALEEX)', nameRu: 'Тампа-Бэй Лайтнинг (ALEEX)' }
      ]
    },
    {
      id: 'esport-uel-hockey-3',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. United Esports League (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. United Esports League (3x4 мин)',
      startsAt: '2026-03-17T19:35:00+03:00',
      endsAt: '2026-03-17T21:35:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 19'",
      displayTimeRu: "1-Р№ Рї., 19'",
      participants: [
        { id: 'chicago-oil76', name: 'Chicago Blackhawks (OIL76)', nameRu: 'Чикаго Блэкхокс (OIL76)' },
        { id: 'islanders-puck', name: 'New York Islanders (puck)', nameRu: 'Нью-Йорк Айлендерс (puck)' }
      ]
    },
    {
      id: 'esport-h2h2-hockey-1',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. H2H-2 League (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. H2H-2 Лига (3x4 мин)',
      startsAt: '2026-03-17T19:40:00+03:00',
      endsAt: '2026-03-17T21:40:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'edmonton-master-ily', name: 'Edmonton Oilers (MASTER_ILY)', nameRu: 'Эдмонтон Ойлерз (MASTER_ILY)' },
        { id: 'ottawa-garage10', name: 'Ottawa Senators (Garage10)', nameRu: 'Оттава Сенаторз (Garage10)' }
      ]
    },
    {
      id: 'esport-h2h-hockey-1',
      sportId: 'esport',
      title: 'E-sport · Cyberhockey · NHL. H2H League (3x4 min)',
      titleRu: 'E-sport · Киберхоккей · NHL. H2H Лига (3x4 мин)',
      startsAt: '2026-03-17T19:45:00+03:00',
      endsAt: '2026-03-17T21:45:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st p., 17'",
      displayTimeRu: "1-Р№ Рї., 17'",
      participants: [
        { id: 'la-kings-arm-ava23', name: 'Los Angeles Kings (ARM_AVA23)', nameRu: 'Лос-Анджелес Кингз (ARM_AVA23)' },
        { id: 'nashville-mukha', name: 'Nashville Predators (Mukha)', nameRu: 'Нэшвилл Предаторз (Mukha)' }
      ]
    },
    {
      id: 'esport-h2h-football-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · H2H Liga-2 (2x4 min)',
      titleRu: 'E-sport · Киберфутбол · H2H Liga-2 (2x4 мин)',
      startsAt: '2026-03-17T19:50:00+03:00',
      endsAt: '2026-03-17T21:50:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: "1st h., 2'",
      displayTimeRu: "1-й т., 2'",
      participants: [
        { id: 'germany-ivanoffstyle', name: 'Germany (ivanoffstyle)', nameRu: 'Германия (ivanoffstyle)', country: 'Germany' },
        { id: 'france-sfp', name: 'France (Sfp)', nameRu: 'Франция (Sfp)', country: 'France' }
      ]
    },
    {
      id: 'esport-liga1-khabarovsk-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC. Liga-1. Khabarovsk (2x4 min)',
      titleRu: 'E-sport · Киберфутбол · FC. Лига-1. Хабаровск (2x4 мин)',
      startsAt: '2026-03-17T19:55:00+03:00',
      endsAt: '2026-03-17T21:55:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Match finished',
      displayTimeRu: 'Матч завершен',
      participants: [
        { id: 'italy-gamekova', name: 'Italy (GAMEKOVA)', nameRu: 'Италия (GAMEKOVA)', country: 'Italy' },
        { id: 'spain-maverick', name: 'Spain (MAVERICK)', nameRu: 'Испания (MAVERICK)', country: 'Spain' }
      ]
    },
    {
      id: 'esport-h2h-volta-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · H2H Volta (2x3 min)',
      titleRu: 'E-sport · Киберфутбол · H2H Volta (2x3 мин)',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'morocco-indifference', name: 'Morocco (Indifference)', nameRu: 'Марокко (Indifference)', country: 'Morocco' },
        { id: 'denmark-pritistreet', name: 'Denmark (PRITISTREET)', nameRu: 'Дания (PRITISTREET)', country: 'Denmark' }
      ]
    },
    {
      id: 'esport-fc-volta-high-cup-2',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC 24. 5x5 Volta High Cup (2x3 min)',
      titleRu: 'E-sport · Киберфутбол · FC 24. 5x5 Volta High Cup (2x3 мин)',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T22:05:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'petrov-atletico', name: 'Petrov (Atletico M)', nameRu: 'Петров (Атлетико М)' },
        { id: 'sharafulin-arsenal-b', name: 'Sharafullin (Arsenal)', nameRu: 'Шарафулин (Арсенал)' }
      ]
    },
    {
      id: 'esport-fc-united-esports-1',
      sportId: 'esport',
      title: 'E-sport · Cyberfootball · FC. United Esports Leagues (2x4 min)',
      titleRu: 'E-sport · Киберфутбол · FC. United Esports Leagues (2x4 мин)',
      startsAt: '2026-03-17T20:10:00+03:00',
      endsAt: '2026-03-17T22:10:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'borussia-dortmund-makelele', name: 'Borussia Dortmund (Makelele)', nameRu: 'Боруссия Дортмунд (Makelele)' },
        { id: 'tottenham-isco', name: 'Tottenham (ISCO)', nameRu: 'Тоттенхэм (ISCO)' }
      ]
    }
  ],
  volleyball: [
    {
      id: 'volleyball-russia-superleague-1',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · Super League',
      titleRu: 'Волейбол · Россия · Суперлига',
      startsAt: '2026-03-17T17:00:00+03:00',
      endsAt: '2026-03-17T19:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'dynamo-ufa', name: 'Dynamo Ural Ufa', nameRu: 'Динамо Урал Уфа' },
        { id: 'belogorie', name: 'Belogorie', nameRu: 'Белогорье' }
      ]
    },
    {
      id: 'volleyball-poland-plusliga-1',
      sportId: 'volleyball',
      title: 'Volleyball · Poland · PlusLiga',
      titleRu: 'Волейбол · Польша · Плюс-лига',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'cuprum-lubin', name: 'Cuprum Lubin', nameRu: 'Купрум Любин' },
        { id: 'kedzierzyn-kozle', name: 'Kedzierzyn Kozle', nameRu: 'Кендзежин Козле' }
      ]
    },
    {
      id: 'volleyball-poland-plusliga-2',
      sportId: 'volleyball',
      title: 'Volleyball · Poland · PlusLiga',
      titleRu: 'Волейбол · Польша · Плюс-лига',
      startsAt: '2026-03-17T22:00:00+03:00',
      endsAt: '2026-03-18T00:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'trefl-gdansk', name: 'Trefl Gdansk', nameRu: 'Трефл Гданьск' },
        { id: 'politechnika-lublin', name: 'Politechnika Lublin', nameRu: 'Политехника Люблин' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-1',
      sportId: 'volleyball',
      title: 'Volleyball · Italy · Serie A1',
      titleRu: 'Волейбол · Италия · Серия A1',
      startsAt: '2026-03-17T22:30:00+03:00',
      endsAt: '2026-03-18T00:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'modena', name: 'Modena', nameRu: 'Модена' },
        { id: 'piacenza', name: 'Piacenza', nameRu: 'Пьяченца' }
      ]
    },
    {
      id: 'volleyball-brazil-superliga-1',
      sportId: 'volleyball',
      title: 'Volleyball · Brazil · Superliga',
      titleRu: 'Волейбол · Бразилия · Суперлига',
      startsAt: '2026-03-18T01:00:00+03:00',
      endsAt: '2026-03-18T03:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'sao-jose-dos-campos', name: 'Sao Jose dos Campos', nameRu: 'Сан Жозе дус Кампус' },
        { id: 'joinville', name: 'Joinville', nameRu: 'Жоинвилле' }
      ]
    },
    {
      id: 'volleyball-czech-extraliga-1',
      sportId: 'volleyball',
      title: 'Volleyball · Czech Republic · Extraliga',
      titleRu: 'Волейбол · Чехия · Экстралига',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'benatky', name: 'Benatky nad Jizerou', nameRu: 'Бенатки над Йизероу' },
        { id: 'brno', name: 'Brno', nameRu: 'Брно' }
      ]
    },
    {
      id: 'volleyball-czech-extraliga-2',
      sportId: 'volleyball',
      title: 'Volleyball · Czech Republic · Extraliga',
      titleRu: 'Волейбол · Чехия · Экстралига',
      startsAt: '2026-03-17T21:30:00+03:00',
      endsAt: '2026-03-17T23:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'pribram', name: 'Pribram', nameRu: 'Прибрам' },
        { id: 'ostrava', name: 'Ostrava', nameRu: 'Острава' }
      ]
    },
    {
      id: 'volleyball-russia-upvl-live',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · UPVL. Nations League (best of 3 sets)',
      titleRu: 'Волейбол · Россия · UPVL. Лига Наций (матч из 3-х сетов)',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Match finished',
      displayTimeRu: 'Матч завершен',
      participants: [
        { id: 'france-pro', name: 'France (Pro)', nameRu: 'Франция (Pro)', country: 'France' },
        { id: 'belgium-pro', name: 'Belgium (Pro)', nameRu: 'Бельгия (Pro)', country: 'Belgium' }
      ]
    },
    {
      id: 'volleyball-philippines-pvl-live',
      sportId: 'volleyball',
      title: 'Volleyball · Philippines · PVL. Women',
      titleRu: 'Волейбол · Филиппины · PVL. Женщины',
      startsAt: '2026-03-17T18:30:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: '2nd set',
      displayTimeRu: '2-й сет',
      participants: [
        { id: 'farm-fresh-w', name: 'Farm Fresh (W)', nameRu: 'Фарм Фрэш (ж)' },
        { id: 'cool-smashers-w', name: 'Cool Smashers (W)', nameRu: 'Кул Смэшерс (ж)' }
      ]
    },
    {
      id: 'volleyball-russia-youth-live',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · Youth League. Women',
      titleRu: 'Волейбол · Россия · Молодежная лига. Женщины',
      startsAt: '2026-03-17T18:45:00+03:00',
      endsAt: '2026-03-17T20:45:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: '3rd set',
      displayTimeRu: '3-й сет',
      participants: [
        { id: 'zarechie-odintsovo-2-w', name: 'Zarechie Odintsovo 2 (Youth) (W)', nameRu: 'Заречье Одинцово 2 (мол) (ж)' },
        { id: 'dinamo-metar-3-w', name: 'Dinamo Metar 3 (Youth) (W)', nameRu: 'Динамо Метар 3 (мол) (ж)' }
      ]
    },
    {
      id: 'volleyball-finland-w-1',
      sportId: 'volleyball',
      title: 'Volleyball · Finland · Mestaruusliiga. Women',
      titleRu: 'Волейбол · Финляндия · Местарууслига. Женщины',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'kangasala-w', name: 'Kangasala (W)', nameRu: 'Кангасала (ж)' },
        { id: 'vampula-w', name: 'Vampula (W)', nameRu: 'Вампула (ж)' }
      ]
    },
    {
      id: 'volleyball-finland-w-2',
      sportId: 'volleyball',
      title: 'Volleyball · Finland · Mestaruusliiga. Women',
      titleRu: 'Волейбол · Финляндия · Местарууслига. Женщины',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'liigalokki-w', name: 'Liigalokki (W)', nameRu: 'Лигаллоки (ж)' },
        { id: 'viesti-salo-w', name: 'Viesti Salo (W)', nameRu: 'Виести Сало (ж)' }
      ]
    },
    {
      id: 'volleyball-finland-1',
      sportId: 'volleyball',
      title: 'Volleyball · Finland · Mestaruusliiga',
      titleRu: 'Волейбол · Финляндия · Местарууслига',
      startsAt: '2026-03-17T19:30:00+03:00',
      endsAt: '2026-03-17T21:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'hurrikaani', name: 'Hurrikaani', nameRu: 'Хуррикаани' },
        { id: 'savo', name: 'Savo', nameRu: 'Саво' }
      ]
    },
    {
      id: 'volleyball-switzerland-1',
      sportId: 'volleyball',
      title: 'Volleyball · Switzerland · NLA',
      titleRu: 'Волейбол · Швейцария · NLA',
      startsAt: '2026-03-17T21:30:00+03:00',
      endsAt: '2026-03-17T23:30:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'volley-nafels', name: 'Volley Nafels', nameRu: 'Воллей Наефелс' },
        { id: 'chenois-geneve', name: 'Chenois Geneve', nameRu: 'Ченойс Женева' }
      ]
    },
    {
      id: 'volleyball-rwanda-live',
      sportId: 'volleyball',
      title: 'Volleyball · Rwanda · National League. Women',
      titleRu: 'Волейбол · Руанда · Национальная лига. Женщины',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'Матч идет',
      participants: [
        { id: 'polis-w', name: 'Polis (W)', nameRu: 'Полис (ж)' },
        { id: 'kepler-w', name: 'Kepler (W)', nameRu: 'Кеплер (ж)' }
      ]
    },
    {
      id: 'volleyball-sweden-1',
      sportId: 'volleyball',
      title: 'Volleyball · Sweden · Elitserien',
      titleRu: 'Волейбол · Швеция · Элитсерия',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'habo', name: 'Habo', nameRu: 'Хабо' },
        { id: 'sodertalje', name: 'Sodertalje', nameRu: 'Седертелье' }
      ]
    },
    {
      id: 'volleyball-slovakia-1',
      sportId: 'volleyball',
      title: 'Volleyball · Slovakia · Extraliga',
      titleRu: 'Волейбол · Словакия · Экстралига',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'spartak-myjava', name: 'Spartak Myjava', nameRu: 'Спартак Миява' },
        { id: 'vkp-bratislava', name: 'VKP Bratislava', nameRu: 'ВКП Братислава' }
      ]
    },
    {
      id: 'volleyball-china-live',
      sportId: 'volleyball',
      title: 'Volleyball · China · CVL. Women',
      titleRu: 'Волейбол · Китай · CVL. Женщины',
      startsAt: '2026-03-17T19:00:00+03:00',
      endsAt: '2026-03-17T21:00:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'Break',
      displayTimeRu: 'Перерыв',
      participants: [
        { id: 'shandong-w', name: 'Shandong (W)', nameRu: 'Шаньдун (ж)' },
        { id: 'shanghai-w', name: 'Shanghai (W)', nameRu: 'Шанхай (ж)' }
      ]
    },
    {
      id: 'volleyball-argentina-1',
      sportId: 'volleyball',
      title: 'Volleyball · Argentina · Serie A1',
      titleRu: 'Волейбол · Аргентина · Серия A1',
      startsAt: '2026-03-18T00:30:00+03:00',
      endsAt: '2026-03-18T02:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'tucuman-gimnasia', name: 'Tucuman Gimnasia', nameRu: 'Тукуман Химназия' },
        { id: 'ciudad-buenos-aires', name: 'Ciudad de Buenos Aires', nameRu: 'Сьюдад де Буэнос Айрес' }
      ]
    },
    {
      id: 'volleyball-argentina-2',
      sportId: 'volleyball',
      title: 'Volleyball · Argentina · Serie A1',
      titleRu: 'Волейбол · Аргентина · Серия A1',
      startsAt: '2026-03-18T03:30:00+03:00',
      endsAt: '2026-03-18T05:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'monteros', name: 'Monteros', nameRu: 'Монтерос' },
        { id: 'upln-san-juan', name: 'UPLN San Juan', nameRu: 'УПЛН Сан Хуан' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-2',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · Super League',
      titleRu: 'Волейбол · Россия · Суперлига',
      startsAt: '2026-03-18T17:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'gazprom-ugra-volley', name: 'Gazprom Ugra', nameRu: 'Газпром Югра' },
        { id: 'yenisey', name: 'Yenisey', nameRu: 'Енисей' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-3',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · Super League',
      titleRu: 'Волейбол · Россия · Суперлига',
      startsAt: '2026-03-18T17:00:00+03:00',
      endsAt: '2026-03-18T19:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'fakel-yamal', name: 'Fakel Yamal', nameRu: 'Факел Ямал' },
        { id: 'nova', name: 'Nova', nameRu: 'Нова' }
      ]
    },
    {
      id: 'volleyball-russia-superleague-4',
      sportId: 'volleyball',
      title: 'Volleyball · Russia · Super League',
      titleRu: 'Волейбол · Россия · Суперлига',
      startsAt: '2026-03-18T19:00:00+03:00',
      endsAt: '2026-03-18T21:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'gorkiy', name: 'Gorkiy', nameRu: 'Горький' },
        { id: 'dinamo-lo', name: 'Dinamo-LO', nameRu: 'Динамо-ЛО' }
      ]
    },
    {
      id: 'volleyball-challenge-cup-w',
      sportId: 'volleyball',
      title: 'Volleyball · International Clubs · Challenge Cup. Women',
      titleRu: 'Волейбол · Международные. Клубы · Кубок вызова. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'panathinaikos-w-volley', name: 'Panathinaikos (W)', nameRu: 'Панатинаикос (ж)' },
        { id: 'vallefoglia-w', name: 'Vallefoglia (W)', nameRu: 'Валлефолья (ж)' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-2',
      sportId: 'volleyball',
      title: 'Volleyball · Italy · Serie A1',
      titleRu: 'Волейбол · Италия · Серия A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'verona', name: 'Verona', nameRu: 'Верона' },
        { id: 'milan', name: 'Milan', nameRu: 'Милан' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-3',
      sportId: 'volleyball',
      title: 'Volleyball · Italy · Serie A1',
      titleRu: 'Волейбол · Италия · Серия A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'perugia', name: 'Perugia', nameRu: 'Перуджа' },
        { id: 'vero-monza', name: 'Vero Monza', nameRu: 'Веро Монца' }
      ]
    },
    {
      id: 'volleyball-italy-serie-a1-4',
      sportId: 'volleyball',
      title: 'Volleyball · Italy · Serie A1',
      titleRu: 'Волейбол · Италия · Серия A1',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'trentino', name: 'Trentino', nameRu: 'Трентино' },
        { id: 'cucine-lube', name: 'Cucine Lube', nameRu: 'Кучине Лубе' }
      ]
    },
    {
      id: 'volleyball-greece-cup-1',
      sportId: 'volleyball',
      title: 'Volleyball · Greece · Cup',
      titleRu: 'Волейбол · Греция · Кубок',
      startsAt: '2026-03-19T18:00:00+03:00',
      endsAt: '2026-03-19T20:00:00+03:00',
      participants: [
        { id: 'ofi', name: 'OFI', nameRu: 'ОФИ' },
        { id: 'panathinaikos', name: 'Panathinaikos', nameRu: 'Панатинаикос' }
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
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'detroit-tigers', name: 'Detroit Tigers', nameRu: 'Детройт Тайгерз' },
        { id: 'baltimore-orioles', name: 'Baltimore Orioles', nameRu: 'Балтимор Ориолс' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-2',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'philadelphia-phillies', name: 'Philadelphia Phillies', nameRu: 'Филадельфия Филлис' },
        { id: 'minnesota-twins', name: 'Minnesota Twins', nameRu: 'Миннесота Твинс' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-3',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'pittsburgh-pirates', name: 'Pittsburgh Pirates', nameRu: 'Питтсбург Пайретс' },
        { id: 'houston-astros', name: 'Houston Astros', nameRu: 'Хьюстон Астрос' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-4',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'tampa-bay-rays', name: 'Tampa Bay Rays', nameRu: 'Тампа Бэй Рейс' },
        { id: 'new-york-yankees-1', name: 'New York Yankees', nameRu: 'Нью Йорк Янкиз' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-5',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'boston-red-sox', name: 'Boston Red Sox', nameRu: 'Бостон Рэд Сокс' },
        { id: 'atlanta-braves', name: 'Atlanta Braves', nameRu: 'Атланта Брэйвз' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-6',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:05:00+03:00',
      endsAt: '2026-03-17T23:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'washington-nationals', name: 'Washington Nationals', nameRu: 'Вашингтон Нэшионалс' },
        { id: 'st-louis-cardinals', name: 'St. Louis Cardinals', nameRu: 'Сент Луис Кардиналс' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-7',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T20:10:00+03:00',
      endsAt: '2026-03-17T23:10:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'miami-marlins', name: 'Miami Marlins', nameRu: 'Майами Марлинз' },
        { id: 'new-york-mets', name: 'New York Mets', nameRu: 'Нью Йорк Метс' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-8',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-17T23:05:00+03:00',
      endsAt: '2026-03-18T02:05:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'chicago-white-sox', name: 'Chicago White Sox', nameRu: 'Чикаго Уайт Сокс' },
        { id: 'oakland-athletics', name: 'Oakland Athletics', nameRu: 'Окленд Атлетикс' }
      ]
    },
    {
      id: 'baseball-world-classic-1',
      sportId: 'baseball',
      title: 'Baseball · International · World Classic',
      titleRu: 'Бейсбол · Международные · Мировая Классика',
      startsAt: '2026-03-18T03:00:00+03:00',
      endsAt: '2026-03-18T06:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'usa-baseball', name: 'USA', nameRu: 'США', country: 'United States' },
        { id: 'venezuela-baseball', name: 'Venezuela', nameRu: 'Венесуэла', country: 'Venezuela' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-9',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'chicago-cubs', name: 'Chicago Cubs', nameRu: 'Чикаго Кабс' },
        { id: 'los-angeles-angels', name: 'Los Angeles Angels', nameRu: 'Лос Анджелес Эйнджелз' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-10',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'kansas-city-royals', name: 'Kansas City Royals', nameRu: 'Канзас Сити Роялс' },
        { id: 'los-angeles-dodgers', name: 'Los Angeles Dodgers', nameRu: 'Лос Анджелес Доджерс' }
      ]
    },
    {
      id: 'baseball-mlb-preseason-11',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB. Preseason Games',
      titleRu: 'Бейсбол · США · MLB. Предсезонные игры',
      startsAt: '2026-03-18T04:05:00+03:00',
      endsAt: '2026-03-18T07:05:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'cincinnati-reds', name: 'Cincinnati Reds', nameRu: 'Цинциннати Редз' },
        { id: 'cleveland-guardians', name: 'Cleveland Guardians', nameRu: 'Кливленд Гардианс' }
      ]
    },
    {
      id: 'baseball-mlb-1',
      sportId: 'baseball',
      title: 'Baseball · USA · MLB',
      titleRu: 'Бейсбол · США · MLB',
      startsAt: '2026-03-26T03:05:00+03:00',
      endsAt: '2026-03-26T06:05:00+03:00',
      participants: [
        { id: 'san-francisco-giants', name: 'San Francisco Giants', nameRu: 'Сан Франциско Джайентс' },
        { id: 'new-york-yankees-2', name: 'New York Yankees', nameRu: 'Нью Йорк Янкиз' }
      ]
    }
  ],
  rugby: [
    {
      id: 'rugby-nrl-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-19T12:00:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'canberra-raiders-1', name: 'Canberra Raiders', nameRu: 'Канберра Райдерз' },
        { id: 'canterbury-bulldogs-1', name: 'Canterbury Bulldogs', nameRu: 'Кантербари Булдогс' }
      ]
    },
    {
      id: 'rugby-superleague-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-19T23:00:00+03:00',
      endsAt: '2026-03-20T01:00:00+03:00',
      participants: [
        { id: 'wigan-warriors', name: 'Wigan Warriors', nameRu: 'Уиган Уорриорз' },
        { id: 'york-knights', name: 'York Knights', nameRu: 'Йорк Найтс' }
      ]
    },
    {
      id: 'rugby-super-rugby-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · Super Rugby',
      titleRu: 'Регби · Регби-15 · Супер Регби',
      startsAt: '2026-03-20T09:05:00+03:00',
      endsAt: '2026-03-20T11:05:00+03:00',
      participants: [
        { id: 'highlanders', name: 'Highlanders', nameRu: 'Хайлендерс' },
        { id: 'hurricanes', name: 'Hurricanes', nameRu: 'Харрикейнз' }
      ]
    },
    {
      id: 'rugby-nrl-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-20T10:00:00+03:00',
      endsAt: '2026-03-20T12:00:00+03:00',
      participants: [
        { id: 'sydney-roosters', name: 'Sydney Roosters', nameRu: 'Сидней Рустерс' },
        { id: 'penrith-panthers-1', name: 'Penrith Panthers', nameRu: 'Пенрит Пантерз' }
      ]
    },
    {
      id: 'rugby-super-rugby-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · Super Rugby',
      titleRu: 'Регби · Регби-15 · Супер Регби',
      startsAt: '2026-03-20T11:35:00+03:00',
      endsAt: '2026-03-20T13:35:00+03:00',
      participants: [
        { id: 'brumbies', name: 'Brumbies', nameRu: 'Брамбиз' },
        { id: 'chiefs', name: 'Chiefs', nameRu: 'Чифз' }
      ]
    },
    {
      id: 'rugby-nrl-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-20T12:00:00+03:00',
      endsAt: '2026-03-20T14:00:00+03:00',
      participants: [
        { id: 'melbourne-storm', name: 'Melbourne Storm', nameRu: 'Мельбурн Шторм' },
        { id: 'brisbane-broncos-1', name: 'Brisbane Broncos', nameRu: 'Брисбейн Бронкос' }
      ]
    },
    {
      id: 'rugby-urc-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-20T20:00:00+03:00',
      endsAt: '2026-03-20T22:00:00+03:00',
      participants: [
        { id: 'vodacom-blue-bulls', name: 'Vodacom Blue Bulls', nameRu: 'Водаком Блю Буллз' },
        { id: 'cardiff', name: 'Cardiff', nameRu: 'Кардифф' }
      ]
    },
    {
      id: 'rugby-superleague-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-20T22:00:00+03:00',
      endsAt: '2026-03-21T00:00:00+03:00',
      participants: [
        { id: 'toulouse-olympique-xiii', name: 'Toulouse Olympique XIII', nameRu: 'Тулуза Олимпик XIII' },
        { id: 'saint-helens', name: 'Saint Helens', nameRu: 'Сейнт Эленс' }
      ]
    },
    {
      id: 'rugby-urc-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'ulster', name: 'Ulster', nameRu: 'Алстер' },
        { id: 'connacht', name: 'Connacht', nameRu: 'Коннахт' }
      ]
    },
    {
      id: 'rugby-premiership-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · England. Premiership',
      titleRu: 'Регби · Регби-15 · Англия. Премьер-Лига',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'bath-rugby', name: 'Bath Rugby', nameRu: 'Бат Регби' },
        { id: 'saracens', name: 'Saracens', nameRu: 'Саракенс' }
      ]
    },
    {
      id: 'rugby-urc-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-20T22:45:00+03:00',
      endsAt: '2026-03-21T00:45:00+03:00',
      participants: [
        { id: 'scarlets', name: 'Scarlets', nameRu: 'Скарлетс' },
        { id: 'zebre', name: 'Zebre', nameRu: 'Цебре' }
      ]
    },
    {
      id: 'rugby-superleague-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-20T23:00:00+03:00',
      endsAt: '2026-03-21T01:00:00+03:00',
      participants: [
        { id: 'bradford-bulls', name: 'Bradford Bulls', nameRu: 'Брадфорд Буллс' },
        { id: 'huddersfield-giants', name: 'Huddersfield Giants', nameRu: 'Хаддерсфилд Джайнтс' }
      ]
    },
    {
      id: 'rugby-superleague-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-20T23:00:00+03:00',
      endsAt: '2026-03-21T01:00:00+03:00',
      participants: [
        { id: 'wakefield-trinity', name: 'Wakefield Trinity', nameRu: 'Уэйкфилд Тринити' },
        { id: 'leigh-leopards', name: 'Leigh Leopards', nameRu: 'Ли Леопардс' }
      ]
    },
    {
      id: 'rugby-super-rugby-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · Super Rugby',
      titleRu: 'Регби · Регби-15 · Супер Регби',
      startsAt: '2026-03-21T06:35:00+03:00',
      endsAt: '2026-03-21T08:35:00+03:00',
      participants: [
        { id: 'fijian-drua', name: 'Fijian Drua', nameRu: 'Фиджийская друа' },
        { id: 'queensland-reds', name: 'Queensland Reds', nameRu: 'Квинсленд Редс' }
      ]
    },
    {
      id: 'rugby-nrl-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-21T07:00:00+03:00',
      endsAt: '2026-03-21T09:00:00+03:00',
      participants: [
        { id: 'newcastle-knights-1', name: 'Newcastle Knights', nameRu: 'Ньюкасл Найтс' },
        { id: 'new-zealand-warriors-1', name: 'New Zealand Warriors', nameRu: 'Варриорз Новая Зеландия' }
      ]
    },
    {
      id: 'rugby-super-rugby-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · Super Rugby',
      titleRu: 'Регби · Регби-15 · Супер Регби',
      startsAt: '2026-03-21T09:05:00+03:00',
      endsAt: '2026-03-21T11:05:00+03:00',
      participants: [
        { id: 'moana-pasifika', name: 'Moana Pasifika', nameRu: 'Моана Пасифика' },
        { id: 'crusaders', name: 'Crusaders', nameRu: 'Крусадерс' }
      ]
    },
    {
      id: 'rugby-nrl-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-21T09:30:00+03:00',
      endsAt: '2026-03-21T11:30:00+03:00',
      participants: [
        { id: 'cronulla-sharks-1', name: 'Cronulla Sutherland Sharks', nameRu: 'Кроналла Сазерленд Шаркс' },
        { id: 'dolphins-1', name: 'Dolphins', nameRu: 'Долфинс' }
      ]
    },
    {
      id: 'rugby-super-rugby-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · Super Rugby',
      titleRu: 'Регби · Регби-15 · Супер Регби',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T13:35:00+03:00',
      participants: [
        { id: 'waratahs', name: 'Waratahs', nameRu: 'Варатас' },
        { id: 'blues', name: 'Blues', nameRu: 'Блюз' }
      ]
    },
    {
      id: 'rugby-nrl-6',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T13:35:00+03:00',
      participants: [
        { id: 'south-sydney-rabbitohs', name: 'South Sydney Rabbitohs', nameRu: 'Реббитоз Южный Сидней' },
        { id: 'wests-tigers-1', name: 'Wests Tigers', nameRu: 'Вестс Тайгерз' }
      ]
    },
    {
      id: 'rugby-urc-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-21T15:45:00+03:00',
      endsAt: '2026-03-21T17:45:00+03:00',
      participants: [
        { id: 'lions', name: 'Lions', nameRu: 'Лайонз' },
        { id: 'edinburgh', name: 'Edinburgh', nameRu: 'Эдинбург' }
      ]
    },
    {
      id: 'rugby-top14-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T16:30:00+03:00',
      endsAt: '2026-03-21T18:30:00+03:00',
      participants: [
        { id: 'clermont', name: 'Clermont', nameRu: 'Клермон' },
        { id: 'montpellier-1', name: 'Montpellier', nameRu: 'Монпелье' }
      ]
    },
    {
      id: 'rugby-urc-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'benetton-treviso', name: 'Benetton Treviso', nameRu: 'Бенеттон Тревизо' },
        { id: 'ospreys', name: 'Ospreys', nameRu: 'Оспрейз' }
      ]
    },
    {
      id: 'rugby-superleague-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'warrington-wolves', name: 'Warrington Wolves', nameRu: 'Варрингтон Вулфз' },
        { id: 'castleford-tigers', name: 'Castleford Tigers', nameRu: 'Каслфорд Тайгерз' }
      ]
    },
    {
      id: 'rugby-premiership-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · England. Premiership',
      titleRu: 'Регби · Регби-15 · Англия. Премьер-Лига',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'northampton-saints', name: 'Northampton Saints', nameRu: 'Нортгемптон Сэйнтс' },
        { id: 'newcastle-rad-bulls', name: 'Newcastle Rad Bulls', nameRu: 'Ньюкасл Рад Буллс' }
      ]
    },
    {
      id: 'rugby-premiership-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · England. Premiership',
      titleRu: 'Регби · Регби-15 · Англия. Премьер-Лига',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'harlequins', name: 'Harlequins', nameRu: 'Харлекин' },
        { id: 'gloucester', name: 'Gloucester', nameRu: 'Глостер' }
      ]
    },
    {
      id: 'rugby-urc-6',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'sharks', name: 'Sharks', nameRu: 'Шаркс' },
        { id: 'munster', name: 'Munster', nameRu: 'Манстер' }
      ]
    },
    {
      id: 'rugby-premiership-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · England. Premiership',
      titleRu: 'Регби · Регби-15 · Англия. Премьер-Лига',
      startsAt: '2026-03-21T18:05:00+03:00',
      endsAt: '2026-03-21T20:05:00+03:00',
      participants: [
        { id: 'exeter-chiefs', name: 'Exeter Chiefs', nameRu: 'Эксетер Чифс' },
        { id: 'sale-sharks', name: 'Sale Sharks', nameRu: 'Сейл Шаркс' }
      ]
    },
    {
      id: 'rugby-top14-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'perpignan', name: 'Perpignan', nameRu: 'Перпиньян' },
        { id: 'lyon-ou', name: 'Lyon Olympique Universitaire', nameRu: 'Лион Олимпик Университетер' }
      ]
    },
    {
      id: 'rugby-top14-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'racing-92', name: 'Racing 92', nameRu: 'Расинг 92' },
        { id: 'castres-olympique', name: 'Castres Olympique', nameRu: 'Кастрес Олимпик' }
      ]
    },
    {
      id: 'rugby-top14-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'toulon', name: 'Toulon', nameRu: 'Тулон' },
        { id: 'stade-francais', name: 'Stade Francais Paris', nameRu: 'Стейд Франсе Париж' }
      ]
    },
    {
      id: 'rugby-top14-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T18:35:00+03:00',
      endsAt: '2026-03-21T20:35:00+03:00',
      participants: [
        { id: 'us-montalbanais', name: 'US Montalbanais', nameRu: 'УС Монтальбанайз' },
        { id: 'aviron-bayonne', name: 'Aviron Bayonne', nameRu: 'Авирон Байонне' }
      ]
    },
    {
      id: 'rugby-urc-7',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-21T20:30:00+03:00',
      endsAt: '2026-03-21T22:30:00+03:00',
      participants: [
        { id: 'glasgow-warriors', name: 'Glasgow Warriors', nameRu: 'Глазго Уорриорз' },
        { id: 'leinster', name: 'Leinster', nameRu: 'Ленстер' }
      ]
    },
    {
      id: 'rugby-superleague-6',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-21T20:30:00+03:00',
      endsAt: '2026-03-21T22:30:00+03:00',
      participants: [
        { id: 'catalans-dragons', name: 'Catalans Dragons', nameRu: 'Каталанс Драгонс' },
        { id: 'hull-kr', name: 'Hull Kingston Rovers', nameRu: 'Халл Кингстон Роверс' }
      ]
    },
    {
      id: 'rugby-top14-6',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-21T23:00:00+03:00',
      endsAt: '2026-03-22T01:00:00+03:00',
      participants: [
        { id: 'la-rochelle', name: 'La Rochelle', nameRu: 'Ла Рошелль' },
        { id: 'section-paloise', name: 'Section Paloise', nameRu: 'Сексьон Палуа' }
      ]
    },
    {
      id: 'rugby-nrl-7',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-22T08:05:00+03:00',
      endsAt: '2026-03-22T10:05:00+03:00',
      participants: [
        { id: 'parramatta-eels-1', name: 'Parramatta Eels', nameRu: 'Парраматта Элс' },
        { id: 'st-george-illawarra-1', name: 'St George Illawarra', nameRu: 'Сент Джордж Иллавара' }
      ]
    },
    {
      id: 'rugby-nrl-8',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-22T10:15:00+03:00',
      endsAt: '2026-03-22T12:15:00+03:00',
      participants: [
        { id: 'north-queensland-cowboys-1', name: 'North Queensland Cowboys', nameRu: 'Норт Квинсленд Каубойс' },
        { id: 'gold-coast-titans-1', name: 'Gold Coast Titans', nameRu: 'Голд Кост Титанс' }
      ]
    },
    {
      id: 'rugby-urc-8',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · United Rugby Championship',
      titleRu: 'Регби · Регби-15 · Юнайтед Чемпионшип',
      startsAt: '2026-03-22T16:00:00+03:00',
      endsAt: '2026-03-22T18:00:00+03:00',
      participants: [
        { id: 'stormers', name: 'Stormers', nameRu: 'Стормерз' },
        { id: 'dragons', name: 'Dragons', nameRu: 'Дрэгонс' }
      ]
    },
    {
      id: 'rugby-premiership-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · England. Premiership',
      titleRu: 'Регби · Регби-15 · Англия. Премьер-Лига',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'leicester-tigers', name: 'Leicester Tigers', nameRu: 'Лестер Тайгерз' },
        { id: 'bristol-bears', name: 'Bristol Bears', nameRu: 'Бристоль Бэрс' }
      ]
    },
    {
      id: 'rugby-superleague-7',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · England. Super League',
      titleRu: 'Регби · Регби-13 · Англия. Суперлига',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'hull-fc', name: 'Hull', nameRu: 'Халл' },
        { id: 'leeds-rhinos', name: 'Leeds Rhinos', nameRu: 'Лидс Ринос' }
      ]
    },
    {
      id: 'rugby-top14-7',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Top 14',
      titleRu: 'Регби · Регби-15 · Франция. Топ 14',
      startsAt: '2026-03-22T23:05:00+03:00',
      endsAt: '2026-03-23T01:05:00+03:00',
      participants: [
        { id: 'bordeaux-begles', name: 'Bordeaux Begles', nameRu: 'Бордо Бегль' },
        { id: 'toulouse', name: 'Toulouse', nameRu: 'Тулуза' }
      ]
    },
    {
      id: 'rugby-nrl-9',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-26T12:00:00+03:00',
      endsAt: '2026-03-26T14:00:00+03:00',
      participants: [
        { id: 'manly-sea-eagles', name: 'Manly Sea Eagles', nameRu: 'Мэнли Си Иглз' },
        { id: 'sydney-roosters-2', name: 'Sydney Roosters', nameRu: 'Сидней Рустерс' }
      ]
    },
    {
      id: 'rugby-pro-d2-1',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-26T23:00:00+03:00',
      endsAt: '2026-03-27T01:00:00+03:00',
      participants: [
        { id: 'provence', name: 'Provence', nameRu: 'Прованс' },
        { id: 'colomiers', name: 'Colomiers', nameRu: 'Коломье' }
      ]
    },
    {
      id: 'rugby-nrl-10',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-27T10:00:00+03:00',
      endsAt: '2026-03-27T12:00:00+03:00',
      participants: [
        { id: 'new-zealand-warriors-2', name: 'New Zealand Warriors', nameRu: 'Варриорз Новая Зеландия' },
        { id: 'wests-tigers-2', name: 'Wests Tigers', nameRu: 'Вестс Тайгерз' }
      ]
    },
    {
      id: 'rugby-nrl-11',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-27T12:00:00+03:00',
      endsAt: '2026-03-27T14:00:00+03:00',
      participants: [
        { id: 'brisbane-broncos-2', name: 'Brisbane Broncos', nameRu: 'Брисбейн Бронкос' },
        { id: 'dolphins-2', name: 'Dolphins', nameRu: 'Долфинс' }
      ]
    },
    {
      id: 'rugby-pro-d2-2',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'beziers-herault', name: 'Beziers Herault', nameRu: 'Безье Эро' },
        { id: 'agen', name: 'Agen', nameRu: 'Аген' }
      ]
    },
    {
      id: 'rugby-pro-d2-3',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'vannes', name: 'Vannes', nameRu: 'Ванн' },
        { id: 'uson-nevers', name: 'USON Nevers', nameRu: 'Усон Невер' }
      ]
    },
    {
      id: 'rugby-pro-d2-4',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'dax', name: 'Dax', nameRu: 'Дакс' },
        { id: 'grenoble', name: 'Grenoble', nameRu: 'Гренобль' }
      ]
    },
    {
      id: 'rugby-pro-d2-5',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'carcassonne', name: 'Carcassonne', nameRu: 'Каркассон' },
        { id: 'stade-montois', name: 'Stade Montois', nameRu: 'Стад Монтуа' }
      ]
    },
    {
      id: 'rugby-pro-d2-6',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T21:30:00+03:00',
      endsAt: '2026-03-27T23:30:00+03:00',
      participants: [
        { id: 'stade-aurillacois', name: 'Stade Aurillacois', nameRu: 'Стейд Орийак' },
        { id: 'biarritz', name: 'Biarritz', nameRu: 'Биарриц' }
      ]
    },
    {
      id: 'rugby-pro-d2-7',
      sportId: 'rugby',
      title: 'Rugby · Rugby Union · France. Pro D2',
      titleRu: 'Регби · Регби-15 · Франция. Про Д2',
      startsAt: '2026-03-27T23:00:00+03:00',
      endsAt: '2026-03-28T01:00:00+03:00',
      participants: [
        { id: 'soyaux-angouleme', name: 'Soyaux Angouleme', nameRu: 'Суайо Ангулем' },
        { id: 'brive', name: 'Brive', nameRu: 'Брив' }
      ]
    },
    {
      id: 'rugby-nrl-12',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-28T07:00:00+03:00',
      endsAt: '2026-03-28T09:00:00+03:00',
      participants: [
        { id: 'canterbury-bulldogs-2', name: 'Canterbury Bulldogs', nameRu: 'Кантербари Булдогс' },
        { id: 'newcastle-knights-2', name: 'Newcastle Knights', nameRu: 'Ньюкасл Найтс' }
      ]
    },
    {
      id: 'rugby-nrl-13',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-28T09:30:00+03:00',
      endsAt: '2026-03-28T11:30:00+03:00',
      participants: [
        { id: 'penrith-panthers-2', name: 'Penrith Panthers', nameRu: 'Пенрит Пантерз' },
        { id: 'parramatta-eels-2', name: 'Parramatta Eels', nameRu: 'Парраматта Элс' }
      ]
    },
    {
      id: 'rugby-nrl-14',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-28T11:35:00+03:00',
      endsAt: '2026-03-28T13:35:00+03:00',
      participants: [
        { id: 'north-queensland-cowboys-2', name: 'North Queensland Cowboys', nameRu: 'Норт Квинсленд Каубойс' },
        { id: 'melbourne-storm-2', name: 'Melbourne Storm', nameRu: 'Мельбурн Шторм' }
      ]
    },
    {
      id: 'rugby-nrl-15',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-29T08:05:00+03:00',
      endsAt: '2026-03-29T10:05:00+03:00',
      participants: [
        { id: 'canberra-raiders-2', name: 'Canberra Raiders', nameRu: 'Канберра Райдерз' },
        { id: 'cronulla-sharks-2', name: 'Cronulla Sutherland Sharks', nameRu: 'Кроналла Сазерленд Шаркс' }
      ]
    },
    {
      id: 'rugby-nrl-16',
      sportId: 'rugby',
      title: 'Rugby · Rugby League · NRL',
      titleRu: 'Регби · Регби-13 · NRL',
      startsAt: '2026-03-29T10:15:00+03:00',
      endsAt: '2026-03-29T12:15:00+03:00',
      participants: [
        { id: 'gold-coast-titans-2', name: 'Gold Coast Titans', nameRu: 'Голд Кост Титанс' },
        { id: 'st-george-illawarra-2', name: 'St George Illawarra', nameRu: 'Сент Джордж Иллавара' }
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
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-19T11:30:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'hawthorn-hawks', name: 'Hawthorn Hawks', nameRu: 'Хоторн Хокс' },
        { id: 'sydney-swans', name: 'Sydney Swans', nameRu: 'Сидней Суонс' }
      ]
    },
    {
      id: 'afl-2',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-20T11:40:00+03:00',
      endsAt: '2026-03-20T14:10:00+03:00',
      participants: [
        { id: 'adelaide-crows', name: 'Adelaide Crows', nameRu: 'Аделаида Кроус' },
        { id: 'western-bulldogs', name: 'Western Bulldogs', nameRu: 'Вестерн Буллдогс' }
      ]
    },
    {
      id: 'afl-3',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-21T05:15:00+03:00',
      endsAt: '2026-03-21T07:45:00+03:00',
      participants: [
        { id: 'richmond-tigers', name: 'Richmond Tigers', nameRu: 'Ричмонд Тайгерс' },
        { id: 'gold-coast-suns', name: 'Gold Coast Suns', nameRu: 'Голд Кост Санс' }
      ]
    },
    {
      id: 'afl-4',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-21T08:15:00+03:00',
      endsAt: '2026-03-21T10:45:00+03:00',
      participants: [
        { id: 'gws-giants', name: 'GWS Giants', nameRu: 'ГВС Джайентс' },
        { id: 'st-kilda-saints', name: 'St. Kilda Saints', nameRu: 'Ст. Кильда Сейнтс' }
      ]
    },
    {
      id: 'afl-5',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-21T11:35:00+03:00',
      endsAt: '2026-03-21T14:05:00+03:00',
      participants: [
        { id: 'fremantle-dockers', name: 'Fremantle Dockers', nameRu: 'Фримантл Докерс' },
        { id: 'melbourne-demons', name: 'Melbourne Demons', nameRu: 'Мельбурн Демонс' }
      ]
    },
    {
      id: 'afl-6',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-22T07:15:00+03:00',
      endsAt: '2026-03-22T09:45:00+03:00',
      participants: [
        { id: 'port-adelaide-power', name: 'Port Adelaide Power', nameRu: 'Порт Аделаида Пауэр' },
        { id: 'essendon-bombers', name: 'Essendon Bombers', nameRu: 'Эссендон Бомберс' }
      ]
    },
    {
      id: 'afl-7',
      sportId: 'australian-football',
      title: 'Australian football · Australia · AFL',
      titleRu: 'Австралийский футбол · Австралия · AFL',
      startsAt: '2026-03-22T10:10:00+03:00',
      endsAt: '2026-03-22T12:40:00+03:00',
      participants: [
        { id: 'west-coast-eagles', name: 'West Coast Eagles', nameRu: 'Вест Кост Иглз' },
        { id: 'north-melbourne-kangaroos', name: 'North Melbourne Kangaroos', nameRu: 'Норт Мельбурн Кенгуруз' }
      ]
    }
  ],
  'water-polo': [
    {
      id: 'water-polo-len-euro-cup-1',
      sportId: 'water-polo',
      title: 'Water polo · International Clubs · LEN Euro Cup',
      titleRu: 'Водное поло · Международные. Клубы · LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'bvsc-zuglo', name: 'BVSC Zuglo', nameRu: 'ББСК Зугло' },
        { id: 'orad', name: 'Orad', nameRu: 'Орад' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-2',
      sportId: 'water-polo',
      title: 'Water polo · International Clubs · LEN Euro Cup',
      titleRu: 'Водное поло · Международные. Клубы · LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'primorac-kotor', name: 'VK Primorac Kotor', nameRu: 'ВК Приморац Котор' },
        { id: 'radnicki-kragujevac', name: 'Radnicki Kragujevac', nameRu: 'Раднички Крагуевац' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-3',
      sportId: 'water-polo',
      title: 'Water polo · International Clubs · LEN Euro Cup',
      titleRu: 'Водное поло · Международные. Клубы · LEN Euro Cup',
      startsAt: '2026-03-18T13:00:00+03:00',
      endsAt: '2026-03-18T15:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'marseille', name: 'Marseille', nameRu: 'Марсель' },
        { id: 'sabadell', name: 'Sabadell', nameRu: 'Сабадель' }
      ]
    },
    {
      id: 'water-polo-len-euro-cup-4',
      sportId: 'water-polo',
      title: 'Water polo · International Clubs · LEN Euro Cup',
      titleRu: 'Водное поло · Международные. Клубы · LEN Euro Cup',
      startsAt: '2026-03-19T20:00:00+03:00',
      endsAt: '2026-03-19T22:00:00+03:00',
      participants: [
        { id: 'panathinaikos', name: 'Panathinaikos', nameRu: 'Панатинаикос' },
        { id: 'jadran-split', name: 'Jadran Split', nameRu: 'Ядран Сплит' }
      ]
    }
  ],
  handball: [
    {
      id: 'handball-hungary-1',
      sportId: 'handball',
      title: 'Handball · Hungary · NB I. Women',
      titleRu: 'Гандбол · Венгрия · NB I. Женщины',
      startsAt: '2026-03-17T20:00:00+03:00',
      endsAt: '2026-03-17T22:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'dvsc-w', name: 'DVSC (W)', nameRu: 'ДВСК (ж)' },
        { id: 'moyra-budaors-w', name: 'Moyra Budaors (W)', nameRu: 'Мойра Будаорш (ж)' }
      ]
    },
    {
      id: 'handball-sweden-1',
      sportId: 'handball',
      title: 'Handball · Sweden · Allsvenskan',
      titleRu: 'Гандбол · Швеция · Аллсвенскан',
      startsAt: '2026-03-17T21:00:00+03:00',
      endsAt: '2026-03-17T23:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'tyreso', name: 'Tyreso', nameRu: 'Тюресё' },
        { id: 'aranas', name: 'Aranas', nameRu: 'Аранас' }
      ]
    },
    {
      id: 'handball-norway-1',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'baerum-w', name: 'Baerum (W)', nameRu: 'Берум (ж)' },
        { id: 'fana-w', name: 'Fana (W)', nameRu: 'Фана (ж)' }
      ]
    },
    {
      id: 'handball-norway-2',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'byasen-w', name: 'Byasen (W)', nameRu: 'Бьясен (ж)' },
        { id: 'fredrikstad-w', name: 'Fredrikstad (W)', nameRu: 'Фредрикстад (ж)' }
      ]
    },
    {
      id: 'handball-norway-3',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'larvik-w', name: 'Larvik (W)', nameRu: 'Ларвик (ж)' },
        { id: 'oppsal-w', name: 'Oppsal (W)', nameRu: 'Опсаль (ж)' }
      ]
    },
    {
      id: 'handball-norway-4',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'molde-w', name: 'Molde (W)', nameRu: 'Мельде (ж)' },
        { id: 'fjellhammer-w', name: 'Fjellhammer (W)', nameRu: 'Фьелхаммер (ж)' }
      ]
    },
    {
      id: 'handball-norway-5',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:00:00+03:00',
      endsAt: '2026-03-18T22:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'tertnes-w', name: 'Tertnes (W)', nameRu: 'Тертнес (ж)' },
        { id: 'relingen-w', name: 'Relingen (W)', nameRu: 'Релинген (ж)' }
      ]
    },
    {
      id: 'handball-norway-6',
      sportId: 'handball',
      title: 'Handball · Norway · Eliteserien. Women',
      titleRu: 'Гандбол · Норвегия · Элитсерия. Женщины',
      startsAt: '2026-03-18T20:15:00+03:00',
      endsAt: '2026-03-18T22:15:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'storhamar-w', name: 'Storhamar (W)', nameRu: 'Сторхамар (ж)' },
        { id: 'sola-w', name: 'Sola (W)', nameRu: 'Сола (ж)' }
      ]
    },
    {
      id: 'handball-denmark-1',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'bjerringbro-w', name: 'Bjerringbro (W)', nameRu: 'Бьеррингбро (ж)' },
        { id: 'esbjerg-domestic-w', name: 'Esbjerg (W)', nameRu: 'Эсбьерг (ж)' }
      ]
    },
    {
      id: 'handball-denmark-2',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'viborg-w', name: 'Viborg (W)', nameRu: 'Виборг (ж)' },
        { id: 'hoj-elite-w', name: 'Hoj Elite (W)', nameRu: 'Хой Элит (ж)' }
      ]
    },
    {
      id: 'handball-denmark-3',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'nykobing-w', name: 'Nykobing (W)', nameRu: 'Нюкебинг (ж)' },
        { id: 'skanderborg-domestic-w', name: 'Skanderborg (W)', nameRu: 'Скандерборг (ж)' }
      ]
    },
    {
      id: 'handball-sweden-2',
      sportId: 'handball',
      title: 'Handball · Sweden · Allsvenskan',
      titleRu: 'Гандбол · Швеция · Аллсвенскан',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'skanela-if', name: 'Skanela IF', nameRu: 'Сканела ИФ' },
        { id: 'sk-tumba', name: 'SK Tumba', nameRu: 'СК Тумба' }
      ]
    },
    {
      id: 'handball-germany-1',
      sportId: 'handball',
      title: 'Handball · Germany · Bundesliga. Women',
      titleRu: 'Гандбол · Германия · Бундеслига. Женщины',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'frisch-auf-goppingen-w', name: 'Frisch Auf Goppingen (W)', nameRu: 'Фриш Гёппинген (ж)' },
        { id: 'borussia-dortmund-domestic-w', name: 'Borussia Dortmund (W)', nameRu: 'Боруссия Дортмунд (ж)' }
      ]
    },
    {
      id: 'handball-germany-2',
      sportId: 'handball',
      title: 'Handball · Germany · Bundesliga. Women',
      titleRu: 'Гандбол · Германия · Бундеслига. Женщины',
      startsAt: '2026-03-18T21:00:00+03:00',
      endsAt: '2026-03-18T23:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'union-halle-neustadt-w', name: 'Union Halle-Neustadt (W)', nameRu: 'Юнион Галле Ньоштадт (ж)' },
        { id: 'bensheim-auerbach-w', name: 'Bensheim Auerbach (W)', nameRu: 'Беншайм Аурбах (ж)' }
      ]
    },
    {
      id: 'handball-denmark-4',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-18T22:00:00+03:00',
      endsAt: '2026-03-19T00:00:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'horsens-w', name: 'Horsens (W)', nameRu: 'Хорсенс (ж)' },
        { id: 'copenhagen-w', name: 'Copenhagen (W)', nameRu: 'Копенгаген (ж)' }
      ]
    },
    {
      id: 'handball-poland-1',
      sportId: 'handball',
      title: 'Handball · Poland · Superliga. Women',
      titleRu: 'Гандбол · Польша · Суперлига. Женщины',
      startsAt: '2026-03-18T22:30:00+03:00',
      endsAt: '2026-03-19T00:30:00+03:00',
      displayDateEn: 'Tomorrow at',
      displayDateRu: 'Завтра в',
      participants: [
        { id: 'zaglebie-lubin-w', name: 'Zaglebie Lubin (W)', nameRu: 'Заглембе Любин (ж)' },
        { id: 'mks-piotrcovia-w', name: 'MKS Piotrcovia (W)', nameRu: 'МКС Петроковия (ж)' }
      ]
    },
    {
      id: 'handball-korea-1',
      sportId: 'handball',
      title: 'Handball · South Korea · National League. Women',
      titleRu: 'Гандбол · Южная Корея · Национальная лига. Женщины',
      startsAt: '2026-03-19T12:00:00+03:00',
      endsAt: '2026-03-19T14:00:00+03:00',
      participants: [
        { id: 'busan-w', name: 'Busan (W)', nameRu: 'Пусан (ж)' },
        { id: 'gyeongnam-w', name: 'Gyeongnam (W)', nameRu: 'Кённам (ж)' }
      ]
    },
    {
      id: 'handball-korea-2',
      sportId: 'handball',
      title: 'Handball · South Korea · National League. Women',
      titleRu: 'Гандбол · Южная Корея · Национальная лига. Женщины',
      startsAt: '2026-03-19T14:00:00+03:00',
      endsAt: '2026-03-19T16:00:00+03:00',
      participants: [
        { id: 'incheon-w', name: 'Incheon (W)', nameRu: 'Инчхон (ж)' },
        { id: 'seoul-w', name: 'Seoul (W)', nameRu: 'Сеул (ж)' }
      ]
    },
    {
      id: 'handball-poland-2',
      sportId: 'handball',
      title: 'Handball · Poland · Superliga. Women',
      titleRu: 'Гандбол · Польша · Суперлига. Женщины',
      startsAt: '2026-03-19T20:00:00+03:00',
      endsAt: '2026-03-19T22:00:00+03:00',
      participants: [
        { id: 'energa-koszalin-w', name: 'Energa Koszalin (W)', nameRu: 'Энерга Кошалин (ж)' },
        { id: 'gmina-kobierzyce-w', name: 'Gmina Kobierzyce (W)', nameRu: 'Гмина Кобежице (ж)' }
      ]
    },
    {
      id: 'handball-denmark-5',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-19T21:00:00+03:00',
      endsAt: '2026-03-19T23:00:00+03:00',
      participants: [
        { id: 'sonderjyske-w', name: 'Sonderjyske (W)', nameRu: 'Сендерюске (ж)' },
        { id: 'herning-ikast-domestic-w', name: 'Herning Ikast (W)', nameRu: 'Хернинг Икаст (ж)' }
      ]
    },
    {
      id: 'handball-denmark-6',
      sportId: 'handball',
      title: 'Handball · Denmark · Top League. Women',
      titleRu: 'Гандбол · Дания · Высшая лига. Женщины',
      startsAt: '2026-03-20T20:30:00+03:00',
      endsAt: '2026-03-20T22:30:00+03:00',
      participants: [
        { id: 'silkeborg-voel-w', name: 'Silkeborg-Voel (W)', nameRu: 'Силькеборг Воэль (ж)' },
        { id: 'eh-aalborg-w', name: 'EH Aalborg (W)', nameRu: 'EH Ольборг (ж)' }
      ]
    },
    {
      id: 'handball-cl-1',
      sportId: 'handball',
      title: 'Handball · International Clubs · Champions League 2025/2026',
      titleRu: 'Гандбол · Международные. Клубы · Лига чемпионов 2025/2026',
      startsAt: '2026-03-21T18:00:00+03:00',
      endsAt: '2026-03-21T20:00:00+03:00',
      participants: [
        { id: 'podravka-vegeta-w', name: 'Podravka Vegeta (W)', nameRu: 'Подравка Вегета (ж)' },
        { id: 'esbjerg-cl-w', name: 'Esbjerg (W)', nameRu: 'Эсбьерг (ж)' }
      ]
    },
    {
      id: 'handball-cl-2',
      sportId: 'handball',
      title: 'Handball · International Clubs · Champions League 2025/2026',
      titleRu: 'Гандбол · Международные. Клубы · Лига чемпионов 2025/2026',
      startsAt: '2026-03-21T20:00:00+03:00',
      endsAt: '2026-03-21T22:00:00+03:00',
      participants: [
        { id: 'dvsc-cl-w', name: 'DVSC (W)', nameRu: 'ДВСК (ж)' },
        { id: 'odense-w', name: 'Odense (W)', nameRu: 'ДХГ Оденсе (ж)' }
      ]
    },
    {
      id: 'handball-cl-3',
      sportId: 'handball',
      title: 'Handball · International Clubs · Champions League 2025/2026',
      titleRu: 'Гандбол · Международные. Клубы · Лига чемпионов 2025/2026',
      startsAt: '2026-03-22T16:00:00+03:00',
      endsAt: '2026-03-22T18:00:00+03:00',
      participants: [
        { id: 'borussia-dortmund-cl-w', name: 'Borussia Dortmund (W)', nameRu: 'Боруссия Дортмунд (ж)' },
        { id: 'ferencvaros-w', name: 'Ferencvaros (W)', nameRu: 'Ференцварош (ж)' }
      ]
    },
    {
      id: 'handball-cl-4',
      sportId: 'handball',
      title: 'Handball · International Clubs · Champions League 2025/2026',
      titleRu: 'Гандбол · Международные. Клубы · Лига чемпионов 2025/2026',
      startsAt: '2026-03-22T18:00:00+03:00',
      endsAt: '2026-03-22T20:00:00+03:00',
      participants: [
        { id: 'herning-ikast-cl-w', name: 'Herning Ikast (W)', nameRu: 'Хернинг Икаст (ж)' },
        { id: 'gloria-bistrita-w', name: 'Gloria Bistrita Nasaud (W)', nameRu: 'Глория Бистрица Нэсэуд (ж)' }
      ]
    },
    {
      id: 'handball-ehf-europe-1',
      sportId: 'handball',
      title: 'Handball · International Clubs · EHF European League',
      titleRu: 'Гандбол · Международные. Клубы · Лига Европы ЕГФ',
      startsAt: '2026-03-31T19:45:00+03:00',
      endsAt: '2026-03-31T21:15:00+03:00',
      participants: [
        { id: 'kristianstad', name: 'Kristianstad', nameRu: 'Кристианстад' },
        { id: 'nasic-nexe', name: 'Nasic Nexe', nameRu: 'Насич Некс' }
      ]
    },
    {
      id: 'handball-ehf-europe-2',
      sportId: 'handball',
      title: 'Handball · International Clubs · EHF European League',
      titleRu: 'Гандбол · Международные. Клубы · Лига Европы ЕГФ',
      startsAt: '2026-03-31T19:45:00+03:00',
      endsAt: '2026-03-31T21:15:00+03:00',
      participants: [
        { id: 'skanderborg-ehf', name: 'Skanderborg', nameRu: 'Скандерборг' },
        { id: 'flensburg-handewitt', name: 'Flensburg-Handewitt', nameRu: 'Фленсбург Хандэвиит' }
      ]
    },
    {
      id: 'handball-ehf-europe-3',
      sportId: 'handball',
      title: 'Handball · International Clubs · EHF European League',
      titleRu: 'Гандбол · Международные. Клубы · Лига Европы ЕГФ',
      startsAt: '2026-03-31T21:45:00+03:00',
      endsAt: '2026-03-31T23:15:00+03:00',
      participants: [
        { id: 'montpellier', name: 'Montpellier', nameRu: 'Монпелье' },
        { id: 'elverum', name: 'Elverum', nameRu: 'Эльверум' }
      ]
    },
    {
      id: 'handball-ehf-europe-4',
      sportId: 'handball',
      title: 'Handball · International Clubs · EHF European League',
      titleRu: 'Гандбол · Международные. Клубы · Лига Европы ЕГФ',
      startsAt: '2026-03-31T21:45:00+03:00',
      endsAt: '2026-03-31T23:15:00+03:00',
      participants: [
        { id: 'fredericia-1990', name: 'Fredericia 1990', nameRu: 'Фредерисия 1990' },
        { id: 'melsungen', name: 'Melsungen', nameRu: 'Мельзунген' }
      ]
    }
  ],
  darts: [
    {
      id: 'darts-modus-1',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T12:00:00+03:00',
      endsAt: '2026-03-17T13:30:00+03:00',
      displayDateEn: 'Live',
      displayDateRu: 'Live',
      displayTimeEn: 'In play',
      displayTimeRu: 'В игре',
      participants: [
        { id: 'cottiss-k', name: 'Cottiss K.', nameRu: 'Коттисс К.', country: 'England' },
        { id: 'walker-j', name: 'Walker J.', nameRu: 'Уолкер Дж.', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-2',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T15:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'spee-a-1', name: 'Spee A.', nameRu: 'Шпее А.', country: 'Netherlands' },
        { id: 'hunt-joe-1', name: 'Hunt, Joe', nameRu: 'Hunt, Joe', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-3',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T14:45:00+03:00',
      endsAt: '2026-03-17T15:15:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'drayton-jack-1', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' },
        { id: 'hunt-a-1', name: 'Hunt A.', nameRu: 'Хант А.', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-4',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T15:05:00+03:00',
      endsAt: '2026-03-17T15:35:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'spee-a-2', name: 'Spee A.', nameRu: 'Шпее А.', country: 'Netherlands' },
        { id: 'cottiss-kevin-1', name: 'Cottiss, Kevin', nameRu: 'Cottiss, Kevin', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-5',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T15:20:00+03:00',
      endsAt: '2026-03-17T15:50:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'walker-j-2', name: 'Walker J.', nameRu: 'Уолкер Дж.', country: 'England' },
        { id: 'drayton-jack-2', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-6',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T15:55:00+03:00',
      endsAt: '2026-03-17T16:25:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'drayton-jack-3', name: 'Drayton, Jack', nameRu: 'Drayton, Jack', country: 'England' },
        { id: 'spee-a-3', name: 'Spee A.', nameRu: 'Шпее А.', country: 'Netherlands' }
      ]
    },
    {
      id: 'darts-modus-7',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T16:15:00+03:00',
      endsAt: '2026-03-17T16:45:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'cottiss-kevin-2', name: 'Cottiss, Kevin', nameRu: 'Cottiss, Kevin', country: 'England' },
        { id: 'hunt-joe-2', name: 'Hunt, Joe', nameRu: 'Hunt, Joe', country: 'England' }
      ]
    },
    {
      id: 'darts-modus-8',
      sportId: 'darts',
      title: 'Darts · International · Modus Super Series',
      titleRu: 'Дартс · Международные · Modus Super Series',
      startsAt: '2026-03-17T16:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      displayDateEn: 'Today at',
      displayDateRu: 'Сегодня в',
      participants: [
        { id: 'hunt-a-2', name: 'Hunt A.', nameRu: 'Хант А.', country: 'England' },
        { id: 'walker-j-3', name: 'Walker J.', nameRu: 'Уолкер Дж.', country: 'England' }
      ]
    },
    {
      id: 'darts-premier-league-1',
      sportId: 'darts',
      title: 'Darts · International · Premier League',
      titleRu: 'Дартс · Международные · Премьер-Лига',
      startsAt: '2026-03-19T22:15:00+03:00',
      endsAt: '2026-03-19T22:45:00+03:00',
      participants: [
        { id: 'van-vin', name: 'Van Vin J.', nameRu: 'Ван Вин Дж.', country: 'Netherlands' },
        { id: 'van-gerven', name: 'Van Gerven M.', nameRu: 'Ван Гервен М.', country: 'Netherlands' }
      ]
    },
    {
      id: 'darts-premier-league-2',
      sportId: 'darts',
      title: 'Darts · International · Premier League',
      titleRu: 'Дартс · Международные · Премьер-Лига',
      startsAt: '2026-03-19T22:45:00+03:00',
      endsAt: '2026-03-19T23:15:00+03:00',
      participants: [
        { id: 'bunting', name: 'Bunting S.', nameRu: 'Бантинг С.', country: 'England' },
        { id: 'littler', name: 'Littler L.', nameRu: 'Литтлер Л.', country: 'England' }
      ]
    },
    {
      id: 'darts-premier-league-3',
      sportId: 'darts',
      title: 'Darts · International · Premier League',
      titleRu: 'Дартс · Международные · Премьер-Лига',
      startsAt: '2026-03-19T23:15:00+03:00',
      endsAt: '2026-03-19T23:45:00+03:00',
      participants: [
        { id: 'rock', name: 'Rock J.', nameRu: 'Рок Дж.', country: 'United Kingdom' },
        { id: 'price', name: 'Price G.', nameRu: 'Прайс Г.', country: 'Wales' }
      ]
    },
    {
      id: 'darts-premier-league-4',
      sportId: 'darts',
      title: 'Darts · International · Premier League',
      titleRu: 'Дартс · Международные · Премьер-Лига',
      startsAt: '2026-03-19T23:45:00+03:00',
      endsAt: '2026-03-20T00:15:00+03:00',
      participants: [
        { id: 'clayton', name: 'Clayton J.', nameRu: 'Клейтон Дж.', country: 'Wales' },
        { id: 'humphries', name: 'Humphries L.', nameRu: 'Хамфрис Л.', country: 'England' }
      ]
    }
  ],
  cricket: [
    {
      id: 'cricket-ipl-1',
      sportId: 'cricket',
      title: 'Cricket · India · Premier League',
      titleRu: 'Крикет · Индия · Премьер-Лига',
      startsAt: '2026-03-28T17:00:00+03:00',
      endsAt: '2026-03-28T21:00:00+03:00',
      participants: [
        { id: 'rcb', name: 'Royal Challengers Bangalore', nameRu: 'Роял Челленджерс Бангалор' },
        { id: 'srh', name: 'Sunrisers Hyderabad', nameRu: 'Санрайзерс Хайдарабад' }
      ]
    },
    {
      id: 'cricket-ipl-2',
      sportId: 'cricket',
      title: 'Cricket · India · Premier League',
      titleRu: 'Крикет · Индия · Премьер-Лига',
      startsAt: '2026-03-29T17:00:00+03:00',
      endsAt: '2026-03-29T21:00:00+03:00',
      participants: [
        { id: 'mi', name: 'Mumbai Indians', nameRu: 'Мумбаи Индианс' },
        { id: 'kkr', name: 'Kolkata Knight Riders', nameRu: 'Колката Найт Райдерз' }
      ]
    },
    {
      id: 'cricket-ipl-3',
      sportId: 'cricket',
      title: 'Cricket · India · Premier League',
      titleRu: 'Крикет · Индия · Премьер-Лига',
      startsAt: '2026-03-30T17:00:00+03:00',
      endsAt: '2026-03-30T21:00:00+03:00',
      participants: [
        { id: 'rr', name: 'Rajasthan Royals', nameRu: 'Раджастан Роялс' },
        { id: 'csk', name: 'Chennai Super Kings', nameRu: 'Ченнаи Супер Кингз' }
      ]
    },
    {
      id: 'cricket-ipl-4',
      sportId: 'cricket',
      title: 'Cricket · India · Premier League',
      titleRu: 'Крикет · Индия · Премьер-Лига',
      startsAt: '2026-03-31T17:00:00+03:00',
      endsAt: '2026-03-31T21:00:00+03:00',
      participants: [
        { id: 'pbks', name: 'Punjab Kings', nameRu: 'Пенджаб Кингз' },
        { id: 'gt', name: 'Gujarat Titans', nameRu: 'Гуджарат Титанс' }
      ]
    },
    {
      id: 'cricket-ipl-5',
      sportId: 'cricket',
      title: 'Cricket · India · Premier League',
      titleRu: 'Крикет · Индия · Премьер-Лига',
      startsAt: '2026-04-01T17:00:00+03:00',
      endsAt: '2026-04-01T21:00:00+03:00',
      participants: [
        { id: 'lsg', name: 'Lucknow Super Giants', nameRu: 'Лакхнау Супер Джайантс' },
        { id: 'dc', name: 'Delhi Capitals', nameRu: 'Дели Кэпиталс' }
      ]
    }
  ],
  curling: [
    {
      id: 'curling-worlds-women-1',
      sportId: 'curling',
      title: 'Curling · National teams · World Championship 2026. Women. Canada',
      titleRu: 'Кёрлинг · Сборные · ЧМ-2026. Женщины. Канада',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'japan-women', name: 'Japan (W)', nameRu: 'Япония (ж)', country: 'Japan' },
        { id: 'australia-women', name: 'Australia (W)', nameRu: 'Австралия (ж)', country: 'Australia' }
      ]
    },
    {
      id: 'curling-worlds-women-2',
      sportId: 'curling',
      title: 'Curling · National teams · World Championship 2026. Women. Canada',
      titleRu: 'Кёрлинг · Сборные · ЧМ-2026. Женщины. Канада',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'italy-women', name: 'Italy (W)', nameRu: 'Италия (ж)', country: 'Italy' },
        { id: 'canada-women', name: 'Canada (W)', nameRu: 'Канада (ж)', country: 'Canada' }
      ]
    },
    {
      id: 'curling-worlds-women-3',
      sportId: 'curling',
      title: 'Curling · National teams · World Championship 2026. Women. Canada',
      titleRu: 'Кёрлинг · Сборные · ЧМ-2026. Женщины. Канада',
      startsAt: '2026-03-17T18:00:00+03:00',
      endsAt: '2026-03-17T20:30:00+03:00',
      participants: [
        { id: 'sweden-women', name: 'Sweden (W)', nameRu: 'Швеция (ж)', country: 'Sweden' },
        { id: 'scotland-women', name: 'Scotland (W)', nameRu: 'Шотландия (ж)', country: 'Scotland' }
      ]
    }
  ],
  snooker: [
    {
      id: 'snooker-world-open-1',
      sportId: 'snooker',
      title: 'Snooker · International · World Open. Yushan',
      titleRu: 'Снукер · Международные · World Open. Юшань',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'yao-pengcheng', name: 'Yao Pengcheng', nameRu: 'Пэнъчэн Яо', country: 'China' },
        { id: 'craigie', name: 'Craigie S.', nameRu: 'Крейги С.', country: 'England' }
      ]
    },
    {
      id: 'snooker-world-open-2',
      sportId: 'snooker',
      title: 'Snooker · International · World Open. Yushan',
      titleRu: 'Снукер · Международные · World Open. Юшань',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'walden', name: 'Walden R.', nameRu: 'Уолден Р.', country: 'England' },
        { id: 'williams', name: 'Williams M.', nameRu: 'Уильямс М.', country: 'Wales' }
      ]
    },
    {
      id: 'snooker-world-open-3',
      sportId: 'snooker',
      title: 'Snooker · International · World Open. Yushan',
      titleRu: 'Снукер · Международные · World Open. Юшань',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'hill', name: 'Hill A.', nameRu: 'Хилл А.', country: 'Ireland' },
        { id: 'wilson', name: 'Wilson G.', nameRu: 'Уилсон Г.', country: 'England' }
      ]
    },
    {
      id: 'snooker-world-open-4',
      sportId: 'snooker',
      title: 'Snooker · International · World Open. Yushan',
      titleRu: 'Снукер · Международные · World Open. Юшань',
      startsAt: '2026-03-17T14:30:00+03:00',
      endsAt: '2026-03-17T17:00:00+03:00',
      participants: [
        { id: 'zhuang', name: 'Zhuang L.', nameRu: 'Чжуанг Л.', country: 'China' },
        { id: 'zhao-xintong', name: 'Zhao Xintong', nameRu: 'Чжао Синьтун', country: 'China' }
      ]
    }
  ],
  futsal: [
    {
      id: 'futsal-russia-superleague-1',
      sportId: 'futsal',
      title: 'Futsal · Russia · Super League',
      titleRu: 'Футзал · Россия · Суперлига',
      startsAt: '2026-03-19T17:00:00+03:00',
      endsAt: '2026-03-19T19:00:00+03:00',
      participants: [
        { id: 'sinara', name: 'Sinara', nameRu: 'Синара', country: 'Russia' },
        { id: 'fakel', name: 'Fakel', nameRu: 'Факел', country: 'Russia' }
      ]
    },
    {
      id: 'futsal-russia-superleague-2',
      sportId: 'futsal',
      title: 'Futsal · Russia · Super League',
      titleRu: 'Футзал · Россия · Суперлига',
      startsAt: '2026-03-20T16:30:00+03:00',
      endsAt: '2026-03-20T18:30:00+03:00',
      participants: [
        { id: 'gazprom-ugra', name: 'Gazprom-Ugra', nameRu: 'Газпром-Югра', country: 'Russia' },
        { id: 'norilsk-nickel', name: 'Norilsk Nickel', nameRu: 'Норильский Никель', country: 'Russia' }
      ]
    },
    {
      id: 'futsal-russia-superleague-3',
      sportId: 'futsal',
      title: 'Futsal · Russia · Super League',
      titleRu: 'Футзал · Россия · Суперлига',
      startsAt: '2026-03-20T19:00:00+03:00',
      endsAt: '2026-03-20T21:00:00+03:00',
      participants: [
        { id: 'novaya-generatsiya', name: 'Novaya Generatsiya', nameRu: 'Новая Генерация', country: 'Russia' },
        { id: 'torpedo-nn', name: 'Torpedo NN', nameRu: 'Торпедо НН', country: 'Russia' }
      ]
    }
  ],
  'field-hockey': [
    {
      id: 'bandy-russia-superleague-1',
      sportId: 'field-hockey',
      title: 'Bandy · Russia · Super League',
      titleRu: 'Хоккей с мячом · Россия · Суперлига',
      startsAt: '2026-03-20T12:00:00+03:00',
      endsAt: '2026-03-20T14:00:00+03:00',
      participants: [
        { id: 'kuzbass', name: 'Kuzbass', nameRu: 'Кузбасс', country: 'Russia' },
        { id: 'vodnik', name: 'Vodnik', nameRu: 'Водник', country: 'Russia' }
      ]
    },
    {
      id: 'bandy-russia-superleague-2',
      sportId: 'field-hockey',
      title: 'Bandy · Russia · Super League',
      titleRu: 'Хоккей с мячом · Россия · Суперлига',
      startsAt: '2026-03-21T10:00:00+03:00',
      endsAt: '2026-03-21T12:00:00+03:00',
      participants: [
        { id: 'ska-neftyanik', name: 'SKA-Neftyanik', nameRu: 'СКА Нефтяник', country: 'Russia' },
        { id: 'dynamo-moscow', name: 'Dynamo Moscow', nameRu: 'Динамо Москва', country: 'Russia' }
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





