import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions, // Import ChartOptions type
  ChartData, // Import ChartData type
} from "chart.js";

// 1. Register Chart.js components
// This step is crucial for Chart.js to work correctly
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the Chart Type for type safety (Line chart)
type ChartType = "line";

// 2. Define Chart Options (Styling, Responsiveness)
const options: ChartOptions<ChartType> = {
  responsive: true,
  maintainAspectRatio: false, // Allows flexible sizing within the container
  plugins: {
    legend: {
      position: "top" as const, // Chart.js requires position to be a specific string literal
      labels: {
        font: {
          family: "Inter",
        },
      },
    },
    title: {
      display: true,
      text: "Monthly Revenue Growth (USD)",
      font: {
        size: 18,
        family: "Inter",
      },
      color: "#1f2937", // Dark gray title
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: "Revenue",
        font: { family: "Inter" },
      },
      grid: {
        color: "#e5e7eb", // Light gray grid lines
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
        font: { family: "Inter" },
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
};

// 3. Define Chart Data
const labels: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
];

const chartData: ChartData<ChartType> = {
  labels,
  datasets: [
    {
      label: "Dataset 1: Previous Year",
      data: labels.map(
        () => Math.floor(Math.random() * (150 - 50 + 1) + 50) * 100
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4, // Smooth curve
    },
    {
      label: "Dataset 2: Current Year",
      data: labels.map(
        () => Math.floor(Math.random() * (250 - 100 + 1) + 100) * 100
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
    },
  ],
};

// 4. Main App Component (Using React.FC for function component typing)
export const MistLineGraph: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-start justify-center font-['Inter']">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Interactive Line Chart Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          A demonstration of a responsive Chart.js Line Graph in a single React
          component.
        </p>

        {/* Chart Container - Fixed height for visual consistency, fully responsive width */}
        <div className="h-[400px] w-full">
          <Line data={chartData} options={options} />
        </div>

        {/* Footer/Context Section */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Data Insights
          </h3>
          <p>
            The line graph compares the simulated monthly revenue for the
            current year against the previous year. The current year (blue line)
            shows a significantly higher average revenue, indicating strong
            growth.
          </p>
          <p className="mt-2">
            *Data is randomly generated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
