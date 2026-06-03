const fs = require('fs');
const path = require('path');

const filesToClean = [
  'TrafficInspectorModule.jsx',
  'TrainManagerModule.jsx',
  'StationSuperintendentModule.jsx',
  'StationMasterModule.jsx',
  'PointsmanModule.jsx'
];

filesToClean.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace catBadge
  content = content.replace(
    /const catBadge = \(c\) => \{[\s\S]*?return <span className=\{`sdom-badge \$\{map\[c\] \|\| "sdom-badge-neutral"\}c?`\}>\{c\}<\/span>;\n\};/g,
    `const catBadge = (c) => {
  if (c === "Untested" || !c) return <span className="sdom-badge sdom-badge-neutral" style={{background: '#f1f5f9', color: '#64748b'}}>Untested</span>;
  const map = { A: "sdom-badge-success", B: "sdom-badge-info", C: "sdom-badge-warning", D: "sdom-badge-danger" };
  return <span className={\`sdom-badge \${map[c] || "sdom-badge-neutral"}\`}>{c}</span>;
};`
  );

  // Replace riskBadge
  content = content.replace(
    /const riskBadge = \(r\) => \{[\s\S]*?return <span className=\{`sdom-badge \$\{map\[r\] \|\| "sdom-badge-neutral"\}c?`\}>\{r\}<\/span>;\n\};/g,
    `const riskBadge = (r) => {
  if (r === "Untested" || !r) return <span className="sdom-badge sdom-badge-neutral" style={{background: '#f1f5f9', color: '#64748b'}}>Untested</span>;
  const map = { Low: "sdom-badge-success", Medium: "sdom-badge-warning", High: "sdom-badge-danger" };
  return <span className={\`sdom-badge \${map[r] || "sdom-badge-neutral"}\`}>{r}</span>;
};`
  );

  // In getCat, return Untested if score === 0
  content = content.replace(
    /const getCat = s => s >= 80 \? "A" : s >= 50 \? "B" : s >= 26 \? "C" : "D";/g,
    `const getCat = s => s === 0 ? "Untested" : (s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D");`
  );

  // In getUserRisk, return Untested if score === 0
  content = content.replace(
    /const getUserRisk = \(u\) => \{[\s\S]*?return u\.pmeStatus === "Overdue" \|\| u\.refStatus === "Expired" \|\| u\.score < 50 \? "High" : u\.score >= 80 \? "Low" : "Medium";\n\};/g,
    `const getUserRisk = (u) => {
  if (u.score === 0 || u.cat === "Untested") return "Untested";
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched badges in ${file}`);
});
