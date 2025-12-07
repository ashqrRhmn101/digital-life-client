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
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ data }) => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Lessons Added",
        data: data, // Example: [5, 9, 3, 7, 2, 8, 4]
        borderColor: "rgb(245, 158, 11)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};

export default AnalyticsChart;