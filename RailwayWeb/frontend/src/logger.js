/**
 * Indian Railway Staff Evaluation System (RSES) - Observability & Telemetry Service
 * Provides standardized logging levels, visual terminal formatting, and in-memory trace capture.
 */

const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  AUDIT: "AUDIT"
};

class TelemetryLogger {
  constructor() {
    this.logsBuffer = [];
    this.maxBufferSize = 200;
  }

  _formatMessage(level, message, context = null) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      context,
      id: Math.random().toString(36).substring(2, 11)
    };
  }

  _persist(logEntry) {
    this.logsBuffer.unshift(logEntry);
    if (this.logsBuffer.length > this.maxBufferSize) {
      this.logsBuffer.pop();
    }
    
    // Save trace log locally for session inspection
    try {
      localStorage.setItem("rses_telemetry_logs", JSON.stringify(this.logsBuffer.slice(0, 50)));
    } catch (e) {
      // Gracefully bypass if localStorage is blocked
    }
  }

  info(message, context = null) {
    const log = this._formatMessage(LOG_LEVELS.INFO, message, context);
    this._persist(log);
    console.log(
      `%c[${log.timestamp}] [INFO] %c${message}`,
      "color: #3b82f6; font-weight: bold;",
      "color: inherit;",
      context || ""
    );
  }

  warn(message, context = null) {
    const log = this._formatMessage(LOG_LEVELS.WARN, message, context);
    this._persist(log);
    console.warn(
      `%c[${log.timestamp}] [WARN] %c${message}`,
      "color: #eab308; font-weight: bold;",
      "color: inherit;",
      context || ""
    );
  }

  error(message, errorObject = null) {
    const log = this._formatMessage(
      LOG_LEVELS.ERROR, 
      message, 
      errorObject ? { name: errorObject.name, message: errorObject.message, stack: errorObject.stack } : null
    );
    this._persist(log);
    console.error(
      `%c[${log.timestamp}] [ERROR] %c${message}`,
      "color: #ef4444; font-weight: bold;",
      "color: #f87171;",
      errorObject || ""
    );
  }

  audit(action, actorHrms, status = "SUCCESS", details = "") {
    const message = `AUDIT: [${action}] by [${actorHrms}] - Status: ${status}. ${details}`;
    const log = this._formatMessage(LOG_LEVELS.AUDIT, message, { action, actorHrms, status, details });
    this._persist(log);
    console.log(
      `%c[${log.timestamp}] [🛡️ AUDIT] %c${message}`,
      "color: #10b981; font-weight: bold;",
      "color: #a7f3d0;",
      log.context
    );
  }

  getLogs() {
    return this.logsBuffer;
  }
}

export const logger = new TelemetryLogger();
