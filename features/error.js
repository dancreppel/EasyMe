module.exports = (controller) => {
  controller.hears('error:', 'message', async(bot, message) => {
    await bot.beginDialog('typing');
    await bot.beginDialog('main');
  });
}