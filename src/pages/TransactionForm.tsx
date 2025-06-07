import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTransaction } from "../context/TransactionContext";

interface Transaction {
  description: string;
  amount: number;
  category: string;
  type: "pemasukan" | "pengeluaran";
}
const TransactionForm: React.FC = () => {
  const [form, setForm] = useState<Transaction>({
    description: "",
    amount: 0,
    category: "",
    type: "pemasukan",
  });
  const { addTransaction } = useTransaction();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "amount" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //kirim ke state global
    addTransaction(form);
    console.log(form);
  };

  //button hapus
  const handleDelted = () => {
    setForm({
      description: "",
      amount: 0,
      category: "",
      type: "pemasukan",
    });
  };

  return (
    <div className=" bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Deskripsi</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Jumlah (Rp)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Gaji">Gaji</option>
              <option value="Makan">Makan</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Tipe</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              onClick={handleDelted}
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
