import { useState } from "react";

interface User {
  id: number;
  name: string;
  role: "Admin" | "Anggota" | "Akuntan";
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", role: "Anggota" });

  // Tambah Pengguna Baru
  const addUser = () => {
    if (!newUser.name) return;
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: newUser.name,
        role: newUser.role as User["role"],
      },
    ]);
    setNewUser({ name: "", role: "Anggota" });
  };

  // Ubah Peran Pengguna
  const updateRole = (id: number, newRole: User["role"]) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  // Hapus Pengguna
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manajemen Pengguna</h2>

      {/* Form Tambah Pengguna */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nama Pengguna"
          className="border p-2 w-full mb-2"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-2"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Anggota">Anggota</option>
          <option value="Akuntan">Akuntan</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          onClick={addUser}
        >
          Tambah Pengguna
        </button>
      </div>

      {/* Daftar Pengguna */}
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 border-b flex justify-between items-center"
          >
            <div>
              <strong>{user.name}</strong> -{" "}
              <span className="text-gray-600">{user.role}</span>
            </div>
            <div className="flex gap-2">
              <select
                className="border p-1"
                value={user.role}
                onChange={(e) =>
                  updateRole(user.id, e.target.value as User["role"])
                }
              >
                <option value="Admin">Admin</option>
                <option value="Anggota">Anggota</option>
                <option value="Akuntan">Akuntan</option>
              </select>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => deleteUser(user.id)}
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
