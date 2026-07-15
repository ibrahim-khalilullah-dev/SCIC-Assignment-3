"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import {
  Users,
  ShieldAlert,
  Briefcase,
  User,
  Check,
  X,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { TUser } from "@/types/user";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    userId: string;
    userName: string;
    newRole: string;
  } | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingDeleteName, setPendingDeleteName] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(SERVER_URL + "/api/admin/users", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      toast.error("Failed to load user directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const initiateRoleChange = (
    userId: string,
    userName: string,
    newRole: string,
  ) => {
    setPendingChange({ userId, userName, newRole });
    setConfirmOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!pendingChange) return;
    setUpdatingId(pendingChange.userId);
    try {
      const res = await fetch(
        SERVER_URL + "/api/admin/users/" + pendingChange.userId + "/role",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ role: pendingChange.newRole }),
        },
      );

      if (res.ok) {
        setUsers(
          users.map((u) => {
            const uId = u.id || (u as any)._id;
            return uId === pendingChange.userId
              ? { ...u, role: pendingChange.newRole as any }
              : u;
          }),
        );
        toast.success("User role updated to " + pendingChange.newRole);
      } else {
        toast.error("Failed to update user role.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setUpdatingId(null);
      setConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleBanToggle = async (userId: string, currentStatus: string) => {
    setUpdatingId(userId);
    const action = currentStatus === "banned" ? "unban" : "ban";
    try {
      const res = await fetch(
        SERVER_URL + "/api/admin/users/" + userId + "/" + action,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (res.ok) {
        const nextStatus = currentStatus === "banned" ? "active" : "banned";
        setUsers(
          users.map((u) => {
            const uId = u.id || (u as any)._id;
            return uId === userId ? { ...u, status: nextStatus } : u;
          }),
        );
        toast.success("User successfully " + action + "ned.");
      } else {
        toast.error("Failed to " + action + " user.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setUpdatingId(null);
    }
  };

  const initiateDelete = (userId: string, userName: string) => {
    setPendingDeleteId(userId);
    setPendingDeleteName(userName);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    setUpdatingId(pendingDeleteId);
    try {
      const res = await fetch(
        SERVER_URL + "/api/admin/users/" + pendingDeleteId,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        setUsers(
          users.filter((u) => {
            const uId = u.id || (u as any)._id;
            return uId !== pendingDeleteId;
          }),
        );
        toast.success("User removed successfully.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setUpdatingId(null);
      setDeleteConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading user directory..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Platform Security
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          User Account Management
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Verify sellers, restrict platform access, and manage administrative
          privileges.
        </p>
      </div>

      <div className="bg-default-50/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-muted-foreground font-semibold">
            <thead>
              <tr className="text-default-500 font-bold bg-default-100">
                <th className="py-5 px-6">User Name</th>
                <th className="py-5 px-6">Email Address</th>
                <th className="py-5 px-6">System Role</th>
                <th className="py-5 px-6">Account Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default-100">
              {users.map((u) => {
                const uId = u.id || (u as any)._id;
                const isBanned = u.status === "banned";

                return (
                  <tr
                    key={uId}
                    className="hover:bg-default-100 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-foreground">
                      {u.name || "Unnamed Account"}
                    </td>
                    <td className="py-4 px-6 text-default-600">{u.email}</td>
                    <td className="py-4 px-6">
                      {u.role === "reporter" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                          <Briefcase className="w-3 h-3" /> Seller
                        </span>
                      ) : u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-secondary/10 text-secondary border border-secondary/20 uppercase tracking-wider">
                          <ShieldAlert className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-default-200 text-default-700 border border-default-300 uppercase tracking-wider">
                          <User className="w-3 h-3" /> Customer
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {isBanned ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-danger/10 text-danger border border-danger/20">
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-medium">
                      <div className="flex items-center justify-end gap-3">
                        {u.role !== "admin" && (
                          <button
                            disabled={updatingId === uId}
                            onClick={() =>
                              initiateRoleChange(uId, u.name, "admin")
                            }
                            className="text-default-500 hover:text-primary transition cursor-pointer"
                          >
                            Make Admin
                          </button>
                        )}
                        {u.role !== "reporter" && (
                          <button
                            disabled={updatingId === uId}
                            onClick={() =>
                              initiateRoleChange(uId, u.name, "reporter")
                            }
                            className="text-default-500 hover:text-primary transition cursor-pointer"
                          >
                            Make Seller
                          </button>
                        )}
                        {u.role !== "user" && (
                          <button
                            disabled={updatingId === uId}
                            onClick={() => {
                              const uName = u.name || "Customer";
                              initiateRoleChange(uId, uName, "user");
                            }}
                            className="text-default-500 hover:text-primary transition cursor-pointer"
                          >
                            Make Customer
                          </button>
                        )}
                        <button
                          disabled={updatingId === uId}
                          onClick={() =>
                            handleBanToggle(uId, u.status || "active")
                          }
                          className="text-default-500 hover:text-danger transition pl-3 cursor-pointer border-l border-default-100"
                        >
                          {isBanned ? "Unban" : "Ban"}
                        </button>
                        <button
                          disabled={updatingId === uId}
                          onClick={() => {
                            const uName = u.name || "User";
                            initiateDelete(uId, uName);
                          }}
                          className="text-danger hover:text-danger/80 transition pl-3 cursor-pointer border-l border-default-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {confirmOpen && pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-sm bg-default-50 border-none p-6 shadow-2xl space-y-6 rounded-2xl">
            <CardBody className="p-0 space-y-2">
              <h3 className="text-base font-bold text-foreground">
                Confirm Role Assignment
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="text-foreground font-bold">
                  {pendingChange.userName}
                </span>{" "}
                to{" "}
                <span className="text-primary font-bold capitalize">
                  {pendingChange.newRole}
                </span>
                ? This updates system permissions immediately.
              </p>
            </CardBody>
            <div className="flex items-center justify-end gap-3 text-xs font-semibold">
              <Button
                variant="flat"
                radius="sm"
                size="sm"
                onClick={() => {
                  setConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="font-bold"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
                color="primary"
                radius="sm"
                size="sm"
                onClick={confirmRoleChange}
                className="font-bold shadow-lg shadow-primary/20"
              >
                <Check className="w-4 h-4 mr-1" /> Confirm
              </Button>
            </div>
          </Card>
        </div>
      )}

      {deleteConfirmOpen && pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-sm bg-default-50 border-none p-6 shadow-2xl space-y-6 rounded-2xl">
            <CardBody className="p-0 space-y-2 text-center flex flex-col items-center">
              <div className="p-3 bg-danger/10 text-danger rounded-full border border-danger/20 w-fit mb-2">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Remove User Account
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="text-foreground font-bold">
                  {pendingDeleteName}
                </span>{" "}
                from the database? This action is irreversible.
              </p>
            </CardBody>
            <div className="flex items-center justify-end gap-3 text-xs font-semibold">
              <Button
                variant="flat"
                radius="sm"
                size="sm"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setPendingDeleteId(null);
                }}
                className="font-bold"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
                color="danger"
                radius="sm"
                size="sm"
                onClick={confirmDelete}
                className="font-bold shadow-lg shadow-danger/20"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Permanently Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
