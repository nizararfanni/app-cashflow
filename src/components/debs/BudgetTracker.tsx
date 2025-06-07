import { useState } from "react";

interface Budget {
  id: number;
  name: string;
  amount: number;
  saved: number;
}

const BudgetTracker = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState({ name: "", amount: "" });
  const [savingAmount, setSavingAmount] = useState<{ [key: number]: number }>(
    {}
  );

  const addBudget = () => {
    if (!newBudget.name || !newBudget.amount) return;
    setBudgets([
      ...budgets,
      {
        id: budgets.length + 1,
        name: newBudget.name,
        amount: parseInt(newBudget.amount),
        saved: 0, 
      },
    ]);
    setNewBudget({ name: "", amount: "" });
  };

  const saveMoney = (id: number) => {
    //ambil inputan tabungan berdasarkan id objek
    const amountToSave = savingAmount[id] || 0;

    // tambahkan tabungan ke anggaran
    setBudgets(
      budgets.map((budget) =>
        budget.id === id
          ? { ...budget, saved: budget.saved + amountToSave }
          : budget
        )
    );
    console.log("berapa",amountToSave)
    // Reset input setelah nabung
    setSavingAmount({ ...savingAmount, [id]: 0 });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Anggaran & Target Keuangan</h2>

      {/* Form Tambah Anggaran */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nama Anggaran"
          className="border p-2 w-full mb-2"
          value={newBudget.name}
          onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Tabungan (Rp)"
          className="border p-2 w-full mb-2"
          value={newBudget.amount}
          onChange={(e) =>
            setNewBudget({ ...newBudget, amount: e.target.value })
          }
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          onClick={addBudget}
        >
          Tambah Anggaran
        </button>
      </div>

      {/* Daftar Anggaran */}
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id} className="p-3 border-b flex flex-col">
            <strong className="text-lg">{budget.name}</strong>
            <p>Target: Rp {budget.amount.toLocaleString("id-ID")}</p>
            <p>Sudah Ditabung: Rp {budget.saved.toLocaleString("id-ID")}</p>
            <p>
              Sisa: Rp {(budget.amount - budget.saved).toLocaleString("id-ID")}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${(budget.saved / budget.amount) * 100}%` }}
              ></div>
            </div>

            {/* Input Nabung & Tombol Tabung */}
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                className="border p-2 w-24"
                placeholder="Rp"
                value={savingAmount[budget.id] || ""}
                onChange={(e) =>
                  setSavingAmount({
                    ...savingAmount,
                    [budget.id]: parseInt(e.target.value) || 0,
                  })
                }
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={() => saveMoney(budget.id)}
              >
                Tabung
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;
