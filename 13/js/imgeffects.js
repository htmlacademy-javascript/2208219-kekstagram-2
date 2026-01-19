const effectsContainer = document.querySelector('.img-upload__effects');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const EFFECTS = {
  none: {
    filter: '',
    unit: '',
    range: {},
    step: 0,
    start: 100,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3,
  },
};

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  applyEffect(sliderValue);
});

function applyEffect(value) {
  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  const effect = EFFECTS[currentEffect];
  imagePreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
}

effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = evt.target.value;
    const effect = EFFECTS[currentEffect];

    if (currentEffect === 'none') {
      effectLevelContainer.classList.add('hidden');
      imagePreview.style.filter = '';
    } else {
      effectLevelContainer.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: effect.range,
        step: effect.step,
        start: effect.start,
      });
      applyEffect(effect.start);
    }
  }
});


