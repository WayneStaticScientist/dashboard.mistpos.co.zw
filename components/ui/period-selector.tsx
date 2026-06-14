import React, { useState } from "react";
import { Button } from "./button";

type Period = "daily" | "weekly" | "monthly" | "yearly" | "all-time" | "custom";

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period, dates?: { start: string; end: string }) => void;
  className?: string;
}

export function PeriodSelector({ value, onChange, className = "" }: PeriodSelectorProps) {
  const [showCustom, setShowCustom] = useState(value === "custom");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handlePeriodChange = (period: Period) => {
    setShowCustom(period === "custom");
    if (period !== "custom") {
      onChange(period);
    }
  };

  const handleCustomApply = () => {
    if (startDate && endDate) {
      onChange("custom", { start: startDate, end: endDate });
    }
  };

  const periods: { label: string; value: Period }[] = [
    { label: "Daily", value: "daily" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-wrap items-center bg-ui-surface p-1 rounded-lg border border-white/5 w-fit">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => handlePeriodChange(p.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              value === p.value
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-400/50 font-semibold"
                : "text-ui-text-muted hover:text-ui-text-main hover:bg-ui-bg"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {showCustom && (
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-1.5 text-sm bg-ui-bg border border-white/5 rounded-md text-ui-text-main focus:outline-none focus:ring-2 focus:ring-ui-primary"
          />
          <span className="text-ui-text-muted">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-1.5 text-sm bg-ui-bg border border-white/5 rounded-md text-ui-text-main focus:outline-none focus:ring-2 focus:ring-ui-primary"
          />
          <Button 
            onClick={handleCustomApply} 
            disabled={!startDate || !endDate}
            size="sm"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
