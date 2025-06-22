import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// Definisikan tipe transaksi
export interface Transaction {
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

// Definisikan tipe konteks transaksi
export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getHistoryTransaksi: () => void;
}

//buat context
const TransactionContext = createContext<TransactionContextType | null>(null);

//buat provider
export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { accessToken } = useAuth();

  const getHistoryTransaksi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/transaksi", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      // console.log(" Data transaksi dari backend:", res.data);
      setTransactions(res.data);
    } catch (err) {
      console.error("Gagal fetch transaksi:", err);
    }
  };

  const addTransaction = async (data: Transaction) => {
    try {
      await axios.post("http://localhost:4000/transaksi", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      console.log("response data", data);
      setTransactions((prev) => [...prev, data]);
    } catch (err) {
      console.error("Gagal fetch transaksi:", err);
    }
  };
  useEffect(() => {
    if (!accessToken) return;
    getHistoryTransaksi();
  }, [accessToken]);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, getHistoryTransaksi }}
    >
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
