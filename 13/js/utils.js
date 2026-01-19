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
