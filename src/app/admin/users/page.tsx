"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Shield, UserCog } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const loadUsers = async () => {
    try {
      const { data } = await axios.get<AdminUser[]>("/api/admin/users");
      setUsers(data);
    } catch {
      toast.error("Gagal memuat user");
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadUsers);
  }, []);

  const updateRole = async (userId: string, role: string) => {
    try {
      await axios.put("/api/admin/users", { userId, role });
      toast.success("Role user diperbarui");
      loadUsers();
    } catch {
      toast.error("Gagal update role");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9B86C]">User Management</p>
        <h1 className="mt-2 font-serif text-5xl text-white">Users & Roles</h1>
        <p className="mt-3 text-sm text-white/55">Ubah role user menjadi admin atau user biasa.</p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/45">
              <th className="px-5 py-4">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 text-white/75">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D9B86C] text-[#15100e]">
                      {user.role === "admin" ? <Shield className="size-4" /> : <UserCog className="size-4" />}
                    </div>
                    <span>{user.name || "Tanpa nama"}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td><span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">{user.role}</span></td>
                <td>{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
                <td>
                  <select value={user.role} onChange={(event) => updateRole(user.id, event.target.value)} className="rounded-xl border border-white/10 bg-[#15100e] px-3 py-2 text-white outline-none">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
