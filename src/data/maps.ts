export interface GameMap {
  id: number;
  name: string;
  icon: string;
  image?: string
  link?: string;
  active?: boolean;
}

// Liste des cartes disponibles
export const maps: GameMap[] = [
  {
    id: 1,
    name: 'Mirage',
    icon: '/assets/mapIcons/mirageIcon.webp',
    image: '/assets/mapImages/mirage.webp',
    link: '/lineups',
    active: true,

  },
  {
    id: 2,
    name: 'Ancient',
    icon: '/assets/mapIcons/ancientIcon.webp',
    image: '/assets/mapImages/ancient.webp',
    link: '/lineups',
    active: true
  },
  {
    id: 3,
    name: 'Nuke',
    icon: '/assets/mapIcons/nukeIcon.webp',
    image: '/assets/mapImages/nuke.webp',
    link: '/lineups',
    active: true
  },
  {
    id: 4,
    name: 'Inferno',
    icon: '/assets/mapIcons/infernoIcon.webp',
    image: '/assets/mapImages/inferno.webp',
    link: '/lineups',
    active: true
  },
  {
    id: 5,
    name: 'Train',
    icon: '/assets/mapIcons/trainIcon.webp',
    image: '/assets/mapImages/train.webp',
    link: '/lineups',
    active: true
  },
  {
    id: 6,
    name: 'DustII',
    icon: '/assets/mapIcons/dust2Icon.webp',
    image: '/assets/mapImages/dust2.webp',
    link: '/lineups',
    active: true
  },
  {
    id: 7,
    name: 'Anubis',
    icon: '/assets/mapIcons/anubisIcon.webp',
    image: '/assets/mapImages/anubis.webp',
    link: '/lineups',
    active: true
  }
];

// Fonctions utilitaires pour travailler avec les cartes
export const getActiveMapsList = () => maps.filter(map => map.active);
export const getMapById = (id: number) => maps.find(map => map.id === id);