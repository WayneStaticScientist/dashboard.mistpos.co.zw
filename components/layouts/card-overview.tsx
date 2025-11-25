export const CardOverview = ({
  label,
  value,
  positive,
  increaseValue,
}: {
  label: string;
  value: string;
  positive?: boolean;
  increaseValue?: string;
}) => {
  return (
    <div className="p-4 bg-background rounded-lg shadow-sm ">
      <div className="text-sm text-foreground">{label}</div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
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
