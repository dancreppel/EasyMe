const { BotkitConversation } = require("botkit");
const resume = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = "lobby";
  // const convo = new BotkitConversation(CONVO_ID, controller);

  // const quick_replies = [];
  // for (let prop in resume) {
  //   let capitalized_prop = prop[0].toUpperCase() + prop.slice(1);

  //   let option = {
  //     title: capitalized_prop,
  //     payload: capitalized_prop,
  //   };

  //   quick_replies.push(option);

  //   controller.hears(prop, "message", async (bot, message) => {
  //     await bot.beginDialog("typing");
  //     await bot.beginDialog(prop);
  //   });
  // }

  // let options = {
  //   text: "What would you like to know?",
  //   quick_replies,
  // };

  // convo.addMessage(options);
  // controller.addDialog(convo);

  // controller.hears('lobby', 'message', async(bot, message) => {
  //   await bot.beginDialog('typing');
  //   await bot.beginDialog('lobby');
  // });
};
