const FollowUp = require ('../Custom/follow_up');

module.exports = (controller) => {
  const convoId = "followUpEducation";
  const branches = ['Lobby', 'Education', 'Farewell'];
  FollowUp(controller, branches, convoId);
}