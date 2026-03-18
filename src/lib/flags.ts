type AssetCountry =
  | 'Russia'
  | 'England'
  | 'Poland'
  | 'Georgia'
  | 'United States'
  | 'Australia'
  | 'Brazil'
  | 'Palestine'
  | 'Portugal'
  | 'Wales'
  | 'Spain'
  | 'Belgium'
  | 'Scotland'
  | 'Croatia'
  | 'Lithuania'
  | 'Algeria'
  | 'Thailand'
  | 'Netherlands'
  | 'Ireland'
  | 'United Kingdom'
  | 'France'
  | 'Nigeria'
  | 'Czech Republic';

const flagAssets: Record<AssetCountry, string> = {
  Russia: '/flags/russia.svg',
  England: '/flags/england.svg',
  Poland: '/flags/poland.svg',
  Georgia: '/flags/georgia.svg',
  'United States': '/flags/usa.svg',
  Australia: '/flags/australia.avif',
  Brazil: '/flags/brazil.avif',
  Palestine: '/flags/palestine.avif',
  Portugal: '/flags/portugal.avif',
  Wales: '/flags/wales.avif',
  Spain: '/flags/spain.svg',
  Belgium: '/flags/belgium.svg',
  Scotland: '/flags/scotland.svg',
  Croatia: '/flags/croatia.svg',
  Lithuania: '/flags/lithuania.svg',
  Algeria: '/flags/algeria.svg',
  Thailand: '/flags/thailand.svg',
  Netherlands: '/flags/netherlands.svg',
  Ireland: '/flags/ireland.svg',
  'United Kingdom': '/flags/united-kingdom.svg',
  France: '/flags/france.svg',
  Nigeria: '/flags/nigeria.svg',
  'Czech Republic': '/flags/czech-republic.svg'
};

export function getCountryFlagVisual(country?: string) {
  if (!country) return null;

  if (country in flagAssets) {
    const src = flagAssets[country as AssetCountry];
    return { type: 'asset' as const, value: src, src };
  }

  if (country === 'Japan') {
    return { type: 'emoji' as const, value: '\uD83C\uDDEF\uD83C\uDDF5' };
  }

  if (country === 'Italy') {
    return { type: 'emoji' as const, value: '\uD83C\uDDEE\uD83C\uDDF9' };
  }

  if (country === 'Canada') {
    return { type: 'emoji' as const, value: '\uD83C\uDDE8\uD83C\uDDE6' };
  }

  if (country === 'Sweden') {
    return { type: 'emoji' as const, value: '\uD83C\uDDF8\uD83C\uDDEA' };
  }

  if (country === 'China') {
    return { type: 'emoji' as const, value: '\uD83C\uDDE8\uD83C\uDDF3' };
  }

  if (country === 'Venezuela') {
    return { type: 'emoji' as const, value: '\uD83C\uDDFB\uD83C\uDDEA' };
  }

  if (country === 'Mexico') {
    return { type: 'emoji' as const, value: '\uD83C\uDDF2\uD83C\uDDFD' };
  }

  if (country === 'Cuba') {
    return { type: 'emoji' as const, value: '\uD83C\uDDE8\uD83C\uDDFA' };
  }

  if (country === 'Germany') {
    return { type: 'emoji' as const, value: '\uD83C\uDDE9\uD83C\uDDEA' };
  }

  if (country === 'Denmark') {
    return { type: 'emoji' as const, value: '\uD83C\uDDE9\uD83C\uDDF0' };
  }

  if (country === 'Morocco') {
    return { type: 'emoji' as const, value: '\uD83C\uDDF2\uD83C\uDDE6' };
  }

  return null;
}
