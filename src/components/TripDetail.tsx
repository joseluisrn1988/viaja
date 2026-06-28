import { useState } from 'react';
import { Trip } from '../types/travel';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Building,
  Sparkles,
  Info
} from 'lucide-react';

interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
  onBookSuccess: (seats: number[]) => void;
}

export default function TripDetail({ trip, onBack, onBookSuccess }: TripDetailProps) {
  const [activeImage, setActiveImage] = useState<string>(trip.images[0]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'seats' | 'passengers' | 'payment'>('seats');
  
  // Passenger info states
  const [passengers, setPassengers] = useState<{ name: string }[]>([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const availableSeatsCount = trip.totalSeats - trip.blockedSeats.length;

  const handleSeatClick = (seatNumber: number) => {
    if (trip.blockedSeats.includes(seatNumber)) return;

    let updated: number[];
    if (selectedSeats.includes(seatNumber)) {
      updated = selectedSeats.filter((s) => s !== seatNumber);
    } else {
      updated = [...selectedSeats, seatNumber];
    }
    setSelectedSeats(updated);

    // Sync passengers array
    setPassengers(updated.map((_, i) => ({
      name: passengers[i]?.name || ''
    })));
  };

  const handlePassengerChange = (index: number, value: string) => {
    const updated = [...passengers];
    updated[index] = { name: value };
    setPassengers(updated);
  };

  const handleGoToPassengers = () => {
    if (selectedSeats.length === 0) return;
    setCheckoutStep('passengers');
  };

  const handleGoToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (passengers.some(p => !p.name.trim()) || !contactInfo.name || !contactInfo.phone) {
      alert('Por favor, completa todos los campos del contacto y nombres de los pasajeros.');
      return;
    }
    setCheckoutStep('payment');
  };

  const handleFinalizeBooking = () => {
    // Generate text message for WhatsApp
    const seatsText = selectedSeats.sort((a, b) => a - b).join(', ');
    const passengersText = passengers.map((p, idx) => `Pasajero ${idx + 1}: ${p.name}`).join('%0A');
    const totalAmount = selectedSeats.length * trip.price;

    const text = `*Nueva Solicitud de Reserva en Viaja.cc*%0A%0A` +
      `*Viaje:* ${trip.title}%0A` +
      `*Fecha de Salida:* ${formatDate(trip.departureDate)}%0A` +
      `*Asientos elegidos:* ${seatsText}%0A` +
      `*Pasajeros:*%0A${passengersText}%0A%0A` +
      `*Contacto Principal:*%0A` +
      `• Nombre: ${contactInfo.name}%0A` +
      `• Teléfono: ${contactInfo.phone}%0A` +
      `• Correo: ${contactInfo.email}%0A%0A` +
      `*Total a pagar:* $${totalAmount.toLocaleString('es-MX')} MXN%0A%0A` +
      `_Hola! Vengo de la página de Viaja.cc y quiero confirmar mi reserva. He realizado la transferencia y adjunto el comprobante. ¿Me confirman mis lugares?_`;

    const whatsappUrl = `https://wa.me/${trip.whatsappNumber}?text=${text}`;
    
    // Call success handler to block these seats on parent/localstorage level
    onBookSuccess(selectedSeats);
    
    // Open whatsapp
    window.open(whatsappUrl, '_blank');
  };

  const handleDirectOperatorChat = () => {
    const text = `Hola! Estoy viendo el viaje *${trip.title}* con salida de *${trip.departureCity}* el *${formatDate(trip.departureDate)}* en Viaja.cc. Me interesa reservar pero tengo algunas dudas, ¿me pueden ayudar?`;
    window.open(`https://wa.me/${trip.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Bus seat layout logic
  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= trip.totalSeats; i++) {
      const isBlocked = trip.blockedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);
      
      seats.push(
        <button
          key={i}
          disabled={isBlocked}
          onClick={() => handleSeatClick(i)}
          className={`relative flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold transition-all ${
            isBlocked
              ? 'bg-slate-100 text-slate-350 cursor-not-allowed border border-slate-200'
              : isSelected
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105 border border-emerald-600'
              : 'bg-white text-slate-800 border border-slate-300 hover:border-slate-500 hover:bg-slate-50'
          }`}
        >
          {i}
          {isBlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-0.5 rotate-45 bg-slate-300/60" />
            </div>
          )}
        </button>
      );
    }
    return seats;
  };

  return (
    <div className="bg-slate-50 pb-24">
      {/* Detail Navbar */}
      <div className="sticky top-16 z-30 bg-white/95 border-b border-slate-100 py-4 shadow-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </button>
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 font-bold border border-emerald-100 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Agencia Verificada
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column: Visuals, details, maps */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Gallery Section */}
            <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                <img src={activeImage} alt={trip.title} className="h-full w-full object-cover transition-all duration-300" />
              </div>
              
              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {trip.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImage === img ? 'border-emerald-500 scale-95 shadow-md shadow-emerald-50' : 'border-transparent hover:scale-95'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Core Info */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                    {trip.category}
                  </span>
                  <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {trip.durationText}
                  </span>
                </div>
                <h1 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl leading-tight">
                  {trip.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Sale desde <strong className="text-slate-800">{trip.departureCity}</strong> rumbo a <strong className="text-slate-800">{trip.destination}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Salida: {formatDate(trip.departureDate)}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900">Sobre este viaje</h3>
                <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-line">{trip.description}</p>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Itinerario de Viaje</h3>
              <p className="mt-1 text-sm text-slate-500">Plan de viaje programado a detalle para que aproveches al máximo.</p>
              
              <div className="mt-8 relative border-l-2 border-emerald-100 pl-6 ml-3 space-y-8">
                {trip.itinerary.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Bullet */}
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                    
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Clock className="h-3 w-3" />
                        {item.timeOrDay}
                      </span>
                      <h4 className="mt-2 text-base font-extrabold text-slate-950">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Checklists */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Included */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ¿Qué está incluido?
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {trip.whatsIncluded.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  No está incluido
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {trip.whatsNotIncluded.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map / Departure Location */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Punto de Salida</h3>
                <p className="mt-1 text-sm text-slate-500">Conoce el punto de abordaje exacto para evitar retrasos.</p>
              </div>

              <div className="rounded-2xl border border-slate-150 bg-slate-50 p-4.5 flex gap-4 text-sm text-slate-600">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800">Dirección:</strong>
                  <p className="mt-1 text-slate-700 font-medium leading-relaxed">{trip.departureLocation.address}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-150 bg-slate-50 p-4.5 flex gap-4 text-sm text-slate-600">
                <Info className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800">Instrucciones de Abordaje:</strong>
                  <p className="mt-1 text-slate-700 font-medium leading-relaxed">{trip.departureLocation.instructions}</p>
                </div>
              </div>

              {/* Google Maps Embedded iframe */}
              {trip.departureLocation.embedUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200">
                  <iframe
                    title="Departure Point Map"
                    src={trip.departureLocation.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${trip.departureLocation.coordinates.lat},${trip.departureLocation.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
                >
                  Abrir en Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Operator details & Trust */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4.5">
                <img
                  src={trip.agency.logo}
                  alt={trip.agency.name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Operado por</span>
                  <h4 className="text-lg font-black text-slate-900">{trip.agency.name}</h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      ⭐ {trip.agency.rating}
                    </span>
                    <span>•</span>
                    <span>{trip.agency.totalTrips} viajes realizados</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDirectOperatorChat}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-slate-500" />
                  Contactar Operador
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Checkout Widget */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-32 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/50 space-y-6">
              
              {/* Header Details */}
              <div className="flex items-end justify-between border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Precio individual</span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-950">${trip.price.toLocaleString('es-MX')}</span>
                    <span className="text-xs font-semibold text-slate-500">{trip.currency}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Disponibles</span>
                  <span className={`text-base font-extrabold ${availableSeatsCount <= 5 ? 'text-rose-500' : 'text-slate-800'}`}>
                    {availableSeatsCount} / {trip.totalSeats} asientos
                  </span>
                </div>
              </div>

              {/* Checkout Steps Navigator */}
              {selectedSeats.length > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setCheckoutStep('seats')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                      checkoutStep === 'seats' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    1. Asientos
                  </button>
                  <button
                    disabled={selectedSeats.length === 0}
                    onClick={() => setCheckoutStep('passengers')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                      checkoutStep === 'passengers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    2. Datos
                  </button>
                  <button
                    disabled={passengers.some(p => !p.name.trim()) || !contactInfo.name || !contactInfo.phone}
                    onClick={() => setCheckoutStep('payment')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                      checkoutStep === 'payment' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    3. Pago
                  </button>
                </div>
              )}

              {/* STEP 1: Seat Selector Grid */}
              {checkoutStep === 'seats' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Selecciona tus asientos</h4>
                    <p className="text-xs text-slate-500">Haz clic para elegir qué lugares ocuparás en el autobús.</p>
                  </div>

                  {/* Seat Map Layout simulating a coach */}
                  <div className="rounded-2xl border border-slate-150 bg-slate-50/50 p-4">
                    {/* Front Indicator / Driver Seat */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        Frente del Autobús
                      </div>
                      
                      {/* Fake Driver Seat Icon */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-500 text-xs font-bold" title="Asiento de Conductor">
                        🚌
                      </div>
                    </div>

                    {/* Seat Grid Layout */}
                    <div className="grid grid-cols-4 gap-2.5 justify-items-center">
                      {renderSeats()}
                    </div>

                    {/* Seat Map Color Legend */}
                    <div className="mt-5 flex items-center justify-around border-t border-slate-200 pt-3 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded-md border border-slate-300 bg-white" /> Disponible
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded-md bg-emerald-600" /> Elegido
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="relative h-3 w-3 rounded-md border border-slate-200 bg-slate-100 overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="h-full w-0.5 rotate-45 bg-slate-350/60" />
                          </span>
                        </span> Ocupado
                      </span>
                    </div>
                  </div>

                  {/* Calculation Box */}
                  {selectedSeats.length > 0 ? (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                        <span>Asientos elegidos:</span>
                        <span>{selectedSeats.sort((a, b) => a - b).join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                        <span>Subtotal ({selectedSeats.length} {selectedSeats.length === 1 ? 'persona' : 'personas'}):</span>
                        <span>${(selectedSeats.length * trip.price).toLocaleString('es-MX')} MXN</span>
                      </div>

                      <button
                        onClick={handleGoToPassengers}
                        className="w-full mt-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 active:scale-98"
                      >
                        Continuar con mis datos
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4.5 text-center text-xs text-slate-500 font-medium leading-relaxed">
                      Elige al menos 1 asiento para iniciar el proceso de reserva.
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Passenger Details Form */}
              {checkoutStep === 'passengers' && (
                <form onSubmit={handleGoToPayment} className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Ingresa los datos</h4>
                    <p className="text-xs text-slate-500">Completa la información para el pase de lista antes de abordar.</p>
                  </div>

                  {/* Contact Person Details */}
                  <div className="space-y-3.5 border-b border-slate-100 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Responsable del grupo</span>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp de contacto</label>
                        <input
                          type="tel"
                          required
                          placeholder="Ej. 5512345678"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          required
                          placeholder="Ej. juan@correo.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passenger names for seats */}
                  <div className="space-y-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nombres de pasajeros</span>
                    {selectedSeats.map((seat, index) => (
                      <div key={seat} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700 border border-emerald-100">
                          {seat}
                        </div>
                        <input
                          type="text"
                          required
                          placeholder={`Nombre de Pasajero (Asiento ${seat})`}
                          value={passengers[index]?.name || ''}
                          onChange={(e) => handlePassengerChange(index, e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('seats')}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 active:scale-98"
                    >
                      Ir al método de pago
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Payment Instructions */}
              {checkoutStep === 'payment' && (
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h4 className="mt-3.5 font-extrabold text-slate-900 text-sm">Instrucciones de Pago Seguro</h4>
                    <p className="text-xs text-slate-500 mt-1">Sigue estos pasos para formalizar tus asientos y evitar cargos extra o reventa.</p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Bank Transfer CLABE Details */}
                    <div className="rounded-2xl border border-slate-150 bg-slate-50/70 p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                        <Building className="h-4 w-4 text-emerald-600 shrink-0" />
                        Transferencia Interbancaria (SPEI)
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Banco:</span>
                          <strong className="text-slate-800">BBVA México</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Beneficiario:</span>
                          <strong className="text-slate-800">Viajes Seguros S.A de C.V</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>CLABE:</span>
                          <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                            <span>0121 8001 2345 6789 01</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OXXO Alternative Details */}
                    <div className="rounded-2xl border border-slate-150 bg-slate-50/70 p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                        <CreditCard className="h-4 w-4 text-emerald-600 shrink-0" />
                        Depósito en OXXO / Ventanilla
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Tarjeta OXXO:</span>
                          <strong className="text-slate-800 font-mono">4152 3132 4545 6789</strong>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 text-center">
                          Recuerda que OXXO cobra una comisión fija de $15 pesos por depósito.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-4 text-xs font-semibold text-emerald-800 space-y-2">
                    <div className="flex justify-between">
                      <span>Total de Pasajeros:</span>
                      <span>{selectedSeats.length} personas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asientos reservados:</span>
                      <span>{selectedSeats.sort((a, b) => a - b).join(', ')}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-sm text-slate-900 border-t border-emerald-100/50 pt-2">
                      <span>Monto total a transferir:</span>
                      <span className="text-emerald-700">${(selectedSeats.length * trip.price).toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleFinalizeBooking}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 active:scale-98"
                    >
                      <span>He pagado, enviar por WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('passengers')}
                      className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                    >
                      Atrás para editar datos
                    </button>
                  </div>
                </div>
              )}

              {/* Operator chat button backup */}
              <div className="border-t border-slate-100 pt-5">
                <button
                  onClick={handleDirectOperatorChat}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-slate-400" />
                  ¿Prefieres reservar hablando con un asesor?
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
