const { BotkitConversation } = require("botkit");
const { work } = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = "work";
  // let convo = new BotkitConversation(CONVO_ID, controller);

  // let quick_replies = [];
  // work.forEach((el) => {
  //   let option = {
  //     title: el.company,
  //     payload: el.company,
  //   };

  //   quick_replies.push(option);

  //   controller.hears(el.company, "message", async (bot, message) => {
  //     await bot.beginDialog("typing");
  //     await bot.reply(
  //       message,
  //       `I worked at ${el.company.link(el.website)} as ${el.position} from  
  //       ${el.startDate} to ${el.endDate}.
  //       `);
        
  //     await bot.beginDialog("typing");
  //     await bot.beginDialog('followUpWork');
  //   });
  // });

  // let options = {
  //   text: "What would you like to know about my work history?",
  //   quick_replies,
  // };

  // convo.addMessage(options);

  // // add education convo to controller
  // controller.addDialog(convo);
};
