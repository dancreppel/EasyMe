const { BotkitConversation } = require("botkit");
const { projects } = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = "projects";
  // let convo = new BotkitConversation(CONVO_ID, controller);

  // let quick_replies = [];
  // projects.forEach((el) => {
  //   let option = {
  //     title: el.name,
  //     payload: el.name,
  //   };

  //   quick_replies.push(option);

  //   controller.hears(el.name, "message", async (bot, message) => {
  //     await bot.beginDialog("typing");
      
  //     await bot.reply(message, `${el.description} If you are interested, check out the 
  //     ${"live link".link(el.link)} or ${"github repo".link(el.repo)}.`);

  //     await bot.beginDialog("typing");
  //     await bot.beginDialog("followUpProjects");
  //   });
  // });

  // let options = {
  //   text: "Here is the list of projects I have built.",
  //   quick_replies,
  // };

  // convo.addMessage(options);
  // controller.addDialog(convo);
};
