const { BotkitConversation } = require("botkit");
const { basics: { social } } = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = "social";
  // const convo = new BotkitConversation(CONVO_ID, controller);

  // const quick_replies = [];
  // social.forEach(el => {
  //   let option = {
  //     title: el.network,
  //     payload: el.network,
  //   };

  //   quick_replies.push(option);

  //   controller.hears(el.network, 'message', async(bot, message) => {
  //     await bot.beginDialog('typing');
  //     let network = el.network;
  //     await bot.reply(message,`Check me out on ${network.link(el.url)}. 
  //     My username is ${el.username}.
  //     `);
  //     await bot.beginDialog('typing');
  //     await bot.beginDialog('followUpSocial');
  //   });
  // }); 

  // let options = {
  //   text: "What would you like to know about my social presence?",
  //   quick_replies,
  // };

  // convo.addMessage(options);
  // controller.addDialog(convo);
};
