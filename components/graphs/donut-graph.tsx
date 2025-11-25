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
  labels: ["Sales", "Marketing", "Development", "Support"],
  datasets: [
    {
      label: "Department Allocation",
      data: [35, 25, 30, 10],
      backgroundColor: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
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
export const CircularWheelChart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl shadow-lg m-4 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Budget Allocation Wheel
      </h2>

      {/* Chart container with fixed dimensions */}
      <div className="w-[350px] h-[350px] relative">
        <Doughnut
          data={data}
          options={options}
          // Cast the plugin array element to the expected type
          plugins={[centerTextPlugin as Plugin<"doughnut", Object>]}
        />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Each segment represents the percentage allocated to a department.
      </p>
    </div>
  );
};

// 7. Type the main App function
