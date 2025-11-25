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

// 1. Register the necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// 2. Define types for the custom plugin configuration
interface CenterTextOptions {
  text: string;
  subtext: string;
}

// 3. Define the Plugin type
interface CenterTextPlugin extends Plugin<"doughnut"> {
  // Add the centerText options field to the plugin options
  options?: {
    centerText: CenterTextOptions;
  };
}

// --- Custom Plugin to Draw Text in the Center of the Doughnut ---
const centerTextPlugin: CenterTextPlugin = {
  id: "centerText",
  // Type the chart parameter using Chart<'doughnut'>
  beforeDraw(chart: Chart<"doughnut">) {
    // Safely cast and retrieve plugin options
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

    // Getting center coordinates from the chart meta
    const xCenter = meta.data[0].x;
    const yCenter = meta.data[0].y;

    // 1. Draw the Main Text (Title)
    ctx.font = "bold 1.2rem sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, xCenter, yCenter - 15);

    // 2. Draw the Subtext (Subtitle/Value)
    ctx.font = "0.8rem sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(subtext, xCenter, yCenter + 10);

    ctx.restore();
  },
};

// 4. Define the Data type
const data: ChartData<"doughnut"> = {
  labels: ["Sales", "Marketing"],
  datasets: [
    {
      label: "Department Allocation",
      data: [35, 65],
      backgroundColor: ["#ef4444", "#f59e0b"],
      borderColor: "#ffffff",
      borderWidth: 4,
    },
  ],
};

// 5. Define the Options type
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%",
  rotation: 0,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        // label callback is implicitly typed by Chart.js context
        label: ({ label, raw }) => `${label}: ${raw}%`,
      },
    },
  },
};

// 6. Define the Functional Component type
export const CircularWheelChart = ({
  label,
  className,
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
    <div className={className}>
      <h2 className="text-xl  text-foreground mb-6 text-center w-[200px]">
        {label}
      </h2>
      <div className="w-[200px] h-[200px] relative">
        <Doughnut
          data={{
            labels: chartData.map((e) => e.name),
            datasets: [
              {
                label: "Department Allocation",
                data: chartData.map((e) => (e.value * 100) / totalData),
                backgroundColor: chartData.map((e) => e.color),
                borderWidth: 0,
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

// 7. Type the main App function
