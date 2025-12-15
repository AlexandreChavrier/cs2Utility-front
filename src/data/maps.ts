export interface GameMap {
  id: number;
  name: string;
  icon: string;
  image?: string;
  radarImage?: string;
  link?: string;
  active?: boolean;
}

// Liste des cartes disponibles
export const maps: GameMap[] = [
  {
    id: 1,
    name: "Mirage",
    icon: "/assets/maps/mirage/icon.webp",
    image: "/assets/maps/mirage/image.webp",
    radarImage: "/assets/maps/mirage/radar.webp",
    link: "/mirage",
    active: true,
  },
  {
    id: 2,
    name: "Ancient",
    icon: "/assets/maps/ancient/icon.webp",
    image: "/assets/maps/ancient/image.webp",
    radarImage: "/assets/maps/ancient/radar.webp",
    link: "/ancient",
    active: true,
  },
  {
    id: 3,
    name: "Nuke",
    icon: "/assets/maps/nuke/icon.webp",
    image: "/assets/maps/nuke/image.webp",
    radarImage: "/assets/maps/nuke/radar-up.webp",
    link: "/nuke",
    active: true,
  },
  {
    id: 4,
    name: "Inferno",
    icon: "/assets/maps/inferno/icon.webp",
    image: "/assets/maps/inferno/image.webp",
    radarImage: "/assets/maps/inferno/radar.webp",
    link: "/inferno",
    active: true,
  },
  {
    id: 5,
    name: "Train",
    icon: "/assets/maps/train/icon.webp",
    image: "/assets/maps/train/image.webp",
    radarImage: "/assets/maps/train/radar.webp",
    link: "/train",
    active: true,
  },
  {
    id: 6,
    name: "Dust2",
    icon: "/assets/maps/dust2/icon.webp",
    image: "/assets/maps/dust2/image.webp",
    radarImage: "/assets/maps/dust2/radar.webp",
    link: "/dust2",
    active: true,
  },
  // {
  //   id: 7,
  //   name: "Anubis",
  //   icon: "/assets/maps/anubis/icon.webp",
  //   image: "/assets/maps/anubis/image.webp",
  //   radarImage: "/assets/maps/anubis/radar.webp",
  //   link: "/lineups",
  //   active: true,
  // },
  {
    id: 7,
    name: "Overpass",
    icon: "/assets/maps/overpass/icon.webp",
    image: "/assets/maps/overpass/image.webp",
    radarImage: "/assets/maps/overpass/radar.webp",
    link: "/overpass",
    active: true,
  },
];

// Fonctions utilitaires pour travailler avec les cartes
export const getActiveMapsList = () => maps.filter((map) => map.active);
export const getMapById = (id: number) => maps.find((map) => map.id === id);
