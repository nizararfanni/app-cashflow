import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform`}
      >
        <h1 className="text-2xl font-bold mb-6">CashFlow App</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block p-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="block p-2 hover:bg-gray-700">
                Transaksi
              </Link>
            </li>
            <li>
              <Link to="/charts" className="block p-2 hover:bg-gray-700">
                Grafik
              </Link>
            </li>
            <li>
              <Link to="/debts" className="block p-2 hover:bg-gray-700">
                Hutang & Piutang
              </Link>
            </li>
            <li>
              <Link to="/budget" className="block p-2 hover:bg-gray-700">
                Anggaran
              </Link>
            </li>
            <li>
              <Link to="/reports" className="block p-2 hover:bg-gray-700">
                Laporan
              </Link>
            </li>
            <li>
              <Link to="/users" className="block p-2 hover:bg-gray-700">
                User Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Header & Content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hi, User</span>
            <button className="text-xl">🔔</button>
            <button className="text-red-500">Logout</button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
