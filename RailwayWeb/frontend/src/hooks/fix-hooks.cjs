const fs = require('fs');
const filePath = 'D:\\\\RailwayWeb\\\\RailwayWeb\\\\frontend\\\\src\\\\hooks\\\\useAomState.js';
let code = fs.readFileSync(filePath, 'utf8');
if (!code.includes('import { useState')) {
  code = 'import { useState, useEffect, useMemo } from "react";\n' + code;
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Fixed useAomState.js');
}
