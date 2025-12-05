export class PriorityHeap {
  constructor() {
    this.data = [];
  }

  compare(a, b) {
    if (a.priority !== b.priority) return a.priority > b.priority;
    return a.id > b.id;
  }

  push(task) {
    this.data.push(task);
    this.heapifyUp(this.data.length - 1);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[parent])) {
        [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    let n = this.data.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (left < n && this.compare(this.data[left], this.data[largest]))
        largest = left;
      if (right < n && this.compare(this.data[right], this.data[largest]))
        largest = right;

      if (largest !== i) {
        [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
        i = largest;
      } else break;
    }
  }

  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const end = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = end;
      this.heapifyDown(0);
    }
    return top;
  }

  peek() {
    return this.data.length === 0 ? null : this.data[0];
  }

removeById(id) {
  const idx = this.data.findIndex((t) => t.id === id);
  if (idx === -1) return false;

  // Intercambiar con el último elemento
  const last = this.data.length - 1;
  [this.data[idx], this.data[last]] = [this.data[last], this.data[idx]];
  this.data.pop();

  // Reajustar heap si aún hay elementos
  if (idx < this.data.length) {
    this.heapifyUp(idx);
    this.heapifyDown(idx);
  }

  return true;
}



  getAll() {
    return [...this.data];
  }
}
