// Pure, dependency-free workflow state management. No APIs or credentials are used.
export const STATES = Object.freeze(['planned','in_progress','blocked','done']);
const MAX_TITLE = 140;
const MAX_TASKS = 100;

export function createTask(title, id = crypto.randomUUID()) {
  if (typeof title !== 'string' || !title.trim() || title.trim().length > MAX_TITLE) {
    throw new Error(`Task title must be 1–${MAX_TITLE} characters.`);
  }
  return { id, title: title.trim(), status: 'planned', createdAt: new Date().toISOString() };
}
export function addTask(tasks, title) {
  if (!Array.isArray(tasks) || tasks.length >= MAX_TASKS) throw new Error('Task limit reached (100).');
  return [...tasks, createTask(title)];
}
export function setStatus(tasks, id, status) {
  if (!STATES.includes(status)) throw new Error('Invalid task status.');
  if (!tasks.some(task => task.id === id)) throw new Error('Task not found.');
  return tasks.map(task => task.id === id ? { ...task, status } : task);
}
export function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}
export function getStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'done').length,
    active: tasks.filter(task => task.status === 'in_progress').length,
    blocked: tasks.filter(task => task.status === 'blocked').length
  };
}
export function safeImport(raw) {
  if (typeof raw !== 'string' || raw.length > 100000) throw new Error('Invalid board data.');
  let payload;
  try { payload = JSON.parse(raw); } catch { throw new Error('Invalid JSON.'); }
  if (!payload || payload.version !== 1 || !Array.isArray(payload.tasks) || payload.tasks.length > MAX_TASKS) {
    throw new Error('Unsupported board format.');
  }
  const seen = new Set();
  const tasks = payload.tasks.map(task => {
    if (!task || typeof task.id !== 'string' || task.id.length > 100 || seen.has(task.id) ||
        typeof task.title !== 'string' || !task.title.trim() || task.title.length > MAX_TITLE ||
        !STATES.includes(task.status) || typeof task.createdAt !== 'string' || task.createdAt.length > 50) {
      throw new Error('Invalid task found in board.');
    }
    seen.add(task.id);
    return { id: task.id, title: task.title.trim(), status: task.status, createdAt: task.createdAt };
  });
  return tasks;
}
export function exportBoard(tasks) {
  // Validate via round-trip to ensure the export has the same restrictions as import.
  const json = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), tasks }, null, 2);
  safeImport(json);
  return json;
}
