import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus, Check } from 'lucide-react';

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
  // Initialize with all rings selected
  const [selectedRings, setSelectedRings] = useState<Set<string>>(
    new Set(rings.map(r => r.id))
  );

  const toggleRing = (ringId: string) => {
    const newSelected = new Set(selectedRings);
    if (newSelected.has(ringId)) {
      newSelected.delete(ringId);
    } else {
      newSelected.add(ringId);
    }
    setSelectedRings(newSelected);
  };

  const getEntriesByCategory = (categoryId: string) => {
    return entries
      .filter(entry => entry.category === categoryId && selectedRings.has(entry.ring))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const getEntriesByRing = (categoryEntries: TechEntry[], ringId: string) => {
    return categoryEntries.filter(entry => entry.ring === ringId);
  };

  // Count total visible entries
  const totalVisibleEntries = useMemo(() => {
    return entries.filter(entry => selectedRings.has(entry.ring)).length;
  }, [entries, selectedRings]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">innFactory AI Technology Radar</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Der innFactory AI Radar ist eine Sammlung der wichtigsten KI-Technologien und -Quellen für den Mittelstand, ergänzt durch eine Bewertung aus unserer Sicht.
          </p>
        </div>

        {/* Ring Filter/Legend */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Filtern nach Kategorie
            </h2>
            <span className="text-xs text-slate-500">
              {totalVisibleEntries} angezeigt
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {rings.map(ring => {
              const isSelected = selectedRings.has(ring.id);
              return (
                <div
                  key={ring.id}
                  className={`cursor-pointer transition-all px-4 py-2.5 rounded-lg border-2 ${isSelected
                      ? 'shadow-sm ' + (
                        ring.color === 'emerald' ? 'border-emerald-500 bg-emerald-50' :
                          ring.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                            ring.color === 'amber' ? 'border-amber-500 bg-amber-50' :
                              'border-red-500 bg-red-50'
                      )
                      : 'border-slate-200 bg-white opacity-50 hover:opacity-70'
                    }`}
                  onClick={() => toggleRing(ring.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${ring.color === 'emerald' ? 'bg-emerald-500' :
                          ring.color === 'blue' ? 'bg-blue-500' :
                            ring.color === 'amber' ? 'bg-amber-500' :
                              'bg-red-500'
                        }`} />
                      <span className="font-medium text-sm text-slate-900">{ring.name}</span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
                    if (!selectedRings.has(ring.id)) return null;

                    const ringEntries = getEntriesByRing(categoryEntries, ring.id);
                    if (ringEntries.length === 0) return null;

                    return (
                      <div
                        key={ring.id}
                        className={`border-l-4 pl-4 py-3 rounded-r-lg ${getRingBgColor(ring.id, rings)} transition-all`}
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
                        <div className="flex flex-wrap gap-2">
                          {ringEntries.map(entry => (
                            <a
                              key={entry.id}
                              href={entry.link}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-sm group"
                            >
                              <span className="flex-shrink-0">
                                {getChangeIcon(entry.changeIndicator)}
                              </span>
                              <span className="text-slate-700 group-hover:text-slate-900 text-sm font-medium">
                                {entry.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {categoryEntries.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      Keine Einträge in dieser Kategorie.
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Section */}
        {/* Footer */}
        <div className="mt-16 text-center text-sm text-slate-500">
          <p>Letztes Update: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            <span className="inline-flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" /> Aufgewertet
            </span>
            {" · "}
            <span className="inline-flex items-center gap-1">
              <ArrowDown className="h-3 w-3 text-red-600" /> Abgewertet
            </span>
            {" · "}
            <span className="inline-flex items-center gap-1">
              <Minus className="h-3 w-3 text-gray-400" /> Keine Änderung
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
