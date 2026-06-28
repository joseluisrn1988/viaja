export interface ItineraryItem {
  timeOrDay: string;
  title: string;
  description: string;
}

export interface Agency {
  name: string;
  logo: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  phone: string;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  departureCity: string;
  destination: string;
  departureDate: string; // ISO string or YYYY-MM-DD
  returnDate: string;
  price: number;
  currency: string;
  images: string[];
  category: 'Playa' | 'Naturaleza' | 'Pueblo Mágico' | 'Aventura' | 'Cultural' | 'Fin de Semana';
  durationText: string; // e.g., "1 Día", "3 Días, 2 Noches"
  departureLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
    instructions: string;
    embedUrl?: string; // Standard maps embed
  };
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  itinerary: ItineraryItem[];
  agency: Agency;
  totalSeats: number;
  blockedSeats: number[]; // Indices of seats that are already sold/taken (1-indexed)
  whatsappNumber: string; // Number to send the booking to
}

export interface Booking {
  id: string;
  tripId: string;
  tripTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedSeats: number[];
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed';
}
