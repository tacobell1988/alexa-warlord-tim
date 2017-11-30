const rand = require("./rand");
const employees = ["Mike", "Srinivas", "Josh", "Greg", "Brian", "Ryan", "Bob", "Rodney"];

const randEmployee = function() {
  return rand(employees);
};

module.exports = randEmployee;
