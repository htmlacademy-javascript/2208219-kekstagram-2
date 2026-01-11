import { createPhotos } from './createphotos.js';
import * as consts from './constants.js';
import {openBigPicture} from './openphoto.js';
import {closeBigPicture} from './closephoto.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const photos = createPhotos(consts.OBJCOUNT, consts.MAXLIKE, consts.MINLIKE, consts.COMMENTCOUNT, consts.AVATARCOUNT);

function renderPictures() {
  photos.forEach(({url, likes, description, comments}) => {
    const pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      openBigPicture(url, likes, comments, description);
    });
  });
}
closeBigPicture();
renderPictures();
pictures.appendChild(fragment);
