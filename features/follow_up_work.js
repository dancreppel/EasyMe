const FollowUp = require("../Custom/follow_up");

module.exports = (controller) => {
  const convoId = "followUpWork";
  const branches = ["Lobby", "Work", "Farewell"];
  FollowUp(controller, branches, convoId);
};
