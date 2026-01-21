import { initScale } from './imgscalechange.js';
import { initImageEffects } from './imgeffects.js';
import { resetScale } from './imgscalechange.js';
import { onEsc } from './utils.js';
import { sendFormData } from './serverutils.js';
import { resetEffects } from './imgeffects.js';


export async function initUploadForm() {
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
  const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

  const validateHashtags = (value) => {
    if (!value.trim()) {
      return '';
    }

    const hashtags = value.trim().split(/\s+/);

    if (hashtags.length > 5) {
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

  const validateDescription = (value) => value.length <= 140;

  pristine.addValidator(
    descriptionInput,
    validateDescription,
    'Длина комментария больше 140 символов'
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

    function showSuccessMessage() {
      const template = document.querySelector('#success')
        .content
        .querySelector('.success');

      const message = template.cloneNode(true);
      document.body.appendChild(message);

      function onSuccessEsc(evt) {
        if (onEsc(evt)) {
          closeSuccess();
        }
      }

      function closeSuccess() {
        message.remove();
        document.removeEventListener('keydown', onSuccessEsc);
      }

      message.querySelector('.success__button')
        .addEventListener('click', closeSuccess);

      message.addEventListener('click', (evt) => {
        if (evt.target === message) {
          closeSuccess();
        }
      });

      document.addEventListener('keydown', onSuccessEsc);
    }


    function showErrorMessage() {
      disableFormEsc();

      const template = document.querySelector('#error')
        .content
        .querySelector('.error');

      const message = template.cloneNode(true);
      document.body.appendChild(message);

      const close = () => {
        message.remove();
      };

      message.querySelector('.error__button')
        .addEventListener('click', close);

      message.addEventListener('click', (evt) => {
        if (evt.target === message) {
          close();
        }
      });

      function onErrorEsc(evt) {
        if (onEsc(evt)) {
          closeError();
        }
      }

      function closeError() {
        message.remove();
        document.removeEventListener('keydown', onErrorEsc);

        enableFormEsc();
      }
      document.addEventListener('keydown', onErrorEsc);
    }

    try {

      const responseFormData = await sendFormData(formData);
      if (!responseFormData.ok) {
        throw new Error('Ошибка отправки');
      } else {
        resetScale();
        showSuccessMessage();
        closeForm();
      }
    } catch {
      showErrorMessage();
    } finally {
      toggleSubmitButton(false);
    }
  });

  initImageEffects();
  initScale();

}
