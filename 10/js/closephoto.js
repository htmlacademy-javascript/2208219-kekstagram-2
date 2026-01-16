const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('#picture-cancel');

function closeBigPicture() {
  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
}

export { closeBigPicture };
