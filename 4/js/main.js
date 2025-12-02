/* eslint-disable no-console */
const commentsArrText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const namesArr = [
  'Алексей',
  'Дмитрий',
  'Иван',
  'Максим',
  'Сергей',
  'Павел',
  'Никита',
  'Егор',
  'Кирилл',
  'Михаил',
  'Андрей',
  'Виталий',
  'Руслан',
  'Олег',
  'Константин',
  'Владимир',
  'Тимофей',
  'Георгий',
  'Роман',
  'Степан',
  'Артур',
  'Фёдор',
  'Григорий',
  'Матвей',
  'Ярослав'
];
const descriptionArr = [
  'Закат над городом',
  'Уютное утро с кофе',
  'Тихая прогулка в парке',
  'Солнечный луч на окне',
  'Горы в тумане',
  'Дорога к морю',
  'Уличные огни ночью',
  'Старинный дом у реки',
  'Капли дождя на стекле',
  'Лесная тропинка',
  'Заснеженный двор',
  'Свежие цветы в вазе',
  'Панорама ночного города',
  'Кошка у подоконника',
  'Полет птицы в небе',
  'Пляж ранним утром',
  'Деревянный мост через ручей',
  'Теплый свет лампы',
  'Город после дождя',
  'Зеркальное отражение в воде',
  'Поле с высокой травой',
  'Легкие облака над рекой',
  'Тени на стене',
  'Домик в деревне',
  'Скамейка под деревом'
];
const idArrComments = [0];
function message() {
  // eslint-disable-next-line eqeqeq
  if (Math.ceil(Math.random() * 2) === 2) {
    return `${commentsArrText[Math.floor(Math.random() * commentsArrText.length)] } ${ commentsArrText[Math.floor(Math.random() * commentsArrText.length)]}`;
  } else {
    return commentsArrText[Math.floor(Math.random() * commentsArrText.length)];
  }
}
function createObjects() {
  const photosArr = [];
  for (let i = 1; i <= 25; i++) {
    const id = i;
    const url = `photos/${i}.jpg`;
    const description = descriptionArr[Math.floor(Math.random() * descriptionArr.length)];
    const likes = Math.floor(Math.random() * 185) + 16;
    const comments = createComment();
    const photo = {
      id: id,
      url: url,
      description: description,
      likes: likes,
      comments: comments
    };
    photosArr.push(photo);
  }
  return photosArr;
}
function createComment() {
  const commentsArr = [];
  for (let i = 0; i <= Math.ceil(Math.random() * 30); i++) {
    const id = idArrComments[idArrComments.length - 1] + 1;
    idArrComments.push(id);
    const avatar = `img/avatar-${Math.ceil(Math.random() * 6)}.svg`;
    const name = namesArr[Math.floor(Math.random() * namesArr.length)];
    const comment = {
      id: id,
      avatar: avatar,
      message: message(),
      name: name
    };
    commentsArr.push(comment);
  }

  return commentsArr;
}

const arrPhoto = createObjects();
console.log(arrPhoto);
