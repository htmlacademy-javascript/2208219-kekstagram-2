import * as mathfunc from './mathfuncs.js';

const idComments = [];
function createMessage() {
  const textComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!'
  ];
  if (mathfunc.getRandomCeil(2) === 2) {
    return `${textComments[mathfunc.getRandomFloor(textComments.length)]} ${textComments[[mathfunc.getRandomFloor(textComments.length)]]}`;
  } else {
    return textComments[[mathfunc.getRandomFloor(textComments.length)]];
  }
}
function createPhotos(count, minlikes, maxlike, commentcount, avatarcount) {
  const descriptions = [
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
  const photos = [];
  for (let i = 1; i <= count; i++) {
    const id = i;
    const url = `photos/${i}.jpg`;
    const description = descriptions[mathfunc.getRandomFloor(descriptions.length)];
    const likes = mathfunc.getRandomFloor(maxlike - minlikes) + minlikes;
    const comments = createComment(commentcount, avatarcount);
    const photo = {
      id,
      url,
      description,
      likes,
      comments
    };
    photos.push(photo);
  }
  return photos;
}
function createComment(commentcount, avatarcount) {
  const names = [
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
  const comments = [];
  for (let i = 1; i <= mathfunc.getRandomCeil(commentcount); i++) {
    const id = idComments.length - 1;
    idComments.push(id);
    const avatar = `img/avatar-${mathfunc.getRandomCeil(avatarcount)}.svg`;
    const name = names[mathfunc.getRandomFloor(names.length)];
    const comment = {
      id,
      avatar,
      message: createMessage(),
      name
    };
    comments.push(comment);
  }

  return comments;
}

export { createPhotos };
