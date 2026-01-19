import { openBigPicture } from './openclosephoto.js';
import { closeBigPicture } from './openclosephoto.js';
import { newFetch } from './serverutils.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');


function renderPictures(data) {
  const fragment = document.createDocumentFragment();

  data.forEach(({ url, likes, description, comments }) => {
    const pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      openBigPicture(url, likes, comments, description);
    });

    fragment.appendChild(pictureElement);
  });
  pictures.appendChild(fragment);
}

function showDataError() {
  const template = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');

  const errorElement = template.cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

closeBigPicture();
newFetch()
  .then((data) => renderPictures(data))
  .catch(() => {
    showDataError();
  });
