const imgPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
let currentScale = parseInt(scaleControlValue.value, 10);

function updateScale() {
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
}
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});
export function resetScale() {
  currentScale = MAX_SCALE;
  updateScale();
}
export function initScale() {
  updateScale();
}
