import { useState, useEffect } from "react";
import { dbService } from "../supabaseClient";
import { logger } from "../logger";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await dbService.getAllUsers();
      if (data && data.length > 0) {
        // Flatten nested relational data for easy table rendering
        const flattened = data.map(user => {
          const profile = user.EMPLOYEE_PROFILE && user.EMPLOYEE_PROFILE.length > 0 
            ? user.EMPLOYEE_PROFILE[0] 
            : {};
          
          return {
            ...user,
            ...profile,
            stationName: profile.STATION ? profile.STATION.station_name : "Unassigned",
            designation: user.ROLE ? user.ROLE.role_name : "Unknown"
          };
        });
        setEmployees(flattened);
      }
    } catch (e) {
      logger.error("Failed to fetch employees in hook", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, isLoading, refresh: fetchEmployees };
}
