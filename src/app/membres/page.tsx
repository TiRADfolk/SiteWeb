import { fetchGeneralConfig, fetchSheetData } from '@/utils/fetchSheets';
import { ResourceItem } from '@/types';
import MembresClient from '@/components/MembresClient';

function parseFrenchDate(dateStr: string): number {
  const parts = dateStr?.split('/').map(Number) || [];
  const [day, month, year] = parts;
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

export default async function MembresPage() {
  const config = await fetchGeneralConfig();
  const resources = await fetchSheetData<ResourceItem>('membres');

  // TEMPORAIRE : filtre désactivé pour tester
  const visibleResources = resources
    .sort((a, b) => parseFrenchDate(b.date) - parseFrenchDate(a.date));

  return (
    <MembresClient
      motDePasse={config['mdp'] || ''}
      dateProchaineRepet={config['Date prochaine répet'] || ''}
      aTravailler={config['A travailler'] || ''}
      aReflechir={config['A réfléchir'] || ''}
      resources={visibleResources}
    />
  );
}