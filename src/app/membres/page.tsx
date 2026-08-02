import { fetchGeneralConfig, fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig } from '@/constants/siteConfig';
import { parseFrenchDate } from '@/utils/formatters';
import { ResourceItem } from '@/types';
import MembresClient from '@/components/MembresClient';

export default async function MembresPage() {
  const config = await fetchGeneralConfig();
  const resources = await fetchSheetData<ResourceItem>(siteConfig.sheetTabs.membres);

  const visibleResources = resources
    .filter(r => r.afficher?.toLowerCase().includes('oui'))
    .sort((a, b) => parseFrenchDate(b.date) - parseFrenchDate(a.date));

  return (
    <MembresClient
      motDePasse={config['mdp'] || ''}
      dateProchaineRepet={config['Date prochaine répet'] || ''}
      aTravailler={config['A travailler'] || ''}
      aReflechir={config['A réfléchir'] || ''}
      adminSiteUrl={config['adminSite'] || ''}
      resources={visibleResources}
    />
  );
}