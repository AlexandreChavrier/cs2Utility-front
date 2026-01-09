import FilterSection from "../interactive-map/components/FilterSection";
import TwoColumnsLayout from "../layouts/TwoColumnsLayout";
import HeartIcon from "../ui/icons/HeartIcon";
import MediaSection from "./components/MediaWrapper";

interface Props {
  lineupUuid: string;
}

export const DetailsSection = ({}: Props) => {
  const filters = [
    {
      filterName: "Ajouter aux favoris",
      icon: <HeartIcon />,
    },
    {
      filterName: "Copier les coordonnées",
      icon: "",
    },
  ];

  return (
    <TwoColumnsLayout
      leftColumn={
        <>
          <FilterSection title="Actions" filters={filters} />
          {/* BreadCrumbsNavigationHere */}
          {/* actionsSection */}
          {/* MediaChanges */}
          {/* LineupDetails */}
        </>
      }
      rightColumn={
        <div className="-m-2 rounded-md overflow-hidden">
          <MediaSection mapImgUrl={"/assets/example.png"} />
        </div>
      }
    />
  );
};
