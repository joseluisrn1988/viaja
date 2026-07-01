import { Trip } from '../types/travel';
import { Calendar, MapPin, Users } from 'lucide-react';

interface TripCardCompactProps {
  trip: Trip;
  onClick: () => void;
}

export default function TripCardCompact({ trip, onClick }: TripCardCompactProps) {
  const availableSeats = trip.totalSeats - trip.blockedSeats.length;
  const daysUntilDeparture = Math.ceil(
    (new Date(trip.departureDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div
      onClick={onClick}
      className="group flex w-[240px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/30 sm:w-[260px]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={trip.images[0]}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Departure city */}
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
          <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
          {trip.departureCity}
        </span>

        {/* Urgency badge */}
        {daysUntilDeparture > 0 && daysUntilDeparture <= 15 && (
          <span className="absolute right-2.5 top-2.5 inline-flex rounded-lg bg-amber-500 px-2 py-0.5 text-[11px] font-extrabold text-white shadow-sm">
            🔥 {daysUntilDeparture}d
          </span>
        )}

        {/* Category chip */}
        <span className="absolute bottom-2.5 left-2.5 inline-flex rounded-md bg-slate-900/75 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {trip.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(trip.departureDate)}
          </span>
          <span className="rounded-full bg-slate-50 px-2 py-0.5 font-semibold text-slate-600">
            {trip.durationText}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-emerald-600">
          {trip.title}
        </h3>

        <div className="mt-auto pt-3">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span className={availableSeats <= 5 ? 'text-rose-500 font-bold' : ''}>
              {availableSeats} lugares disponibles
            </span>
          </div>

          <div className="mt-2 flex items-end justify-between border-t border-slate-100 pt-2.5">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Desde
              </span>
              <span className="text-base font-black text-slate-900">
                ${trip.price.toLocaleString('es-MX')}
                <span className="text-[10px] font-semibold text-slate-500"> {trip.currency}</span>
              </span>
            </div>
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              Ver
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
