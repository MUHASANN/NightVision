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
        backgroundColor: ['#A2D3FF', '#74B3FD', '#5289DE', '#3071D1', '#0A3C6B', '#62BBEA', '#5EC0F3'],
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          beginAtZero: true,
          color: '#ffffff',
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
