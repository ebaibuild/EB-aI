import { addTask, setStatus, removeTask, getStats, exportBoard, safeImport } from './workflow.mjs';
const $ = id => document.getElementById(id);
const KEY = 'eb-ai-workflow-board-v1';
const labels = {planned:'Planned',in_progress:'In progress',blocked:'Blocked',done:'Done'};
let tasks=[];
try { const saved=localStorage.getItem(KEY); if(saved) tasks=safeImport(saved); } catch { tasks=[]; }
function notify(message){$('notice').textContent=message;}
function save(){
  try { localStorage.setItem(KEY, exportBoard(tasks)); }
  catch { notify('Browser storage unavailable. You can still export this board.'); }
}
function render(){
  const host=$('task-list');host.replaceChildren();
  if(!tasks.length){const empty=document.createElement('div');empty.className='empty-state';empty.textContent='Your board is empty. Add your first task above.';host.append(empty);}
  for(const task of tasks){
    const row=document.createElement('div');row.className='task-item';
    const marker=document.createElement('span');marker.className='task-icon';marker.setAttribute('aria-hidden','true');marker.textContent=task.status==='done'?'✓':'◇';
    const title=document.createElement('span');title.className='task-title';title.textContent=task.title;
    const select=document.createElement('select');select.className='task-status';select.setAttribute('aria-label',`Status of ${task.title}`);
    for(const [key,label] of Object.entries(labels)){const opt=document.createElement('option');opt.value=key;opt.textContent=label;opt.selected=task.status===key;select.append(opt);}
    select.addEventListener('change',()=>{tasks=setStatus(tasks,task.id,select.value);save();render();notify(`Updated: ${task.title} → ${labels[select.value]}.`);});
    const del=document.createElement('button');del.type='button';del.className='task-remove';del.textContent='×';del.setAttribute('aria-label',`Remove ${task.title}`);del.addEventListener('click',()=>{tasks=removeTask(tasks,task.id);save();render();notify('Task removed.');});
    row.append(marker,title,select,del);host.append(row);
  }
  const s=getStats(tasks);$('stat-total').textContent=s.total;$('stat-active').textContent=s.active;$('stat-done').textContent=s.completed;$('stat-blocked').textContent=s.blocked;
  $('completion').textContent=(s.total?Math.round(s.completed/s.total*100):0)+'%';$('board-count').textContent=s.total+' '+(s.total===1?'task':'tasks');
}
$('add-form').addEventListener('submit',event=>{event.preventDefault();try{tasks=addTask(tasks,$('task-input').value);$('task-input').value='';save();render();notify('Task added to your local board.');}catch(e){notify(e.message);}});
$('sample-button').addEventListener('click',()=>{if(tasks.length && !confirm('Replace your current local board with sample tasks?'))return;tasks=[];for(const title of ['Define a public roadmap','Write contribution guidelines','Run the security checks','Prepare the first tagged release'])tasks=addTask(tasks,title);tasks=setStatus(tasks,tasks[0].id,'done');tasks=setStatus(tasks,tasks[1].id,'in_progress');save();render();notify('Sample loaded. These are example tasks, not verified project milestones.');});
$('clear-button').addEventListener('click',()=>{if(!tasks.length)return;if(!confirm('Delete all tasks from this browser?'))return;tasks=[];save();render();notify('Local task board cleared.');});
$('export-button').addEventListener('click',()=>{try{const file=new Blob([exportBoard(tasks)],{type:'application/json'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download='eb-ai-workflow-board.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Board exported as JSON.');}catch(e){notify(e.message);}});
render();
