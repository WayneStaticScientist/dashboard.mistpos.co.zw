"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MistBarGraphProps {
  title?: string;
  label?: string;
  data: { date: string; amount: number }[];
  color?: string;
}

export const MistBarGraph: React.FC<MistBarGraphProps> = ({ 
  title = "Data", 
  label = "Amount", 
  data, 
  color = "rgba(249, 115, 22, 0.8)" // Orange default
}) => {
  return (
    <div className="w-full h-full font-sans">
      <div className="relative w-full h-full min-h-[320px]">
        <Bar
          data={{
            labels: data.map((e) => e.date),
            datasets: [
              {
                type: "bar" as const,
                label: label,
                data: data.map((e) => e.amount),
                backgroundColor: color,
                borderRadius: 4,
                borderSkipped: false,
                barPercentage: 0.6,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "rgba(30, 41, 59, 0.9)",
                padding: 10,
                cornerRadius: 8,
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
                  color: "rgba(156, 163, 175, 0.8)",
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.05)",
                },
                border: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: "Inter, sans-serif",
                  },
                  color: "rgba(156, 163, 175, 0.8)",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
