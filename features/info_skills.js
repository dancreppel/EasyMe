const { BotkitConversation } = require("botkit");
const { skills } = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = "skills";
  // let convo = new BotkitConversation(CONVO_ID, controller);

  // let quick_replies = [];
  // skills.forEach((el) => {
  //   let option = {
  //     title: el.name,
  //     payload: el.name,
  //   };

  //   quick_replies.push(option);

  //   controller.hears(el.name, "message", async (bot, message) => {
  //     await bot.beginDialog("typing");
  //     await bot.beginDialog("followUpSkills");
  //   });
  // });

  // let options = {
  //   text: "Here is the list of languages and frameworks I am proficient with?",
  //   quick_replies,
  // };

  // convo.addMessage(options);
  // controller.addDialog(convo);
};
