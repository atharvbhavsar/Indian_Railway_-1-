import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const reportService = {
  // ==========================================
  // 1. DASHBOARD METRICS & KPI CARDS
  // ==========================================

  /**
   * Fetches high-level KPIs: Total Staff, High Risk Count, and Overdue Actions.
   * Replaces the static `summaryCards` array in AOM and TI dashboards.
   */
  async getDashboardMetrics() {
    if (!isSupabaseConfigured) return null;
    try {
      // NOTE: For true production performance, this should invoke a Supabase Postgres View or RPC.
      // Below is a fallback multi-query approach for rapid integration.
      
      const { count: staffCount, error: e1 } = await supabase
        .from("USERS")
        .select('*', { count: 'exact', head: true });
        
      const { count: riskCount, error: e2 } = await supabase
        .from("MONITORING")
        .select('*', { count: 'exact', head: true })
        .eq('risk_level', 'High');

      const { count: pendingCount, error: e3 } = await supabase
        .from("ASSESSMENT")
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');

      if (e1 || e2 || e3) throw (e1 || e2 || e3);

      return {
        totalStaff: staffCount || 0,
        highRiskCount: riskCount || 0,
        pendingApprovals: pendingCount || 0
      };
    } catch (err) {
      logger.error("Error fetching dashboard metrics:", err);
      return null;
    }
  },

  // ==========================================
  // 2. PERFORMANCE & CATEGORY ANALYTICS
  // ==========================================

  /**
   * Fetches the distribution of grades (A, B, C, D) across all exams.
   * Replaces the static `categoryData` array for Pie Charts.
   */
  async getCategoryDistribution() {
    if (!isSupabaseConfigured) return null;
    try {
      // Requires a Postgres View or RPC to group by category efficiently.
      // E.g. SELECT category, COUNT(*) FROM TEST_ATTEMPT GROUP BY category;
      const { data, error } = await supabase.rpc('get_category_distribution');
      
      if (error) {
        // Graceful fallback if RPC doesn't exist yet
        logger.warn("RPC 'get_category_distribution' missing. Returning raw counts.");
        const { data: rawData } = await supabase.from("TEST_ATTEMPT").select("category");
        
        if (!rawData) return [];
        const dist = { A: 0, B: 0, C: 0, D: 0 };
        rawData.forEach(r => dist[r.category]++);
        return Object.keys(dist).map(k => ({ name: `Grade ${k}`, value: dist[k] }));
      }
      return data;
    } catch (err) {
      logger.error("Error fetching category distribution:", err);
      return [];
    }
  },

  /**
   * Fetches the monthly trend of average assessment scores.
   * Replaces the static `MONTHLY_TREND` chart data.
   */
  async getPerformanceTrend() {
    if (!isSupabaseConfigured) return null;
    try {
      // Requires a Postgres View tracking average score grouped by month (DATE_TRUNC)
      const { data, error } = await supabase.rpc('get_monthly_performance_trend');
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching performance trend:", err);
      return null; // Signals component to use fallback mock
    }
  },

  // ==========================================
  // 3. COMPLIANCE & RISK REPORTS
  // ==========================================

  /**
   * Computes compliance rates for PME, Refresher Training, and Disciplinary clears.
   * Replaces the static `COMPLIANCE` radar/bar chart array.
   */
  async getComplianceAnalytics() {
    if (!isSupabaseConfigured) return null;
    try {
      // In production, this aggregates PME_RECORD, TRAINING_RECORD, and SAFETY_RECORD.
      const { data, error } = await supabase.rpc('get_compliance_metrics');
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching compliance analytics:", err);
      return null;
    }
  },

  /**
   * Triggers the generation of an audit PDF or Excel report.
   * @param {string} reportType - e.g. 'Safety Audit', 'PME Overdue List'
   * @param {string} generatedBy - userId requesting the report
   */
  async requestReportGeneration(reportType, generatedBy) {
    if (!isSupabaseConfigured) return null;
    try {
      // Logs the request to the DB. A Supabase Edge Function or Webhook 
      // should pick this up, generate the file, and upload to Supabase Storage.
      const payload = {
        user_id: generatedBy,
        generated_by: generatedBy,
        report_type: reportType,
        file_path: 'pending_generation'
      };
      
      const { data, error } = await supabase.from("REPORT").insert([payload]).select().single();
      if (error) throw error;
      return { success: true, report: data };
    } catch (err) {
      logger.error("Error triggering report generation:", err);
      return { success: false, error: err.message };
    }
  }
};
