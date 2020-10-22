// const { BotkitConversation } = require('botkit');

module.exports = (controller) => {
  // let basicQuickReplies = {
  //   text: 'What would you like to know?',
  //   quick_replies: [
  //     {
  //       title: 'Education',
  //       payload: 'education'
  //     },
  //     {
  //       title: 'Profession',
  //       payload: 'profession'
  //     }
  //   ]
  // };

  // controller.hears(async (message) => message.text.toLowerCase() === 'options', 'message', async (bot, message) => {
  //   await bot.reply(message, greetingQuickReplies);
  // });

  controller.on("hello", async (bot, message) => {
    await bot.beginDialog("typing");
    await bot.reply(message,`Hello, welcome to Easy Me. This bot will help you 
    learn about me easily.`);
    // await bot.reply(message, basicQuickReplies);
    await bot.beginDialog('lobby');
  });

  controller.on("welcome_back", async (bot, message) => {
    await bot.beginDialog('typing');
    await bot.reply(message, `Welcome back!`);
    // await bot.reply(message, basicQuickReplies);
    await bot.beginDialog('lobby');
  });
}