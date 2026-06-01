// LEGACY ADAPTER: This file is kept temporarily backward-compatible during Phase 5 Refactoring.
// DO NOT import from here in new components. Use src/services/ and src/api/ instead.

import { supabase, isSupabaseConfigured } from "./api/supabaseClient";
import { authService } from "./services/authService";
import { userService } from "./services/userService";
import { assessmentService } from "./services/assessmentService";
import { incidentService } from "./services/incidentService";
import { stationService } from "./services/stationService";

export { supabase, isSupabaseConfigured };

export const dbService = {
  login: authService.login,
  getTestHistory: assessmentService.getTestHistory,
  submitTestAttempt: assessmentService.submitTestAttempt,
  getIncidents: incidentService.getIncidents,
  logIncident: incidentService.logIncident,
  getAllStations: stationService.getAllStations,
  getAllUsers: userService.getAllUsers,
  saveUser: userService.saveUser,
  deleteUser: userService.deleteUser,
  shiftUserRole: userService.shiftUserRole,
  saveStation: stationService.saveStation,
  deleteStation: stationService.deleteStation
};

