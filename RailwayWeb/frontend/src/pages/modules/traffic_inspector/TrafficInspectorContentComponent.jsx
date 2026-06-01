import React from 'react';
import {
  Activity, AlertTriangle, ArrowUpDown, Award, BarChart3, Building2,
  CheckCircle2, ChevronRight, ClipboardCheck,
  FileBarChart2, Filter, LogOut, Search, ShieldCheck,
  TrendingUp, TrendingDown, UserCircle2, Users, XCircle, Eye,
  Calendar, BookOpen, Clock, HeartHandshake, HelpCircle, Download,
  FileSpreadsheet, FileText, Bell, Plus, RefreshCw, Edit, Trash2, Lock, Maximize2,
  ArrowLeft, UserCheck, BusFront, ClipboardList
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from "recharts";
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';

const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
const RISK_B = { High: "#fee2e2", Medium: "#fef3c7", Low: "#dcfce7" };
const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
const PIE_C  = ["#16a34a", "#2563eb", "#d97706", "#dc2626"];

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};


export function TrafficInspectorContentComponent(props) {
  const {
    ...u,
    id: "SM_1001"
  } = props;

  
    switch (activePage) {
      case "dashboard": return renderDashboard();
      case "profile": return renderProfile();
      case "stations": return renderStations();
      case "pointsmen": return renderRoleView();
      case "stationMasters": return renderRoleView();
      case "stationSuperintendents": return renderRoleView();
      case "trainManagers": return renderRoleView();
      case "myAssessment": return renderMyAssessment();
      case "pmePosition": return renderPmePosition();
      case "refPosition": return renderRefPosition();
      case "inspections": return renderInspections();
      case "counselling": return renderCounselling();
      case "approvals": return renderApprovals();
      case "assessments": return renderAssessments();
      case "reports": return renderReports();
      default: return renderDashboard();
    }
  }