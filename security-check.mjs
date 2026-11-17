import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
const root=process.cwd();
const ignoreDirs=new Set(['.git','node_modules']);
const forbiddenNames=[/^\.env(?:\.|$)/i,/^id_rsa$/i,/^id_ed25519$/i,/\.pem$/i,/\.p12$/i,/\.key$/i,/^credentials\.json$/i,/^service-account.*\.json$/i];
const patterns=[
 ['private key block',/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
 ['Google API key',/AIza[0-9A-Za-z_-]{30,}/],
 ['GitHub token',/gh(?:p|o|u|s|r)_[A-Za-z0-9]{30,}/],
 ['Slack token',/xox[baprs]-[A-Za-z0-9-]{20,}/],
 ['AWS access key',/AKIA[0-9A-Z]{16}/],
 ['OpenAI project key',/sk-proj-[A-Za-z0-9_-]{20,}/]
];
let checked=0,errors=[];
async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){
 if(ent.isDirectory()){if(!ignoreDirs.has(ent.name))await walk(join(dir,ent.name));continue;}
 const path=join(dir,ent.name),rel=relative(root,path);
 if(forbiddenNames.some(re=>re.test(ent.name)))errors.push(`Forbidden filename: ${rel}`);
 if(!ent.isFile())continue;
 const contents=await readFile(path,'utf8');checked++;
 for(const [label,re] of patterns)if(re.test(contents))errors.push(`${label} found in ${rel}`);
}}
await walk(root);if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Security scan passed: ${checked} files checked; no recognized secrets or forbidden filenames.`);
