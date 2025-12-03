import { Button } from "@heroui/react";
import { MaterialColors } from "@/utils/colors";

export const MistIconButton = ({
  color,
  onPress,
  selected,
  svg,
}: {
  color: number;
  onPress: () => void;
  selected: boolean;
  svg: string;
}) => {
  return (
    <Button
      onPress={onPress}
      isIconOnly
      style={{
        backgroundColor: selected
          ? MaterialColors.intToHexARGB(color)
          : undefined,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Button>
  );
};
