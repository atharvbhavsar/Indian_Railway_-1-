import React from "react";
import { logger } from "./logger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error using our telemetry logging framework
    logger.error(`Critical Dashboard UI Crash: ${error.message}`, {
      error,
      errorInfo: errorInfo.componentStack
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Premium Emergency Fallback screen for Railway Operators
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#0f172a",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{
            background: "#fee2e2",
            border: "2px solid #ef4444",
            color: "#b91c1c",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "24px",
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)"
          }}>
            ⚠️
          </div>
          
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px 0", color: "#f87171" }}>
            Operational Terminal Halted
          </h1>
          
          <p style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)", maxWidth: "500px", lineHeight: 1.6, margin: "0 0 32px 0" }}>
            A localized console runtime error was intercepted by safety systems. The operational status has been logged, and security protocols have prevented a general system crash.
          </p>

          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontFamily: "monospace",
            color: "#f87171",
            maxWidth: "600px",
            marginBottom: "32px",
            wordBreak: "break-all",
            textAlign: "left"
          }}>
            <strong>Diagnostic Trace:</strong> {this.state.error?.toString()}
          </div>

          <button 
            onClick={this.handleReload}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "12px 28px",
              borderRadius: "6px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#1d4ed8"}
            onMouseOut={(e) => e.target.style.background = "#2563eb"}
          >
            Restart Operational Terminal
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
