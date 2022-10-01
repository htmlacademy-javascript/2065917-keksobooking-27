/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
Оновано на https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive */
function getRandomInt (rangeStart = 0, rangeEnd = 100) {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || typeof rangeStart !== 'number' || typeof rangeEnd !== 'number') {
    return NaN;
  }

  if (rangeStart > rangeEnd) {
    const swap = rangeStart;
    rangeStart = rangeEnd;
    rangeEnd = swap;
  }

  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  const random = Math.random() * (rangeEnd - rangeStart + 1) + rangeStart;
  return Math.floor(random);
}

getRandomInt();

/* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
  Округление основано на https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
function getRandomFloat (rangeStart = 0, rangeEnd = 100, rounding = 4) {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || rounding < 0 || !Number.isInteger(rounding) || typeof rangeStart !== 'number' || typeof rangeEnd !== 'number' || typeof rounding !== 'number') {
    return NaN;
  }

  if (rangeStart > rangeEnd) {
    const swap = rangeStart;
    rangeStart = rangeEnd;
    rangeEnd = swap;
  }

  rounding = Math.pow(10, rounding);
  const random = Math.random() * (rangeEnd - rangeStart) + rangeStart;
  return Math.round((random + Number.EPSILON) * rounding) / rounding;
}

getRandomFloat();
