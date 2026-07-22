// src/utils/fetchSheets.ts

import Papa from 'papaparse';
import { siteConfig } from '@/constants/siteConfig';

export async function fetchSheetData<T>(tabName: string): Promise<T[]> {
  const url = `https://docs.google.com/spreadsheets/d/${siteConfig.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse<T>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as T[]),
        error: (error: Error) => reject(error)
      });
    });
  } catch (error) {
    console.error(`Erreur de récupération pour l'onglet ${tabName}:`, error);
    return [];
  }
}

export async function fetchGeneralConfig(): Promise<Record<string, string>> {
  const data = await fetchSheetData<{ key: string; value: string }>(siteConfig.sheetTabs.general);
  const configMap: Record<string, string> = {};
  
  data.forEach((row) => {
    if (row.key) {
      configMap[row.key.trim()] = row.value ? row.value.trim() : '';
    }
  });
  
  return configMap;
}
