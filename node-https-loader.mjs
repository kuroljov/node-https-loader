import fs from 'fs';
import path from 'path';
import process from 'process';

import norm from './lib/norm.mjs';
import hash from './lib/hash.mjs';
import fetchModule from './lib/fetchModule.mjs';

const JS_EXTENSIONS = new Set(['.js', '.mjs']);

export async function resolve(specifier, parentModuleURL, defaultResolver) {
  if (!specifier.startsWith('https:')) {
    return defaultResolver(specifier, parentModuleURL);
  }

  const destDir = `${norm(process.env.NODE_HTTPS_MODULES || '/tmp')}/node_http_modules`;

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  const scriptPath = new URL(`file://${destDir}/${hash(specifier)}.mjs`);

  let source;

  if (fs.existsSync(scriptPath)) {
    source = fs.readFileSync(scriptPath, 'utf8');
  } else {
    source = await fetchModule(specifier);
    fs.writeFileSync(scriptPath, source);
  }

  const ext = path.extname(scriptPath.pathname);

  if (!JS_EXTENSIONS.has(ext)) {
    throw new Error(`Cannot load file with non-JavaScript file extension ${ext}.`);
  }

  return {
    url: scriptPath.href,
    format: 'esm',
  };
}
