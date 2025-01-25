import { Chip } from "@nextui-org/react";

export const LegendItem = ({ legend }) => {
    return (
      <div className="grid grid-cols-12">
        <Chip color={legend.color} className="col-span-4 sm:col-span-3 md:col-span-5 lg:col-span-3 2xl:col-span-2">
          {legend.name}
        </Chip>
        <div className="text-sm col-span-8 sm:col-span-9 md:col-span-7 lg:col-span-9 2xl:col-span-10">
          {legend.description}
        </div>
      </div>
    );
  };