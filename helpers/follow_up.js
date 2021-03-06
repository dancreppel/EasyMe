const findAncestry = require('./find_ancestry');
const { BotkitConversation } = require('botkit');

module.exports = (node, controller) => {
  const CONVO_ID = "followUp" + node.parent.name + node.name;
  const convo = new BotkitConversation(CONVO_ID, controller);

  let ancestry = findAncestry(node);
  
  const quick_replies = ancestry.map(branchName => {
    let charIdx = branchName.indexOf(":");
    return {
      title: branchName.slice(charIdx + 1, branchName.length),
      payload: branchName,
    }
  });

  const options = {
    text: "Would you like to know more?",
    quick_replies,
  };

  convo.addMessage(options);
  controller.addDialog(convo);
};
