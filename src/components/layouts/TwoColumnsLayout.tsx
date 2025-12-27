interface Props {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  mapRef?: React.RefObject<HTMLDivElement | null>;
}

const TwoColumnsLayout = ({ leftColumn, rightColumn, mapRef }: Props) => {
  return (
    <div className="w-full max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-8 mx-auto">
      <div className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin">
        {leftColumn}
      </div>
      <div
        ref={mapRef}
        className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-md p-2"
      >
        {rightColumn}
      </div>
    </div>
  );
};

export default TwoColumnsLayout;
