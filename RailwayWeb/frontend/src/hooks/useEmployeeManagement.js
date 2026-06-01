import { useState } from 'react';

export function useEmployeeManagement({ 
  allEmployees, aomPointsmen, setAomPointsmen, aomStationMasters, setAomStationMasters, aomSuperintendents, setAomSuperintendents, aomTrainManagers, setAomTrainManagers, stations 
}) {
  const [pmModal, setPmModal] = useState(null);
  const [smModal, setSmModal] = useState(null);
  const [ssModal, setSsModal] = useState(null);
  const [tmModal, setTmModal] = useState(null);
  
  const savePmModal = () => {
    if (!pmModal.data.name || !pmModal.data.hrmsId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    if (isSupabaseConfigured) {
      if (pmModal.mode === "shift") {
        const newRole = pmModal.role || "pointsmen";
        const dbRoleMap = {
          ss: "Station Superintendent",
          tm: "Train Manager",
          ti: "Traffic Inspector",
          sm: "Station Master",
          pointsmen: "Pointsman"
        };
        dbService.shiftUserRole(pmModal.data.hrmsId, dbRoleMap[newRole]).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`${pmModal.data.name} shifted to ${dbRoleMap[newRole]} successfully in database.`);
          } else {
            alert("Error shifting role: " + res?.error);
          }
        });
      } else {
        dbService.saveUser(pmModal.data, pmModal.mode).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`Pointsman ${pmModal.mode === "add" ? "added" : "updated"} successfully in database.`);
          } else {
            alert("Error saving: " + res?.error);
          }
        });
      }
      setPmModal(null);
      return;
    }
    if (pmModal.mode === "shift") {
      const newRole = pmModal.role || "pointsmen";
      if (newRole !== "pointsmen") {
        setAomPointsmen(p => p.filter(x => x.hrmsId !== pmModal.data.hrmsId));
        const commonObj = {
          employeeId: pmModal.data.hrmsId,
          hrmsId: pmModal.data.hrmsId,
          name: pmModal.data.name,
          station: pmModal.data.stationName || "Nagpur Junction",
          stationName: pmModal.data.stationName || "Nagpur Junction",
          division: pmModal.data.division || "Nagpur",
          zone: pmModal.data.zone || "Central Railway",
          cat: pmModal.data.cat || "A",
          risk: pmModal.data.risk || "Low",
          score: pmModal.data.lastScore || 80,
          contact: pmModal.data.contact || "",
          email: pmModal.data.email || "",
          lastDate: pmModal.data.doj || new Date().toISOString().split('T')[0],
          status: "Approved",
          reportingAom: "P. K. Verma (Sr. DOM)"
        };
        if (newRole === "ss") {
          setAomSuperintendents(prev => [...prev, { ...commonObj, role: "ss", designation: "Station Superintendent" }]);
        } else if (newRole === "tm") {
          setAomTrainManagers(prev => [...prev, { ...commonObj, role: "tm", designation: "Train Manager" }]);
        } else if (newRole === "ti") {
          setTrafficInspectors(prev => [...prev, { ...commonObj, role: "ti", designation: "Traffic Inspector" }]);
        } else if (newRole === "sm") {
          setStations(prev => prev.map(s => {
            if (s.stationName === pmModal.data.stationName) {
              return { ...s, stationMasterName: pmModal.data.name, contactNumber: pmModal.data.contact };
            }
            return s;
          }));
          setAomStationMasters(prev => [...prev, {
            ...commonObj,
            role: "sm",
            designation: "Station Master",
            id: pmModal.data.hrmsId,
            hrmsId: pmModal.data.hrmsId,
            stationName: pmModal.data.stationName || "Nagpur Junction",
            stationCode: pmModal.data.stationCode || "NGP",
            division: pmModal.data.division || "Nagpur",
            zone: pmModal.data.zone || "Central Railway"
          }]);
        }
        alert(`${pmModal.data.name} shifted to ${newRole.toUpperCase()} successfully.`);
        setPmModal(null);
        return;
      }
    }
    if (pmModal.mode === "add") {
      setAomPointsmen(p => [pmModal.data, ...p]);
    } else {
      setAomPointsmen(p => p.map(x => x.hrmsId === pmModal.data.hrmsId ? pmModal.data : x));
    }
    setPmModal(null);
  };

  const saveSmModal = () => {
    if (!smModal.data.name || !smModal.data.hrmsId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    if (isSupabaseConfigured) {
      if (smModal.mode === "shift") {
        const newRole = smModal.role || "sm";
        const dbRoleMap = {
          ss: "Station Superintendent",
          tm: "Train Manager",
          ti: "Traffic Inspector",
          sm: "Station Master",
          pointsmen: "Pointsman"
        };
        dbService.shiftUserRole(smModal.data.hrmsId, dbRoleMap[newRole]).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`${smModal.data.name} shifted to ${dbRoleMap[newRole]} successfully in database.`);
          } else {
            alert("Error shifting role: " + res?.error);
          }
        });
      } else {
        dbService.saveUser(smModal.data, smModal.mode).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`Station Master ${smModal.mode === "add" ? "added" : "updated"} successfully in database.`);
          } else {
            alert("Error saving: " + res?.error);
          }
        });
      }
      setSmModal(null);
      return;
    }
    if (smModal.mode === "shift") {
      const newRole = smModal.role || "sm";
      if (newRole !== "sm") {
        setAomStationMasters(p => p.filter(x => (x.hrmsId || x.id) !== smModal.data.hrmsId));
        const commonObj = {
          employeeId: smModal.data.hrmsId,
          hrmsId: smModal.data.hrmsId,
          name: smModal.data.name,
          station: smModal.data.stationName || "Nagpur Junction",
          stationName: smModal.data.stationName || "Nagpur Junction",
          division: smModal.data.division || "Nagpur",
          zone: smModal.data.zone || "Central Railway",
          cat: smModal.data.cat || "A",
          risk: smModal.data.risk || "Low",
          score: smModal.data.lastScore || 80,
          contact: smModal.data.contact || "",
          email: smModal.data.email || "",
          lastDate: smModal.data.doj || new Date().toISOString().split('T')[0],
          status: "Approved",
          reportingAom: "P. K. Verma (Sr. DOM)"
        };
        if (newRole === "ss") {
          setAomSuperintendents(prev => [...prev, { ...commonObj, role: "ss", designation: "Station Superintendent" }]);
        } else if (newRole === "tm") {
          setAomTrainManagers(prev => [...prev, { ...commonObj, role: "tm", designation: "Train Manager" }]);
        } else if (newRole === "ti") {
          setTrafficInspectors(prev => [...prev, { ...commonObj, role: "ti", designation: "Traffic Inspector" }]);
        } else if (newRole === "pointsmen") {
          setAomPointsmen(prev => [...prev, {
            ...commonObj,
            hrmsId: smModal.data.hrmsId,
            id: Date.now(),
            lastScore: smModal.data.lastScore || 80,
            safetyScore: 85,
            totalAssessments: 2,
            pmeStatus: "Fit",
            refStatus: "Cleared",
            disciplinary: "None",
            incidents: 0,
            approvalStatus: "Approved",
            monitoringStatus: "Active",
            stationCode: smModal.data.stationCode || "NGP",
            stationName: smModal.data.stationName || "Nagpur Junction"
          }]);
        }
        alert(`${smModal.data.name} shifted to ${newRole.toUpperCase()} successfully.`);
        setSmModal(null);
        return;
      }
    }
    const processedData = {
      ...smModal.data,
      stationName: smModal.data.smStation || smModal.data.stationName || "Nagpur Junction",
      stationCode: smModal.data.smStation === "Pune Junction" ? "PUNE" : smModal.data.smStation === "New Delhi" ? "NDLS" : "NGP",
      division: smModal.data.smDivision || smModal.data.division || "Nagpur",
      zone: smModal.data.smZone || smModal.data.zone || "Central Railway"
    };
    if (smModal.mode === "add") {
      setAomStationMasters(p => [processedData, ...p]);
    } else {
      setAomStationMasters(p => p.map(x => (x.hrmsId || x.id) === processedData.hrmsId ? processedData : x));
    }
    setSmModal(null);
  };

  const saveSsModal = () => {
    if (!ssModal.data.name || !ssModal.data.employeeId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    if (isSupabaseConfigured) {
      if (ssModal.mode === "shift") {
        const newRole = ssModal.role || "ss";
        const dbRoleMap = {
          ss: "Station Superintendent",
          tm: "Train Manager",
          ti: "Traffic Inspector",
          sm: "Station Master",
          pointsmen: "Pointsman"
        };
        dbService.shiftUserRole(ssModal.data.employeeId, dbRoleMap[newRole]).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`${ssModal.data.name} shifted to ${dbRoleMap[newRole]} successfully in database.`);
          } else {
            alert("Error shifting role: " + res?.error);
          }
        });
      } else {
        dbService.saveUser({ ...ssModal.data, hrmsId: ssModal.data.employeeId }, ssModal.mode).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`Station Superintendent ${ssModal.mode === "add" ? "added" : "updated"} successfully in database.`);
          } else {
            alert("Error saving: " + res?.error);
          }
        });
      }
      setSsModal(null);
      return;
    }
    if (ssModal.mode === "shift") {
      const newRole = ssModal.role || "ss";
      if (newRole !== "ss") {
        setAomSuperintendents(p => p.filter(x => x.employeeId !== ssModal.data.employeeId));
        const commonObj = {
          employeeId: ssModal.data.employeeId,
          hrmsId: ssModal.data.employeeId,
          name: ssModal.data.name,
          station: ssModal.data.station || ssModal.data.smStation || "Nagpur Junction",
          stationName: ssModal.data.station || ssModal.data.smStation || "Nagpur Junction",
          division: ssModal.data.division || "Nagpur",
          zone: ssModal.data.zone || "Central Railway",
          cat: ssModal.data.cat || "A",
          risk: ssModal.data.risk || "Low",
          score: ssModal.data.score || 80,
          contact: ssModal.data.contact || "",
          email: ssModal.data.email || "",
          lastDate: ssModal.data.lastDate || new Date().toISOString().split('T')[0],
          status: "Approved",
          reportingAom: "P. K. Verma (Sr. DOM)"
        };
        if (newRole === "sm") {
          setAomStationMasters(prev => [{ ...commonObj, designation: "Station Master", role: "sm" }, ...prev]);
        } else if (newRole === "tm") {
          setAomTrainManagers(prev => [{ ...commonObj, designation: "Train Manager", role: "tm" }, ...prev]);
        } else if (newRole === "ti") {
          setTrafficInspectors(prev => [{ ...commonObj, designation: "Traffic Inspector", role: "ti" }, ...prev]);
        } else if (newRole === "pointsmen") {
          setAomPointsmen(prev => [{
            ...commonObj,
            hrmsId: ssModal.data.employeeId,
            id: Date.now(),
            lastScore: ssModal.data.score || 80,
            safetyScore: 85,
            totalAssessments: 2,
            pmeStatus: "Fit",
            refStatus: "Cleared",
            disciplinary: "None",
            incidents: 0,
            approvalStatus: "Approved",
            monitoringStatus: "Active",
            stationCode: ssModal.data.stationCode || "NGP",
            stationName: ssModal.data.station || "Nagpur Junction"
          }, ...prev]);
        }
        alert(`${ssModal.data.name} shifted to ${newRole.toUpperCase()} successfully.`);
        setSsModal(null);
        return;
      }
    }
    const processedData = {
      ...ssModal.data,
      station: ssModal.data.smStation || ssModal.data.station || "Nagpur Junction",
      division: ssModal.data.smDivision || ssModal.data.division || "Nagpur",
      zone: ssModal.data.smZone || ssModal.data.zone || "Central Railway",
      cat: ssModal.data.category || ssModal.data.cat || "A",
      risk: ssModal.data.riskLevel || ssModal.data.risk || "Low",
      score: ssModal.data.lastScore || ssModal.data.score || 80
    };
    if (ssModal.mode === "add") {
      setAomSuperintendents(p => [processedData, ...p]);
    } else {
      setAomSuperintendents(p => p.map(x => x.employeeId === processedData.employeeId ? processedData : x));
    }
    setSsModal(null);
  };

  const saveTmModal = () => {
    if (!tmModal.data.name || !tmModal.data.employeeId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    if (isSupabaseConfigured) {
      if (tmModal.mode === "shift") {
        const newRole = tmModal.role || "tm";
        const dbRoleMap = {
          ss: "Station Superintendent",
          tm: "Train Manager",
          ti: "Traffic Inspector",
          sm: "Station Master",
          pointsmen: "Pointsman"
        };
        dbService.shiftUserRole(tmModal.data.employeeId, dbRoleMap[newRole]).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`${tmModal.data.name} shifted to ${dbRoleMap[newRole]} successfully in database.`);
          } else {
            alert("Error shifting role: " + res?.error);
          }
        });
      } else {
        dbService.saveUser({ ...tmModal.data, hrmsId: tmModal.data.employeeId }, tmModal.mode).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert(`Train Manager ${tmModal.mode === "add" ? "added" : "updated"} successfully in database.`);
          } else {
            alert("Error saving: " + res?.error);
          }
        });
      }
      setTmModal(null);
      return;
    }
    if (tmModal.mode === "shift") {
      const newRole = tmModal.role || "tm";
      if (newRole !== "tm") {
        setAomTrainManagers(p => p.filter(x => x.employeeId !== tmModal.data.employeeId));
        const commonObj = {
          employeeId: tmModal.data.employeeId,
          hrmsId: tmModal.data.employeeId,
          name: tmModal.data.name,
          station: tmModal.data.station || tmModal.data.smStation || "Nagpur Junction",
          stationName: tmModal.data.station || tmModal.data.smStation || "Nagpur Junction",
          division: tmModal.data.division || "Nagpur",
          zone: tmModal.data.zone || "Central Railway",
          cat: tmModal.data.cat || "A",
          risk: tmModal.data.risk || "Low",
          score: tmModal.data.score || 80,
          contact: tmModal.data.contact || "",
          email: tmModal.data.email || "",
          lastDate: tmModal.data.lastDate || new Date().toISOString().split('T')[0],
          status: "Approved",
          reportingAom: "P. K. Verma (Sr. DOM)"
        };
        if (newRole === "sm") {
          setAomStationMasters(prev => [{ ...commonObj, designation: "Station Master", role: "sm" }, ...prev]);
        } else if (newRole === "ss") {
          setAomSuperintendents(prev => [{ ...commonObj, designation: "Station Superintendent", role: "ss" }, ...prev]);
        } else if (newRole === "ti") {
          setTrafficInspectors(prev => [{ ...commonObj, designation: "Traffic Inspector", role: "ti" }, ...prev]);
        } else if (newRole === "pointsmen") {
          setAomPointsmen(prev => [{
            ...commonObj,
            hrmsId: tmModal.data.employeeId,
            id: Date.now(),
            lastScore: tmModal.data.score || 80,
            safetyScore: 85,
            totalAssessments: 2,
            pmeStatus: "Fit",
            refStatus: "Cleared",
            disciplinary: "None",
            incidents: 0,
            approvalStatus: "Approved",
            monitoringStatus: "Active",
            stationCode: tmModal.data.stationCode || "NGP",
            stationName: tmModal.data.station || "Nagpur Junction"
          }, ...prev]);
        }
        alert(`${tmModal.data.name} shifted to ${newRole.toUpperCase()} successfully.`);
        setTmModal(null);
        return;
      }
    }
    const processedData = {
      ...tmModal.data,
      station: tmModal.data.smStation || tmModal.data.station || "Nagpur Junction",
      division: tmModal.data.smDivision || tmModal.data.division || "Nagpur",
      zone: tmModal.data.smZone || tmModal.data.zone || "Central Railway",
      cat: tmModal.data.category || tmModal.data.cat || "A",
      risk: tmModal.data.riskLevel || tmModal.data.risk || "Low",
      score: tmModal.data.lastScore || tmModal.data.score || 80
    };
    if (tmModal.mode === "add") {
      setAomTrainManagers(p => [processedData, ...p]);
    } else {
      setAomTrainManagers(p => p.map(x => x.employeeId === processedData.employeeId ? processedData : x));
    }
    setTmModal(null);
  };

  const openPmAdd = () => {
    setPmModal({
      mode: "add",
      data: {
        hrmsId: `PM_${Date.now().toString().slice(-4)}`,
        name: "",
        gender: "Male",
        age: 35,
        doj: new Date().toISOString().split('T')[0],
        basePay: "₹25,000",
        lastScore: 80,
        safetyScore: 90,
        totalAssessments: 1,
        pmeStatus: "Fit",
        refStatus: "Cleared",
        disciplinary: "None",
        incidents: 0,
        approvalStatus: "Approved",
        monitoringStatus: "Active",
        stationCode: "NGP",
        stationName: "Nagpur Junction",
        contact: "",
        email: "",
        cat: "A",
        risk: "Low",
        reportingSm: "",
        workLocation: "",
        shift: ""
      }
    });
  };

  const openSmAdd = () => {
    setSmModal({
      mode: "add",
      data: {
        hrmsId: `SM_${Date.now().toString().slice(-4)}`,
        name: "",
        gender: "Male",
        age: 38,
        doj: new Date().toISOString().split('T')[0],
        basePay: "₹52,000",
        lastScore: 80,
        safetyScore: 88,
        totalAssessments: 1,
        pmeStatus: "Fit",
        refStatus: "Cleared",
        disciplinary: "None",
        incidents: 0,
        approvalStatus: "Approved",
        monitoringStatus: "Active",
        stationCode: "NGP",
        stationName: "Nagpur Junction",
        contact: "",
        email: "",
        cat: "A",
        risk: "Low",
        smStation: "Nagpur Junction",
        smZone: "Central Railway",
        smDivision: "Nagpur"
      }
    });
  };

  const openSsAdd = () => {
    setSsModal({
      mode: "add",
      data: {
        employeeId: `SS_${Date.now().toString().slice(-4)}`,
        name: "",
        role: "ss",
        designation: "Station Superintendent",
        station: "Nagpur Junction",
        division: "Nagpur",
        zone: "Central Railway",
        cat: "A",
        risk: "Low",
        score: 80,
        contact: "",
        email: "",
        lastDate: new Date().toISOString().split('T')[0],
        status: "Approved",
        smStation: "Nagpur Junction",
        smZone: "Central Railway",
        smDivision: "Nagpur"
      }
    });
  };

  const openTmAdd = () => {
    setTmModal({
      mode: "add",
      data: {
        employeeId: `TM_${Date.now().toString().slice(-4)}`,
        name: "",
        role: "tm",
        designation: "Train Manager",
        station: "Nagpur Junction",
        division: "Nagpur",
        zone: "Central Railway",
        cat: "A",
        risk: "Low",
        score: 80,
        contact: "",
        email: "",
        lastDate: new Date().toISOString().split('T')[0],
        status: "Approved",
        workLocation: "Nagpur Depot",
        reportingSm: "NGP-BSL Section",
        shift: "Goods Train Beat",
        smStation: "Nagpur Junction",
        smZone: "Central Railway",
        smDivision: "Nagpur"
      }
    });
  };

  const openPmEdit = (pm) => {
    setPmModal({
      mode: "edit",
      data: { ...pm }
    });
  };

  const openSmEdit = (sm) => {
    setSmModal({
      mode: "edit",
      data: { ...sm, smStation: sm.stationName, smDivision: sm.division, smZone: sm.zone }
    });
  };

  const openSsEdit = (ss) => {
    setSsModal({
      mode: "edit",
      data: { ...ss, smStation: ss.station, smDivision: ss.division, smZone: ss.zone }
    });
  };

  const openTmEdit = (tm) => {
    setTmModal({
      mode: "edit",
      data: { ...tm, smStation: tm.station, smDivision: tm.division, smZone: tm.zone }
    });
  };

  const removePm = (hrmsId) => {
    if (window.confirm("Remove this pointsman?")) {
      if (isSupabaseConfigured) {
        dbService.deleteUser(hrmsId).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert("Pointsman deleted successfully from database.");
          } else {
            alert("Error deleting pointsman: " + res?.error);
          }
        });
      } else {
        setAomPointsmen(p => p.filter(x => x.hrmsId !== hrmsId));
      }
    }
  };

  const removeSm = (hrmsId) => {
    if (window.confirm("Remove this Station Master?")) {
      if (isSupabaseConfigured) {
        dbService.deleteUser(hrmsId).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert("Station Master deleted successfully from database.");
          } else {
            alert("Error deleting: " + res?.error);
          }
        });
      } else {
        setAomStationMasters(p => p.filter(x => (x.hrmsId || x.id) !== hrmsId));
      }
    }
  };

  const removeSs = (employeeId) => {
    if (window.confirm("Remove this Station Superintendent?")) {
      if (isSupabaseConfigured) {
        dbService.deleteUser(employeeId).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert("Station Superintendent deleted successfully from database.");
          } else {
            alert("Error deleting: " + res?.error);
          }
        });
      } else {
        setAomSuperintendents(p => p.filter(x => x.employeeId !== employeeId));
      }
    }
  };

  const removeTm = (employeeId) => {
    if (window.confirm("Remove this Train Manager?")) {
      if (isSupabaseConfigured) {
        dbService.deleteUser(employeeId).then(res => {
          if (res && res.success) {
            fetchLiveDatabaseData();
            alert("Train Manager deleted successfully from database.");
          } else {
            alert("Error deleting: " + res?.error);
          }
        });
      } else {
        setAomTrainManagers(p => p.filter(x => x.employeeId !== employeeId));
      }
    }
  };


  return {
    pmModal, smModal, ssModal, tmModal,
    setPmModal, setSmModal, setSsModal, setTmModal,
    savePmModal, saveSmModal, saveSsModal, saveTmModal,
    openPmAdd, openSmAdd, openSsAdd, openTmAdd,
    openPmEdit, openSmEdit, openSsEdit, openTmEdit,
    removePm, removeSm, removeSs, removeTm
  };
}
