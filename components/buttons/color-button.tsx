import { MaterialColors } from "@/utils/colors";
import { Button } from "@heroui/react";
import { MdDone } from "react-icons/md";

export const MistColorButton = ({
  color,
  onPress,
  selected,
}: {
  color: number;
  onPress: () => void;
  selected: boolean;
}) => {
  return (
    <Button
      onPress={onPress}
      isIconOnly
      style={{
        backgroundColor: MaterialColors.intToHexARGB(color),
      }}
    >
      {selected && <MdDone />}
    </Button>
  );
};
