const { BotkitConversation } = require("botkit");

module.exports = ({ node, quickReplies, controller}) => {
  // Allow the user to return to the parent's quick replies
  // However, you cannot go up the tree at root because root has no parent

  let convoId;
  
  if (node.name !== "main") {
    convoId = node.parent.name + " : " + node.name;
    let returnToParent;
    if (node.parent.name === "main") {
      returnToParent = {
        title: "return to " + node.parent.name,
        payload: node.parent.name,
      };
    } else {
      returnToParent = {
        title: "return to " + node.parent.name,
        payload: node.parent.parent.name + " : " + node.parent.name,
      };
    }
    quickReplies.push(returnToParent);
  } else {
    // main has no parent
    convoId = node.name;
  }

  const convo = new BotkitConversation(convoId, controller);

  let options = {
    text: `What would you like to know about ${node.name}?`,
    quick_replies: quickReplies,
  };

  convo.addMessage(options);
  controller.addDialog(convo);

  // Add listener for convo
  controller.hears(convoId, "message", async (bot, message) => {
    await bot.beginDialog("typing");
    await bot.beginDialog(convoId);
  });
}