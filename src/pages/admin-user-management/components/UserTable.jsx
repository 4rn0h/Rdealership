import React from "react";
import Icon from "../../../components/AppIcon";

const UserTable = ({ users, loading, onRoleChange }) => {
  if (loading) {
    return <p className="text-muted-foreground">Loading users...</p>;
  }

  if (!users?.length) {
    return <p className="text-muted-foreground">No users found.</p>;
  }

  const roles = ["admin", "sales_agent", "user"];

  return (
    <div className="overflow-x-auto bg-card border border-border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Email
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Phone
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Location
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Role
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-b border-border hover:bg-muted/30 luxury-micro-transition"
            >
              <td className="px-4 py-3">{u.full_name || "-"}</td>
              <td className="px-4 py-3 flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span>{u.email}</span>
              </td>
              <td className="px-4 py-3">{u.phone || "-"}</td>
              <td className="px-4 py-3 capitalize">{u.location || "-"}</td>
              <td className="px-4 py-3">
                <select
                  value={u.role || "user"}
                  onChange={(e) => onRoleChange(u.id, e.target.value)}
                  className="px-3 py-1 border border-border rounded bg-input text-foreground"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
