import * as mathfunc from './mathfuncs.js';
import * as consts from './constants.js';

const idComments = [];
function message() {
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
  if (mathfunc.randomCeil(2) === 2) {
    return `${textComments[mathfunc.randomFloor(textComments.length)]} ${textComments[[mathfunc.randomFloor(textComments.length)]]}`;
  } else {
    return textComments[[mathfunc.randomFloor(textComments.length)]];
  }
}
function createObjects(count, minlikes, maxlike, commentcount, avatarcount) {
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
  const photosArr = [];
  for (let i = 1; i <= count; i++) {
    const id = i;
    const url = `photos/${i}.jpg`;
    const description = descriptions[mathfunc.randomFloor(descriptions.length)];
    const likes = mathfunc.randomFloor(maxlike - minlikes) + minlikes;
    const comments = createComment(commentcount, avatarcount);
    const photo = {
      id,
      url,
      description,
      likes,
      comments
    };
    photosArr.push(photo);
  }
  return photosArr;
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
  for (let i = 1; i <= mathfunc.randomCeil(commentcount); i++) {
    const id = idComments.length - 1;
    idComments.push(id);
    const avatar = `img/avatar-${mathfunc.randomCeil(avatarcount)}.svg`;
    const name = names[mathfunc.randomFloor(names.length)];
    const comment = {
      id,
      avatar,
      message: message(),
      name
    };
    comments.push(comment);
  }

  return comments;
}


createObjects(consts.OBJCOUNT, consts.MAXLIKE, consts.MINLIKE, consts.COMMENTCOUNT, consts.AVATARCOUNT);
