"use client";
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
} from "chart.js";
import { useMainReportStore } from "@/stores/main-report-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MistLineGraph = ({ label }: { label: string }) => {
  const report = useMainReportStore();

  return (
    <div className="w-full h-full flex items-start justify-center font-['Inter']">
      <div className="w-full h-full min-h-[320px]">
        <Line
          data={{
            labels: report.graphData.map((e) => {
              if (report.period === "monthly") {
                // If the period is monthly, the backend returns "01", "02", etc.
                const monthIndex = parseInt(e.date) - 1;
                if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
                  const d = new Date(2024, monthIndex, 1);
                  return d.toLocaleString("default", { month: "short" });
                }
              }
              if (report.period === "yearly" || e.date.length === 7) {
                // If date is "2024-01", format to "Jan"
                const [year, month] = e.date.split("-");
                if (year && month) {
                  const d = new Date(parseInt(year), parseInt(month) - 1, 1);
                  return d.toLocaleString("default", { month: "short" });
                }
              }
              return e.date;
            }),
            datasets: [
              {
                label: "Sales",
                data: report.graphData.map((e) => e.totalPaid),
                borderColor: "#10b981", // Emerald 500
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 5,
              },
              {
                label: "Profits",
                data: report.graphData.map((e) => e.totalProfit),
                borderColor: "#3b82f6", // Blue 500
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 5,
              },
              {
                label: "Expenses",
                data: report.graphData.map((e) => e.totalExpenses || 0),
                borderColor: "#f97316", // Orange 500
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  font: { family: "Inter", size: 12 },
                  usePointStyle: true,
                  boxWidth: 8,
                },
              },
              title: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(17, 24, 39, 0.9)", // Gray 900
                titleFont: { family: "Inter", size: 13 },
                bodyFont: { family: "Inter", size: 13 },
                padding: 12,
                cornerRadius: 8,
                boxPadding: 6,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(128, 128, 128, 0.1)", // Nice, faint, theme-persistent lines
                  tickColor: "transparent",
                },
                ticks: {
                  font: { family: "Inter" },
                  color: "rgba(156, 163, 175, 0.8)", // Gray-400
                  padding: 10,
                },
                border: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  font: { family: "Inter" },
                  color: "rgba(156, 163, 175, 0.8)", // Gray-400
                  maxTicksLimit: 10,
                  padding: 10,
                },
                border: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
