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
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.#insertRecursiveHelper(root.left, value);
    } else if (value > root.data) {
      root.right = this.#insertRecursiveHelper(root.right, value);
    }

    return root;
  }

  deleteIterative(value) {
    let prev = null;
    let node = this.root;

    while (node !== null) {
      if (node.data > value) {
        prev = node;
        node = node.left;
      } else if (node.data < value) {
        prev = node;
        node = node.right;
      } else {
        break;
      }
    }

    if (node === null) {
      console.log('odd');
      console.log(prev);
      return;
    }

    // deleting a leaf node;
    if (node.right === null && node.left === null) {
      if (prev !== null) {
        if (prev.left !== null && prev.left.data === value) {
          prev.left = null;
          console.log('remove from left');
        } else if (prev.right !== null && prev.right.data === value) {
          prev.right = null;
          console.log('remove from right');
        }
      } else {
        this.root = null;
        console.log('remove root');
      }
    } else if (node.right !== null && node.left === null) {
      if (prev.left !== null && prev.left.data === value) {
        prev.left = node.right;
      } else if (prev.right !== null && prev.right.data === value) {
        prev.right = node.right;
      }
    } else if (node.left !== null && node.right === null) {
      if (prev.left !== null && prev.left.data === value) {
        prev.left = node.left;
      } else if (prev.right !== null && prev.right.data === value) {
        prev.right = node.left;
      }
    } else {
      let parent = node;
      let successor = node.right;
      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }

      if (parent !== node) {
        parent.left = successor.right;
      } else {
        parent.right = successor.right;
      }

      node.data = successor.data;
    }
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

  find(value) {
    let prev = null;
    let node = this.root;

    while (node !== null) {
      if (node.data > value) {
        prev = node;
        node = node.left;
      } else if (node.data < value) {
        prev = node;
        node = node.right;
      } else if (node.data === value) {
        return node;
      }
    }

    return undefined;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// for (let i = 0; i < 24; i++) {
//   // if (i === 17 || i === 16) continue;
//   array.push(i);
// }
const BST = new Tree(array);
// BST.insertIterative(2);
BST.insertRecursive(2);
console.log('tree before deletion');
BST.prettyPrint(BST.root);
// console.log('delete a leaf node');
//BST.deleteIterative(17); // turns node - 16 to leaf node;
//console.log('delete another leaf node');
//BST.deleteIterative(16); // tree no longer balanced;

BST.deleteIterative(11); // turns node - 10 to a node with a left child;
console.log('delete a node with only a right child');
BST.deleteIterative(6);
console.log('delete a node with only a left child');
BST.deleteIterative(10);
console.log('delete a node with both children');
BST.deleteIterative(8);
console.log('delete a node with both children');
BST.deleteIterative(15);

console.log(BST.find(1));
console.log('tree after deletion');
BST.prettyPrint(BST.root);
