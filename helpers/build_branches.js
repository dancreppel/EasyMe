const Node = require('./node');
const followUp = require('./follow_up');
const { BotkitConversation } = require('botkit');

// note: this function will be called within a feature, so controller will be provided
module.exports = function buildBranches (node, controller) {
  if (typeof node.value === 'object') {
    const quickReplies = [];
    // Build a conversation
    let CONVO_ID = node.name;
    let convo = new BotkitConversation(CONVO_ID, controller);

    for (const key in node.value) {
      let child = new Node(node, key, node.value[key])
      let res = buildBranches(child, controller);
      let quickReply = { title: key };
      if (res) {
        quickReply.payload = res;
      } else {
        quickReply.payload = key;
      }
      quickReplies.push(quickReply);
    }

    // Allow the user to return to the parent's quick replies
    // However, you cannot go up the tree at root because root has no parent
    if (node.name !== 'main') {
      let goBackOption = {
        title: 'go back',
        payload: node.parent.name
      }

      quickReplies.push(goBackOption);
    }

    let options = {
      text: "What would you like to know?",
      quick_replies: quickReplies
    }

    convo.addMessage(options);
    controller.addDialog(convo);

    // Add listener for convo
    controller.hears(node.name, 'message', async(bot,message) => {
      await bot.beginDialog('typing');
      await bot.beginDialog(node.name);
    });

    // Create follow up dialog
    followUp(node, controller);

    // no need to return anything because parent doesn't need to know about
    // child's quick replies
    return null;
  } else {
    // BASE CASE
    // In this case the node's value is a string, which is the value of the key
    // from it's parent's node
    if (node.name === 'phone') {
      console.log(node.name);
      console.log(typeof node.value);
      console.log(node.value);
    }

    if (node.value === "") {
      return `error: in the resume json file, value must not be empty for the 
      field "${node.name}" in "${node.parent.name}"`;
    } else {
      controller.hears(async(message) => { return message.text === node.value }, 'message', async(bot, message) => {
        await bot.beginDialog('typing');
        await bot.beginDialog('followUp' + node.parent.name);
      })
  
      let payload = node.value;
      return payload;
    }
  }
}