import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import TripCard from './components/TripCard';
import TripDetail from './components/TripDetail';
import AdminPanel from './components/AdminPanel';
import { INITIAL_TRIPS } from './data/mockTrips';
import { Trip } from './types/travel';
import { Compass, RefreshCw, Star, ShieldCheck, Mail, ShieldAlert, BadgeInfo } from 'lucide-react';

const STORAGE_KEY = 'viaja_trips_data';

export default function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Filter States
  const [departureCity, setDepartureCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTrips(JSON.parse(saved));
      } catch (e) {
        setTrips(INITIAL_TRIPS);
      }
    } else {
      setTrips(INITIAL_TRIPS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRIPS));
    }
  }, []);

  // Sync state to local storage helper
  const syncTrips = (updatedTrips: Trip[]) => {
    setTrips(updatedTrips);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
  };

  // Admin handlers
  const handleAddTrip = (newTrip: Trip) => {
    const updated = [newTrip, ...trips];
    syncTrips(updated);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    const updated = trips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
    syncTrips(updated);
    
    // Sync active detail view if open
    if (selectedTrip?.id === updatedTrip.id) {
      setSelectedTrip(updatedTrip);
    }
  };

  const handleDeleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    syncTrips(updated);
    if (selectedTrip?.id === id) {
      setSelectedTrip(null);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('¿Deseas restablecer los datos de ejemplo iniciales? Esto borrará cualquier viaje nuevo que hayas creado.')) {
      syncTrips(INITIAL_TRIPS);
      setSelectedTrip(null);
    }
  };

  // Booking success handler (traveler perspective booking block)
  const handleBookSuccess = (seatsToBlock: number[]) => {
    if (!selectedTrip) return;
    
    // Block these seats on the actual trip
    const updatedBlocked = Array.from(new Set([...selectedTrip.blockedSeats, ...seatsToBlock]));
    const updatedTrip = { ...selectedTrip, blockedSeats: updatedBlocked };
    
    handleUpdateTrip(updatedTrip);
  };

  // Extract unique departure cities and categories from our trips list
  const uniqueCities = Array.from(new Set(trips.map((t) => t.departureCity)));
  const uniqueCategories = Array.from(new Set(trips.map((t) => t.category)));

  // Filter and sort logic
  const filteredTrips = trips
    .filter((trip) => {
      const matchCity = departureCity ? trip.departureCity === departureCity : true;
      const matchCategory = selectedCategory ? trip.category === selectedCategory : true;
      const matchSearch = searchQuery
        ? trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchCity && matchCategory && matchSearch;
    })
    // Sort: Chronologically (soonest departure date first)
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());

  // Reset filters helper
  const handleResetFilters = () => {
    setDepartureCity('');
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Top Navbar */}
      <Navbar
        isAdminMode={isAdminMode}
        onToggleAdminMode={() => {
          setIsAdminMode(!isAdminMode);
          setSelectedTrip(null); // Return to list view
        }}
        onLogoClick={() => {
          setIsAdminMode(false);
          setSelectedTrip(null);
        }}
      />

      {/* Main Container */}
      <main className="flex-1">
        {isAdminMode ? (
          /* ADMIN MODE VIEW */
          <AdminPanel
            trips={trips}
            onAddTrip={handleAddTrip}
            onUpdateTrip={handleUpdateTrip}
            onDeleteTrip={handleDeleteTrip}
            onResetToDefault={handleResetToDefault}
          />
        ) : selectedTrip ? (
          /* TRIP DETAIL VIEW */
          <TripDetail
            trip={selectedTrip}
            onBack={() => setSelectedTrip(null)}
            onBookSuccess={handleBookSuccess}
          />
        ) : (
          /* TRAVELER CATALOG VIEW */
          <div className="space-y-12">
            {/* Hero Search Engine & Header */}
            <HeroSearch
              departureCity={departureCity}
              setDepartureCity={setDepartureCity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              cities={uniqueCities}
              categories={uniqueCategories}
            />

            {/* Catalog Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 gap-3.5">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Compass className="h-5 w-5 text-emerald-500" />
                    Viajes con salida próximamente
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Mostrando destinos disponibles ordenados por fecha de salida más cercana.
                  </p>
                </div>

                {/* Filter info indicator */}
                {(departureCity || selectedCategory || searchQuery) && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl hover:bg-emerald-100/50 transition self-start"
                  >
                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                    Limpiar Filtros
                  </button>
                )}
              </div>

              {/* Grid content */}
              {filteredTrips.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onClick={() => setSelectedTrip(trip)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty placeholder state */
                <div className="mt-12 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center max-w-md mx-auto">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                    🔍
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-slate-900">No encontramos salidas</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    No hay viajes programados que coincidan con tus filtros actuales. Intenta cambiar de ciudad de salida o ampliar tu búsqueda.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-50 transition hover:bg-emerald-700"
                  >
                    Mostrar todos los viajes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Trust reassurance bar before footer */}
      {!isAdminMode && !selectedTrip && (
        <section className="bg-slate-100 border-t border-slate-200/60 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h3 className="text-xl font-extrabold text-slate-900">
              ¿Por qué reservar a través de <span className="text-emerald-600">Viaja.cc</span>?
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center shadow-xs">
                <div className="mx-auto h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-3.5">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900">100% Verificado</h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Solo agencias registradas, con solvencia y contratos legales firman con nosotros.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center shadow-xs">
                <div className="mx-auto h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-3.5">
                  <Star className="h-5.5 w-5.5 text-amber-500 fill-amber-500" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900">Opiniones Reales</h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Sistema blindado de retroalimentación donde solo opina quien abordó el tour.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center shadow-xs">
                <div className="mx-auto h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-3.5">
                  <BadgeInfo className="h-5.5 w-5.5" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900">Precios Transparentes</h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">No hay tarifas ocultas ni comisiones sorpresa al pagar. Lo que ves es lo que pagas.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center shadow-xs">
                <div className="mx-auto h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-3.5">
                  <ShieldAlert className="h-5.5 w-5.5 text-rose-500" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900">Protección Antiestafas</h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Protegemos tu dinero mediando en reembolsos y depósitos frente a cualquier eventualidad.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 text-slate-500 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 shadow-md">
                  <Compass className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="text-lg font-black text-slate-900">Viaja<span className="text-emerald-500">.cc</span></span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-slate-400">
                La plataforma de confianza para descubrir escapadas, paseos de un día y viajes organizados con salida directa desde tu ciudad. Sin fricciones, sin intermediarios engañosos.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-3.5">Destinos Populares</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => { setSearchQuery('Tolantongo'); setSelectedTrip(null); }} className="hover:text-emerald-500 transition">Grutas de Tolantongo</button></li>
                <li><button onClick={() => { setSearchQuery('Tequila'); setSelectedTrip(null); }} className="hover:text-emerald-500 transition">Ruta del Tequila</button></li>
                <li><button onClick={() => { setSearchQuery('Huasteca'); setSelectedTrip(null); }} className="hover:text-emerald-500 transition">Huasteca Potosina</button></li>
                <li><button onClick={() => { setSearchQuery('Peña'); setSelectedTrip(null); }} className="hover:text-emerald-500 transition">Peña de Bernal</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-3.5">Soporte y Contacto</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>soporte@viaja.cc</span>
                </li>
                <li>
                  <a href="https://wa.me/525512345678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100/50 transition">
                    Chatear con Soporte
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <span>© 2026 Viaja.cc. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:underline">Aviso de Privacidad</a>
              <span>•</span>
              <a href="#terms" className="hover:underline">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
