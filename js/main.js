// Module 2 =======================================================================================

// ГЕНЕРАТОРЫ СЛУЧАЙНЫХ ЧИСЕЛ

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

getRandomInt();

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

getRandomFloat();

// Module 4 =======================================================================================

// ИСХОДНЫЕ ДАННЫЕ

// количество генерируемых объектов объявлений
const ADVT_QUANTITY = 10;
// рандомный текст для генерации строк в объявлениях
const RANDOM_TEXT = 'разнообразный и богатый опыт говорит нам что высокотехнологичная концепция общественного уклада предполагает независимые способы реализации глубокомысленных рассуждений безусловно внедрение современных методик способствует подготовке и реализации экономической целесообразности принимаемых решений наше дело не так однозначно как может показаться постоянное информационнопропагандистское обеспечение нашей деятельности требует от нас анализа дальнейших направлений развития ясность нашей позиции очевидна курс на социальноориентированный национальный проект не оставляет шанса для благоприятных перспектив в своём стремлении улучшить пользовательский опыт мы упускаем что базовые сценарии поведения пользователей инициированные исключительно синтетически ассоциативно распределены по отраслям задача организации в особенности же новая модель организационной деятельности создаёт предпосылки для новых предложений современные технологии достигли такого уровня что высококачественный прототип будущего проекта в своём классическом представлении допускает внедрение как самодостаточных так и внешне зависимых концептуальных решений с учётом сложившейся международной обстановки внедрение современных методик способствует подготовке и реализации системы массового участия в своём стремлении повысить качество жизни они забывают что высокое качество позиционных исследований обеспечивает широкому кругу специалистов участие в формировании форм воздействия равным образом высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке форм воздействия ясность нашей позиции очевидна граница обучения кадров предполагает независимые способы реализации новых предложений с учётом сложившейся международной обстановки экономическая повестка сегодняшнего дня предопределяет высокую востребованность новых принципов формирования материальнотехнической и кадровой базы банальные но неопровержимые выводы а также акционеры крупнейших компаний лишь добавляют фракционных разногласий и подвергнуты целой серии независимых исследований сложно сказать почему реплицированные с зарубежных источников современные исследования преданы анафеме а также сделанные на базе интернетаналитики выводы вне зависимости от их уровня должны быть преданы анафеме';
const RANDOM_TEXT_ARRAY = RANDOM_TEXT.split(' '); // для удобства рандомный текст преобразован в массив
// тип жилища
const HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
// время заезда/выезда
const CHECK_TIMING = ['12:00', '13:00', '14:00'];
// дополнительно
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// фотографии
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// функция генерирует рандомный текст рандомной длины из диапазона
const generateText = (min, max) => Array.from({length: getRandomInt(min, max)}, () => RANDOM_TEXT_ARRAY[getRandomInt(0, RANDOM_TEXT_ARRAY.length - 1)]).join(' ');

// функция генерирует рандомный массив без повторений: аргументы - длина массива и длинна массива исходных данных
const generateRandomArray = (targetLength, originLength) => {
  const randomArray = Array.from({length: originLength}, (value, index) => index).sort(() => Math.random() * 100 - 50);
  const start = getRandomInt(0, randomArray.length - targetLength);
  if (randomArray.length === targetLength) {
    return randomArray;
  }
  return randomArray.slice(start, start + targetLength);
};
// функция генерирует рандомный массив рандомной длины из элементов другого массива без повторений
const getRandomArrayFromArray = (originArray) => {
  const randomLength = getRandomInt(1, originArray.length);
  if (randomLength === originArray.length) {
    return originArray;
  }
  return generateRandomArray(randomLength, originArray.length).map((value) => originArray[value]);
};

// ГЕНЕРАЦИЯ СЛУЧАЙНЫХ ОБЪЯВЛЕНИЙ

// функция создает рандомный объект объявления
const getAdvt = (number) => {
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(39.70000, 139.80000, 5);

  return {
    author: {avatar: number < 10 ? `img/avatars/user0${number}.png` : `img/avatars/user${number}.png`},
    offer: {
      title: generateText(1, 5),
      address: `${lat}, ${lng}`,
      price: getRandomFloat(0.1, 5, 1) * 10000,
      type: HOUSING_TYPE[getRandomInt(1, HOUSING_TYPE.length - 1)],
      rooms: getRandomInt(1, 8),
      guests: getRandomInt(1, 15),
      checkin: CHECK_TIMING[getRandomInt(1, CHECK_TIMING.length - 1)],
      checkout: CHECK_TIMING[getRandomInt(1, CHECK_TIMING.length - 1)],
      features: getRandomArrayFromArray(FEATURES),
      description: generateText(5, 42),
      photos: getRandomArrayFromArray(PHOTOS),
    },
    location: {lat: lat, lng: lng}
  };
};

// функция создает массив заданной длины рандомных объектов объявлений
const getFewAdvt = (quantity) => {
  const quantityArray = generateRandomArray(quantity, quantity);
  return Array.from({length: quantity}, (value, index) => getAdvt(quantityArray[index] + 1));
};
getFewAdvt(ADVT_QUANTITY);
