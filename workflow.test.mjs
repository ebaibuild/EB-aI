import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, addTask, setStatus, removeTask, getStats, safeImport, exportBoard } from '../src/workflow.mjs';
test('creates, transitions and removes tasks',()=>{
 let tasks=addTask([],'  Document the API  ');assert.equal(tasks[0].title,'Document the API');
 tasks=setStatus(tasks,tasks[0].id,'in_progress');assert.equal(getStats(tasks).active,1);
 tasks=setStatus(tasks,tasks[0].id,'done');assert.equal(getStats(tasks).completed,1);
 assert.deepEqual(removeTask(tasks,tasks[0].id),[]);
});
test('exports and imports boards without changing tasks',()=>{
 const tasks=[createTask('A', 'id-a')];assert.deepEqual(safeImport(exportBoard(tasks)),tasks);
});
test('rejects invalid user data',()=>{
 assert.throws(()=>createTask('   '));
 assert.throws(()=>createTask('x'.repeat(141)));
 assert.throws(()=>setStatus([createTask('A','a')],'a','secret'));
 assert.throws(()=>safeImport('{bad json'));
 assert.throws(()=>safeImport(JSON.stringify({version:1,tasks:[{id:'a',title:'<script>',status:'evil',createdAt:'a'}]})));
 assert.throws(()=>safeImport(JSON.stringify({version:1,tasks:[createTask('A','same'),createTask('B','same')]})));
});
test('task board is capped at 100 items',()=>{
 let tasks=[];for(let i=0;i<100;i++)tasks=addTask(tasks,`Item ${i}`);assert.throws(()=>addTask(tasks,'101'));
});
