import { Button } from "@heroui/react";

export const CardSteps = ({
  label,
  onPress,
  description,
}: {
  label: string;
  onPress?: () => void;
  description: string;
}) => {
  return (
    <div
      className={`p-4 bg-background rounded-lg shadow-sm border-1 border-[#e6e6e620] `}
    >
      <div className="text-sm text-foreground mb-2"> {description}</div>
      <Button onPress={onPress} variant="solid" color="primary">
        {label}
      </Button>
    </div>
  );
};
