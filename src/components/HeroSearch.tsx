import { Search, MapPin, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface HeroSearchProps {
  departureCity: string;
  setDepartureCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cities: string[];
  categories: string[];
}

export default function HeroSearch({
  departureCity,
  setDepartureCity,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cities,
  categories,
}: HeroSearchProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-900 to-slate-950" />
      <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5" />
            Agencias verificadas • Tu lugar garantizado
          </span>
          <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight sm:text-4xl">
            Deja de soñar destinos.<br className="hidden sm:block" />{' '}
            <span className="text-emerald-400">Empieza a vivirlos.</span>
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-xs text-slate-300 sm:text-sm">
            Viajes y escapadas con salida desde tu ciudad, con precios transparentes y reserva de confianza.
          </p>
        </div>

        {/* Compact Search Card (Booking Style) */}
        <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
          <div className="rounded-2xl bg-white p-2 shadow-2xl shadow-black/30 sm:p-2.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              {/* Departure City */}
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sales desde
                  </span>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-none"
                  >
                    <option value="">Todas las ciudades</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination Search */}
              <div className="flex flex-[1.4] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                <Search className="h-5 w-5 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    ¿A dónde quieres ir?
                  </span>
                  <input
                    type="text"
                    placeholder="Tolantongo, Tequila, playa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Search className="h-4.5 w-4.5" />
                Buscar
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </span>
            <button
              onClick={() => setSelectedCategory('')}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === ''
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
