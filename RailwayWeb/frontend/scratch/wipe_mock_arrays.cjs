const fs = require('fs');
const path = require('path');

const filesToClean = [
  'TrafficInspectorModule.jsx',
  'TrainManagerModule.jsx',
  'StationSuperintendentModule.jsx',
  'StationMasterModule.jsx',
  'PointsmanModule.jsx'
];

const arraysToEmpty = [
  'INIT_STATIONS',
  'INIT_USERS',
  'DEFAULT_SS_TM_USERS',
  'MONTHLY',
  'INIT_PM_ASSESSMENTS',
  'INIT_SM_LIST',
  'INIT_TM_LIST',
  'INIT_SS_LIST',
  'INIT_INSPECTIONS',
  'INIT_COUNSELLING',
  'INIT_TI_ASSESS_HISTORY',
  'MONTHLY_TREND',
  'INIT_ASSESS_HISTORY',
  'TRAIN_MANAGER_ASSESS_HISTORY',
  'SS_ASSESS_HISTORY',
  'SM_ASSESS_HISTORY',
  'PM_ASSESS_HISTORY'
];

filesToClean.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace arrays with empty arrays
  arraysToEmpty.forEach(arrName => {
    // Matches: const ARR_NAME = [ ... ];  or const ARR_NAME = [...];
    const regex = new RegExp(`const\\s+${arrName}\\s*=\\s*\\[[\\s\\S]*?\\];`, 'g');
    content = content.replace(regex, `const ${arrName} = [];`);
  });

  // Specifically for TI, disable the generateGraphCompleteData function logic that pushes default users
  content = content.replace(/const generateGraphCompleteData[\s\S]*?return usersList;\n};/g, `const generateGraphCompleteData = (baseUsers, baseStations) => { return []; };`);
  
  content = content.replace(/const generateAssessmentsForGraphs[\s\S]*?return \{ pmAssess, smAssess, ssAssess, tmAssess \};\n};/g, `const generateAssessmentsForGraphs = () => { return { pmAssess: [], smAssess: [], ssAssess: [], tmAssess: [] }; };`);
  // Remove local storage mock seedings
  content = content.replace(/if\s*\(localStorage\.getItem\(['"][^'"]+['"]\)\s*!==\s*['"]true['"]\)[\s\S]*?\}/g, `// LocalStorage mock seeding removed`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned mock arrays in ${file}`);
});
