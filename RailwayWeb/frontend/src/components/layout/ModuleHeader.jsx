import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function ModuleHeader({ title }) {
  const { currentUser, logout } = useAuth();
  
  if (!currentUser) return null;

  return (
    <header className="sdom-header">
      <div className="sdom-brand">
        <div className="sdom-logo"><img src="/logo.webp" alt="IR Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /></div>
        <div>
          <h2>Indian Railway Evaluation System</h2>
          <p>{title}</p>
        </div>
      </div>
      <div className="sdom-topbar-right">
        <div className="sdom-user-info">
          <div className="sdom-avatar">{currentUser.hrmsId.substring(0, 2).toUpperCase()}</div>
          <div>
            <strong>{currentUser.hrmsId}</strong>
            <span>{currentUser.role}</span>
          </div>
        </div>
        <button className="sdom-logout-btn" onClick={logout}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
