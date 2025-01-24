import { Chip } from "@nextui-org/react";

export const LegendItem = ({ legend }) => {
    return (
      <div className="grid grid-cols-12">
        <Chip color={legend.color} className="col-span-3 lg:col-span-2">
          {legend.name}
        </Chip>
        <div className="text-sm col-span-9 lg:col-span-10">
          {legend.description}
        </div>
      </div>
    );
  };