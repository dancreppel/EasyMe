const FollowUp = require("../Custom/follow_up");

module.exports = (controller) => {
  const convoId = "followUpSocial";
  const branches = ["Lobby", "Basics", "Social", "Farewell"];
  FollowUp(controller, branches, convoId);
};