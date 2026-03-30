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
import { lightpurple, purple } from "../../constants/color";
import { getLast70Days } from "../../lib/features";


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


const LineChart = ({value=[]}) => {

    const data = {
      labels,
      datasets: [
        {
          data: value,
          label: "Revenue",
          fill: true,
          backgroundColor: purple,
          borderColor: lightpurple,
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
