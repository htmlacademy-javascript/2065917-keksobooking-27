/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
Оновано на https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive */
function getRandomInt (rangeStart = 0, rangeEnd = 100) {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || !isFinite(rangeStart || rangeEnd)) {
    return NaN;
  }

  const min = Math.ceil(Math.min(rangeStart, rangeEnd));
  const max = Math.floor(Math.max(rangeStart, rangeEnd));

  const random = Math.random() * (max - min + 1) + min;
  return Math.floor(random);
}

getRandomInt();

/* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
  Округление основано на https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
function getRandomFloat (rangeStart = 0, rangeEnd = 100, digits = 4) {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || digits < 0 || !Number.isInteger(digits) || !isFinite(rangeStart || rangeEnd || digits)) {
    return NaN;
  }

  const min = Math.min(rangeStart, rangeEnd);
  const max = Math.max(rangeStart, rangeEnd);
  const multiplier = 10 ** digits;

  const random = Math.random() * (max - min) + min;
  return Math.round((random + Number.EPSILON) * multiplier) / multiplier;
}

getRandomFloat();
