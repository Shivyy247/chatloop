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
    plugins,
    scales,
} from "chart.js";


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

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    }
};


const LineChart = () => {

    const data = {
      labels: ["January", "Febuary", "March", "April", "May", "June"],
      datasets: [
        {
          data: [1, 2, 34,6],
          label: "Revenue",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          data: [1, 22, 5, 6],
          label: "Revenue 2",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    return (
        <Line data={data} options={lineChartOptions} />
    )
}

const DoughnutChart = () => {
    return (
        <div>charts</div>
    );
};

export {LineChart, DoughnutChart};
