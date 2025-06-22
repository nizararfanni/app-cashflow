import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// register ArcElement
ChartJS.register(ArcElement, Tooltip, Legend);

interface BalanceChartProps {
  balance?: number;
  income?: number;
  expense?: number;
}
const BalanceChart = ({
  balance = 0,
  income = 0,
  expense = 0,
}: BalanceChartProps) => {
  const data = {
    labels: ["Saldo", "Pemasukan", "Pengeluaran"],
    datasets: [
      {
        label: "Ringkasan Keuangan",
        data: [balance, income, expense],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default BalanceChart;
