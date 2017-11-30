"use strict";
var Alexa = require("alexa-sdk");
var textToPolly = require("./polly");
// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build

exports.handler = function(event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const skillName = "warlord tim";

var employees = ["Mike", "Srinivas", "Josh", "Greg", "Brian", "Ryan", "Bob", "Rodney"];

var goofServices = ["Netflix", "Hulu", "Amazon Video", "HBO Now"];

var painfulTerminations = [
  "Shall I terminate them?",
  "Shall I dispatch my army of rabid dogs?",
  "Do you want me to bring you their head?",
  "The hounds are already en route"
];

var horribleBonuses = [
  "You want a bonus? Ha - only after the rivers flow with the blood of our competitors. Get back to work, now.",
  "Here is your bonus - I let you live",
  "You had a bonus until we found you streaming Netflix"
];

var getRandomValue = function(arr) {
  const valArr = arr;
  const valIdx = Math.floor(Math.random() * valArr.length);
  return valArr[valIdx];
};

const alexaResponse = function(context, text) {
  textToPolly(text, function(err, data) {
    if (err) {
      context.response
        .speak("Crap - Warlord Tim is taking a really long dump. Try again later.")
        .cardRenderer(skillName, "Warlord Tim is taking a dump");
    } else {
      const url = data;
      context.response.speak(`<audio src="${url}" />`).cardRenderer(skillName, text);
    }
    context.emit(":responseReady");
  });
};

var handlers = {
  LaunchRequest: function() {
    this.emit("SayGoofingOff");
  },
  GoofingOff: function() {
    this.emit("SayGoofingOff");
  },
  TerminateEmployee: function() {
    this.emit("SayTerminateEmployee");
  },
  BonusCheck: function() {
    this.emit("SayBonusCheck");
  },
  KeyResults: function() {
    this.emit("SayKeyResults");
  },
  SayKeyResults: function() {
    alexaResponse(this, "Check back later...");
  },
  SayBonusCheck: function() {
    const randResponse = getRandomValue(horribleBonuses);
    alexaResponse(this, randResponse);
  },
  SayGoofingOff: function() {
    const randName = getRandomValue(employees);
    const randSvc = getRandomValue(goofServices);
    const randTermination = getRandomValue(painfulTerminations);
    const response = `From the darkest pits of despair, it appears that ${randName} is watching ${randSvc}. ${
      randTermination
    }`;
    alexaResponse(this, response);
  },
  SayTerminateEmployee: function() {
    var name = this.event.request.intent.slots.name.value;
    const response = `Ah, yes, ${
      name
    } had it coming. I have dispatched a small army of 1000 warriors, you will not be disappointed.`;
    alexaResponse(this, response);
  },
  SessionEndedRequest: function() {
    console.log("Session ended with reason: " + this.event.request.reason);
  },
  "AMAZON.StopIntent": function() {
    alexaResponse(this, "It was my pleasure to serve you my emperor");
  },
  "AMAZON.HelpIntent": function() {
    this.response.speak(
      "You can try: 'alexa, ask warlord tim to terminate Bob' or 'alexa, ask warlord tim who is wasting time"
    );
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    alexaResponse(this, "Indecisiveness is not a good quality for a leader");
  },
  Unhandled: function() {
    alexaResponse(
      this,
      "I don't like what you said, be careful how you proceed. You can try: 'alexa, ask warlord tim who is wasting time'"
    );
  }
};
