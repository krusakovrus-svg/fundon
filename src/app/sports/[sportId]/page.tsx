import { notFound } from 'next/navigation';

import { SportEventsScreen } from '@/components/sports/SportEventsScreen';
import { getSportById } from '@/data/sports';

export default function SportPage({ params }: { params: { sportId: string } }) {
  const sport = getSportById(params.sportId);

  if (!sport || sport.id === 'martial-arts') {
    notFound();
  }

  return <SportEventsScreen sportId={sport.id} />;
}
