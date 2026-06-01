import sys

file_path = "D:\\RailwayWeb\\RailwayWeb\\frontend\\src\\TrainManagerModule.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find start and end indices
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "/* ═══════════════════════════════════════" in line and "RENDER: MY ASSESSMENT (mirrors SM module exactly)" in lines[i+1]:
        start_idx = i
        break

if start_idx == -1:
    print("Start not found")
    sys.exit(1)

for i in range(start_idx, len(lines)):
    if "/* ─── Content dispatcher ─── */" in line:
        # Find the end of renderBodyContent
        for j in range(i, len(lines)):
            if "};" in lines[j] and "return renderDashboardPage();" in lines[j-1]:
                end_idx = j
                break
        break

if end_idx == -1:
    print("End not found")
    sys.exit(1)

new_content = """  /* ═══════════════════════════════════════
     RENDER: MY ASSESSMENT
  ═══════════════════════════════════════ */
  const renderMyAssessment = () => (
    <TMMyAssessment
      employeeId={employeeId}
      fullName={fullName}
      trainManagerProfile={trainManagerProfile}
      history={history}
      setHistory={setHistory}
      logActivity={logActivity}
      triggerNotification={triggerNotification}
      setStatusText={setStatusText}
      formatQuarterPeriod={formatQuarterPeriod}
      getCategory={getCategory}
      getCategoryColor={getCategoryColor}
      getCategoryBg={getCategoryBg}
    />
  );

  /* ═══════════════════════════════════════
     RENDER: SAFETY & EMERGENCY MODULE
  ═══════════════════════════════════════ */
  const renderSafetyPage = () => (
    <TMSafety
      openEmergencyDialog={openEmergencyDialog}
      logActivity={logActivity}
      triggerNotification={triggerNotification}
      setStatusText={setStatusText}
    />
  );

  /* ─── Content dispatcher ─── */
  const renderBodyContent = () => {
    if (activeNav === "dashboard") return renderDashboardPage();
    if (activeNav === "profile") return renderProfilePage();
    if (activeNav === "myAssessment") return renderMyAssessment();
    if (activeNav === "safety") return renderSafetyPage();
    return renderDashboardPage();
  };
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(lines[:start_idx])
    f.write(new_content)
    f.writelines(lines[end_idx+1:])

print(f"Replaced lines {start_idx} to {end_idx}")
