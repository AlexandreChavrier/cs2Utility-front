import DropdownMenu from "@/components/ui/navigation/DropdownMenu";
import Image from "next/image";
import { dropdownMenuMaps, dropdownMenuPositions, dropdownMenuSides, dropdownMenuTypes, dropdownMenuUtilities } from "@/data/dropdown";

const MapSection = () => {
  return (
    <section className="flex justify-center pb-20 pt-8">
      <div className="flex flex-col lg:flex-row w-full max-w-[1100px] p-6 gap-6 border-lg border-neutral-900 rounded-lg bg-neutral-1000">

        <div className="min-w-[250px] flex-shrink-0 bg-neutral-900 border-md border-neutral-800 rounded-md p-4">
          <div className="text-neutral-white text-heading-h6">
            {'Smokes Top Mid'}
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="w-full">
            <div className="hidden sm:grid sm:grid-cols-5 gap-2 md:gap-4">
              <div className='flex flex-col items-start justify-start gap-1'>
                <span className="text-sm font-medium">Carte</span>
                <DropdownMenu options={dropdownMenuMaps} />
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <span className="text-sm font-medium">Side</span>
                <DropdownMenu options={dropdownMenuSides} />
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <span className="text-sm font-medium">Utilitaire</span>
                <DropdownMenu options={dropdownMenuUtilities} />
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <span className="text-sm font-medium">Emplacement</span>
                <DropdownMenu options={dropdownMenuPositions} />
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <span className="text-sm font-medium">Type</span>
                <DropdownMenu options={dropdownMenuTypes} />
              </div>
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