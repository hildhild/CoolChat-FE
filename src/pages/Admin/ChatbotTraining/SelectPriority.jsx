import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const categoryColor = {
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "primary",
  NONE: "default",
};

export const SelectPriority = ({ id, value, setUpdatePriorities }) => {
  const [priority, setPriority] = useState(value);

  const handleChangePriority = (priority) => {
    setPriority(priority);
    setUpdatePriorities((pre) =>
      [
        ...pre.filter((item) => item.id !== id),
        { id: id, priority: priority },
      ].filter(
        (item) => (item.id === id && item.priority !== value) || item.id !== id
      )
    );
  };

  return (
    <Select
      aria-label="Select priority"
      color={categoryColor[priority]}
      defaultSelectedKeys={[priority]}
      size="sm"
      className="w-full"
      onChange={(e) => {
        if (e.target.value) {
          handleChangePriority(e.target.value);
        }
      }}
      isRequired
    >
      <SelectItem key="HIGH">Cao</SelectItem>
      <SelectItem key="MEDIUM">Trung bình</SelectItem>
      <SelectItem key="LOW">Thấp</SelectItem>
      {/* <SelectItem key="NONE">NONE</SelectItem> */}
    </Select>
  );
};
