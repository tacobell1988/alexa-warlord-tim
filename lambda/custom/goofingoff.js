const rand = require("./rand");
const randEmployee = require("./employees");

const goofServices = ["Netflix", "Hulu", "Amazon Video", "HBO Now"];

var painfulTerminations = [
  "Consider them terminated, painfully.",
  "Shall I dispatch my army of rabid dogs?",
  "Do you want me to bring you their head?",
  "The hounds are already on their way."
];

const buildGoofingOffResponse = function() {
  const randName = randEmployee();
  const randSvc = rand(goofServices);
  const randTermination = rand(painfulTerminations);
  const response = `From the darkest pits of despair, it appears that ${randName} is watching ${randSvc}. ${
    randTermination
  }`;
  return response;
};

module.exports = buildGoofingOffResponse;
