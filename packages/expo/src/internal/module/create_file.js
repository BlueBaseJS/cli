import fs from 'fs';
export default function create(filePath, ext, content) {
  fs.writeFileSync(filePath, ext === 'json' ? JSON.stringify(content) : content);
}

