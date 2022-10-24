// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
Оновано на https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive */
const getRandomInt = (rangeStart = 0, rangeEnd = 100) => {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || !isFinite(rangeStart || rangeEnd)) {
    return NaN;
  }

  const min = Math.ceil(Math.min(rangeStart, rangeEnd));
  const max = Math.floor(Math.max(rangeStart, rangeEnd));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
  Округление основано на https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
const getRandomFloat = (rangeStart = 0, rangeEnd = 100, digits = 4) => {
  if (rangeStart < 0 || rangeEnd < 0 || rangeStart === rangeEnd || digits < 0 || !Number.isInteger(digits) || !isFinite(rangeStart || rangeEnd || digits)) {
    return NaN;
  }

  const min = Math.min(rangeStart, rangeEnd);
  const max = Math.max(rangeStart, rangeEnd);
  const multiplier = 10 ** digits;

  const random = Math.random() * (max - min) + min;
  return Math.round((random + Number.EPSILON) * multiplier) / multiplier;
};

// генератор уникальных рандомных индексов массивов из диапазона от minValue до maxValue
const generateRandomIndex = () => {
  const randomArray = [];
  return (minValue, maxValue) => {
    let randomIndex = getRandomInt(minValue, maxValue);
    if (randomArray.length >= maxValue - minValue + 1) {
      return NaN;
    }
    while (randomArray.includes(randomIndex)) {
      randomIndex = getRandomInt(minValue, maxValue);
    }
    randomArray.push(randomIndex);
    return randomIndex;
  };
};

// функция генерации рандомного массива из исходного массива без повторений
const getRandomArrayFromArray = (originArray) => {
  const randomLength = getRandomInt(1, originArray.length);
  if (randomLength === originArray.length) {
    return originArray;
  }
  const arrayIndex = generateRandomIndex(); // генератор индексов рандомного массива
  const outputArray = Array(randomLength).fill().map((item) => {
    item = originArray[arrayIndex(0, originArray.length - 1)];
    return item;
  });
  return outputArray;
};

export {
  getRandomInt,
  getRandomFloat,
  generateRandomIndex,
  getRandomArrayFromArray
};
