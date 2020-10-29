module.exports = function findAncestors (node, ancestors = []) {
  if (node.name === 'main') {
    ancestors.push(node.name);
    return ancestors;
  } else {
    ancestors.push(node.name);
    return findAncestors(node.parent, ancestors);
  }
};