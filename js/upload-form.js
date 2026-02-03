import { initScale } from './image-scale.js';
import { initImageEffects } from './image-effects.js';
import { resetScale } from './image-scale.js';
import { onEsc } from './utils.js';
import { sendFormData } from './server-utils.js';
import { resetEffects } from './image-effects.js';
import { DESCRIPTION_MAX_LENGTH } from './constants.js';
import { HASH_TAG_MAX_LENGTH } from './constants.js';
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
const body = document.body;
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageTemplates = {
  success: successTemplate,
  error: errorTemplate,
};

export async function initUploadForm() {
  const validateHashtags = (value) => {
    if (!value.trim()) {
      return '';
    }

    const hashtags = value.trim().split(/\s+/);

    if (hashtags.length > HASH_TAG_MAX_LENGTH) {
      return 'превышено количество хэштегов';
    }

    const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
    const uniqueTags = new Set(lowerCaseTags);

    if (uniqueTags.size !== hashtags.length) {
      return 'Хэштеги повторяются';
    }

    if (!hashtags.every((tag) => HASHTAG_REGEXP.test(tag))) {
      return 'Введён невалидный хэштег';
    }

    return '';
  };

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
    if (onEsc(evt) && !isTextFieldFocused()) {
      evt.preventDefault();
      closeForm();
    }
  }
  function enableFormEsc() {
    document.addEventListener('keydown', onEscKeydown);
  }
  function disableFormEsc() {
    document.removeEventListener('keydown', onEscKeydown);
  }

  function openForm() {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    enableFormEsc();
  }

  function closeForm() {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadForm.reset();
    uploadInput.value = '';
    pristine.reset();
    disableFormEsc();
    hashtagsInput.value = '';
    resetEffects();
    resetScale();
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });
  }

  function toggleSubmitButton(isDisabled) {
    submitButton.disabled = isDisabled;
    submitButton.textContent = isDisabled ? 'Отправляется...' : 'Отправить';
  }

  pristine.addValidator(
    hashtagsInput,
    (value) => validateHashtags(value) === '',
    validateHashtags
  );

  const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

  pristine.addValidator(
    descriptionInput,
    validateDescription,
    `Длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`
  );

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    previewImage.src = imageUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });

    openForm();
  });

  cancelButton.addEventListener('click', closeForm);

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    toggleSubmitButton(true);

    const formData = new FormData(uploadForm);

    function showMessage(type) {
      if (type === 'error') {
        disableFormEsc();
      }

      const message = messageTemplates[type].cloneNode(true);
      document.body.appendChild(message);

      const buttonClass = type === 'success'
        ? '.success__button'
        : '.error__button';

      function onEscPress(evt) {
        if (onEsc(evt)) {
          closeMessage();
        }
      }

      function closeMessage() {
        message.remove();
        document.removeEventListener('keydown', onEscPress);

        if (type === 'error') {
          enableFormEsc();
        }
      }

      message.querySelector(buttonClass)
        .addEventListener('click', closeMessage);

      message.addEventListener('click', (evt) => {
        if (evt.target === message) {
          closeMessage();
        }
      });

      document.addEventListener('keydown', onEscPress);
    }


    try {

      const responseFormData = await sendFormData(formData);
      if (!responseFormData.ok) {
        throw new Error('Ошибка отправки');
      } else {
        resetScale();
        showMessage('success');
        closeForm();
      }
    } catch {
      showMessage('error');
    } finally {
      toggleSubmitButton(false);
    }
  });

  initImageEffects();
  initScale();

}
