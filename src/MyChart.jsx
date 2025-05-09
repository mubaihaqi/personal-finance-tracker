// src/MyChart.jsx
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

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MyChart() {
  const data = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei"],
    datasets: [
      {
        label: "Pemasukan (juta)",
        data: [5, 10, 7, 12, 8],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Statistik Pemasukan Bulanan" },
    },
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-teal-600">My Chart</h1>
      <p className="mb-4">
        This is the My Chart page where you can view your financial data.
      </p>
      <Bar data={data} options={options} />
    </div>
  );
}
