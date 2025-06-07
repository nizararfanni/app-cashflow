import { createContext, useContext, useEffect, useState } from "react";
import { useTransaction } from "./TransactionContext";

interface FinanceContextType {
  balance: number;
  income: number;
  expense: number;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { transactions } = useTransaction();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  //logic for balance, income, expense
  useEffect(() => {
    //jumlah saldo
    const totalIncome = transactions
      .filter((trx) => trx.type === "pemasukan")
      .reduce((total, trx) => total + trx.amount, 0);
    setIncome(totalIncome);

    //jumlah pengeluaran
    const totalExpense = transactions
      .filter((trx) => trx.type === "pengeluaran")
      .reduce((total, trx) => total + trx.amount, 0);
    setExpense(totalExpense);

    //jumlah saldo
    setBalance(totalIncome - totalExpense);
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{ balance, income, expense }}>
      {children}
    </FinanceContext.Provider>
  );
};

//callback context
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceContextProvider");
  }
  return context;
};
