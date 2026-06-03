# 🚂 Indian Railway Staff Evaluation System (RSES)
## 🚉 Station Module Implementation & Migration Report

This document outlines the complete integration strategy for migrating the RSES Station Management Module from hardcoded mock arrays to the live Supabase database. **No UI components were modified, and mock data has been preserved as a safe fallback.**

---

# 📋 1. STATION MODULE IMPLEMENTATION PLAN

The Station module acts as the core geographic foundation of the RSES system. The implementation phases are structured to prevent frontend breaking changes during the transition:

1.  **Service Layer Integration:** Develop and export the asynchronous API functions via `stationService.js`.
2.  **Hydration Bridging:** Update custom UI hooks to execute `stationService` queries on mount. If the `.env` variables for Supabase are missing or the API errors, fallback to iterating over the legacy array outputs (e.g., `generate96Stations`).
3.  **Analytics Placeholder Logic:** The legacy mock arrays contain flat metrics like `avgScore` and `pending` evaluations. In the first phase of this integration, these properties will either be appended dynamically in the frontend mapper or ignored safely without crashing the UI, until the Analytics module is formally integrated.
4.  **UI Verification:** Validate all station dashboards, specifically the AOM dashboard which relies heavily on sorting by these metrics.

---

# ⚙️ 2. SERVICE LAYER DESIGN

The `stationService.js` file has been fully rebuilt to decouple the UI from raw API logic.

### Implemented Operations:
*   `getAllStations()`: Retrieves all stations, executing an inner join to fetch `DIVISION` and `ZONE` details in a single query.
*   `getStationById(stationId)`: Retrieves explicit details for a single physical station yard.
*   `getStationsByDivision(divisionId)`: Filters the station lookup for Traffic Inspectors limited to specific jurisdictions.
*   `getStationsByZone(zoneName)`: Executes a deep `!inner` join filter to restrict stations to a specific railway zone.
*   `createStation(stationData)`: Accepts new station metadata, validates the inputs, and writes to the `STATION` table.
*   `updateStation(stationId, updates)`: Maps frontend `camelCase` properties to the database's `snake_case` format before patching the row.
*   `deactivateStation(stationId)`: Attempts a direct delete on the record (note that if foreign-key dependencies exist, Supabase will safely reject this, prompting future schema adjustments to add an `is_active` toggle).

---

# 🔄 3. DATA MAPPING REPORT

To shift from the legacy mock arrays (e.g., `DASHBOARD_96_STATIONS` in `aomMockData.js`) to the new normalized Supabase schema, the following mappings apply:

| Legacy Mock Field | Target Supabase Field | Notes & Caveats |
| :--- | :--- | :--- |
| `id` | `station_id` | Changed from string (e.g. "ST_1001") to `INT IDENTITY`. |
| `stationName` | `station_name` | Direct mapping (e.g., "Nagpur Junction"). |
| `stationCode` | `station_code` | Direct mapping (e.g., "NGP_10"). |
| `division` | `DIVISION.division_name` | Relational join required. |
| `zone` | `DIVISION.zone_name` | Relational join required. |
| `completed` | N/A *(Analytics)* | Must be calculated dynamically via RPCs on `TEST_ATTEMPT`. |
| `pending` | N/A *(Analytics)* | Must be calculated dynamically via RPCs on `ASSESSMENT`. |
| `avgScore` | N/A *(Analytics)* | Must be calculated dynamically via RPCs on `TEST_ATTEMPT`. |
| `category` | N/A *(Analytics)* | Derived from `avgScore` dynamically on the client or database view. |
| `riskLevel` | N/A *(Analytics)* | Derived from `safety_compliance` dynamically. |

---

# 🚀 4. SUPABASE INTEGRATION REPORT

**Target Architecture Validation:**
*   **Frontend $\rightarrow$ stationService:** The component layer calls explicit methods rather than importing arrays.
*   **stationService $\rightarrow$ Supabase:** Queries utilize Supabase PostgREST endpoints (e.g., `.from("STATION").select()`).
*   **Supabase $\rightarrow$ PostgreSQL:** Real relational tables enforce constraints (e.g., a station cannot be inserted without a valid `division_id`).

**Missing Constraints Identified:**
Currently, the database relies on strict relational deletes. A station cannot be removed if personnel are actively assigned to it (thanks to `ON DELETE RESTRICT`). If the organization needs to visually "close" a station without destroying historical safety records, an `is_active` BOOLEAN column should be added to the `STATION` table in the future.

---

# 🧪 5. TESTING STRATEGY

Before stripping the mock constants, the QA team must perform the following validation pass on a connected staging environment:

1.  [ ] **Global Station Load:** The AOM dashboard successfully loads and renders the list from `getAllStations()`.
2.  [ ] **Division Filtering:** Selecting a specific division on the map/table successfully returns a filtered payload via `getStationsByDivision()`.
3.  [ ] **Zone Filtering:** The deep relational filter in `getStationsByZone()` successfully executes without a PostgREST syntax error.
4.  [ ] **Station Creation:** Submitting the "Add Station" form successfully writes to the database, assigning the correct `division_id`.
5.  [ ] **Station Deletion Rejection:** Attempting to delete a station that has active pointsmen or TIs properly fails and surfaces the database error message back to the UI, protecting data integrity.
