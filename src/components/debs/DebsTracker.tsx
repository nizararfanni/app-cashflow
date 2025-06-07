import { useState } from "react";

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

  const addDebt = () => {
    if (!newDebt.name || !newDebt.amount || !newDebt.dueDate) {
      return setError("Semua field harus diisi");
    }

    setDebts([
      ...debts,
      {
        id: debts.length + 1,
        name: newDebt.name,
        amount: parseInt(newDebt.amount),
        dueDate: newDebt.dueDate,
        status: "Belum Lunas",
      },
    ]);
    setError("");
    setNewDebt({ name: "", amount: "", dueDate: "" });
  };

  const markAsPaid = (id: number) => {
    setDebts(
      debts.map((debt) =>
        debt.id === id ? { ...debt, status: "Lunas" } : debt
      )
    );
  };

  //add calculate days remaining
  const calculateDaysRemaining = (dueDate: string) => {
    // Ambil tanggal hari ini
    const today = new Date();
    // Konversi tanggal jatuh tempo ke format Date
    const due = new Date(dueDate);
    // console.log(due.getTime());
    // console.log(today.getTime());

    // Hitung selisih waktu (milidetik)
    const difference = due.getTime() - today.getTime();
    // console.log(difference);
    // Konversi ke hari
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 ? `${daysRemaining} hari lagi` : "Terlambat!";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hutang Piutang</h2>

      {/* Form Tambah Hutang */}
      <div className="mb-6">
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
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={addDebt}
          >
            Tambah Hutang
          </button>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Daftar Hutang */}
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
              ({calculateDaysRemaining(debt.dueDate)}) )
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
