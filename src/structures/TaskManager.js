import { PriorityHeap } from "./PriorityHeap";
import { AvlTree } from "./AvlTree";

export class TaskManager {
  constructor() {
    this.heap = new PriorityHeap();
    this.index = new AvlTree();
  }

  add(task) {
    this.heap.push(task);
    this.index.insert(task);
  }

  getById(id) {
    return this.index.search(id);
  }

  getHighest() {
    return this.heap.peek();
  }

  update(task) {
    const exists = this.index.search(task.id);

    if (!exists) return false;

    this.heap.removeById(task.id);
    this.index.insert(task);
    this.heap.push(task);

    return true;
  }

  delete(id) {
    const exists = this.index.search(id);
    if (!exists) return false;

    this.index.remove(id);
    this.heap.removeById(id);

    return true;
  }

  completeHighest() {
    const t = this.heap.pop();
    if (t) this.index.remove(t.id);
    return t;
  }

  getAll() {
    return this.heap.getAll();
  }
}
