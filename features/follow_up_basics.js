const FollowUp = require("../Custom/follow_up");

module.exports = (controller) => {
  const convoId = "followUpBasics";
  const branches = ["Lobby", "Basics", "Farewell"];
  FollowUp(controller, branches, convoId);
};
