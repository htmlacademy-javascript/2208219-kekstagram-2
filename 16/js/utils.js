export function getRandomFloor
(number) {
  return Math.floor(Math.random() * number);
}

export function getRandomCeil(number) {
  return Math.ceil(Math.random() * number);
}

export function onEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    return true;
  }
}

export function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}
export function showDataError() {
  const template = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');

  const errorElement = template.cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

export function randomFilterSort (array, countRandom) {
  const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, countRandom);
}
