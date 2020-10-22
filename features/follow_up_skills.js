const FollowUp = require("../Custom/follow_up");

module.exports = (controller) => {
  const convoId = "followUpSkills";
  const branches = ["Lobby", "Skills", "Farewell"];
  FollowUp(controller, branches, convoId);
};
