const getRandomValue = function(arr) {
  const valArr = arr;
  const valIdx = Math.floor(Math.random() * valArr.length);
  return valArr[valIdx];
};

module.exports = getRandomValue;
