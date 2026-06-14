import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
  Chart,
} from "chart.js";
type AnyObject = Record<string, any>;

ChartJS.register(ArcElement, Tooltip, Legend);

interface CenterTextOptions {
  text: string;
  subtext: string;
}

interface CenterTextPlugin extends Plugin<"doughnut"> {
  options?: {
    centerText: CenterTextOptions;
  };
}

const centerTextPlugin: CenterTextPlugin = {
  id: "centerText",
  beforeDraw(chart: Chart<"doughnut">) {
    const centerText = (chart.options.plugins as AnyObject)?.centerText as
      | CenterTextOptions
      | undefined;

    if (!centerText) return;

    const { ctx } = chart;
    const { text, subtext } = centerText;

    ctx.save();

    const meta = chart.getDatasetMeta(0);
    if (meta.data.length === 0) {
      ctx.restore();
      return;
    }

    const xCenter = meta.data[0].x;
    const yCenter = meta.data[0].y;

    ctx.font = "bold 1.2rem Inter, sans-serif";
    ctx.fillStyle = "#9ca3af"; // Gray 400
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, xCenter, yCenter - 10);

    ctx.font = "0.8rem Inter, sans-serif";
    ctx.fillStyle = "#6b7280"; // Gray 500
    ctx.fillText(subtext, xCenter, yCenter + 15);

    ctx.restore();
  },
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "75%",
  rotation: 0,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
        font: { family: "Inter" },
        color: "#9ca3af",
      },
    },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.9)",
      titleFont: { family: "Inter", size: 13 },
      bodyFont: { family: "Inter", size: 13 },
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: ({ label, raw }) => ` ${label}: ${Number(raw).toFixed(1)}%`,
      },
    },
  },
};

export const CircularWheelChart = ({
  label,
  className = "",
  chartData,
}: {
  className?: string;
  label: string;
  chartData: {
    name: string;
    value: number;
    color: string;
  }[];
}) => {
  const totalData = chartData.reduce(
    (prev, current) => prev + current.value,
    0
  );
  
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <div className="w-full h-[250px] relative">
        <Doughnut
          data={{
            labels: chartData.map((e) => e.name),
            datasets: [
              {
                data: chartData.map((e) => totalData > 0 ? (e.value * 100) / totalData : 0),
                backgroundColor: chartData.map((e) => e.color),
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          }}
          options={options}
          plugins={[centerTextPlugin as Plugin<"doughnut", Object>]}
        />
      </div>
    </div>
  );
};
