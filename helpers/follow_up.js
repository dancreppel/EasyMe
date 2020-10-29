const findAncestry = require('./find_ancestry');
const { BotkitConversation } = require('botkit');

module.exports = (node, controller) => {
  const CONVO_ID = "followUp" + node.name;
  const convo = new BotkitConversation(CONVO_ID, controller);

  let ancestry = findAncestry(node);
  
  const quick_replies = ancestry.map(branchName => ({
    title: branchName,
    payload: branchName,
  }));

  const options = {
    text: "Would you like to know more?",
    quick_replies,
  };

  convo.addMessage(options);
  controller.addDialog(convo);
};
