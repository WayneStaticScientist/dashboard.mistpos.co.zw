export const CardOverview = ({
  label,
  value,
  color,
  positive,
  increaseValue,
}: {
  label: string;
  value: string;
  positive?: boolean;
  increaseValue?: string;
  color?: string;
}) => {
  return (
    <div
      className={`p-4 bg-background rounded-lg shadow-sm border-1 border-[#e6e6e620] `}
    >
      <div className="text-sm text-foreground">{label}</div>
      <div className="md:text-2xl font-semibold text-foreground">{value}</div>
      {increaseValue && (
        <div
          className={`text-xs ${positive ? "text-green-600" : "text-red-600"}`}
        >
          {increaseValue}
        </div>
      )}
    </div>
  );
};
