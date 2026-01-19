import * as consts from './constants.js';
import { onEsc } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentsToShow = consts.COMMENTSTEP;
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const showingComments = bigPicture.querySelector('.social__comment-shown-count');
const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('#picture-cancel');

let commentsToShowCount = commentsToShow;
let currentComments = [];

function onBigPictureEsc(evt) {
  if (onEsc(evt)) {
    closeBigPicture();
  }
}

function openBigPicture(srcImg, likes, comments, descriptionOfPhoto) {
  commentsToShowCount = commentsToShow;
  const img = bigPicture.querySelector('.big-picture__img img');
  img.src = srcImg;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = descriptionOfPhoto;

  bigPicture.classList.remove('hidden');

  body.classList.add('modal-open');
  currentComments = comments;

  renderComments(comments, commentsToShowCount);
  document.addEventListener('keydown', onBigPictureEsc);
}

function createCommentElement(comment) {

  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.src = comment.avatar;
  img.classList.add('social__picture');
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  li.appendChild(img);

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(p);

  return li;
}

function renderComments(comments, countToShow) {

  commentsCount.textContent = comments.length;

  showingComments.textContent = countToShow;


  const commentsFragment = document.createDocumentFragment();

  comments.slice(0, countToShow).forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });
  if (comments.length <= countToShow) {
    showingComments.textContent = comments.length;
    commentLoader.classList.add('hidden');
  } else {
    showingComments.textContent = countToShow;
    commentLoader.classList.remove('hidden');
  }
  commentsList.innerHTML = '';
  commentsList.appendChild(commentsFragment);
}

commentLoader.addEventListener('click', () => {
  commentsToShowCount += commentsToShow;
  renderComments(currentComments, commentsToShowCount);
});

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEsc);
}

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
export { closeBigPicture };
