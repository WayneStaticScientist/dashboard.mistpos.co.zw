import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement, // Required for line visual
  PointElement, // Required for line visual points
  LineController, // Required to register the 'line' controller type
  // Import ChartData and ChartOptions for strong typing
  ChartData,
  ChartOptions,
} from "chart.js";

// Register Chart.js components required for the bar and line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController
);

// Define the primary chart type for strong typing (Bar chart with a Line overlay)
type ChartType = "bar";

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

// Define the initial data using the generic ChartData type
const initialData: ChartData<ChartType, number[], string> = {
  labels: labels,
  datasets: [
    {
      type: "bar" as const, // Explicitly define type for bar dataset
      label: "Monthly Sales Volume",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(59, 130, 246, 0.8)", // Tailwind blue-500
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
};

// Define the options using the generic ChartOptions type
const options: ChartOptions<ChartType> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
    title: {
      display: true,
      text: "Q1-Q2 Performance Dashboard",
      font: {
        size: 18,
        family: "Inter, sans-serif",
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(30, 41, 59, 0.9)", // slate-800
      padding: 10,
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 10,
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
  },
};

export const MistBarGraph: React.FC = () => {
  // Apply ChartData type to the useState hook
  const [chartData] =
    useState<ChartData<ChartType, number[], string>>(initialData);

  useEffect(() => {
    console.log("Chart component mounted.");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          React Bar Chart Example (TypeScript)
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Visualizing monthly sales data against a fixed target line.
        </p>

        {/* Chart Container - Fixed height for visualization */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          {/* Pass options and data */}
          <Bar data={chartData} options={options} />
        </div>

        <div className="mt-8 text-sm text-gray-400 border-t pt-4 text-center">
          <p>Powered by Chart.js and react-chartjs-2.</p>
        </div>
      </div>
    </div>
  );
};
