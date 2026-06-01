import { lazy, Suspense } from "react";
import { useAuth } from "./contexts/AuthContext";

// Lazily load components to support code-splitting and reduce entry bundle weight
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));

const AOmModule = lazy(() => import("./AOmModule"));
const PointsmanModule = lazy(() => import("./PointsmanModule"));
const StationMasterModule = lazy(() => import("./StationMasterModule"));
const TrafficInspectorModule = lazy(() => import("./TrafficInspectorModule"));
const SuperAdminModule = lazy(() => import("./SuperAdminModule"));
const TrainManagerModule = lazy(() => import("./TrainManagerModule"));
const StationSuperintendentModule = lazy(() => import("./StationSuperintendentModule"));

// Premium Loading Indicator for smooth transition state
function LoadingView() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f172a",
      color: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "50px",
        height: "50px",
        border: "4px dashed rgba(255, 255, 255, 0.2)",
        borderTop: "4px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h3 style={{ marginTop: 24, fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.03em" }}>Securing Operational Environment...</h3>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Loading Indian Railways Staff Console</p>
    </div>
  );
}

function App() {
  const { currentUser, isLoggedIn, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingView />;
  }

  // Internal routing mapper to keep render tree highly readable
  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginPage onLogin={login} />;
    }

    if (currentUser.role === "AOM/General") {
      return <AOmModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Pointsman") {
      return <PointsmanModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Station Master") {
      return <StationMasterModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Station Superintendent" || currentUser.role === "Station Supervisor") {
      return <StationSuperintendentModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Train Manager") {
      return <TrainManagerModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Traffic Inspector") {
      return <TrafficInspectorModule user={currentUser} onLogout={logout} />;
    }

    if (currentUser.role === "Super Admin") {
      return <SuperAdminModule user={currentUser} onLogout={logout} />;
    }

    return (
      <div style={{ padding: 40, textAlign: "center", color: "#fff" }}>
        <h2>Invalid Role</h2>
        <p>Your role "{currentUser?.role}" is not recognized by the system.</p>
        <button onClick={logout} style={{ marginTop: 20, padding: "8px 16px", background: "#e11d48", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
          Log Out
        </button>
      </div>
    );
  };

  return (
    <Suspense fallback={<LoadingView />}>
      {renderContent()}
    </Suspense>
  );
}

export default App;
