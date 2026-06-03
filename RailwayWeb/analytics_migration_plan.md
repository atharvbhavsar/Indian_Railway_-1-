# 🚂 Indian Railway Staff Evaluation System (RSES)
## 📈 Analytics & Reports Module Implementation Plan

This document outlines the complete integration strategy for migrating the RSES Dashboard Metrics, KPI Cards, and Analytics charts from static hardcoded arrays to live, real-time Supabase aggregations. **No UI chart components were modified, and mock data remains in place as a safe fallback.**

---

# 📋 1. ANALYTICS MIGRATION PLAN

Migrating analytics is the most computationally expensive part of the backend transition. The plan executes in three phases to protect client-side performance:

1.  **Phase 1: Metric Ingestion (Current)**
    *   Create `reportService.js` to route component requests to the database.
    *   Implement "Fallback Aggregation": Initially, use Supabase's `{ count: 'exact' }` modifier to calculate high-level KPI cards (Total Staff, High Risk Count) directly in the service layer using basic `.select()` queries.
2.  **Phase 2: RPC & View Deployment (Database Level)**
    *   Deploy PostgreSQL Stored Procedures (RPCs) and Views to Supabase. This offloads heavy `GROUP BY` and `DATE_TRUNC` grouping (for monthly charts) to the server.
3.  **Phase 3: Chart Component Hydration**
    *   Update Recharts/Chart.js components in the AOM and TI modules to `await reportService.getPerformanceTrend()` inside their `useEffect` hooks instead of importing the static `MONTHLY_TREND`.

---

# ⚙️ 2. REPORT MODULE ARCHITECTURE

The `reportService.js` file isolates all complex grouping logic from the UI.

### Implemented Operations:
*   `getDashboardMetrics()`: Calculates the headline KPI cards (Staff Count, Pending Workflows, High Risk Personnel) by querying the `USERS`, `MONITORING`, and `ASSESSMENT` tables.
*   `getCategoryDistribution()`: Targets pie-charts. Calculates the frequency of Grades A, B, C, D across the `TEST_ATTEMPT` table.
*   `getPerformanceTrend()`: Targets line-charts. Retrieves the historical time-series of assessment scores, formatted perfectly for X/Y charting axes.
*   `getComplianceAnalytics()`: Calculates percentage-based compliance metrics (PME completion, Refresher clearance) across multiple safety tables.
*   `requestReportGeneration()`: A distinct transactional function that logs a request to the `REPORT` table, intended to trigger a Supabase Edge Function to generate an asynchronous PDF/Excel export.

---

# 🚀 3. DASHBOARD INTEGRATION STRATEGY

**Zero-Redesign Approach:**
The frontend charting library expects highly specific, flat array structures (e.g., `[{ month: "Jan", score: 85 }]`). 
To achieve integration without redesigning the dashboards, `reportService.js` is responsible for receiving the relational `snake_case` database payload from Supabase and instantly `mapping()` it into the exact `camelCase` structure the legacy charts expect. 

**Fallback Strategy:**
If Supabase is offline or an RPC is missing, the service returns `null`. The React dashboard intercepts this and immediately re-hydrates the chart using the original mock data (like `aomMockData.js`), ensuring zero downtime during the database transition.

---

# 🛡️ 4. QUERY OPTIMIZATION STRATEGY

Running aggregations on thousands of safety records can choke a mobile device. The following strategies must be enforced on Supabase:

1.  **Avoid Client-Side Aggregation:** Do not `select("*")` from `TEST_ATTEMPT` and run `reduce()` loops on the frontend.
2.  **Use Supabase RPCs (Remote Procedure Calls):**
    *   SQL Functions like `get_category_distribution()` must be deployed to Supabase. This ensures PostgreSQL handles the `GROUP BY` math in milliseconds, returning only a 4-row payload to the frontend.
3.  **Materialized Views:** For the `MONTHLY_TREND` chart, Supabase should utilize a Materialized View that refreshes every 24 hours, rather than recalculating millions of rows on every dashboard load.
4.  **Count Headers:** For KPI cards, `reportService` uses `{ count: 'exact', head: true }` so that Supabase only returns an integer, bypassing the transmission of heavy row data.

---

# 🧪 5. TESTING STRATEGY

Before stripping the static chart arrays, QA must validate the reporting pipeline:

1.  [ ] **KPI Rendering:** Ensure the "Total Employees" summary card successfully renders a non-zero number fetched via `getDashboardMetrics()`.
2.  [ ] **Pie Chart RPC Fallback:** If the Supabase RPC `get_category_distribution` hasn't been deployed yet, verify that the `reportService` correctly catches the error and executes the raw data loop fallback without crashing the app.
3.  [ ] **Trendline Formatting:** Validate that the X-Axis on the AOM Line Chart successfully reads the database timestamps and converts them to the readable `MMM 'YY` format expected by the UI.
4.  [ ] **Report Generation Trigger:** Click the "Export Report" button and verify that a new row successfully appears in the Supabase `REPORT` table with status `pending_generation`.
