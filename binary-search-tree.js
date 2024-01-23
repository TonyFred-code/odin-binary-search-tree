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

  #removeDuplicates(array) {
    return [...new Set(array)];
  }

  #sortArray(array) {
    return array.sort((a, b) => a - b);
  }

  #cleanArray(array) {
    return this.#sortArray(this.#removeDuplicates(array));
  }

  #buildTree(array) {
    array = this.#cleanArray(array);
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
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insertIterative(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    let prev = null;
    let temp = this.root;

    while (temp !== null) {
      if (temp.data > value) {
        prev = temp;
        temp = temp.left;
      } else if (temp.data < value) {
        prev = temp;
        temp = temp.right;
      }
    }

    if (prev.data > value) {
      prev.left = node;
    } else {
      prev.right = node;
    }
  }

  insertRecursive(value) {
    this.#insertRecursiveHelper(this.root, value);
  }

  #insertRecursiveHelper(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.#insertRecursiveHelper(root.left, value);
    } else if (value > root.data) {
      root.right = this.#insertRecursiveHelper(root.right, value);
    }

    return root;
  }

  deleteRecursive(value) {
    this.#deleteRecursiveHelper(this.root, value);
  }

  #deleteRecursiveHelper(root, value) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.#deleteRecursiveHelper(root.left, value);
      return root;
    } else if (root.data < value) {
      root.right = this.#deleteRecursiveHelper(root.right, value);
      return root;
    }

    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      let parent = root;

      let successor = root.right;
      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }

      if (parent !== root) {
        parent.left = successor.right;
      } else {
        parent.right = successor.right;
      }

      root.data = successor.data;

      return root;
    }
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = new Tree(array);
// BST.insertIterative(2);
BST.insertRecursive(2);
console.log('tree before deletion');
BST.prettyPrint(BST.root);
console.log('delete 2 - a leaf node');
BST.deleteRecursive(2);
console.log('delete 7 - another leaf node');
BST.deleteRecursive(7);
// console.log('delete a node with one child - left');
// BST.deleteRecursive(3)
// console.log('delete a node with one child - right');
// BST.deleteRecursive(5)
// console.log('delete a node with two children - 67');
// BST.deleteRecursive(67);
// console.log('delete a node with two children - 4');
// BST.deleteRecursive(4);

console.log('tree after deletion');
BST.prettyPrint(BST.root);
