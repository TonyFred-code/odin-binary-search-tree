class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    const q = [
      [root, [0, mid - 1]],
      [root, [mid + 1, array.length - 1]],
    ];

    while (q.length > 0) {
      const [parent, [left, right]] = q.shift();

      if (left <= right && parent !== null) {
        const mid = Math.floor((left + right) / 2);
        const child = new Node(array[mid]);

        if (array[mid] < parent.data) {
          parent.left = child;
        } else {
          parent.right = child;
        }

        q.push([child, [left, mid - 1]]);
        q.push([child, [mid + 1, right]]);
      }
    }

    return root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
