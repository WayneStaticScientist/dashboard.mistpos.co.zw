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
      label: "Sales",
      data: labels.map(
        () => Math.floor(Math.random() * (150 - 50 + 1) + 50) * 100
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4, // Smooth curve
    },
    {
      label: "Profits",
      data: labels.map(
        () => Math.floor(Math.random() * (150 - 50 + 1) + 50) * 100
      ),
      borderColor: "rgb(0, 255, 132)",
      backgroundColor: "rgba(0, 255, 132, 0.5)",
      tension: 0.4, // Smooth curve
    },
  ],
};

// 4. Main App Component (Using React.FC for function component typing)
export const MistLineGraph = ({ label }: { label: string }) => {
  return (
    <div className=" bg-background   flex items-start justify-center font-['Inter']">
      <div className="w-full max-w-4xl bg-background shadow-xl rounded-2xl">
        <div className=" w-full min-h-80">
          <Line
            data={chartData}
            options={{
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
                  text: label,
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
                    color: "#e5e7eb10", // Light gray grid lines
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Month",
                    font: { family: "Inter" },
                  },
                  grid: {
                    color: "#f5e7eb10",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
