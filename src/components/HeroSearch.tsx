import { Search, MapPin, Calendar, Compass, ShieldAlert, BadgeCheck, MessageSquareHeart } from 'lucide-react';

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
    <div className="relative overflow-hidden bg-slate-900 pb-16 pt-24 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-900 to-slate-950" />
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            🚀 Evita estafas en internet • Catálogo Curado y Verificado
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Viaja tranquilo. <span className="text-emerald-400">Agencias verificadas, </span>,<br className="hidden sm:inline" />
             precios reales, <span className="underline decoration-emerald-400 decoration-wavy underline-offset-8">lugares garantizados.</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Encuentra viajes, tours y escapadas de fin de semana con salida desde tu ciudad de origen. Reserva con confianza y coordina directo con operadores verificados.
          </p>
        </div>

        {/* Search Engine / Filter bar (Trivago Style) */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Departure City Selector */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  ¿De dónde sales?
                </label>
                <div className="mt-2.5 flex items-center rounded-xl bg-slate-900 px-3.5 py-3 border border-slate-850">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-2.5 shrink-0" />
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-300">Todas las ciudades</option>
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-slate-900 text-white">
                        Salidas desde {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination Search */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  ¿A dónde quieres ir?
                </label>
                <div className="mt-2.5 flex items-center rounded-xl bg-slate-900 px-3.5 py-3 border border-slate-850">
                  <Search className="h-5 w-5 text-emerald-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ej. Tolantongo, Tequila, Cascadas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-white focus:outline-none placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Date Filter (Simple indicator of sorting next) */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  ¿Cuándo viajas?
                </label>
                <div className="mt-2.5 flex items-center rounded-xl bg-slate-900 px-3.5 py-3 border border-slate-850">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-2.5 shrink-0" />
                  <span className="text-sm font-medium text-slate-300">
                    Ordenados: Próximos primero
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Categories Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2">
                Filtrar por:
              </span>
              <button
                onClick={() => setSelectedCategory('')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === ''
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Core Value Proposition Cards (Trust Badges) */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Cero Estafas</h3>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  Verificamos legal y comercialmente a cada agencia antes de subir un solo viaje. Tu dinero está seguro.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Asientos Transparentes</h3>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  Mira en tiempo real la disponibilidad y selecciona tus asientos exactos en el mapa de autobús antes de irte.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                <MessageSquareHeart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Trato Personalizado</h3>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  ¿Dudas? Chatea en un clic con un operador para coordinar cómodamente tus pagos o resolver preguntas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
