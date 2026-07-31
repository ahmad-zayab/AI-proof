const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  content = content.replace(/AI-Proof Engineer/g, 'AI Proof');
  content = content.replace(/ai-proof-engineer/g, 'ai-proof');
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else {
      if (filePath.match(/\.(ts|tsx|json|md|mdx)$/)) {
        replaceInFile(filePath);
      }
    }
  }
}

walk(process.cwd());
