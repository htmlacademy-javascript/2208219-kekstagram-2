function newFetch() {
  return fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json());
}
export {newFetch};

export function sendFormData(formData) {
  return fetch(
    'https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData
    }
  );
}
