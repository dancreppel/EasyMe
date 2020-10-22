const { BotkitConversation } = require("botkit");

module.exports = (controller, branches, convoId) => {
    const convo = new BotkitConversation(convoId, controller);

    const quick_replies = branches.map(branch => ({
      title: branch,
      payload: branch,
    }));

    const options = {
      text: "Would you like to know more?",
      quick_replies,
    };

    convo.addMessage(options);
    controller.addDialog(convo);
};
