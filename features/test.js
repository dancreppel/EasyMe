const { BotkitConversation } = require('botkit');

module.exports = (controller) => {
  
  controller.trigger('welcome');
  controller.on('welcome', async(bot, message) => {
      await bot.say('Welcome to my mind!');
  });
}