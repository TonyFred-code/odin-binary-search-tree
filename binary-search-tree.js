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

  #handleLeafNode(parent, value) {
    if (parent !== null) {
      // Determine if it's the left or right child
      if (parent.left !== null && parent.left.data === value) {
        parent.left = null;
      } else if (parent.right !== null && parent.right.data === value) {
        parent.right = null;
      }
    } else {
      // If there's no parent, it means we are deleting the root
      this.root = null;
    }
  }

  #handleSingleChildNodeDeletion(parent, current, child) {
    if (parent !== null) {
      // Determine if it's the left or right child
      if (parent.left !== null && parent.left.data == current.data) {
        parent.left = child;
      } else if (parent.right !== null && parent.right.data === current.data) {
        parent.right = child;
      }
    } else {
      // If there's no parent, it means we are deleting the root
      this.root = child;
    }
  }

  #handleTwoChildrenNodeDeletion(current) {
    let successorParent = current;
    let successor = current.right;

    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    if (successorParent !== current) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }

    current.data = successor.data;
  }

  deleteIterative(value) {
    let parent = null;
    let current = this.root;

    while (current !== null) {
      if (current.data > value) {
        parent = current;
        current = current.left;
      } else if (current.data < value) {
        parent = current;
        current = current.right;
      } else {
        // Node to be deleted is found
        if (current.left === null && current.right === null) {
          // Case 1: Node is a leaf
          this.#handleLeafNode(parent, value);
        } else if (current.left === null) {
          // Case 2: Node has only a right child
          this.#handleSingleChildNodeDeletion(parent, current, current.right);
        } else if (current.right === null) {
          // Case 3: Node has only a right child
          this.#handleSingleChildNodeDeletion(parent, current, current.left);
        } else {
          // Case 4: Node has both left and right children
          this.#handleTwoChildrenNodeDeletion(current);
        }

        return true;
      }
    }

    console.log('Node not found: ', value);
    return false;
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

  levelOrderIterative(callbackFnc) {
    const queue = [this.root];
    const nodes = [];

    while(queue.length !== 0) {
      const node = queue.shift();
      if (node === null) break;
      nodes.push(node);
      if (node.right !== null) queue.push(node.right);
      if (node.left !== null) queue.push(node.left);
    }

    if (callbackFnc) {
      for (let node of nodes) {
        callbackFnc(node);
      }
    } else {
      const values = []
      for (let node of nodes) {
        values.push(node.data);
      }

      return values;
    }
  }


}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const BST = new Tree(array);
// console.log('TREE BEFORE DELETION');
// BST.prettyPrint(BST.root);
// console.log('delete a leaf node');
// BST.deleteIterative(3);
// console.log('delete a leaf node');
// BST.deleteIterative(7);
// console.log('delete node with only one right child');
// BST.deleteIterative(5);
// console.log('delete node with only one left child');
// BST.deleteIterative(4)
// console.log('delete node with two children');
// BST.deleteIterative(67)
// console.log('TREE AFTER DELETION');
console.log(BST.levelOrderIterative())
BST.prettyPrint(BST.root);
