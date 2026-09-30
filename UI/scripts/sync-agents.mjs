import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const ui = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(ui, '..');
const target = resolve(ui, 'src/data/agents.json');
const previous = JSON.parse(readFileSync(target, 'utf8'));
const next = [];
for (const [folder, phase] of [['Escucha', 'escucha'], ['Realimentación', 'respuesta']]) {
  const directory = resolve(repo, 'Casos-de-uso/Asesoria-Psicopedagogica/Agents', folder);
  for (const file of readdirSync(directory).filter(f => f.endsWith('.md')).sort()) {
    const full = resolve(directory, file);
    const raw = readFileSync(full, 'utf8');
    const name = raw.match(/^---\s*\r?\n[\s\S]*?^name:\s*["']?([^\r\n"']+)/m)?.[1]?.trim();
    if (!name) continue;
    const source = relative(repo, full).replaceAll('\\', '/');
    const old = previous.find(a => a.source === source);
    next.push({ id: name, title: old?.title ?? name, description: old?.description ?? 'Especificación del caso de asesoría psicopedagógica.', phase, kind: 'Agente definido', source, document: raw.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n/, '') });
  }
}
for (const role of previous.filter(a => a.kind === 'Rol metodológico')) {
  next.push({ ...role, document: readFileSync(resolve(repo, role.source), 'utf8') });
}
if (!next.some(a => a.phase === 'escucha') || !next.some(a => a.phase === 'respuesta')) throw new Error('No se encontraron las especificaciones esperadas.');
writeFileSync(target, JSON.stringify(next, null, 2) + '\n', 'utf8');
console.log(`Catálogo sincronizado: ${next.filter(a => a.kind === 'Agente definido').length} agentes y ${next.filter(a => a.kind === 'Rol metodológico').length} roles. No se ejecutaron agentes.`);
