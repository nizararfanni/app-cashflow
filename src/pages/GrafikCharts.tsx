import { Line } from "react-chartjs-2";
import { useTransaction } from "../context/TransactionContext"; // Tambahkan ini!
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface Transaction {
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}
const GrafikCharts = () => {
  const { transactions }: { transactions: Transaction[] } = useTransaction();

  // Filter hanya pengeluaran dari transaksi
  const expenseData: number[] = transactions
    .filter((trx) => trx.type === "expense")
    .map((trx) => trx.amount);

  // Filter hanya pemasukan dari transaksi
  const incomeeData: number[] = transactions
    .filter((trx) => trx.type === "income")
    .map((trx) => trx.amount);

  //  labels berdasarkan jumlah pengeluaran
  const labels: string[] = transactions.map(
    (_, index) => `Transaksi ${index + 1}`
  );

  //total balance
  const balanceData: number[] = transactions.reduce(
    (acc: number[], trx, index) => {
      const prevBalance = index === 0 ? 0 : acc[index - 1];
      const newBalance =
        trx.type === "income"
          ? prevBalance + Number(trx.amount)
          : prevBalance - Number(trx.amount);
      // Tambahin saldo baru ke array
      return [...acc, newBalance];
    },
    []
  );

  return (
    <div>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "balance",
              data: balanceData,
              backgroundColor: "green",
              borderColor: "rgb(75, 192, 192)",
            },
            {
              label: "income",
              data: incomeeData,
              backgroundColor: "blue",
              borderColor: "rgb(75, 90, 192)",
            },
            {
              label: "expense",
              data: expenseData,
              backgroundColor: "red",
              borderColor: "red",
            },
          ],
        }}
      />
    </div>
  );
};

export default GrafikCharts;
