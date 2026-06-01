import { useState, useEffect, useCallback } from "react";
import { saDataService } from "../services/saDataService";
import { ALL_STAFF, UNIFIED_96_STATIONS } from "../utils/saConstants";

export function useSAData() {
  const [staff, setStaff] = useState(ALL_STAFF);
  const [stations, setStations] = useState(UNIFIED_96_STATIONS);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const fetchLiveDatabaseData = useCallback(async () => {
    setIsLoadingLive(true);
    try {
      const fetchedStations = await saDataService.fetchStations();
      if (fetchedStations.length > 0) setStations(fetchedStations);
      
      const fetchedUsers = await saDataService.fetchUsers();
      if (fetchedUsers.length > 0) setStaff(fetchedUsers);
    } finally {
      setIsLoadingLive(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveDatabaseData();
  }, [fetchLiveDatabaseData]);

  const addStation = async (newStation) => {
    // Optimistic UI update
    setStations(prev => [newStation, ...prev]);
    try {
      await saDataService.addStation(newStation);
      fetchLiveDatabaseData();
    } catch (err) {
      // Revert could be handled here
    }
  };

  const saveUser = async (modalData, mode) => {
    const localItem = {
      id: modalData.id,
      name: modalData.name,
      role: modalData.role,
      station: modalData.station || "Nagpur Junction",
      ti: modalData.ti || "TI NGP",
      cat: modalData.cat || "A",
      risk: modalData.risk || "Low",
      score: modalData.score || 80,
      contact: modalData.contact || "",
      lastDate: modalData.lastDate || new Date().toISOString().split('T')[0],
      status: modalData.status || "Approved",
      email: modalData.email || "",
      division: modalData.division || "Nagpur",
      zone: modalData.zone || "Central Railway",
      reportingSm: modalData.reportingSm || "",
      workLocation: modalData.workLocation || "",
      shift: modalData.shift || "",
      jurisdiction: modalData.jurisdiction || "Nagpur Division",
      reportingAom: "P. K. Verma (Sr. DOM)"
    };

    // Optimistic UI update
    if (mode === "add") {
      setStaff(p => [...p, localItem]);
    } else {
      setStaff(p => p.map(s => s.id === localItem.id ? localItem : s));
    }

    try {
      await saDataService.saveUser(modalData, mode);
      fetchLiveDatabaseData();
    } catch (err) {
      // Handle error gracefully
    }
  };

  const removeUser = async (id) => {
    // Optimistic UI update
    setStaff(p => p.filter(s => s.id !== id));
    try {
      await saDataService.removeUser(id);
      fetchLiveDatabaseData();
    } catch (err) {
      // Handle error
    }
  };

  return {
    staff,
    stations,
    isLoadingLive,
    addStation,
    saveUser,
    removeUser
  };
}
