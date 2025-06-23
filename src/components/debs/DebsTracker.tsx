import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

interface Debt {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: "Belum Lunas" | "Lunas";
}

const DebtTracker = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState({ name: "", amount: "", dueDate: "" });
  const [error, setError] = useState("");
  const { accessToken } = useAuth();

  const fetchDebts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/owe", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setDebts(res.data);
    } catch (err) {
      console.error("Gagal ambil daftar hutang:", err);
    }
  };

  useEffect(() => {
    if (accessToken) fetchDebts();
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newDebt.name,
        amount: Number(newDebt.amount),
        due_date: newDebt.dueDate,
      };

      await axios.post("http://localhost:4000/owe", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      setNewDebt({ name: "", amount: "", dueDate: "" });
      fetchDebts();
    } catch (error) {
      setError("Gagal menambahkan hutang");
      console.error("Gagal tambah hutang:", error);
    }
  };

  const markAsPaid = (id: number) => {
    setDebts(
      debts.map((debt) =>
        debt.id === id ? { ...debt, status: "Lunas" } : debt
      )
    );
  };

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const difference = due.getTime() - today.getTime();
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? `${daysRemaining} hari lagi` : "Terlambat!";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hutang Piutang</h2>

      <form className="mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full mb-2"
          value={newDebt.name}
          onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Jumlah (Rp)"
          className="border p-2 w-full mb-2"
          value={newDebt.amount}
          onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={newDebt.dueDate}
          onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
        />
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah Hutang
          </button>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      <ul>
        {debts.map((debt) => (
          <li
            key={debt.id}
            className={`p-3 border-b flex justify-between items-center ${
              debt.status === "Lunas" ? "text-green-600" : "text-red-600"
            }`}
          >
            <div>
              <strong>{debt.name}</strong> - Rp{" "}
              {debt.amount.toLocaleString("id-ID")} (Jatuh Tempo: {debt.dueDate}{" "}
              ({calculateDaysRemaining(debt.dueDate)}))
            </div>
            {debt.status === "Belum Lunas" && (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => markAsPaid(debt.id)}
              >
                Tandai Lunas
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebtTracker;
