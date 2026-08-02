'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ResourceItem } from '@/types';

function parseFrenchDate(dateStr: string): number {
  const parts = dateStr?.split('/').map(Number) || [];
  const [day, month, year] = parts;
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

interface MembresClientProps {
  motDePasse: string;
  dateProchaineRepet: string;
  aTravailler: string;
  aReflechir: string;
  adminSiteUrl: string;
  resources: ResourceItem[];
}

type SortKey = 'ordre' | 'date' | 'description';
type SortDir = 'asc' | 'desc';

export default function MembresClient({
  motDePasse,
  dateProchaineRepet,
  aTravailler,
  aReflechir,
  adminSiteUrl,
  resources,
}: MembresClientProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [categorieActive, setCategorieActive] = useState<string>('Toutes');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDone, setRefreshDone] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const categories = useMemo(() => {
    const set = new Set(resources.map(r => r.categorie).filter(Boolean));
    return ['Toutes', ...Array.from(set)];
  }, [resources]);

  const resourcesFiltrees = useMemo(() => {
    if (categorieActive === 'Toutes') return resources;
    return resources.filter(r => r.categorie === categorieActive);
  }, [resources, categorieActive]);

  const resourcesTriees = useMemo(() => {
    const sorted = [...resourcesFiltrees].sort((a, b) => {
      let comp = 0;
      if (sortKey === 'ordre') {
        const na = parseFloat(a.ordre) || 0;
        const nb = parseFloat(b.ordre) || 0;
        comp = na - nb;
      } else if (sortKey === 'date') {
        comp = parseFrenchDate(a.date) - parseFrenchDate(b.date);
      } else if (sortKey === 'description') {
        comp = (a.description || '').localeCompare(b.description || '', 'fr');
      }
      return sortDir === 'asc' ? comp : -comp;
    });
    return sorted;
  }, [resourcesFiltrees, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) {
      return <span className="text-gray-300 ml-1">↕</span>;
    }
    return <span className="text-[#A0522D] ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === motDePasse) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    setRefreshDone(false);
    try {
      await fetch('/api/refresh', { method: 'POST' });
      router.refresh();
      setRefreshDone(true);
    } finally {
      setRefreshing(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto mt-16 space-y-6">
        <h1 className="text-2xl font-bold text-[#2C221E] text-center">Espace Membres</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            autoFocus
          />
          {error && <p className="text-sm text-red-600">Mot de passe incorrect.</p>}
          <button
            type="submit"
            className="w-full bg-[#A0522D] hover:bg-[#804020] text-white font-bold py-2 rounded-lg transition"
          >
            Accéder
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec titre, bouton refresh et bouton Admin */}
      <div className="flex justify-between items-center border-b-4 border-[#A0522D] pb-2">
        <h1 className="text-3xl font-extrabold text-[#2C221E]">Espace Membres</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-[#2C221E] hover:bg-[#42332d] disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition shadow text-sm"
          >
            {refreshing ? 'Mise à jour...' : refreshDone ? '✓ À jour' : '🔄 Mettre à jour'}
          </button>
          {adminSiteUrl && (
            <Link
              href={adminSiteUrl}
              className="bg-[#D97706] hover:bg-[#b56305] text-white font-bold py-2 px-4 rounded-lg transition shadow"
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-bold text-[#A0522D] uppercase mb-1">Date prochaine répét</h3>
          <p className="text-gray-800">{dateProchaineRepet || '—'}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#A0522D] uppercase mb-1">À travailler</h3>
          <p className="text-gray-800 whitespace-pre-line">{aTravailler || '—'}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#A0522D] uppercase mb-1">À réfléchir</h3>
          <p className="text-gray-800 whitespace-pre-line">{aReflechir || '—'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategorieActive(cat)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition ${
              categorieActive === cat
                ? 'bg-[#A0522D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-amber-50/50 text-[#2C221E]">
            <tr>
              <th
                className="px-4 py-3 font-bold cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('ordre')}
              >
                Ordre <SortIcon column="ordre" />
              </th>
              <th
                className="px-4 py-3 font-bold cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('date')}
              >
                Date <SortIcon column="date" />
              </th>
              <th className="px-4 py-3 font-bold">Catégorie</th>
              <th className="px-4 py-3 font-bold">Type</th>
              <th
                className="px-4 py-3 font-bold cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('description')}
              >
                Description <SortIcon column="description" />
              </th>
              <th className="px-4 py-3 font-bold">Complément</th>
              <th className="px-4 py-3 font-bold">Statut</th>
              <th className="px-4 py-3 font-bold">Liens</th>
            </tr>
          </thead>
          <tbody>
            {resourcesTriees.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500 italic">
                  Aucune ressource pour cette catégorie.
                </td>
              </tr>
            ) : (
              resourcesTriees.map(r => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 whitespace-nowrap">{r.ordre}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">{r.categorie}</td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3">{r.description}</td>
                  <td className="px-4 py-3">{r.complement}</td>
                  <td className="px-4 py-3">
                    {r.statut && (