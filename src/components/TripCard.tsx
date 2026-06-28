import { Trip } from '../types/travel';
import { Calendar, MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

export default function TripCard({ trip, onClick }: TripCardProps) {
  const availableSeats = trip.totalSeats - trip.blockedSeats.length;
  const daysUntilDeparture = Math.ceil(
    (new Date(trip.departureDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  // Formatter for dates
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-350 hover:-translate-y-1.5 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/20 cursor-pointer"
    >
      {/* Image Gallery Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={trip.images[0]}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Departure City and Scarcity Tags */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            {trip.departureCity}
          </span>

          {daysUntilDeparture > 0 && daysUntilDeparture <= 15 ? (
            <span className="inline-flex items-center rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-extrabold text-white shadow-sm">
              🔥 Sale en {daysUntilDeparture} {daysUntilDeparture === 1 ? 'día' : 'días'}
            </span>
          ) : daysUntilDeparture === 0 ? (
            <span className="inline-flex items-center rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-extrabold text-white shadow-sm">
              🚨 ¡Sale HOY!
            </span>
          ) : (
            <span className="inline-flex items-center rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              ✨ Abierto
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex rounded-md bg-slate-900/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-xs">
            {trip.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date and Duration Row */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{formatDate(trip.departureDate)}</span>
          </div>
          <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-slate-600 font-semibold">
            {trip.durationText}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3.5 text-lg font-bold text-slate-950 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {trip.title}
        </h3>

        {/* Brief description */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {trip.description}
        </p>

        {/* Scarcity Bar / Seat Indicators */}
        <div className="mt-5 border-t border-slate-50 pt-4.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Users className="h-4 w-4 text-slate-400" />
              Lugares Disponibles:
            </span>
            <span className={`font-bold ${availableSeats <= 5 ? 'text-rose-500' : 'text-slate-900'}`}>
              {availableSeats} / {trip.totalSeats}
            </span>
          </div>

          {/* Progress bar of seats */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                availableSeats <= 5 ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
              }`}
              style={{ width: `${(availableSeats / trip.totalSeats) * 100}%` }}
            />
          </div>
        </div>

        {/* Price & Footer Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Precio final por persona
            </span>
            <span className="text-xl font-black text-slate-900">
              ${trip.price.toLocaleString('es-MX')}{' '}
              <span className="text-xs font-semibold text-slate-500">{trip.currency}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1.5 transition-transform">
            <span>Ver detalles</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Agency Trust Stamp */}
        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-500">
          <span className="truncate">Operado por {trip.agency.name}</span>
          <span className="flex shrink-0 items-center gap-1 font-bold text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" /> Verificado
          </span>
        </div>
      </div>
    </div>
  );
}
