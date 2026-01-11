function openBigPicture(srcImg, likes, comments, descriptionOfPhoto, commentsToShow) {

  const bigPicture = document.querySelector('.big-picture');

  const img = bigPicture.querySelector('.big-picture__img img');
  img.src = srcImg;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const commentsCount = bigPicture.querySelector('.social__comment-total-count');
  commentsCount.textContent = comments.length;

  const showingComments = bigPicture.querySelector('.social__comment-shown-count');
  showingComments.textContent = commentsToShow;

  const commentsList = bigPicture.querySelector('.social__comments');
  const commentsFragment = document.createDocumentFragment();
  comments.forEach ((comment) =>{
    commentsFragment.appendChild(exportComments(comment));
  });
  commentsList.innerHTML = '';
  commentsList.appendChild(commentsFragment);

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = descriptionOfPhoto;

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  const body = document.querySelector('body');
  body.classList.add('modal-open');
}

function exportComments(comment) {

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

export { openBigPicture };
