import React from "react";

export const CardOverview = ({
  label,
  value,
  color,
  positive,
  increaseValue,
  icon: Icon,
}: {
  label: string;
  value: string;
  positive?: boolean;
  increaseValue?: string;
  color?: string;
  icon?: React.ElementType;
}) => {
  return (
    <div className="bg-ui-surface border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-ui-text-muted">{label}</div>
        {Icon && (
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/[0.04] border border-white/5 shadow-inner">
            <Icon className={`w-4 h-4 ${color || 'text-ui-text-main'}`} />
          </div>
        )}
      </div>
      <div>
        <div className={`text-2xl md:text-3xl font-bold mt-1 z-10 relative ${color || 'text-ui-text-main'}`}>
          {value}
        </div>
      </div>
      {increaseValue && (
        <div className="mt-4 flex items-center gap-1 z-10 relative">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              positive 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {increaseValue}
          </span>
        </div>
      )}
    </div>
  );
};
