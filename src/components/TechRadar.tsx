import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface TechEntry {
  id: string;
  name: string;
  category: string;
  ring: string;
  changeIndicator: 'up' | 'down' | 'same';
  link: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Ring {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface TechRadarProps {
  categories: Category[];
  rings: Ring[];
  entries: TechEntry[];
}

const getRingColor = (ringId: string, rings: Ring[]) => {
  const ring = rings.find(r => r.id === ringId);
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    red: 'bg-red-500/10 text-red-700 border-red-500/20',
  };
  return colorMap[ring?.color || 'emerald'] || colorMap.emerald;
};

const getRingBgColor = (ringId: string, rings: Ring[]) => {
  const ring = rings.find(r => r.id === ringId);
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 border-l-emerald-500',
    blue: 'bg-blue-50 border-l-blue-500',
    amber: 'bg-amber-50 border-l-amber-500',
    red: 'bg-red-50 border-l-red-500',
  };
  return colorMap[ring?.color || 'emerald'] || colorMap.emerald;
};

const getChangeIcon = (indicator: 'up' | 'down' | 'same') => {
  switch (indicator) {
    case 'up':
      return <ArrowUp className="h-3.5 w-3.5 text-green-600" />;
    case 'down':
      return <ArrowDown className="h-3.5 w-3.5 text-red-600" />;
    case 'same':
      return <Minus className="h-3.5 w-3.5 text-gray-400" />;
  }
};

export default function TechRadar({ categories, rings, entries }: TechRadarProps) {
  const [selectedRing, setSelectedRing] = useState<string | null>(null);

  const getEntriesByCategory = (categoryId: string) => {
    return entries
      .filter(entry => entry.category === categoryId)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const getEntriesByRing = (categoryEntries: TechEntry[], ringId: string) => {
    return categoryEntries.filter(entry => entry.ring === ringId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">AI Technology Radar</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            An opinionated guide to technology frontiers in AI and data engineering.
            Inspired by ThoughtWorks Technology Radar.
          </p>
        </div>

        {/* Ring Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {rings.map(ring => (
            <Card
              key={ring.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRing === ring.id ? 'ring-2 ring-offset-2 ring-slate-900' : ''
              }`}
              onClick={() => setSelectedRing(selectedRing === ring.id ? null : ring.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    ring.color === 'emerald' ? 'bg-emerald-500' :
                    ring.color === 'blue' ? 'bg-blue-500' :
                    ring.color === 'amber' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`} />
                  {ring.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{ring.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map(category => {
            const categoryEntries = getEntriesByCategory(category.id);

            return (
              <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rings.map(ring => {
                    const ringEntries = getEntriesByRing(categoryEntries, ring.id);
                    if (ringEntries.length === 0) return null;

                    return (
                      <div
                        key={ring.id}
                        className={`border-l-4 pl-4 py-3 rounded-r-lg ${getRingBgColor(ring.id, rings)} ${
                          selectedRing && selectedRing !== ring.id ? 'opacity-40' : 'opacity-100'
                        } transition-opacity`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            variant="outline"
                            className={getRingColor(ring.id, rings)}
                          >
                            {ring.name}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">
                            {ringEntries.length} {ringEntries.length === 1 ? 'technology' : 'technologies'}
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {ringEntries.map(entry => (
                            <li key={entry.id}>
                              <a
                                href={entry.link}
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/70 transition-colors group"
                              >
                                <span className="flex-shrink-0">
                                  {getChangeIcon(entry.changeIndicator)}
                                </span>
                                <span className="text-slate-700 group-hover:text-slate-900 group-hover:underline text-sm font-medium">
                                  {entry.name}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-slate-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            <span className="inline-flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" /> Moved in
            </span>
            {' · '}
            <span className="inline-flex items-center gap-1">
              <ArrowDown className="h-3 w-3 text-red-600" /> Moved out
            </span>
            {' · '}
            <span className="inline-flex items-center gap-1">
              <Minus className="h-3 w-3 text-gray-400" /> No change
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
