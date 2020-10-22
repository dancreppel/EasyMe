const { BotkitConversation } = require('botkit');
const { basics } = require("../resume.json");

module.exports = (controller) => {
  const CONVO_ID = 'basics';
  const convo = new BotkitConversation(CONVO_ID, controller);
  
  const quick_replies = [];
  for (let prop in basics) {
    let capitalized_prop = prop[0].toUpperCase() + prop.slice(1);

    let option = {
      title: capitalized_prop,
      payload: capitalized_prop
    }

    quick_replies.push(option);

    if (prop === 'website') {
      controller.hears(prop, 'message', async(bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, basics[prop].link(basics[prop]));
        await bot.beginDialog('typing');
        await bot.beginDialog('followUpBasics');
      });
    } else if (prop !== 'social') {
      controller.hears(prop, 'message', async(bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, basics[prop]);
        await bot.beginDialog('typing');
        await bot.beginDialog('followUpBasics');
      });
    } else {
      controller.hears(prop, 'message', async(bot, message) => {
        await bot.beginDialog('typing');
        await bot.beginDialog('social');
      })
    }
  }

  let options = {
    text: 'What would you like to know?',
    quick_replies
  }

  convo.addMessage(options);
  controller.addDialog(convo);
};