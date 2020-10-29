const Node = require('../helpers/node');
const buildBranches = require('../helpers/build_branches');
const resume = require("../resume_test.json");

module.exports = (controller) => {
  // no parent, name is main, and its value is resume
  const mainNode = new Node('', 'main', resume);
  buildBranches(mainNode, controller);
} 