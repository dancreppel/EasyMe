const Node = require('./node');
const followUp = require('./follow_up');
const buildConvo = require('./build_convo');

// note: this function will be called within a feature, so controller will be provided
module.exports = function buildBranches (node, controller) {
  if (Array.isArray(node.value)) {
    const quickReplies = [];

    node.value.forEach((el, nodeIdx) => {
      if (typeof el === "object") {
        let objKeys = Object.keys(el);
        // the first key is the identifier
        let identifier = objKeys[0];
        let quickReply = {
          title: el[identifier],
          payload: node.name + " : " + el[identifier],
        };

        quickReplies.push(quickReply);

        // create a psuedo node in which the identifier is the name of the node
        // and the rest of the keys are the values associated with said node

        // prevent changes to original object
        Object.freeze(el);
        //create a copy of the obj
        let value = Object.assign({}, el);
        // delete the identifier which is the first field
        delete value[identifier];

        let child = new Node(node, el[identifier], value);
        buildBranches(child, controller);
      } else {
        // * In this case el is a string, therefore its name and value are same
        let child = new Node(node, el, el);
        // push the el straight to the quick reply
        // res in this case is also the el
        let payload = buildBranches(child, controller);
        let quickReply = {
          title: el,
          payload
        };

        quickReplies.push(quickReply);
      }
    });

    buildConvo({ node, quickReplies, controller });

    // Create follow up dialog
    followUp(node, controller);


    // no need to return anything because parent doesn't need to know about
    // child's quick replies
    return null;
  } else if (typeof node.value === 'object') { 
    const quickReplies = [];
    // const convoId = node.parent.name + " : " + node.name;
    // const convo = new BotkitConversation(convoId, controller);

    for (const key in node.value) {
      let child = new Node(node, key, node.value[key])
      let res = buildBranches(child, controller);
      let quickReply = { title: key };
      if (res) {
        quickReply.payload = res;
      } else {
        quickReply.payload = node.name + ' : ' + key;
      }
      quickReplies.push(quickReply);
    }

    buildConvo({ node, quickReplies, controller});

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
      controller.hears(
        async (message) => {
          // check for the current location provided by the user
          return message.text === node.parent.name + ' : ' + node.name;
        },
        "message",
        async (bot, message) => {
          await bot.beginDialog("typing");

          let reply;
          if (node.name === "picture" || node.name === "image") {
            // format replies for images
            reply = `<img class="chatBot-img" src=${node.value}>`;
          } else if (
            node.name === "website" ||
            node.name === "url" ||
            node.name === "link"
          ) {
            // format replies for links
            reply = node.value.link(node.value);
          } else {
            // otherwise normal format
            reply = node.value;
          }

          await bot.reply(message, reply);
          await bot.beginDialog("typing");
          // a terminal node has no followup, only its parent has a followup
          // followup's are uniquely identified by using a node's name and its
          // parent's, so look for grandparents name and parents name to begin
          // appropriate followup dialog
          await bot.beginDialog(
            "followUp" + node.parent.parent.name + node.parent.name
          );
        }
      );
  
      let payload = node.parent.name + ' : ' + node.name;
      return payload;
    }
  }
}