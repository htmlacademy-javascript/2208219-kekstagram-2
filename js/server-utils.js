export function getPhotos() {
  return fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json());
}


export function sendFormData(formData) {
  return fetch(
    'https://31.javascipt.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData
    }
  );
}
