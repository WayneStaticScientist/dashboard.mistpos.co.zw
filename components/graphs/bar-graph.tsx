"use client";
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
import { useMainReportStore } from "@/stores/main-report-store";

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

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const MistBarGraph: React.FC = () => {
  const report = useMainReportStore();

  return (
    <div className=" bg-background   font-sans">
      <div className="w-full max-w-4xl bg-background shadow-xl rounded-xl">
        <div className="relative w-full min-h-80">
          <Bar
            data={{
              labels: report.list.map((e) => e.date),
              datasets: [
                {
                  type: "bar" as const, // Explicitly define type for bar dataset
                  label: "Weekly Customers",
                  data: report.list.map((e) => e.uniqueCustomersCount),
                  backgroundColor: "rgba(59, 130, 246, 0.8)", // Tailwind blue-500
                  borderColor: "rgba(59, 130, 246, 1)",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderSkipped: false,
                },
              ],
            }}
            options={{
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
                  text: "Customers",
                  font: {
                    size: 18,
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
                  ticks: {
                    stepSize: 10,
                    font: {
                      family: "Inter, sans-serif",
                    },
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
