import { getCountryFlagVisual } from '@/lib/flags';
import type { SportEventParticipant } from '@/types';

type ParticipantAssetVisual = {
  type: 'asset';
  src: string;
  alt: string;
  fit: 'contain' | 'cover';
};

type ParticipantEmojiVisual = {
  type: 'emoji';
  value: string;
};

type ParticipantVisual = ParticipantAssetVisual | ParticipantEmojiVisual | null;

const participantVisualRegistry: Record<string, ParticipantAssetVisual> = {
  lanus: {
    type: 'asset',
    src: '/team-logos/lanus.svg',
    alt: 'Lanus',
    fit: 'contain',
  },
  'newells-old-boys': {
    type: 'asset',
    src: '/team-logos/newells-old-boys.svg',
    alt: "Newell's Old Boys",
    fit: 'contain',
  },
  'gimnasia-mendoza': {
    type: 'asset',
    src: '/team-logos/gimnasia-mendoza.svg',
    alt: 'Gimnasia y Esgrima Mendoza',
    fit: 'contain',
  },
  'estudiantes-la-plata': {
    type: 'asset',
    src: '/team-logos/estudiantes-la-plata.svg',
    alt: 'Estudiantes La Plata',
    fit: 'contain',
  },
  'central-cordoba-sde': {
    type: 'asset',
    src: '/team-logos/central-cordoba-sde.svg',
    alt: 'Central Cordoba SdE',
    fit: 'contain',
  },
  'deportivo-riesta': {
    type: 'asset',
    src: '/team-logos/deportivo-riestra.svg',
    alt: 'Deportivo Riestra',
    fit: 'contain',
  },
  'nova-iguacu': {
    type: 'asset',
    src: '/team-logos/nova-iguacu.svg',
    alt: 'Nova Iguacu',
    fit: 'contain',
  },
  fortaleza: {
    type: 'asset',
    src: '/team-logos/fortaleza.svg',
    alt: 'Fortaleza',
    fit: 'contain',
  },
  'sao-bernardo': {
    type: 'asset',
    src: '/team-logos/sao-bernardo.svg',
    alt: 'Sao Bernardo',
    fit: 'contain',
  },
  ceara: {
    type: 'asset',
    src: '/team-logos/ceara.svg',
    alt: 'Ceara',
    fit: 'contain',
  },
  'sport-recife': {
    type: 'asset',
    src: '/team-logos/sport-recife.svg',
    alt: 'Sport Recife',
    fit: 'contain',
  },
  'boston-bruins': {
    type: 'asset',
    src: '/team-logos/boston-bruins.svg',
    alt: 'Boston Bruins',
    fit: 'contain',
  },
  'winnipeg-jets': {
    type: 'asset',
    src: '/team-logos/winnipeg-jets.svg',
    alt: 'Winnipeg Jets',
    fit: 'contain',
  },
  'carolina-hurricanes': {
    type: 'asset',
    src: '/team-logos/carolina-hurricanes.svg',
    alt: 'Carolina Hurricanes',
    fit: 'contain',
  },
  'columbus-blue-jackets': {
    type: 'asset',
    src: '/team-logos/columbus-blue-jackets.svg',
    alt: 'Columbus Blue Jackets',
    fit: 'contain',
  },
  'minnesota-wild': {
    type: 'asset',
    src: '/team-logos/minnesota-wild.svg',
    alt: 'Minnesota Wild',
    fit: 'contain',
  },
  'montreal-canadiens': {
    type: 'asset',
    src: '/team-logos/montreal-canadiens.svg',
    alt: 'Montreal Canadiens',
    fit: 'contain',
  },
  'new-york-islanders': {
    type: 'asset',
    src: '/team-logos/new-york-islanders.svg',
    alt: 'New York Islanders',
    fit: 'contain',
  },
  'nashville-predators': {
    type: 'asset',
    src: '/team-logos/nashville-predators.svg',
    alt: 'Nashville Predators',
    fit: 'contain',
  },
  'san-jose-sharks': {
    type: 'asset',
    src: '/team-logos/san-jose-sharks.svg',
    alt: 'San Jose Sharks',
    fit: 'contain',
  },
  'toronto-maple-leafs': {
    type: 'asset',
    src: '/team-logos/toronto-maple-leafs.svg',
    alt: 'Toronto Maple Leafs',
    fit: 'contain',
  },
  'chicago-blackhawks': {
    type: 'asset',
    src: '/team-logos/chicago-blackhawks.svg',
    alt: 'Chicago Blackhawks',
    fit: 'contain',
  },
  'edmonton-oilers': {
    type: 'asset',
    src: '/team-logos/edmonton-oilers.svg',
    alt: 'Edmonton Oilers',
    fit: 'contain',
  },
  'sonmez-z': {
    type: 'asset',
    src: '/player-photos/sonmez-z.svg',
    alt: 'Sonmez Z.',
    fit: 'cover',
  },
  'haddad-maia-b': {
    type: 'asset',
    src: '/player-photos/haddad-maia-b.svg',
    alt: 'Haddad Maia B.',
    fit: 'cover',
  },
  'siniakova-k': {
    type: 'asset',
    src: '/player-photos/siniakova-k.svg',
    alt: 'Siniakova K.',
    fit: 'cover',
  },
  'osorio-k': {
    type: 'asset',
    src: '/player-photos/osorio-k.svg',
    alt: 'Osorio K.',
    fit: 'cover',
  },
  'bueno-g': {
    type: 'asset',
    src: '/player-photos/bueno-g.svg',
    alt: 'Bueno G.',
    fit: 'cover',
  },
  'didoni-bonini-jp': {
    type: 'asset',
    src: '/player-photos/didoni-bonini-jp.svg',
    alt: 'Didoni Bonini J.P.',
    fit: 'cover',
  },
  'midon-l': {
    type: 'asset',
    src: '/player-photos/midon-l.svg',
    alt: 'Midon L.',
    fit: 'cover',
  },
  'villanueva-g': {
    type: 'asset',
    src: '/player-photos/villanueva-g.svg',
    alt: 'Villanueva G.',
    fit: 'cover',
  },
  'dellien-m': {
    type: 'asset',
    src: '/player-photos/dellien-m.svg',
    alt: 'Dellien M.',
    fit: 'cover',
  },
  'nunez-vera-ac': {
    type: 'asset',
    src: '/player-photos/nunez-vera-ac.svg',
    alt: 'Nunez Vera A.C.',
    fit: 'cover',
  },
  'hernandez-serrano-xa': {
    type: 'asset',
    src: '/player-photos/hernandez-serrano-xa.svg',
    alt: 'Hernandez Serrano X.A.',
    fit: 'cover',
  },
  'colson-t': {
    type: 'asset',
    src: '/player-photos/colson-t.svg',
    alt: 'Colson T.',
    fit: 'cover',
  },
  'washington-wizards': {
    type: 'asset',
    src: '/team-logos/washington-wizards.svg',
    alt: 'Washington Wizards',
    fit: 'contain',
  },
  'detroit-pistons': {
    type: 'asset',
    src: '/team-logos/detroit-pistons.svg',
    alt: 'Detroit Pistons',
    fit: 'contain',
  },
  'indiana-pacers': {
    type: 'asset',
    src: '/team-logos/indiana-pacers.svg',
    alt: 'Indiana Pacers',
    fit: 'contain',
  },
  'cleveland-cavaliers': {
    type: 'asset',
    src: '/team-logos/cleveland-cavaliers.svg',
    alt: 'Cleveland Cavaliers',
    fit: 'contain',
  },
  'miami-heat': {
    type: 'asset',
    src: '/team-logos/miami-heat.svg',
    alt: 'Miami Heat',
    fit: 'contain',
  },
  'milwaukee-bucks': {
    type: 'asset',
    src: '/team-logos/milwaukee-bucks.svg',
    alt: 'Milwaukee Bucks',
    fit: 'contain',
  },
  'minnesota-timberwolves': {
    type: 'asset',
    src: '/team-logos/minnesota-timberwolves.svg',
    alt: 'Minnesota Timberwolves',
    fit: 'contain',
  },
  'new-york-knicks': {
    type: 'asset',
    src: '/team-logos/new-york-knicks.svg',
    alt: 'New York Knicks',
    fit: 'contain',
  },
  'oklahoma-city-thunder': {
    type: 'asset',
    src: '/team-logos/oklahoma-city-thunder.svg',
    alt: 'Oklahoma City Thunder',
    fit: 'contain',
  },
  'orlando-magic': {
    type: 'asset',
    src: '/team-logos/orlando-magic.svg',
    alt: 'Orlando Magic',
    fit: 'contain',
  },
  'phoenix-suns': {
    type: 'asset',
    src: '/team-logos/phoenix-suns.svg',
    alt: 'Phoenix Suns',
    fit: 'contain',
  },
  'charlotte-hornets': {
    type: 'asset',
    src: '/team-logos/charlotte-hornets.svg',
    alt: 'Charlotte Hornets',
    fit: 'contain',
  },
  'bounty-hunters-esports': {
    type: 'asset',
    src: '/team-logos/bounty-hunters-esports.svg',
    alt: 'Bounty Hunters Esports',
    fit: 'contain',
  },
  'dragon-ranger-gaming': {
    type: 'asset',
    src: '/team-logos/dragon-ranger-gaming.svg',
    alt: 'Dragon Ranger Gaming',
    fit: 'contain',
  },
  galorys: {
    type: 'asset',
    src: '/team-logos/galorys.svg',
    alt: 'Galorys',
    fit: 'contain',
  },
  keyd: {
    type: 'asset',
    src: '/team-logos/keyd.svg',
    alt: 'Keyd',
    fit: 'contain',
  },
  'mibr-academy': {
    type: 'asset',
    src: '/team-logos/mibr-academy.svg',
    alt: 'MIBR Academy',
    fit: 'contain',
  },
  'navi-junior': {
    type: 'asset',
    src: '/team-logos/navi-junior.svg',
    alt: 'NAVI Junior',
    fit: 'contain',
  },
  'the-last-resort': {
    type: 'asset',
    src: '/team-logos/the-last-resort.svg',
    alt: 'The Last Resort',
    fit: 'contain',
  },
  'uno-mille': {
    type: 'asset',
    src: '/team-logos/uno-mille.svg',
    alt: 'UNO MILLE',
    fit: 'contain',
  },
  yenisey: {
    type: 'asset',
    src: '/team-logos/yenisey.svg',
    alt: 'Yenisey',
    fit: 'contain',
  },
  joinville: {
    type: 'asset',
    src: '/team-logos/joinville.svg',
    alt: 'Joinville',
    fit: 'contain',
  },
  monteros: {
    type: 'asset',
    src: '/team-logos/monteros.svg',
    alt: 'Monteros',
    fit: 'contain',
  },
  nova: {
    type: 'asset',
    src: '/team-logos/nova.svg',
    alt: 'Nova',
    fit: 'contain',
  },
  'sao-jose-dos-campos': {
    type: 'asset',
    src: '/team-logos/sao-jose-dos-campos.svg',
    alt: 'Sao Jose dos Campos',
    fit: 'contain',
  },
  'ciudad-buenos-aires': {
    type: 'asset',
    src: '/team-logos/ciudad-buenos-aires.svg',
    alt: 'Ciudad de Buenos Aires',
    fit: 'contain',
  },
  'tucuman-gimnasia': {
    type: 'asset',
    src: '/team-logos/tucuman-gimnasia.svg',
    alt: 'Tucuman Gimnasia',
    fit: 'contain',
  },
  'upln-san-juan': {
    type: 'asset',
    src: '/team-logos/upcn-san-juan.svg',
    alt: 'UPCN San Juan',
    fit: 'contain',
  },
  'fakel-yamal': {
    type: 'asset',
    src: '/team-logos/fakel-yamal.svg',
    alt: 'Fakel Yamal',
    fit: 'contain',
  },
  gorkiy: {
    type: 'asset',
    src: '/team-logos/gorkiy.svg',
    alt: 'Gorkiy',
    fit: 'contain',
  },
  'kansas-city-royals': {
    type: 'asset',
    src: '/team-logos/kansas-city-royals.svg',
    alt: 'Kansas City Royals',
    fit: 'contain',
  },
  'cincinnati-reds': {
    type: 'asset',
    src: '/team-logos/cincinnati-reds.svg',
    alt: 'Cincinnati Reds',
    fit: 'contain',
  },
  'chicago-cubs': {
    type: 'asset',
    src: '/team-logos/chicago-cubs.svg',
    alt: 'Chicago Cubs',
    fit: 'contain',
  },
  'los-angeles-dodgers': {
    type: 'asset',
    src: '/team-logos/los-angeles-dodgers.svg',
    alt: 'Los Angeles Dodgers',
    fit: 'contain',
  },
  'los-angeles-angels': {
    type: 'asset',
    src: '/team-logos/los-angeles-angels.svg',
    alt: 'Los Angeles Angels',
    fit: 'contain',
  },
  'usa-baseball': {
    type: 'asset',
    src: '/team-logos/usa-baseball.svg',
    alt: 'USA Baseball',
    fit: 'contain',
  },
  'venezuela-baseball': {
    type: 'asset',
    src: '/team-logos/venezuela-baseball.svg',
    alt: 'Venezuela Baseball',
    fit: 'contain',
  },
  'bvsc-zuglo': {
    type: 'asset',
    src: '/team-logos/bvsc-zuglo.svg',
    alt: 'BVSC Zuglo',
    fit: 'contain',
  },
  orad: {
    type: 'asset',
    src: '/team-logos/orad.svg',
    alt: 'Orad',
    fit: 'contain',
  },
  'primorac-kotor': {
    type: 'asset',
    src: '/team-logos/primorac-kotor.svg',
    alt: 'Primorac Kotor',
    fit: 'contain',
  },
  'radnicki-kragujevac': {
    type: 'asset',
    src: '/team-logos/radnicki-kragujevac.svg',
    alt: 'Radnicki Kragujevac',
    fit: 'contain',
  },
  marseille: {
    type: 'asset',
    src: '/team-logos/marseille.svg',
    alt: 'Marseille',
    fit: 'contain',
  },
  sabadell: {
    type: 'asset',
    src: '/team-logos/sabadell.svg',
    alt: 'Sabadell',
    fit: 'contain',
  },
};

export function getParticipantVisual(participant: SportEventParticipant): ParticipantVisual {
  if (participant.logoSrc) {
    return {
      type: 'asset',
      src: participant.logoSrc,
      alt: participant.name,
      fit: 'contain',
    };
  }

  if (participant.photoSrc) {
    return {
      type: 'asset',
      src: participant.photoSrc,
      alt: participant.name,
      fit: 'cover',
    };
  }

  const registeredVisual = participantVisualRegistry[participant.id];

  if (registeredVisual) {
    return registeredVisual;
  }

  const flagVisual = getCountryFlagVisual(participant.country);

  if (!flagVisual) {
    return null;
  }

  if (flagVisual.type === 'asset') {
    return {
      type: 'asset',
      src: flagVisual.src,
      alt: participant.country ?? participant.name,
      fit: 'cover',
    };
  }

  return flagVisual;
}
