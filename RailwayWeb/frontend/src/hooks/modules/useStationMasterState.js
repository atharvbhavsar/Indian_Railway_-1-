import { useMemo, useState, useEffect } from "react";
import { getCat, riskLevel } from '../../utils/scoreCalculator';
import { 
  YN_SECTIONS, defaultAssessForm, 
  smTestQuestions 
} from '../../data/mockStationMasterData';
import { saDataService } from '../../services/saDataService';
import { supabase, isSupabaseConfigured } from "../../supabaseClient";

export function useStationMasterState(user, onLogout) {

  const [activeTab, setActiveTab]         = useState("dashboard");
  const [pageMode, setPageMode]           = useState("default");
  const [statusMsg, setStatusMsg]         = useState("");
  const [pointsmen, setPointsmen]         = useState([]);
  const [drafts, setDrafts]               = useState([]);
  const [submittedAssessments, setSubmittedAssessments] = useState([]);
  const [selectedPm, setSelectedPm]       = useState(null);
  const [assessTarget, setAssessTarget]   = useState(null);
  const [assessForm, setAssessForm]       = useState(defaultAssessForm);
  const [assessLocked, setAssessLocked]   = useState(false);
  const [myAssessSelected, setMyAssessSelected] = useState(null);
  const [pmFilter, setPmFilter]           = useState({ search:"", grade:"All", status:"All", risk:"All" });
  const [reportFilter, setReportFilter]   = useState({ search:"", grade:"All", risk:"All", sortBy:"date-desc" });
  const [activatedTests, setActivatedTests] = useState(() => {
    const saved = localStorage.getItem("sm_pm_activated_tests");
    return saved ? JSON.parse(saved) : {};
  });
  const [repApplied, setRepApplied] = useState(false);
  const [selectedReportUserId, setSelectedReportUserId] = useState(null);
  const [repF, setRepF] = useState({ search: "", cat: "All", risk: "All" });
  const [viewingStaff, setViewingStaff] = useState(null);

  // Pointsman Replicated Dashboard States & Helpers
  const [pmModal, setPmModal] = useState(null);
  const [pmF, setPmF] = useState({ name: "", station: "All", cat: "All", risk: "All" });
  const [viewingPm, setViewingPm] = useState(null);

  const [stationSms, setStationSms] = useState([]);
  const [assignedTi, setAssignedTi] = useState(null);

  const smName = user?.name || "—";
  const smId   = user?.hrmsId || "—";

  const fetchLiveDatabaseData = async () => {
    try {
      const u = await saDataService.fetchUsers();
      const mapped = u.map(x => ({
        ...x,
        hrmsId: x.id,
        cat: x.cat || "Untested",
        risk: x.risk || "Untested",
        score: x.score !== undefined && x.score !== 0 ? parseInt(x.score) : null,
        lastScore: x.score !== undefined && x.score !== 0 ? parseInt(x.score) : null,
        safetyScore: x.safetyScore !== undefined && x.safetyScore !== 0 ? parseInt(x.safetyScore) : null,
        totalAssessments: x.totalAssessments || 0,
        approvalStatus: "Approved",
        stationName: x.station,
        doj: x.lastDate || "2026-01-01"
      }));

      const userStation = user?.station || "";
      const filtered = mapped.filter(x => {
        const isPm = x.role === "pointsmen" || x.role === "Pointsman" || x.designation?.toLowerCase().includes("pointsman");
        if (!isPm) return false;
        if (userStation) {
          return (x.station || "").toLowerCase().trim() === userStation.toLowerCase().trim();
        }
        return true;
      });
      setPointsmen(filtered);

      const sms = mapped.filter(x => {
        const isSm = x.role === "sm" || x.role === "Station Master";
        if (!isSm) return false;
        if (userStation) {
          return (x.station || "").toLowerCase().trim() === userStation.toLowerCase().trim();
        }
        return true;
      });
      setStationSms(sms);

      const ti = mapped.find(x => {
        const isTi = x.role === "ti" || x.role === "Traffic Inspector";
        if (!isTi) return false;
        const rawStations = x.linkedStations || x.jurisdiction || "";
        if (userStation && rawStations && rawStations !== "—") {
          const tiStList = rawStations.split(",").map(s => s.trim().toLowerCase());
          return tiStList.includes(userStation.toLowerCase().trim());
        }
        return false;
      });
      setAssignedTi(ti || null);

      // Fetch submitted assessments from Supabase
      let dbSubmitted = [];
      if (isSupabaseConfigured) {
        try {
          const { data: assessList } = await supabase
            .from("ASSESSMENT")
            .select(`
              *,
              employee:USERS!employee_id (hrms_id),
              TEST_ATTEMPT (obtained_marks, total_marks)
            `)
            .in("status", ["Submitted", "Approved", "Completed", "EVALUATED"]);
          
          if (assessList) {
            dbSubmitted = assessList
              .filter(a => a.employee?.hrms_id && (a.assessment_type === "Pointsman Checklist" || a.assessment_type === "Pointsman Evaluation" || a.assessment_type === "Checklist Evaluation"))
              .filter(a => filtered.some(p => p.hrmsId === a.employee.hrms_id))
              .map(a => ({
                pmId: a.employee.hrms_id,
                date: a.assessment_date ? new Date(a.assessment_date).toISOString().slice(0, 10) : new Date(a.created_at).toISOString().slice(0,10),
                score: a.TEST_ATTEMPT?.[0]?.obtained_marks || 0,
                totalMarks: a.TEST_ATTEMPT?.[0]?.total_marks || 100
              }));
            setSubmittedAssessments(dbSubmitted);

            // Also fetch SM's OWN assessment history
            if (user?.userId) {
              const { data: myAssessList } = await supabase
                .from("ASSESSMENT")
                .select(`
                  *,
                  TEST_ATTEMPT (*),
                  APPROVAL (remarks, approval_date, USERS!approved_by (full_name))
                `)
                .eq("employee_id", user.userId)
                .eq("assessment_type", "Station Master Assessment");

              if (myAssessList && myAssessList.length > 0) {
                const mappedHistory = myAssessList.map(a => {
                  const ta = a.TEST_ATTEMPT?.[0];
                  const answers = ta?.answers || {};
                  return {
                    id: a.assessment_id,
                    date: a.assessment_date ? new Date(a.assessment_date).toISOString().slice(0, 10) : new Date(a.created_at).toISOString().slice(0, 10),
                    period: "Current",
                    assessedBy: "Traffic Inspector",
                    totalScore: ta?.obtained_marks || 0,
                    category: ta?.category || "A",
                    approvalStatus: a.status,
                    tiRemarks: answers.remarks || "",
                    sections: answers.sections || [],
                    isOnlineExam: false
                  };
                });
                
                // Merge with any locally stored ones not in DB (like current unsubmitted CBT)
                const localStr = localStorage.getItem(`sm_history_${smId}`);
                const localHist = localStr ? JSON.parse(localStr) : [];
                const mergedHist = [...mappedHistory, ...localHist.filter(lh => lh.isOnlineExam && !mappedHistory.some(mh => mh.date === lh.date))];
                
                setHistory(mergedHist.sort((a,b) => new Date(b.date) - new Date(a.date)));
              }
            }
          }
        } catch (dbErr) {
          console.error("Failed to fetch submitted assessments:", dbErr);
        }
      }

      // We want the Station Master to see ALL pointsmen so they can activate/deactivate tests
      // and check current statuses.
      const initialDrafts = filtered;
      setDrafts(initialDrafts);

    } catch (err) {
      console.error("Error fetching live db data:", err);
    }
  };

  useEffect(() => {
    fetchLiveDatabaseData();
  }, [user]);

  const openPmAdd = () => {
    setPmModal({
      mode: "add",
      data: {
        id: `PM_${Date.now().toString().slice(-4)}`,
        hrmsId: `PM_${Date.now().toString().slice(-4)}`,
        name: "",
        role: "Pointsman",
        designation: "Pointsman Grade I",
        station: user?.station || "",
        cat: "Untested",
        lastAssessDate: new Date().toISOString().split('T')[0],
        score: 0,
        lastScore: 0,
        safetyScore: 0,
        totalAssessments: 0,
        pmeStatus: "Fit",
        refStatus: "Cleared",
        contact: "",
        joiningDate: new Date().toISOString().split('T')[0],
        doj: new Date().toISOString().split('T')[0],
        gender: "Male",
        age: 35,
        basePay: "₹25,000",
        approvalStatus: "Approved",
        reportingSm: user?.name || "",
        workLocation: "Yard",
        shift: "Morning Shift (06:00 - 14:00)"
      }
    });
  };

  const openPmEdit = (pm) => {
    setPmModal({
      mode: "edit",
      data: { ...pm }
    });
  };

  const openPmShift = (pm) => {
    setPmModal({
      mode: "shift",
      data: { ...pm }
    });
  };

  const savePmModal = async () => {
    if (!pmModal.data.name || !pmModal.data.hrmsId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    try {
      const data = pmModal.data;
      const modalData = {
        id: data.hrmsId || data.employeeId || data.id,
        name: data.name,
        contact: data.contact || data.phone || data.contactNumber,
        email: data.email || data.emailId,
        role: pmModal.mode === "shift" ? pmModal.role : "Pointsman",
        station: data.stationName || data.station || data.smStation,
        division: data.division || data.smDivision || data.tiArea,
        lastDate: data.doj || data.lastDate,
        score: data.lastScore || data.score,
        cat: data.cat || data.category,
        reportingSm: data.reportingSm,
        workLocation: data.workLocation,
        shift: data.shift,
        jurisdiction: data.jurisdiction
      };
      await saDataService.saveUser(modalData, pmModal.mode);
      setPmModal(null);
      await fetchLiveDatabaseData();
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const removePm = async (id) => {
    if (window.confirm("Remove this pointsman?")) {
      try {
        await saDataService.removeUser(id);
        await fetchLiveDatabaseData();
      } catch (err) {
        alert("Error removing: " + err.message);
      }
    }
  };

  // Fullscreen Analytics States
  const [fullscreenChart, setFullscreenChart] = useState(null); // 'monthly' | 'safety' | 'performance' | null
  const [fsStartDate, setFsStartDate]         = useState("");
  const [fsEndDate, setFsEndDate]             = useState("");
  const [fsCategory, setFsCategory]           = useState("All");
  const [fsRisk, setFsRisk]                   = useState("All");
  const [fsSearch, setFsSearch]               = useState("");

  // Reactively Filtered Pointsmen for Fullscreen View
  const filteredFsPointsmen = useMemo(() => {
    return pointsmen.filter(p => {
      const q = fsSearch.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.hrmsId.toLowerCase().includes(q);
      const matchCategory = fsCategory === "All" || getCat(p.lastScore) === fsCategory;
      const matchRisk = fsRisk === "All" || riskLevel(p) === fsRisk;
      
      const pmHistoryList = [];
      const mostRecentDate = pmHistoryList.length > 0 ? pmHistoryList[0].date : p.doj;
      let matchDate = true;
      if (fsStartDate) matchDate = matchDate && mostRecentDate >= fsStartDate;
      if (fsEndDate) matchDate = matchDate && mostRecentDate <= fsEndDate;
      
      return matchSearch && matchCategory && matchRisk && matchDate;
    });
  }, [pointsmen, fsSearch, fsCategory, fsRisk, fsStartDate, fsEndDate]);

  // Reactively Recalculated Monthly Trend for Fullscreen View
  const dynamicMonthlyTrend = useMemo(() => {
    const months = [
      { label: "Nov 25", start: "2025-11-01", end: "2025-11-30" },
      { label: "Dec 25", start: "2025-12-01", end: "2025-12-31" },
      { label: "Jan 26", start: "2026-01-01", end: "2026-01-31" },
      { label: "Feb 26", start: "2026-02-01", end: "2026-02-28" },
      { label: "Mar 26", start: "2026-03-01", end: "2026-03-31" }
    ];

    return months.map(m => {
      let totalScore = 0;
      let totalSafety = 0;
      let count = 0;

      filteredFsPointsmen.forEach(p => {
        const pmHistoryList = [];
        const matches = pmHistoryList.filter(h => h.date >= m.start && h.date <= m.end);
        matches.forEach(h => {
          totalScore += h.total;
          totalSafety += p.safetyScore;
          count++;
        });
      });

      return {
        month: m.label,
        assessments: count,
        avgScore: count > 0 ? Math.round(totalScore / count) : 0,
        safetyAvg: count > 0 ? Math.round(totalSafety / count) : 0
      };
    });
  }, [filteredFsPointsmen]);

  // History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(`sm_history_${smId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // MCQ Test State
  const [smMcqTest, setSmMcqTest] = useState(() => {
    const saved = localStorage.getItem(`sm_mcq_test_${smId}`);
    return saved ? JSON.parse(saved) : null;
  });

  // MCQ Test Assignment State — defaults to "Not Assigned" (LOCKED)
  // Only becomes "Assigned" when the TI explicitly sets sm_test_activated_{smId}=true
  const [testAssigned, setTestAssigned] = useState(() => {
    const saved = localStorage.getItem(`sm_test_assigned_${smId}`);
    return saved || "Not Assigned";
  });

  // Poll localStorage every 2 seconds to detect TI activation
  useEffect(() => {
    const syncActivation = () => {
      const activated = localStorage.getItem(`sm_test_activated_${smId}`) === "true";
      const completed = localStorage.getItem(`sm_test_assigned_${smId}`) === "Completed";
      if (completed) return; // already done, no more changes needed
      if (activated) {
        setTestAssigned("Assigned");
        localStorage.setItem(`sm_test_assigned_${smId}`, "Assigned");
      } else {
        const current = localStorage.getItem(`sm_test_assigned_${smId}`);
        if (!current || current === "Not Assigned") {
          setTestAssigned("Not Assigned");
        }
      }
    };
    syncActivation(); // run immediately
    const interval = setInterval(syncActivation, 2000);
    window.addEventListener("storage", syncActivation);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncActivation);
    };
  }, [smId]);

  // Active MCQ Attempt States
  const [activeQIdx, setActiveQIdx] = useState(0);
  const [testResponses, setTestResponses] = useState(() => Array(25).fill(null));

  const startTestAttempt = () => {
    setActiveQIdx(0);
    setTestResponses(Array(25).fill(null));
    setPageMode("takeTest");
  };

  const handleSubmitTestAttempt = () => {
    const correctCount = testResponses.filter((r, idx) => r === smTestQuestions[idx].answer).length;
    const percentage = Math.round((correctCount / 25) * 100);
    const passStatus = percentage >= 60 ? "PASSED" : "FAILED";
    const today = new Date().toISOString().slice(0, 10);
    
    // Save to local storage for SM
    const testResult = {
      completed: true,
      correctCount: correctCount,
      responses: [...testResponses],
      submittedDate: today,
      percentage: percentage,
      passStatus: passStatus
    };
    localStorage.setItem(`sm_mcq_test_${smId}`, JSON.stringify(testResult));
    setSmMcqTest(testResult);

    // Update assigned status to 'Completed'
    localStorage.setItem(`sm_test_assigned_${smId}`, "Completed");
    setTestAssigned("Completed");

    // Generate a completed History record representing the Online self-exam
    const record = {
      id: Date.now(),
      date: today,
      period: "Q2 2026",
      assessedBy: "Online Self-Exam",
      totalScore: correctCount,
      category: getCat(percentage),
      approvalStatus: "Completed",
      tiRemarks: `Completed online safety competency assessment. Score: ${percentage}% (${correctCount}/25 correct). Awaiting TI evaluation.`,
      sections: [
        { title: "MCQ Safety & Rule Exam", marks: correctCount, outOf: 25 }
      ],
      mcqResponses: [...testResponses],
      isOnlineExam: true
    };

    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem(`sm_history_${smId}`, JSON.stringify(newHistory));

    // Also notify TI list in localStorage!
    let tiSmListStr = localStorage.getItem("ti_sm_list");
    let tiSmList = tiSmListStr ? JSON.parse(tiSmListStr) : null;
    if (tiSmList) {
      tiSmList = tiSmList.map(s => s.hrmsId === smId ? { ...s, status: "Submitted", score: correctCount } : s);
      localStorage.setItem("ti_sm_list", JSON.stringify(tiSmList));
    }

    setPageMode("default");
    setStatusMsg(`Assessment submitted! Score: ${percentage}% (${correctCount}/25). Status: Completed.`);
  };

  /* ─── Derived: stats ─── */
  const stats = useMemo(() => {
    const total     = pointsmen.length;
    const pending   = drafts.length;
    const completed = submittedAssessments.length;
    const highRisk  = pointsmen.filter(p => riskLevel(p) === "High").length;
    const safetyPct = pointsmen.length > 0 
      ? Math.round(pointsmen.reduce((s, p) => s + (p.safetyScore || 0), 0) / pointsmen.length)
      : 0;
    return { total, pending, completed, highRisk, safetyPct };
  }, [pointsmen, drafts, submittedAssessments]);

  /* ─── Pie: category dist ─── */
  const pieData = useMemo(() => {
    const counts = { A:0, B:0, C:0, D:0 };
    pointsmen.forEach(p => { 
      const c = getCat(p.lastScore);
      if (counts[c] !== undefined) counts[c]++; 
    });
    return Object.entries(counts).filter(([,c]) => c > 0)
      .map(([cat, count]) => ({ name: cat, value: count }));
  }, [pointsmen]);

  /* ─── Bottom performers ─── */
  const lowPerformers = useMemo(() =>
    [...pointsmen].filter(p => p.lastScore > 0).sort((a,b) => a.lastScore - b.lastScore).slice(0,4)
  , [pointsmen]);

  /* ─── Filtered pointsmen list ─── */
  const filteredPm = useMemo(() => {
    return pointsmen.filter(p => {
      const clean = s => s ? s.toLowerCase().trim().replace(/\s+/g, '').replace(/junction|central|main|town|jn|station/gi, '') : '';
      const pmSt = p.station || "";
      const smSt = user?.station || "";
      if (smSt && clean(pmSt) !== clean(smSt) && !clean(pmSt).includes(clean(smSt)) && !clean(smSt).includes(clean(pmSt))) return false;

      if (pmF.name) {
        const s = pmF.name.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.hrmsId.toLowerCase().includes(s)) return false;
      }
      if (pmF.cat !== "All" && getCat(p.lastScore) !== pmF.cat) return false;
      if (pmF.risk !== "All" && riskLevel(p) !== pmF.risk) return false;
      return true;
    });
  }, [pointsmen, pmF, user]);

  /* ─── Filtered reports ─── */
  const filteredReports = useMemo(() => {
    let list = pointsmen.filter(p => {
      const q = reportFilter.search.toLowerCase();
      const srch = !q || p.name.toLowerCase().includes(q) || p.hrmsId.toLowerCase().includes(q);
      const grade = reportFilter.grade === "All" || getCat(p.lastScore) === reportFilter.grade;
      const risk  = reportFilter.risk === "All" || riskLevel(p) === reportFilter.risk;
      return srch && grade && risk;
    });
    if (reportFilter.sortBy === "score-desc") list = [...list].sort((a,b) => b.lastScore - a.lastScore);
    else if (reportFilter.sortBy === "score-asc") list = [...list].sort((a,b) => a.lastScore - b.lastScore);
    return list;
  }, [pointsmen, reportFilter]);

  /* ─── Navigation ─── */
  const switchTab = (tab) => { 
    setActiveTab(tab); 
    setPageMode("default"); 
    setStatusMsg(""); 
    setSelectedReportUserId(null);
    setRepApplied(false);
  };

  /* ─── Open PM detail ─── */
  const openPmDetail = (pm) => { setSelectedPm(pm); setPageMode("pmDetail"); };

  /* ─── Open assess form ─── */
  const openAssessForm = (draft) => {
    setAssessTarget(draft);
    
    // Load MCQ score if it exists in localStorage
    const mcqDataStr = localStorage.getItem(`pm_mcq_test_${draft.hrmsId}`);
    const mcqData = mcqDataStr ? JSON.parse(mcqDataStr) : null;
    const initialMcqMarks = mcqData && mcqData.completed ? String(mcqData.correctCount) : "0";

    setAssessForm({
      ...defaultAssessForm,
      knowledgeMarks: initialMcqMarks
    });
    setAssessLocked(false);
    setPageMode("assessForm");
  };

  /* ─── Yes/No toggle helper ─── */
  const toggleYN = (sectionKey, idx, val) => {
    if (assessLocked) return;
    setAssessForm(prev => {
      const next = [...prev[sectionKey]];
      next[idx] = next[idx] === val ? null : val;
      return { ...prev, [sectionKey]: next };
    });
  };

  /* ─── Live score computer ─── */
  const computeScore = (form) => {
    let total = 0;
    YN_SECTIONS.forEach(s => {
      form[s.key].forEach(v => { if (v === "Yes") total += s.weight; });
    });
    const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
    return { ynScore: total, knowledge: km, total: total + km };
  };

  const submitAssessment = async (isDraftParam) => {
    let isDraft = false;
    let pm = assessTarget;
    let scoreObj = computeScore(assessForm);

    if (typeof isDraftParam === "boolean") {
      isDraft = isDraftParam;
    } else if (isDraftParam && typeof isDraftParam === "object") {
      pm = isDraftParam;
    }

    if (!pm) {
      console.error("No Pointsman selected for assessment.");
      return;
    }

    if (!isDraft) {
      let allAnswered = true;
      YN_SECTIONS.forEach(s => {
        if (assessForm[s.key].includes(null) || assessForm[s.key].includes(undefined) || assessForm[s.key].includes("")) {
          allAnswered = false;
        }
      });
      if (
        !allAnswered || 
        !assessForm.alcoholicStatus || 
        !assessForm.pmeStatus || 
        !assessForm.refStatus || 
        !assessForm.automaticTraining || 
        !assessForm.counselling || 
        !assessForm.dateOfAppointment || 
        !assessForm.workingSince || 
        !assessForm.remarks.trim()
      ) {
        alert("Please answer all checklist questions and complete all additional details (Alcoholic Status, PME Status, REF Status, Automatic Training, Counselling, Date of Appointment, Working Since, and Remarks) before submitting.");
        return;
      }
    }

    const today = new Date().toISOString().slice(0,10);
    const scoreVal = scoreObj.total;
    let computedCat = getCat(scoreVal);
    
    if (assessForm.alcoholicStatus === "Alcoholic") {
      computedCat = "D";
    }

    const updatedPointsmen = pointsmen.map(p => {
      if (p.hrmsId === pm.hrmsId) {
        return {
          ...p,
          lastScore: scoreVal,
          cat: computedCat,
          risk: computedCat === "D" ? "High" : (scoreVal >= 80 ? "Low" : scoreVal >= 60 ? "Medium" : "High"),
          totalAssessments: (p.totalAssessments || 0) + 1,
          lastAssessDate: today
        };
      }
      return p;
    });

    setPointsmen(updatedPointsmen);

    // Save update to Supabase!
    try {
      const dbPm = updatedPointsmen.find(p => p.hrmsId === pm.hrmsId);
      if (dbPm) {
        const modalData = {
          id: dbPm.hrmsId,
          name: dbPm.name,
          contact: dbPm.contact,
          email: dbPm.email,
          role: "Pointsman",
          station: dbPm.station,
          division: dbPm.division,
          lastDate: dbPm.doj,
          score: dbPm.lastScore,
          cat: dbPm.cat,
          reportingSm: dbPm.reportingSm,
          workLocation: dbPm.workLocation,
          shift: dbPm.shift,
          jurisdiction: dbPm.jurisdiction
        };
        await saDataService.saveUser(modalData, "edit");
      }
    } catch (e) {
      console.error("Failed to save submitted assessment to DB:", e);
    }

    // Save to ASSESSMENT and TEST_ATTEMPT table in Supabase
    if (isSupabaseConfigured) {
      try {
        // Resolve Pointsman UUID from their hrmsId
        const { data: pmUser, error: pmErr } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", pm.hrmsId)
          .single();
        
        if (pmErr || !pmUser) {
          throw new Error(`Failed to resolve Pointsman UUID for HRMS ID ${pm.hrmsId}`);
        }

        // Resolve Station Master UUID
        const { data: smUser } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", smId)
          .single();

        const smUserUuid = smUser?.user_id || user?.userId;

        const assessmentType = "Checklist Evaluation"; // Matches what TI filters for pointsmen!
        const assessmentStatus = isDraft ? "Draft" : "Pending";
        
        // Check if there is an existing draft/available assessment to update, or insert new
        const { data: existingAssess } = await supabase
          .from("ASSESSMENT")
          .select("assessment_id")
          .eq("employee_id", pmUser.user_id)
          .in("assessment_type", ["Checklist Evaluation", "Pointsman Evaluation", "Pointsman Periodic Assessment"])
          .in("status", ["Draft", "AVAILABLE", "LOCKED", "IN_PROGRESS", "Pending", "Submitted"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        let assessmentId = existingAssess?.assessment_id;

        if (assessmentId) {
          await supabase
            .from("ASSESSMENT")
            .update({
              status: assessmentStatus,
              conducted_by: smUserUuid,
              assessment_date: today,
              assessment_type: assessmentType
            })
            .eq("assessment_id", assessmentId);
        } else {
          const { data: newAssess, error: newAssessErr } = await supabase
            .from("ASSESSMENT")
            .insert([{
              employee_id: pmUser.user_id,
              conducted_by: smUserUuid,
              assessment_type: assessmentType,
              status: assessmentStatus,
              assessment_date: today
            }])
            .select()
            .single();

          if (newAssessErr) throw newAssessErr;
          assessmentId = newAssess.assessment_id;
        }

        // Insert or update the TEST_ATTEMPT
        const { data: existingAttempt } = await supabase
          .from("TEST_ATTEMPT")
          .select("attempt_id")
          .eq("assessment_id", assessmentId)
          .maybeSingle();

        if (existingAttempt) {
          await supabase
            .from("TEST_ATTEMPT")
            .update({
              total_marks: 100,
              obtained_marks: scoreVal,
              percentage: scoreVal,
              category: computedCat,
              submitted_at: new Date().toISOString()
            })
            .eq("attempt_id", existingAttempt.attempt_id);
        } else {
          const { error: attemptErr } = await supabase
            .from("TEST_ATTEMPT")
            .insert([{
              assessment_id: assessmentId,
              employee_id: pmUser.user_id,
              total_marks: 100,
              obtained_marks: scoreVal,
              percentage: scoreVal,
              category: computedCat,
              submitted_at: new Date().toISOString()
            }]);
          
          if (attemptErr) throw attemptErr;
        }

        console.log(`Successfully saved assessment and test attempt to Supabase with status ${assessmentStatus}`);
      } catch (err) {
        console.error("Failed to save assessment to database:", err);
      }
    }

    if (!isDraft) {
      setSubmittedAssessments(prev => [...prev, { pmId: pm.hrmsId, date: today, score: scoreVal }]);
      setDrafts(prev => prev.filter(d => d.hrmsId !== pm.hrmsId));
      setStatusMsg(`Assessment submitted successfully for ${pm.name}. Total Score: ${scoreVal}/100.`);
    } else {
      setStatusMsg(`Assessment draft saved for ${pm.name}.`);
    }

    setPageMode("default");
  };

  return {
    activeTab, setActiveTab,
    pageMode, setPageMode,
    statusMsg, setStatusMsg,
    pointsmen, setPointsmen,
    drafts, setDrafts,
    submittedAssessments, setSubmittedAssessments,
    selectedPm, setSelectedPm,
    assessTarget, setAssessTarget,
    assessForm, setAssessForm,
    assessLocked, setAssessLocked,
    myAssessSelected, setMyAssessSelected,
    pmFilter, setPmFilter,
    reportFilter, setReportFilter,
    activatedTests, setActivatedTests,
    repApplied, setRepApplied,
    selectedReportUserId, setSelectedReportUserId,
    repF, setRepF,
    viewingStaff, setViewingStaff,
    pmModal, setPmModal,
    pmF, setPmF,
    viewingPm, setViewingPm,
    fetchLiveDatabaseData,
    openPmAdd,
    openPmEdit,
    openPmShift,
    savePmModal,
    removePm,
    fullscreenChart, setFullscreenChart,
    fsStartDate, setFsStartDate,
    fsEndDate, setFsEndDate,
    fsCategory, setFsCategory,
    fsRisk, setFsRisk,
    fsSearch, setFsSearch,
    filteredFsPointsmen,
    dynamicMonthlyTrend,
    history, setHistory,
    smMcqTest, setSmMcqTest,
    testAssigned, setTestAssigned,
    activeQIdx, setActiveQIdx,
    testResponses, setTestResponses,
    startTestAttempt,
    handleSubmitTestAttempt,
    stats,
    pieData,
    lowPerformers,
    filteredPm,
    filteredReports,
    switchTab,
    openPmDetail,
    openAssessForm,
    toggleYN,
    computeScore,
    submitAssessment,
    smName,
    smId,
    stationSms,
    assignedTi
  };
}
