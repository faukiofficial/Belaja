import { FC } from "react";
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

// Registrasi elemen-elemen yang digunakan oleh Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  ordersAnalitycs: [],
};

const OrdersAnalytics: FC<Props> = ({ ordersAnalitycs }) => {

  // Transformasi data untuk Chart.js
  const chartData = {
    labels: ordersAnalitycs.map((item) => item.month), // Labels untuk sumbu X
    datasets: [
      {
        label: "Orders Count",
        data: ordersAnalitycs.map((item) => item.count), // Data untuk sumbu Y
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Warna bar
        borderColor: "rgba(54, 162, 235, 1)", // Warna border
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders Analytics - Last 12 Months",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Mulai dari 0 pada sumbu Y
      },
    },
  };

  return (
    <>
    
        <div className="h-full">
          <div className="w-fullflex items-center justify-center">
            <div className="w-full h-[400px]">
              <Bar data={chartData} options={options} />
            </div>
          </div>
        </div>
    </>
  );
};

export default OrdersAnalytics;
