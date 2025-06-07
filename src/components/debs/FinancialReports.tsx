import jsPDF from "jspdf";
import { useTransaction } from "../../context/TransactionContext";

const FinancialReport = () => {
  const { transactions } = useTransaction();

  // Export ke PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Keuangan", 20, 20);

    let y = 30;
    transactions.forEach((trx, index) => {
      doc.text(
        `${index + 1}. ${trx.description} - Rp ${trx.amount.toLocaleString(
          "id-ID"
        )} (${trx.type})`,
        20,
        y
      );
      y += 10;
    });

    doc.save("Laporan_Keuangan.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Laporan Keuangan</h2>

      {/* Daftar Transaksi */}
      <ul>
        {transactions.map((trx, index) => (
          <li key={index} className="p-3 border-b">
            <strong>{trx.description}</strong> - Rp{" "}
            {trx.amount.toLocaleString("id-ID")} ({trx.type})
          </li>
        ))}
      </ul>

      {/* Tombol Export PDF */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
        onClick={exportToPDF}
      >
        Export PDF
      </button>
    </div>
  );
};

export default FinancialReport;
