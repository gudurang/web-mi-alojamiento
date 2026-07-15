// Datos estructurales del sitio (no traducibles): imágenes, tarifas, claves.
import { RATES, type RoomKey } from "./pricing";

export interface RoomData {
  key: RoomKey;
  image: string;
  capacity: number;
  weekday: number;
  weekend: number;
  whole?: boolean;
}

export const ROOMS: RoomData[] = [
  {
    key: "serrana",
    image: "/images/serrana.webp",
    capacity: 2,
    weekday: RATES.serrana.weekday,
    weekend: RATES.serrana.weekend,
  },
  {
    key: "mirador",
    image: "/images/mirador.webp",
    capacity: 2,
    weekday: RATES.mirador.weekday,
    weekend: RATES.mirador.weekend,
  },
  {
    key: "alcoba",
    image: "/images/alcoba.webp",
    capacity: 2,
    weekday: RATES.alcoba.weekday,
    weekend: RATES.alcoba.weekend,
  },
  {
    key: "casa",
    image: "/images/hotel.webp",
    capacity: 6,
    weekday: RATES.casa.weekday,
    weekend: RATES.casa.weekend,
    whole: true,
  },
];

// Claves de servicios (se traducen en messages -> about.services.<key>)
export const SERVICES: string[] = [
  "breakfast",
  "wifi",
  "parking",
  "heating",
  "garden",
  "pets",
  "kitchen",
  "bbq",
  "ac",
  "iron",
  "hairdryer",
  "linen",
  "bikes",
];

// Claves del entorno (about environment.items.<key>)
export const ENVIRONMENT: string[] = [
  "hiking",
  "pools",
  "villages",
  "food",
  "bikes",
  "stars",
];

export interface GalleryImage {
  src: string;
  alt: string;
  span?: boolean; // ocupa 2 columnas
}

export const GALLERY: GalleryImage[] = [
  { src: "/images/paisaje.webp", alt: "Valle de Gredos al amanecer", span: true },
  { src: "/images/hotel.webp", alt: "La casa de piedra" },
  { src: "/images/mirador.webp", alt: "Habitación El Mirador" },
  { src: "/images/alcoba.webp", alt: "Suite La Alcoba del Fuego" },
  { src: "/images/serrana.webp", alt: "Habitación La Serrana" },
  { src: "/images/entorno.webp", alt: "Sierra de Gredos", span: true },
];
