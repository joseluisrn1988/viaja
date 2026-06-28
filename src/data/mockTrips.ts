import { Trip } from '../types/travel';

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    title: 'Grutas de Tolantongo: Paraíso de Aguas Termales',
    description: 'Escápate un fin de semana completo al cañón de Tolantongo. Disfruta de las pozas termales colgantes, recorre la gruta y el túnel de vapor, y relájate con el sonido de la cascada turquesa. Un viaje ideal para descansar y conectar con la naturaleza.',
    departureCity: 'CDMX',
    destination: 'Hidalgo',
    departureDate: '2026-05-15',
    returnDate: '2026-05-17',
    price: 1850,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Naturaleza',
    durationText: '2 Días, 1 Noche',
    departureLocation: {
      address: 'Monumento a la Revolución, Plaza de la República s/n, Tabacalera, CDMX (Frente al Café el Jarocho)',
      coordinates: { lat: 19.4362, lng: -99.1546 },
      instructions: 'Punto de encuentro a las 05:30 AM para salir puntuales a las 06:00 AM. Identifica el autobús turquesa con el banner "Rutas Verdes México".',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5318621746205!2d-99.1567886850933!3d19.436215386881724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d4847e0965%3A0x6fb86b5993dfcd49!2sMonumento%20a%20la%20Revoluci%C3%B3n!5e0!3m2!1ses-419!2smx!4v1680000000000!5m2!1ses-419!2smx'
    },
    whatsIncluded: [
      'Transporte redondo en autobús de turismo con A/A y TV',
      '1 noche de hospedaje en Hotel de la Gruta (habitación doble)',
      'Entradas de 2 días al parque Tolantongo (todas las atracciones)',
      'Coordinador de viaje bilingüe',
      'Seguro de viajero a bordo del autobús'
    ],
    whatsNotIncluded: [
      'Alimentos y bebidas (gasto aprox $400 MXN por día)',
      'Actividades de aventura como Tirolesa ($250 MXN)',
      'Propinas a guías locales'
    ],
    itinerary: [
      {
        timeOrDay: 'Día 1 - 05:30 AM',
        title: 'Cita en el Monumento a la Revolución',
        description: 'Pase de lista y asignación de asientos. Salida puntual rumbo a Hidalgo.'
      },
      {
        timeOrDay: 'Día 1 - 10:30 AM',
        title: 'Llegada y registro al parque',
        description: 'Haremos el check-in en el hotel y descenderemos a la zona de Pozas Termales para las primeras fotos grupales.'
      },
      {
        timeOrDay: 'Día 1 - 02:00 PM',
        title: 'Almuerzo libre en Cocina Tradicional',
        description: 'Sugerimos probar la deliciosa barbacoa de borrego cocida bajo tierra.'
      },
      {
        timeOrDay: 'Día 1 - 04:30 PM',
        title: 'Senderismo a la Gruta y el Túnel de Vapor',
        description: 'Exploraremos la cueva principal de donde brota el agua termal a 38°C y el túnel colgante.'
      },
      {
        timeOrDay: 'Día 2 - 08:00 AM',
        title: 'Desayuno y caminata fotográfica',
        description: 'Disfruta de la mañana tranquila antes de que se llene el parque. Ideal para fotos perfectas en las Pozas Azules.'
      },
      {
        timeOrDay: 'Día 2 - 01:00 PM',
        title: 'Tarde de Camping o Tirolesa',
        description: 'Tiempo libre para realizar la tirolesa extrema de 1,800 metros de longitud.'
      },
      {
        timeOrDay: 'Día 2 - 05:00 PM',
        title: 'Salida de regreso a CDMX',
        description: 'Abordamos el transporte. Llegada estimada a la CDMX a las 09:30 PM.'
      }
    ],
    agency: {
      name: 'Rutas Verdes México',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 4.8,
      totalTrips: 142,
      isVerified: true,
      phone: '525512345678'
    },
    totalSeats: 40,
    blockedSeats: [2, 3, 5, 6, 12, 13, 20, 24, 25, 31],
    whatsappNumber: '525512345678'
  },
  {
    id: 'trip-2',
    title: 'Ruta del Tequila y Pueblo Mágico Coqueta',
    description: 'Vive una experiencia única en el corazón de Jalisco. Conoceremos los campos azules de agave (patrimonio de la humanidad), visitaremos una destilería artesanal con degustación directa de barrica, y recorreremos el Pueblo Mágico de Tequila cantando con mariachi en un cantarito tradicional.',
    departureCity: 'Guadalajara',
    destination: 'Jalisco',
    departureDate: '2026-05-24',
    returnDate: '2026-05-24',
    price: 950,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Pueblo Mágico',
    durationText: '1 Día (Full Day)',
    departureLocation: {
      address: 'Frente a Minerva Guadalajara, Av. Ignacio L. Vallarta, Arcos Vallarta, Guadalajara, Jal.',
      coordinates: { lat: 20.6744, lng: -103.3873 },
      instructions: 'Punto de reunión: Banqueta norte de la Minerva, a un costado del OXXO. Salida puntual 08:30 AM.',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.969192534575!2d-103.38943508453412!3d20.674415586191834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae03b879a835%3A0xe54e1957242e2a0f!2sGlorieta%20La%20Minerva!5e0!3m2!1ses-419!2smx!4v1680000000001!5m2!1ses-419!2smx'
    },
    whatsIncluded: [
      'Transporte de ida y vuelta en camioneta tipo Sprinter Ejecutiva',
      'Degustación de tequilas blancos, reposados y añejos en destilería',
      'Visita guiada a los campos de agave azul para fotos espectaculares',
      '1 Cantarito de Tequila gigante de cortesía',
      'Coordinador del tour y guía certificado'
    ],
    whatsNotIncluded: [
      'Comida en el Pueblo Mágico (hay opciones desde $150 MXN)',
      'Souvenirs y botellas de tequila para llevar'
    ],
    itinerary: [
      {
        timeOrDay: '08:00 AM',
        title: 'Reunión en Glorieta Minerva',
        description: 'Toma de asistencia y acomodo en la camioneta.'
      },
      {
        timeOrDay: '09:30 AM',
        title: 'Sesión de fotos en Campos de Agave',
        description: 'Aprenderemos el proceso de jima (corte del agave) con un jimador local.'
      },
      {
        timeOrDay: '11:00 AM',
        title: 'Tour en la Destilería "El Viejo Agave"',
        description: 'Conoce los hornos de mampostería, alambiques de cobre y la cava subterránea de barricas.'
      },
      {
        timeOrDay: '01:30 PM',
        title: 'Almuerzo en el centro histórico de Tequila',
        description: 'Tiempo libre para pasear por la plaza, el templo de Santiago Apóstol y los callejones.'
      },
      {
        timeOrDay: '04:30 PM',
        title: 'Cantaritos "El Güero" con música en vivo',
        description: 'Haremos una parada en el famoso lugar de cantaritos para celebrar con mariachi y banda.'
      },
      {
        timeOrDay: '06:30 PM',
        title: 'Regreso a Guadalajara',
        description: 'Arribo a La Minerva a las 08:00 PM aproximadamente.'
      }
    ],
    agency: {
      name: 'Experiencias de Jalisco',
      logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 4.9,
      totalTrips: 94,
      isVerified: true,
      phone: '523312345678'
    },
    totalSeats: 19,
    blockedSeats: [1, 2, 4, 7, 8, 15, 18],
    whatsappNumber: '523312345678'
  },
  {
    id: 'trip-3',
    title: 'Aventura Extrema en Huasteca Potosina',
    description: 'Un viaje de pura adrenalina y cascadas espectaculares. Saltaremos de cascadas en Micos, remaremos en balsa por el río Tampaón hasta la imponente cascada de Tamul, y exploraremos el Jardín Surrealista de Edward James en Xilitla. El viaje mochilero definitivo.',
    departureCity: 'Monterrey',
    destination: 'San Luis Potosí',
    departureDate: '2026-06-05',
    returnDate: '2026-06-08',
    price: 3600,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Aventura',
    durationText: '4 Días, 3 Noches',
    departureLocation: {
      address: 'Pabellón M, Av. Constitución s/n, Centro, Monterrey, N.L. (Frente a la entrada peatonal principal)',
      coordinates: { lat: 25.6698, lng: -100.3159 },
      instructions: 'Cita a las 09:30 PM de la noche anterior. Salimos de madrugada para amanecer en la Huasteca y aprovechar el primer día.',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.1105995540326!2d-100.31808878498099!3d25.669815383677273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662be02111b2cb5%3A0x633513b6eb4cfaf!2sPabell%C3%B3n%20M!5e0!3m2!1ses-419!2smx!4v1680000000002!5m2!1ses-419!2smx'
    },
    whatsIncluded: [
      'Autobús de gran turismo con asientos reclinables, puertos USB y sanitario',
      '3 noches en Hostal de Aventura de primer nivel en Ciudad Valles',
      'Todo el equipo de seguridad (chaleco salvavidas, casco, remos)',
      'Entradas a Tamul, Micos, Xilitla y Puente de Dios',
      '3 desayunos huastecos completos',
      'Fotografía digital grupal del viaje de recuerdo'
    ],
    whatsNotIncluded: [
      'Comidas y cenas cotidianas',
      'Renta de calzado para agua (puedes llevar tus tenis viejos o comprar aquashoes)'
    ],
    itinerary: [
      {
        timeOrDay: 'Día 1 - 07:00 AM',
        title: 'Desayuno en Ciudad Valles y salto de cascadas',
        description: 'Llegada, check-in express y directo a Cascadas de Micos para realizar salto de cascadas de diferentes alturas (desde 1 hasta 8 metros).'
      },
      {
        timeOrDay: 'Día 2 - 08:30 AM',
        title: 'Balsa a la majestuosa Cascada de Tamul',
        description: 'Remaremos a contracorriente en canoa tradicional de madera (panga) por el cañón turquesa del río Tampaón hasta ver la caída de 105 metros de Tamul.'
      },
      {
        timeOrDay: 'Día 3 - 09:00 AM',
        title: 'Magia surrealista en Xilitla',
        description: 'Recorreremos el Jardín de las Pozas de Edward James, lleno de esculturas góticas integradas con la selva tropical.'
      },
      {
        timeOrDay: 'Día 4 - 09:00 AM',
        title: 'Puente de Dios: El cenote azul',
        description: 'Última parada para nadar en una fosa de agua azul cobalto rodeada de estalactitas y luz solar mágica.'
      },
      {
        timeOrDay: 'Día 4 - 03:00 PM',
        title: 'Almuerzo final y retorno',
        description: 'Abordamos transporte de regreso a Monterrey. Llegada aproximada a las 11:00 PM.'
      }
    ],
    agency: {
      name: 'EcoExplora Monterrey',
      logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 4.7,
      totalTrips: 215,
      isVerified: true,
      phone: '528112345678'
    },
    totalSeats: 44,
    blockedSeats: [1, 2, 3, 4, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 40, 41, 42],
    whatsappNumber: '528112345678'
  },
  {
    id: 'trip-4',
    title: 'Peña de Bernal e Viñedos Freixenet',
    description: 'Disfruta de un día súper relajante combinando la energía mística del tercer monolito más grande del mundo en Peña de Bernal con una cata de vinos espumosos a 25 metros de profundidad en las cavas subterráneas de Sala Vivé de Freixenet.',
    departureCity: 'Querétaro',
    destination: 'Querétaro',
    departureDate: '2026-05-10',
    returnDate: '2026-05-10',
    price: 780,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Fin de Semana',
    durationText: '1 Día',
    departureLocation: {
      address: 'Plaza del Parque, Calzada Bernardo Quintana 2001, Querétaro (Frente a Sanborns)',
      coordinates: { lat: 20.6122, lng: -100.3845 },
      instructions: 'Punto de encuentro: 08:30 AM en el estacionamiento frente a Sanborns. Salida puntual 09:00 AM.',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.544712534575!2d-100.38653508453412!3d20.612215586191834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35ad3b879a835%3A0xe54e1957242e2a0f!2sPlaza%20del%20Parque!5e0!3m2!1ses-419!2smx!4v1680000000003!5m2!1ses-419!2smx'
    },
    whatsIncluded: [
      'Transporte redondo en autobús de turismo premium',
      'Visita al Pueblo Mágico de Bernal para compras de cuarzos y pan de queso',
      'Entrada guiada a las Cavas de Freixenet con degustación de vino espumoso',
      'Copa de vino de cristal de souvenir',
      'Coordinador y seguro de viaje a bordo'
    ],
    whatsNotIncluded: [
      'Almuerzo (sugerimos comer gorditas de maíz quebrado en Bernal)',
      'Ascenso guiado a la cima de la Peña ($100 MXN extra)'
    ],
    itinerary: [
      {
        timeOrDay: '08:30 AM',
        title: 'Cita en Plaza del Parque',
        description: 'Toma de lista de pasajeros y asignación de asientos en el autobús.'
      },
      {
        timeOrDay: '10:00 AM',
        title: 'Llegada al Pueblo Mágico de Bernal',
        description: 'Tiempo libre para desayunar gorditas y caminar por los andadores llenos de artesanías de lana.'
      },
      {
        timeOrDay: '01:30 PM',
        title: 'Visita a Finca Sala Vivé de Freixenet',
        description: 'Haremos el recorrido por el viñedo y descenderemos a la cava de maduración que está a 25 metros bajo tierra para la explicación de la doble fermentación.'
      },
      {
        timeOrDay: '03:30 PM',
        title: 'Brindis y tarde libre en jardines',
        description: 'Tiempo para tomar una copa de vino, escuchar música acústica y relajarse en el viñedo.'
      },
      {
        timeOrDay: '06:00 PM',
        title: 'Regreso a Querétaro',
        description: 'Retorno para llegar al punto de partida a las 07:00 PM.'
      }
    ],
    agency: {
      name: 'Rutas Queretanas',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 4.9,
      totalTrips: 68,
      isVerified: true,
      phone: '524421234567'
    },
    totalSeats: 30,
    blockedSeats: [3, 4, 11, 12, 19, 20, 25, 26, 27, 28],
    whatsappNumber: '524421234567'
  }
];
