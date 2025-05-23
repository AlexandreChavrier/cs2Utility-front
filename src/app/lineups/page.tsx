'use client';

import MapSection from "@/components/sections/lineupPage/MapSection";
import DropdownMenu, { DropdownContent } from "@/components/ui/navigation/DropdownMenu";

const texts = ["A site", "B site", "Mid"]

const dropdownMenuHeader: DropdownContent[] = [
  {
    icon: '/assets/mapIcons/mirageIcon.webp',
    items: "Mirage"
  },
  {
    icon: '/assets/mapIcons/ancientIcon.webp',
    items: "Ancient"
  },
  {
    icon: '/assets/mapIcons/nukeIcon.webp',
    items: "Nuke"
  },
];

const dropdownMenuHeader2: DropdownContent[] = [
  {
    icon: null,
    items: "Mirage"
  },
  {
    icon: null,
    items: "Ancient"
  },
  {
    icon: null,
    items: "Nuke"
  },
  // ... autres options
];


export default function LineupsPage() {
  return (
    <MapSection />

  )
}