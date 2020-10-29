module.exports = class Node {
  constructor (parent, name, value) {
    this.parent = parent;
    this.name = name;
    this.value = value;
  }
};