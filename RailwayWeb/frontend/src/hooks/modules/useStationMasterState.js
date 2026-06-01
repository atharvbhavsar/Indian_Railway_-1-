import { useMemo, useState, useEffect } from "react";
import { getCat, riskLevel } from '../../utils/scoreCalculator';
import { 
  smProfile, initialPointsmen, pmAssessmentHistory, 
  initialDrafts, YN_SECTIONS, defaultAssessForm, 
  smTestQuestions, smAssessmentHistory 
} from '../../data/mockStationMasterData';

export function useStationMasterState(user, onLogout) {

  const [activeTab, setActiveTab]         = useState("dashboard");
  const [pageMode, setPageMode]           = useState("default");
  const [statusMsg, setStatusMsg]         = useState("");
  const [pointsmen, setPointsmen]         = useState(initialPointsmen);
  const [drafts, setDrafts]               = useState(initialDrafts);
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

  const openPmAdd = () => {
    setPmModal({
      mode: "add",
      data: {
        id: `PM_${Date.now().toString().slice(-4)}`,
        hrmsId: `PM_${Date.now().toString().slice(-4)}`,
        name: "",
        role: "Pointsman",
        designation: "Pointsman Grade I",
        station: smProfile.station || "Nagpur Junction",
        cat: "A",
        lastAssessDate: new Date().toISOString().split('T')[0],
        score: 80,
        lastScore: 80,
        safetyScore: 90,
        totalAssessments: 1,
        pmeStatus: "Fit",
        refStatus: "Cleared",
        contact: "",
        joiningDate: new Date().toISOString().split('T')[0],
        doj: new Date().toISOString().split('T')[0],
        gender: "Male",
        age: 35,
        basePay: "₹25,000",
        approvalStatus: "Approved",
        reportingSm: smProfile.name || "S. Deshmukh (SM)",
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

  const savePmModal = () => {
    if (!pmModal.data.name || !pmModal.data.hrmsId) {
      alert("Name and HRMS ID are required.");
      return;
    }
    if (pmModal.mode === "shift") {
      const newRole = pmModal.role || "Pointsman";
      if (newRole !== "Pointsman") {
        setPointsmen(prev => prev.filter(u => u.hrmsId !== pmModal.data.hrmsId));
        alert(`${pmModal.data.name} shifted to ${newRole} successfully.`);
        setPmModal(null);
        return;
      }
    }
    if (pmModal.mode === "add") {
      setPointsmen(prev => [pmModal.data, ...prev]);
    } else {
      setPointsmen(prev => prev.map(u => u.hrmsId === pmModal.data.hrmsId ? pmModal.data : u));
    }
    setPmModal(null);
  };

  const removePm = (hrmsId) => {
    if (window.confirm("Remove this pointsman?")) {
      setPointsmen(prev => prev.filter(u => u.hrmsId !== hrmsId));
    }
  };

  // Fullscreen Analytics States
  const [fullscreenChart, setFullscreenChart] = useState(null); // 'monthly' | 'safety' | 'performance' | null
  const [fsStartDate, setFsStartDate]         = useState("");
  const [fsEndDate, setFsEndDate]             = useState("");
  const [fsCategory, setFsCategory]           = useState("All");
  const [fsRisk, setFsRisk]                   = useState("All");
  const [fsSearch, setFsSearch]               = useState("");

  const smName = user?.name || smProfile.name;
  const smId   = user?.hrmsId || smProfile.employeeId;

  // Reactively Filtered Pointsmen for Fullscreen View
  const filteredFsPointsmen = useMemo(() => {
    return pointsmen.filter(p => {
      const q = fsSearch.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.hrmsId.toLowerCase().includes(q);
      const matchCategory = fsCategory === "All" || getCat(p.lastScore) === fsCategory;
      const matchRisk = fsRisk === "All" || riskLevel(p) === fsRisk;
      
      const pmHistoryList = pmAssessmentHistory[p.id] || [];
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
      { label: "Nov 25", start: "2025-11-01", end: "2025-11-30", fallbackScore: 71, fallbackSafety: 68 },
      { label: "Dec 25", start: "2025-12-01", end: "2025-12-31", fallbackScore: 74, fallbackSafety: 72 },
      { label: "Jan 26", start: "2026-01-01", end: "2026-01-31", fallbackScore: 68, fallbackSafety: 70 },
      { label: "Feb 26", start: "2026-02-01", end: "2026-02-28", fallbackScore: 77, fallbackSafety: 75 },
      { label: "Mar 26", start: "2026-03-01", end: "2026-03-31", fallbackScore: 80, fallbackSafety: 79 }
    ];

    return months.map(m => {
      let totalScore = 0;
      let totalSafety = 0;
      let count = 0;

      filteredFsPointsmen.forEach(p => {
        const pmHistoryList = pmAssessmentHistory[p.id] || [];
        const matches = pmHistoryList.filter(h => h.date >= m.start && h.date <= m.end);
        matches.forEach(h => {
          totalScore += h.total;
          totalSafety += p.safetyScore;
          count++;
        });
      });

      return {
        month: m.label,
        assessments: count > 0 ? count : 5,
        avgScore: count > 0 ? Math.round(totalScore / count) : m.fallbackScore,
        safetyAvg: count > 0 ? Math.round(totalSafety / count) : m.fallbackSafety
      };
    });
  }, [filteredFsPointsmen]);

  // History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(`sm_history_${smId}`);
    return saved ? JSON.parse(saved) : smAssessmentHistory;
  });

  // MCQ Test State
  const [smMcqTest, setSmMcqTest] = useState(() => {
    const saved = localStorage.getItem(`sm_mcq_test_${smId}`);
    return saved ? JSON.parse(saved) : null;
  });

  // MCQ Test Assignment State
  const [testAssigned, setTestAssigned] = useState(() => {
    const saved = localStorage.getItem(`sm_test_assigned_${smId}`);
    if (saved === null) {
      localStorage.setItem(`sm_test_assigned_${smId}`, "Assigned");
      return "Assigned";
    }
    return saved;
  });

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
    const completed = Object.values(pmAssessmentHistory).flat().length + submittedAssessments.length;
    const highRisk  = pointsmen.filter(p => riskLevel(p) === "High").length;
    const safetyPct = Math.round(
      pointsmen.reduce((s, p) => s + p.safetyScore, 0) / pointsmen.length
    );
    return { total, pending, completed, highRisk, safetyPct };
  }, [pointsmen, drafts, submittedAssessments]);

  /* ─── Pie: category dist ─── */
  const pieData = useMemo(() => {
    const counts = { A:0, B:0, C:0, D:0 };
    pointsmen.forEach(p => { counts[getCat(p.lastScore)]++; });
    return Object.entries(counts).filter(([,c]) => c > 0)
      .map(([cat, count]) => ({ name: cat, value: count }));
  }, [pointsmen]);

  /* ─── Bottom performers ─── */
  const lowPerformers = useMemo(() =>
    [...pointsmen].sort((a,b) => a.lastScore - b.lastScore).slice(0,4)
  , [pointsmen]);

  /* ─── Filtered pointsmen list ─── */
  const filteredPm = useMemo(() => {
    return pointsmen.filter(p => {
      const clean = s => s.toLowerCase().trim().replace(/\s+/g, '').replace(/junction|central|main|town|jn|station/gi, '');
      const pmSt = p.station || "Nagpur Junction";
      const smSt = smProfile.station || "Nagpur Junction";
      if (clean(pmSt) !== clean(smSt) && !clean(pmSt).includes(clean(smSt)) && !clean(smSt).includes(clean(pmSt))) return false;

      if (pmF.name) {
        const s = pmF.name.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.hrmsId.toLowerCase().includes(s)) return false;
      }
      if (pmF.cat !== "All" && getCat(p.lastScore) !== pmF.cat) return false;
      if (pmF.risk !== "All" && riskLevel(p) !== pmF.risk) return false;
      return true;
    });
  }, [pointsmen, pmF]);

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
    const knowledge = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
    let ynTotal = 0;
    YN_SECTIONS.forEach(s => {
      form[s.key].forEach(v => { if (v === "Yes") ynTotal += s.weight; });
    });
    return { knowledge, ynTotal, total: knowledge + ynTotal };
  };

  /* ─── Submit assessment ─── */
  const submitAssessment = (isDraft) => {
    if (!isDraft && !assessForm.alcoholicStatus) {
      setStatusMsg("Alcoholic / Non-Alcoholic status is mandatory."); return;
    }
    const { knowledge, ynTotal, total } = computeScore(assessForm);
    const sectionBreakdown = YN_SECTIONS.map(s => ({
      title: s.title,
      marks: assessForm[s.key].filter(v => v === "Yes").length * s.weight,
      outOf: s.outOf
    }));
    const record = {
      id: Date.now(), pointsmanId: assessTarget.pointsmanId,
      hrmsId: assessTarget.hrmsId, name: assessTarget.name,
      date: new Date().toISOString().slice(0,10),
      knowledgeMarks: knowledge, ynTotal, total,
      grade: getCat(total), approvalStatus: isDraft ? "Draft" : "Pending",
      remarks: assessForm.remarks,
      sections: [
        { title: "Knowledge of Rules (MCQ)", marks: knowledge, outOf: 25 },
        ...sectionBreakdown
      ],
      meta: {
        alcoholicStatus: assessForm.alcoholicStatus,
        pmeStatus: assessForm.pmeStatus,
        refStatus: assessForm.refStatus,
        automaticTraining: assessForm.automaticTraining,
        counselling: assessForm.counselling,
        dateOfAppointment: assessForm.dateOfAppointment,
        workingSince: assessForm.workingSince
      }
    };
    setSubmittedAssessments(prev => [record, ...prev]);
    if (!isDraft) setDrafts(prev => prev.filter(d => d.pointsmanId !== assessTarget.pointsmanId));
    setPointsmen(prev => prev.map(p =>
      p.id === assessTarget.pointsmanId
        ? { ...p, lastScore: total, approvalStatus: isDraft ? p.approvalStatus : "Pending" }
        : p
    ));
    if (!isDraft) setAssessLocked(true);
    setStatusMsg(isDraft ? "Draft saved." : "Assessment submitted for TI approval. Status: Pending.");
    if (!isDraft) setPageMode("default");
  };

  return {
    activeQIdx,
    activeTab,
    activatedTests,
    assessForm,
    assessLocked,
    assessTarget,
    computeScore,
    drafts,
    dynamicMonthlyTrend,
    filteredFsPointsmen,
    filteredPm,
    filteredReports,
    fsCategory,
    fsEndDate,
    fsRisk,
    fsSearch,
    fsStartDate,
    fullscreenChart,
    handleSubmitTestAttempt,
    history,
    lowPerformers,
    myAssessSelected,
    openAssessForm,
    openPmAdd,
    openPmDetail,
    openPmEdit,
    openPmShift,
    pageMode,
    pieData,
    pmF,
    pmFilter,
    pmModal,
    pointsmen,
    removePm,
    repApplied,
    repF,
    reportFilter,
    savePmModal,
    selectedPm,
    selectedReportUserId,
    setActiveQIdx,
    setActiveTab,
    setActivatedTests,
    setAssessForm,
    setAssessLocked,
    setAssessTarget,
    setDrafts,
    setFsCategory,
    setFsEndDate,
    setFsRisk,
    setFsSearch,
    setFsStartDate,
    setFullscreenChart,
    setHistory,
    setMyAssessSelected,
    setPageMode,
    setPmF,
    setPmFilter,
    setPmModal,
    setPointsmen,
    setRepApplied,
    setRepF,
    setReportFilter,
    setSelectedPm,
    setSelectedReportUserId,
    setSmMcqTest,
    setStatusMsg,
    setSubmittedAssessments,
    setTestAssigned,
    setTestResponses,
    setViewingPm,
    setViewingStaff,
    smId,
    smMcqTest,
    smName,
    startTestAttempt,
    stats,
    statusMsg,
    submitAssessment,
    submittedAssessments,
    switchTab,
    testAssigned,
    testResponses,
    toggleYN,
    viewingPm,
    viewingStaff
  };
}
