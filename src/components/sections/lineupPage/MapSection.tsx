// import DropdownMenu, { ClassNameDropdownMenu, DropdownContent } from "@/components/ui/navigation/DropdownMenu";
// import InteractiveMap from "./components/InteractiveMap";
// import Image from "next/image";

// const STYLES_DROPDOWNMENU_CLASSIQUE: ClassNameDropdownMenu = {
//   container: "relative min-w-[88px]",
//   trigger: "flex items-center justify-between w-full bg-neutral-800 border-md border-neutral-600 rounded-sm px-3 py-2 gap-1",
//   icon: "transition-transform duration-500",
//   dropdown: "absolute w-full mt-1 bg-neutral-800 border-md border-neutral-600 rounded-sm shadow-lg z-10 max-h-60 overflow-auto",
//   linkWrapper: null,
//   item: "p-3 hover:bg-neutral-700 cursor-pointer transition-colors"
// }

// const dropdownMenuHeader2: DropdownContent[] = [
//   {
//     icon: null,
//     items: "Mirage"
//   },
//   {
//     icon: null,
//     items: "Ancient"
//   },
//   {
//     icon: null,
//     items: "Nuke"
//   },
//   // ... autres options
// ];

// const MapSection = () => {
//   return (
//     <section className="flex justify-center pb-30 pt-12">
//       <div className="flex flex-row w-full max-w-[1280px] p-8 gap-8 border-lg border-neutral-900 rounded-lg bg-neutral-1000">
//         <div className="bg-neutral-900 border-md border-neutral-800 rounded-md p-6 gap-6">
//           <div className="text-neutral-white text-heading-h6 gap-2">
//             {'bonjour les gens'}
//           </div>
//         </div>
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-row justify-between gap-32">
//             <div className='flex flex-col items-start justify-start gap-2'>
//               <span>Carte</span>
//               <DropdownMenu options={dropdownMenuHeader2} className={STYLES_DROPDOWNMENU_CLASSIQUE} />
//             </div>
//             <div className='flex flex-col items-start justify-start gap-2'>
//               <span>Utilitaire</span>
//               <DropdownMenu options={dropdownMenuHeader2} className={STYLES_DROPDOWNMENU_CLASSIQUE} />
//             </div>
//             <div className='flex flex-col items-start justify-start gap-2'>
//               <span>Emplacement</span>
//               <DropdownMenu options={dropdownMenuHeader2} className={STYLES_DROPDOWNMENU_CLASSIQUE} />
//             </div>
//             <div className='flex flex-col items-start justify-start gap-2'>
//               <span>Equipe</span>
//               <DropdownMenu options={dropdownMenuHeader2} className={STYLES_DROPDOWNMENU_CLASSIQUE} />
//             </div>
//             <div className='flex flex-col items-start justify-start gap-2'>
//               <span>Equipe</span>
//               <DropdownMenu options={dropdownMenuHeader2} className={STYLES_DROPDOWNMENU_CLASSIQUE} />
//             </div>

//           </div>
//           <div className="bg-neutral-900 border-md border-neutral-800 rounded-md">
//             <div className="relative w-full">
//               <Image
//                 src="/assets/maps/mirage-map.png"
//                 width={800}
//                 height={600}
//                 alt="mirage map"
//                 className="w-full h-auto"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default MapSection;

import DropdownMenu, { DropdownContent } from "@/components/ui/navigation/DropdownMenu";
import InteractiveMap from "./components/InteractiveMap";
import Image from "next/image";


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

const MapSection = () => {
  return (
    <section className="flex justify-center pb-30 pt-12">
      <div className="flex flex-col lg:flex-row w-full max-w-[1280px] p-8 gap-8 border-lg border-neutral-900 rounded-lg bg-neutral-1000">

        <div className="flex-shrink-0 bg-neutral-900 border-md border-neutral-800 rounded-md p-6">
          <div className="text-neutral-white text-heading-h6">
            {'bonjour les gens'}
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1 min-w-0">

          <div className="flex flex-row justify-between gap-8">
            <div className='flex flex-col items-start justify-start gap-2'>
              <span className="text-sm font-medium">Carte</span>
              <DropdownMenu options={dropdownMenuHeader2} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2'>
              <span className="text-sm font-medium">Utilitaire</span>
              <DropdownMenu options={dropdownMenuHeader2} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2'>
              <span className="text-sm font-medium">Emplacement</span>
              <DropdownMenu options={dropdownMenuHeader2} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2'>
              <span className="text-sm font-medium">Équipe 1</span>
              <DropdownMenu options={dropdownMenuHeader2} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2'>
              <span className="text-sm font-medium">Équipe 2</span>
              <DropdownMenu options={dropdownMenuHeader2} />
            </div>
          </div>

          <div className="bg-neutral-900 border-md border-neutral-800 rounded-md overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/assets/maps/mirage-map.png"
                fill
                alt="mirage map"
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection;