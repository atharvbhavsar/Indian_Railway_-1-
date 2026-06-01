import {
  BarChart3, Building2, ClipboardList, FileBarChart2,
  Search, ShieldCheck, UserRound, Users, UserCheck, TrainFront,
  Award
} from "lucide-react";

export const NAV = [
  { key: "dashboard",  label: "Dashboard",                icon: BarChart3 },
  { key: "pointsmen",  label: "Pointsmen",                icon: Users },
  { key: "sm",         label: "Station Masters",          icon: UserRound },
  { key: "ss",         label: "Station Superintendents",  icon: UserCheck },
  { key: "tm",         label: "Train Managers",           icon: TrainFront },
  { key: "ti",         label: "Traffic Inspectors",       icon: ShieldCheck },
  { key: "stations",   label: "Stations",                 icon: Building2 },
  { key: "records",    label: "Assessment Records",       icon: ClipboardList },
  { key: "reports",    label: "Reports & Analytics",      icon: FileBarChart2 },
  { key: "profile",    label: "My Profile",               icon: Award },
];

export const CHART_NAVY  = ["#1E3A5F","#2B6CB0","#4A90D9","#7EB3D8","#BFD7ED"];
export const CAT_COLORS  = { A: "#1E3A5F", B: "#2B6CB0", C: "#D69E2E", D: "#C53030" };
export const RISK_COLORS = { Low: "#2F855A", Medium: "#D69E2E", High: "#C53030" };
export const STATUS_COLORS = { Approved: "#2F855A", Pending: "#D69E2E", Rejected: "#C53030", Overdue: "#9B2C2C" };

export const UNIFIED_96_STATIONS = [];
export const DASHBOARD_96_STATIONS = [];
export const ALL_STAFF = [];

export const TI_OPTS      = ["All","TI PAR","TI AMLA","TI NGP"];
export const ROLE_OPTS    = ["All","Pointsman","Station Master","Station Superintendent","Train Manager","Traffic Inspector"];
export const ROLE_MAP     = { pointsmen:"Pointsman", sm:"Station Master", ss:"Station Superintendent", tm:"Train Manager", ti:"Traffic Inspector" };
