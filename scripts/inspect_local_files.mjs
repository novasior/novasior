import fs from 'fs';
import path from 'path';

const projectRoot = 'x:\\novasior - Copy';

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.gemini') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDir(fullPath));
    } else {
      const stat = fs.statSync(fullPath);
      results.push({
        relativePath: path.relative(projectRoot, fullPath),
        sizeBytes: stat.size,
        ext: path.extname(entry.name)
      });
    }
  }
  return results;
}

const allFiles = scanDir(projectRoot);
console.log('=== ALL NON-DEPENDENCY LOCAL FILES IN PROJECT ===');
console.log(JSON.stringify(allFiles, null, 2));

// Filter specifically for files in public, assets, or possible product deliverables
const mediaAndDocs = allFiles.filter(f => 
  ['.png', '.jpg', '.jpeg', '.pdf', '.xlsx', '.xls', '.csv', '.zip', '.txt', '.doc', '.docx'].includes(f.ext.toLowerCase())
);
console.log('\n=== MEDIA, DOCUMENT & DELIVERABLE FILES FOUND ===');
console.log(JSON.stringify(mediaAndDocs, null, 2));
