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
  
  // Replace Category A with dynamic catBadge
  content = content.replace(
    /<span className="sdom-badge sdom-badge-success">Category A<\/span>/g,
    `{catBadge(user?.cat || user?.category || "Untested")}`
  );

  // Replace hardcoded 88% or 86% with dynamic score
  content = content.replace(
    /<span className="val">\d{2}%<\/span>\s*<span className="lbl">(Section Avg|Assessment Score)<\/span>/g,
    `<span className="val">{user?.score === 0 ? "N/A" : (user?.score || "N/A")}</span>\n              <span className="lbl">Assessment Score</span>`
  );

  // Replace hardcoded phone numbers with dynamic contact
  content = content.replace(
    /<span className="val">\+91 \d{5} \d{5}<\/span>\s*<span className="lbl">Contact<\/span>/g,
    `<span className="val">{user?.contact || "—"}</span>\n              <span className="lbl">Contact</span>`
  );

  // Replace hardcoded dates with dynamic dates
  content = content.replace(
    /<span className="val">2026-\d{2}-\d{2}<\/span>\s*<span className="lbl">Last Audit<\/span>/g,
    `<span className="val">{user?.lastDate || user?.lastAssessDate || "—"}</span>\n              <span className="lbl">Last Audit</span>`
  );

  // Replace Category A in personal info grid
  content = content.replace(
    /\["Category", "A"\]/g,
    `["Category", user?.cat || user?.category || "Untested"]`
  );

  // Remove any remaining mock data from info grids
  content = content.replace(
    /\["Mobile Number", "\+91 98900 \d{5}"\]/g,
    `["Mobile Number", user?.contact || "—"]`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched profile headers in ${file}`);
});
