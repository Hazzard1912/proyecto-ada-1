class Node {
  constructor(task) {
    this.task = task;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AvlTree {
  constructor() {
    this.root = null;
    this.lastSteps = 0;
  }

  height(n) {
    return n ? n.height : 0;
  }

  balanceFactor(n) {
    return this.height(n.left) - this.height(n.right);
  }

  updateHeight(n) {
    n.height = 1 + Math.max(this.height(n.left), this.height(n.right));
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  balance(n) {
    this.updateHeight(n);

    const bf = this.balanceFactor(n);

    if (bf > 1) {
      if (this.balanceFactor(n.left) < 0)
        n.left = this.rotateLeft(n.left);
      return this.rotateRight(n);
    }

    if (bf < -1) {
      if (this.balanceFactor(n.right) > 0)
        n.right = this.rotateRight(n.right);
      return this.rotateLeft(n);
    }

    return n;
  }

  insertRec(node, task) {
    this.lastSteps++;
    if (!node) return new Node(task);

    if (task.id < node.task.id)
      node.left = this.insertRec(node.left, task);
    else if (task.id > node.task.id)
      node.right = this.insertRec(node.right, task);
    else {
      node.task = task;
      return node;
    }

    return this.balance(node);
  }
  insert(task) {
    this.lastSteps = 0;
    this.root = this.insertRec(this.root, task);
    return this.lastSteps;
  }

  searchRec(node, id) {
    this.lastSteps++;
    if (!node) return null;

    if (id === node.task.id) return node.task;
    if (id === node.task.id) return node.task;

    if (id < node.task.id) return this.searchRec(node.left, id);

    return this.searchRec(node.right, id);
  }

  search(id) {
    this.lastSteps = 0;
    const result = this.searchRec(this.root, id);
    return { result, steps: this.lastSteps };
  }

  minNode(node) {
    let current = node;
    while (current.left) {
      this.lastSteps++;
      current = current.left;
    }
    return current;
  }

  removeRec(node, id) {
    this.lastSteps++;
    if (!node) return null;

    if (id < node.task.id)
      node.left = this.removeRec(node.left, id);
    else if (id > node.task.id)
      node.right = this.removeRec(node.right, id);
    else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        const temp = this.minNode(node.right);
        node.task = temp.task;
        node.right = this.removeRec(node.right, temp.task.id);
      }
    }

    if (!node) return null;

    return this.balance(node);
  }

  remove(id) {
    this.lastSteps = 0;
    this.root = this.removeRec(this.root, id);
    return this.lastSteps;
  }

  printTree() {
    console.group("Estado del Árbol AVL");
    if (!this.root) {
      console.log("El árbol está vacío.");
    } else {
      this.printNode(this.root, "", true);
    }
    console.groupEnd();
  }

  printNode(node, indent, last) {
    if (node) {
      console.log(indent + (last ? "└─ " : "├─ ") + `[ID: ${node.task.id}] (H:${node.height})`);
      indent += last ? "   " : "│  ";
      this.printNode(node.left, indent, false);
      this.printNode(node.right, indent, true);
    }
  }
}
