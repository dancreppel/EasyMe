const { BotkitConversation } = require("botkit");

const { education } = require("../resume.json");

module.exports = (controller) => {
  // const CONVO_ID = 'education'
  // let convo = new BotkitConversation(CONVO_ID, controller);

  // // meat of convo
  // let quick_replies = [];
  // education.forEach(el => {
  //   let option = {
  //     title: el.institution,
  //     payload: el.institution
  //   };

  //   quick_replies.push(option);

  //   controller.hears(el.institution, 'message', async(bot, message) => {
  //     await bot.beginDialog("typing");
  //     await bot.reply(message, `I attended ${el.institution} studying ${el.area} 
  //     and graduated in ${el.graduation}.
  //     `);
  //     await bot.beginDialog("typing");
  //     await bot.beginDialog('followUpEducation');
  //   })
  // });


  // let options = {
  //   text: "What would you like to know about my education?",
  //   quick_replies
  // };

  // convo.addMessage(options);

  // // add education convo to controller
  // controller.addDialog(convo);

  // controller.hears("education", "message", async (bot, message) => {
  //   await bot.beginDialog("typing");
  //   await bot.beginDialog(CONVO_ID);
  //   // await bot.reply(message, options);
  // });
};