const BST = require('./binary-search-tree');

// Create BST from rnd numbers < 100;

function getRndInt(min = -10, max = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRndArray(minVal, maxVal, length = 20) {
  if (length <= 0) return [];

  const rndArray = [];
  for (let i = 0; i < length; i++) {
    rndArray.push(getRndInt(minVal, maxVal));
  }

  return rndArray;
}

const rndArray = getRndArray(-100, 100, 25);

const bst = new BST(rndArray);

// confirm balanced tree;
console.log(`TREE BALANCED: ${bst.isBalanced()}`);

// print elements

// As Level Order
console.log('--------- LEVEL ORDER TRAVERSAL --------');
bst.levelOrderIterative((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END LEVEL ORDER TRAVERSAL');

// As Pre Order
console.log('--------- PRE ORDER TRAVERSAL --------');
bst.preOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END PRE ORDER TRAVERSAL');

// As Post Order
console.log('--------- POST ORDER TRAVERSAL --------');
bst.postOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END POST ORDER TRAVERSAL');

// As In Order
console.log('--------- IN ORDER TRAVERSAL --------');
bst.inOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END IN ORDER TRAVERSAL');

// unbalance tree;
console.log('--------- UNBALANCE TREE');
for (let i = 0; i < 25; i += 1) {
  bst.insertIterative(getRndInt(-100, 100));
}

// confirm tree is unbalanced;
console.log(`TREE IS UNBALANCED: ${!bst.isBalanced()}`);

// re-balance the tree
console.log('RE-BALANCE TREE');
bst.reBalance();
// confirm tree is balanced
console.log(`TREE IS BALANCED: ${bst.isBalanced()}`);

// print elements

// As Level Order
console.log('--------- LEVEL ORDER TRAVERSAL --------');
bst.levelOrderIterative((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END LEVEL ORDER TRAVERSAL');

// As Pre Order
console.log('--------- PRE ORDER TRAVERSAL --------');
bst.preOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END PRE ORDER TRAVERSAL');

// As Post Order
console.log('--------- POST ORDER TRAVERSAL --------');
bst.postOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END POST ORDER TRAVERSAL');

// As In Order
console.log('--------- IN ORDER TRAVERSAL --------');
bst.inOrder((n) => console.log(`Node Value: ${n.data}`));
console.log('--------- END IN ORDER TRAVERSAL');
