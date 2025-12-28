import TwoColumnsLayout from "../layouts/TwoColumnsLayout";
import MediaSection from "./components/MediaSection";

export const DetailsSection = () => {
  return (
    <TwoColumnsLayout
      leftColumn={
        <div>
          <h2>Details</h2>
        </div>
      }
      rightColumn={
        <div className="-m-2 rounded-md overflow-hidden">
          <MediaSection mapImgUrl={"/assets/example.png"} />
        </div>
      }
    />
  );
};
