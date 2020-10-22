module.exports = (controller) => {
  controller.hears('farewell', 'message', async(bot, message) => {
    await bot.reply(message, 'Hope you got to know me better.  Have a nice day!');
  });
}