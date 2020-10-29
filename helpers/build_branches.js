const Node = require('./node');
const followUp = require('./follow_up');
const { BotkitConversation } = require('botkit');

// note: this function will be called within a feature, so controller will be provided
module.exports = function buildBranches (node, controller) {
  if (Array.isArray(node.value)) {
    let convoId = node.name;
    let convo = new BotkitConversation(convoId, controller);
    const quickReplies = [];

    node.value.forEach((obj, nodeIdx) => {
      let objKeys = Object.keys(obj);
      // the first key is the identifier 
      let identifier = objKeys[0];
      let quickReply = {
        title: obj[identifier],
        payload: obj[identifier]
      }

      quickReplies.push(quickReply);

      // create a psuedo node in which the identifier is the name of the node
      // and the rest of the keys are the values associated with said node

      // prevent changes to original object
      Object.freeze(obj);
      //create a copy of the obj
      let value = Object.assign({}, obj);
      // delete the identifier which is the first field
      delete value[identifier];

      let child = new Node(node, obj[identifier], value);
      buildBranches(child, controller);
    });
    
    let options = {
      text: `What would you like to know about ${node.name}?`,
      quick_replies: quickReplies
    }

    convo.addMessage(options);
    controller.addDialog(convo);

    // Add listener for convo
    controller.hears(node.name, 'message', async (bot, message) => {
      await bot.beginDialog('typing');
      await bot.beginDialog(node.name);
    });


    // Create follow up dialog
    followUp(node, controller);

    // no need to return anything because parent doesn't need to know about
    // child's quick replies
    return null;
  } else if (typeof node.value === 'object') { 
    const quickReplies = [];
    const convoId = node.name;
    const convo = new BotkitConversation(convoId, controller);

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
      text: `What would you like to know about ${node.name}?`,
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