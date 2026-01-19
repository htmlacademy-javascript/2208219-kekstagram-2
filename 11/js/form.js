const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const body = document.body;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

function isTextFieldFocused() {
  return (
    document.activeElement === hashtagsInput ||
    document.activeElement === descriptionInput
  );
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

function openForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
  pristine.reset();
  document.removeEventListener('keydown', onEscKeydown);
}

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);

  return uniqueTags.size === lowerCaseTags.length &&
         hashtags.every((tag) => HASHTAG_REGEXP.test(tag));
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, быть уникальными и не длиннее 20 символов и не более 5 штук'
);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

uploadInput.addEventListener('change', openForm);

cancelButton.addEventListener('click', closeForm);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    uploadForm.submit();
  }
});
