import { GRAPH } from './mapdata.js';

/** Breadth-first path of node ids, including both ends. Null if disconnected. */
export function findPath(fromId, toId) {
  if (fromId === toId) return [fromId];
  if (!GRAPH[fromId] || !GRAPH[toId]) return null;
  const prev = { [fromId]: null };
  const queue = [fromId];
  while (queue.length) {
    const cur = queue.shift();
    const nexts = GRAPH[cur] || [];
    for (let i = 0; i < nexts.length; i++) {
      const n = nexts[i];
      if (Object.prototype.hasOwnProperty.call(prev, n)) continue;
      prev[n] = cur;
      if (n === toId) {
        const path = [toId];
        let p = toId;
        while (prev[p]) {
          p = prev[p];
          path.push(p);
        }
        path.reverse();
        return path;
      }
      queue.push(n);
    }
  }
  return null;
}
