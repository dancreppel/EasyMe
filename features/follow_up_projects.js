const FollowUp = require("../Custom/follow_up");

module.exports = (controller) => {
  const convoId = "followUpProjects";
  const branches = ["Lobby", "Projects", "Farewell"];
  FollowUp(controller, branches, convoId);
};