
import { useTransaction } from "../context/TransactionContext";
import BalanceChart from "../components/charts/BalanceChart";
import { useFinance } from "../context/FinanceContext";

interface DashboardCardProps {
  title: string;
  value: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  color,
}) => (
  <div className={`p-4 bg-white shadow rounded-lg text-center ${color}`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const { transactions } = useTransaction();
  const { balance, income, expense } = useFinance();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Ringkasan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Saldo"
          value={`Rp ${balance.toLocaleString("id-ID")}`}
          color="text-blue-600"
        />
        <DashboardCard
          title="Pemasukan"
          value={`Rp ${income.toLocaleString()}`}
          color="text-green-600"
        />
        <DashboardCard
          title="Pengeluaran"
          value={`Rp ${expense.toLocaleString()}`}
          color="text-red-600"
        />{" "}
      </div>
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Riwayat Transaksi</h2>
        <ul>
          {transactions.map((trx, index) => (
            <li key={index} className="border-b p-2">
              <strong>{trx.description}</strong> - Rp{" "}
              {trx.amount.toLocaleString("id-ID")}
              <strong
                className={`ml-2 ${
                  trx.type === "pengeluaran" ? "text-red-600" : "text-green-600"
                }`}
              >
                ({trx.type})
              </strong>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Proporsi Keuangan</h2>
        {/* Ganti dengan Chart.js nanti */}
        <div className="h-full bg-gray-200 flex items-center justify-center">
          <BalanceChart
            balance={balance}
            income={income}
            expense={expense}
          ></BalanceChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
