import { showDataError } from './utils.js';
import { openBigPicture } from './photo-modal.js';
import { loadPhotosData } from './data.js';
import { initFiltersHomepage } from './homepage-filters.js';
const pictures = document.querySelector('.pictures');

export function initPictures(data) {
  const picture = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const fragment = document.createDocumentFragment();

  data.forEach(({ url, likes, description, comments }) => {
    const pictureElement = picture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', () => {
      openBigPicture(url, likes, comments, description);
    });

    fragment.appendChild(pictureElement);
  });

  pictures.appendChild(fragment);
}

export function clearPictures() {
  const renderedPictures = pictures.querySelectorAll('.picture');

  renderedPictures.forEach((picture) => picture.remove());
}


async function init() {
  try {
    const data = await loadPhotosData();
    initPictures(data);
    initFiltersHomepage(data);
  } catch {
    showDataError();
  }
}
init();
