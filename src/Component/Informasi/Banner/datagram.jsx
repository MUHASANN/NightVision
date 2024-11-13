import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

const BarChart = () => {
  const data = {
    labels: ['1/08/24', '4/08/24', '9/08/24', '10/08/24', '11/08/24', '12/08/24', '15/08/24'],
    datasets: [
      {
        data: [4, 8, 12, 16, 20, 8, 12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Pink
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)',  // Orange
          'rgba(255, 99, 71, 0.6)'    // Red
        ],
        borderColor: 'rgba(55, 65, 81, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          color: '#1F2937',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          beginAtZero: true,
          color: '#1F2937',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
