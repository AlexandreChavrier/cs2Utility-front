import { upperFirst } from "lodash";
import { useMapHeight } from "../interactive-map/hooks/overlay/useMapHeight";
import { useDictionary } from "@/utils/providers/dictionaryProvider";

interface Props {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

const TwoColumnsLayout = ({ leftColumn, rightColumn }: Props) => {
  const { mapHeight, mapRef } = useMapHeight();
  const dictionary = useDictionary();

  return (
    <div className="w-full max-w-full lg:max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-2 lg:p-8 mx-auto">
      <aside
        className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin"
        style={{ maxHeight: mapHeight > 0 ? `${mapHeight}px` : "auto" }}
        aria-label={upperFirst(dictionary.global.filtersPanel)}
      >
        {leftColumn}
      </aside>
      <section
        ref={mapRef}
        className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-md p-2"
        aria-label={`${upperFirst(dictionary.interactiveMap.maps)}`}
        role="region"
      >
        {rightColumn}
      </section>
    </div>
  );
};

export default TwoColumnsLayout;
