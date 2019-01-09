import fs from 'fs';

/**
 * Tries to file a given file with .js, .ts, .jsx & .tsx paths.
 * If none is found, returns backup. Otherwise returns the found path.
 * @param path 
 * @param backup 
 */
export function findFile (path: string, backup: string) {

  let file = `${path}.js`;
  if (fs.existsSync(file)) { return file; }

  file = `${path}.jsx`;
  if (fs.existsSync(file)) { return file; }

  file = `${path}.ts`;
  if (fs.existsSync(file)) { return file; }

  file = `${path}.tsx`;
  if (fs.existsSync(file)) { return file; }

  return backup;  
}