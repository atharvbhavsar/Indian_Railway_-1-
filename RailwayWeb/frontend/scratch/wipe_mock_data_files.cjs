const fs = require('fs');
const path = require('path');

const filesToClean = [
  'mockPointsmanData.js',
  'mockSSData.js',
  'mockStationMasterData.js',
  'mockTMData.js',
  'mockTrafficInspectorData.js'
];

filesToClean.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', 'data', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace initialHistory arrays with empty arrays
  content = content.replace(
    /export const initialHistory = \[[^]*?\];/g,
    `export const initialHistory = [];`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned initialHistory in ${file}`);
});
