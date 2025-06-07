import { createContext, useContext, useState } from "react";

// Definisikan tipe transaksi
export interface Transaction {
  description: string;
  amount: number;
  category: string;
  type: "pemasukan" | "pengeluaran";
}

// Definisikan tipe konteks transaksi
export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

//buat context
const TransactionContext = createContext<TransactionContextType | null>(null);

//buat provider
export const TransactionProvider = ({ children } : any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions: any) => [
      ...prevTransactions,
      transaction,
    ]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Hook untuk akses context di komponen lain
export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction harus digunakan dalam TransactionProvider");
  }
  return context;
};


