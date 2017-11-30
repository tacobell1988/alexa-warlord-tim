"use strict";
var Alexa = require("alexa-sdk");

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

var getRandomValue = function(arr) {
  const valArr = arr;
  const valIdx = Math.floor(Math.random() * valArr.length);
  return valArr[valIdx];
};

var handlers = {
  LaunchRequest: function() {
    this.emit("SayHello");
  },
  GoofingOff: function() {
    this.emit("SayGoofingOff");
  },
  TerminateEmployee: function() {
    this.emit("SayTerminateEmployee");
  },
  SayGoofingOff: function() {
    const randName = getRandomValue(employees);
    const randSvc = getRandomValue(goofServices);
    const randTermination = getRandomValue(painfulTerminations);
    const response = `Ugh, it appears that ${randName} is watching ${randSvc}. ${randTermination}`;
    this.response.speak(response).cardRenderer(skillName, response);
    this.emit(":responseReady");
  },
  SayTerminateEmployee: function() {
    var name = this.event.request.intent.slots.name.value;
    const response = `Ah, yes, ${
      name
    } had it coming. I have dispatched a small army of 1000 warriors, you will not be disappointed.`;
    this.response.speak(response).cardRenderer(skillName, response);
    this.emit(":responseReady");
  },
  SessionEndedRequest: function() {
    console.log("Session ended with reason: " + this.event.request.reason);
  },
  "AMAZON.StopIntent": function() {
    this.response.speak("It was my pleasure to serve you my emperor");
    this.emit(":responseReady");
  },
  "AMAZON.HelpIntent": function() {
    this.response.speak(
      "You can try: 'alexa, ask warlord tim to terminate Bob' or 'alexa, ask warlord tim who is wasting time"
    );
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    this.response.speak("Indecisiveness is not a good quality for a leader");
    this.emit(":responseReady");
  },
  Unhandled: function() {
    this.response.speak(
      "I don't like what you said, be careful how you proceed. You can try: 'alexa, ask warlord tim who is wasting time'"
    );
  }
};
