import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast70Days } from "../../lib/features";
import { Box } from "@mui/material";
ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
);

const labels = getLast70Days();

// --- DARK THEME COLORS ---
const emerald = "#00a884";
const lightEmerald = "rgba(0, 168, 132, 0.2)";
const softIvory = "#e9edef";
const mutedSlate = "#8696a0";

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: mutedSlate }, // X-axis text color
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(255, 255, 255, 0.05)", // Subtle horizontal lines
      },
      ticks: { color: mutedSlate }, // Y-axis text color
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: lightEmerald,
        borderColor: emerald,
        pointBackgroundColor: emerald,
        pointBorderColor: "#fff",
        tension: 0.3, // Curve lines for a modern look
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  cutout: "70%", // Thinner doughnut for a cleaner look
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [emerald, "#1f2c33"], // Emerald vs Dark Charcoal
        hoverBackgroundColor: ["#008f6f", "#2a3942"],
        borderColor: ["transparent", "transparent"],
        offset: 10,
      },
    ],
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Doughnut
        style={{ zIndex: 10 }}
        data={data}
        options={DoughnutChartOptions}
      />
    </Box>
  );
};

export { LineChart, DoughnutChart };
