'use client';

import { useState, useMemo } from 'react';
import { ResourceItem } from '@/types';

interface MembresClientProps {
  motDePasse: string;
  dateProchaineRepet: string;
  aTravailler: string;
  aReflechir: string;
  resources: ResourceItem[];
}

export default function MembresClient({
  motDePasse,
  dateProchaineRepet,
  aTravailler,
  aReflechir,
  resources,
}: MembresClientProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [categorieActive, setCategorieActive] = useState<string>('Toutes');

  const categories = useMemo(() => {
    const set = new Set(resources.map(r => r.categorie).filter(Boolean));
    return ['Toutes', ...Array.from(set)];
  }, [resources]);

  const resourcesFiltrees = useMemo(() => {
    if (categorieActive === 'Toutes') return resources;
    return resources.filter(r => r.categorie === categorieActive);
  }, [resources, categorieActive]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === motDePasse) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
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
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        Espace Membres
      </h1>

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
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold">Catégorie</th>
              <th className="px-4 py-3 font-bold">Description</th>
              <th className="px-4 py-3 font-bold">Liens</th>
            </tr>
          </thead>
          <tbody>
            {resourcesFiltrees.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500 italic">
                  Aucune ressource pour cette catégorie.
                </td>
              </tr>
            ) : (
              resourcesFiltrees.map(r => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">{r.categorie}</td>
                  <td className="px-4 py-3">{r.description}</td>
                  <td className="px-4 py-3 space-x-3">
                    {r.url1 && (
                      <a href={r.url1} target="_blank" rel="noopener noreferrer" className="text-[#A0522D] hover:underline font-medium">
                        Lien 1
                      </a>
                    )}
                    {r.url2 && (
                      <a href={r.url2} target="_blank" rel="noopener noreferrer" className="text-[#A0522D] hover:underline font-medium">
                        Lien 2
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}