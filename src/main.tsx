import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { TransactionProvider } from "./context/TransactionContext.tsx";
import { FinanceContextProvider } from "./context/FinanceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <TransactionProvider>
    <FinanceContextProvider>
      <App />
    </FinanceContextProvider>
  </TransactionProvider>
);
