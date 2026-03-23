export type SportIconKind =
  | 'football'
  | 'hockey'
  | 'tennis'
  | 'table-tennis'
  | 'basketball'
  | 'esports'
  | 'volleyball'
  | 'martial-arts'
  | 'boxing'
  | 'baseball'
  | 'rugby'
  | 'formula1'
  | 'australian-football'
  | 'water-polo'
  | 'handball'
  | 'darts'
  | 'cricket'
  | 'curling'
  | 'snooker'
  | 'field-hockey';

export interface SportOption {
  id: string;
  label: string;
  labelRu: string;
  icon: SportIconKind;
  live?: boolean;
  info?: boolean;
}

export const sportOptions: SportOption[] = [
  { id: 'football', label: 'Football', labelRu: 'Футбол', icon: 'football', live: true },
  { id: 'hockey', label: 'Hockey', labelRu: 'Хоккей', icon: 'hockey', live: true },
  { id: 'tennis', label: 'Tennis', labelRu: 'Теннис', icon: 'tennis' },
  { id: 'table-tennis', label: 'Table tennis', labelRu: 'Настольный теннис', icon: 'table-tennis', live: true },
  { id: 'basketball', label: 'Basketball', labelRu: 'Баскетбол', icon: 'basketball', live: true },
  { id: 'cybersport', label: 'Cybersport', labelRu: 'Киберспорт', icon: 'esports', live: true },
  { id: 'volleyball', label: 'Volleyball', labelRu: 'Волейбол', icon: 'volleyball', live: true },
  { id: 'martial-arts', label: 'Martial arts', labelRu: 'Единоборства', icon: 'martial-arts', info: true },
  { id: 'boxing', label: 'Boxing', labelRu: 'Бокс', icon: 'boxing' },
  { id: 'baseball', label: 'Baseball', labelRu: 'Бейсбол', icon: 'baseball' },
  { id: 'rugby', label: 'Rugby', labelRu: 'Регби', icon: 'rugby' },
  { id: 'formula1', label: 'Formula 1', labelRu: 'Формула 1', icon: 'formula1' },
  { id: 'australian-football', label: 'Australian football', labelRu: 'Австралийский футбол', icon: 'australian-football' },
  { id: 'water-polo', label: 'Water polo', labelRu: 'Водное поло', icon: 'water-polo' },
  { id: 'handball', label: 'Handball', labelRu: 'Гандбол', icon: 'handball' },
  { id: 'darts', label: 'Darts', labelRu: 'Дартс', icon: 'darts' },
  { id: 'cricket', label: 'Cricket', labelRu: 'Крикет', icon: 'cricket' },
  { id: 'curling', label: 'Curling', labelRu: 'Кёрлинг', icon: 'curling' },
  { id: 'snooker', label: 'Snooker', labelRu: 'Снукер', icon: 'snooker', live: true },
  { id: 'futsal', label: 'Futsal', labelRu: 'Футзал', icon: 'football' },
  { id: 'field-hockey', label: 'Bandy', labelRu: 'Хоккей с мячом', icon: 'field-hockey' }
];

export const prioritySportIds = ['football', 'hockey', 'basketball', 'martial-arts', 'boxing', 'formula1'] as const;

const sportAliases: Record<string, string> = {
  esport: 'cybersport'
};

export function normalizeSportId(id: string) {
  return sportAliases[id] ?? id;
}

export function getSportById(id: string) {
  return sportOptions.find((sport) => sport.id === normalizeSportId(id));
}

export function getSportHref(id: string) {
  const normalizedId = normalizeSportId(id);
  return normalizedId === 'martial-arts' ? '/sports/martial-arts' : `/sports/${normalizedId}`;
}
