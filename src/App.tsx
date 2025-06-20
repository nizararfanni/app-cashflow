import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashbaord";
import TransactionForm from "./pages/TransactionForm";
import GrafaikCharts from "./pages/GrafikCharts";
import DebtTracker from "./components/debs/DebsTracker";
import BudgetTracker from "./components/debs/BudgetTracker";
import FinancialReport from "./components/debs/FinancialReports";
import UserManagement from "./components/debs/UserManagement";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionForm />} />
          <Route path="/charts" element={<GrafaikCharts />} />
          <Route path="/debts" element={<DebtTracker />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/reports" element={<FinancialReport />} />
          <Route path="/users" element={<UserManagement />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};
