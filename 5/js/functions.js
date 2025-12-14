// Строки для проверки функций
const stri1 = '2022';
const stri2 = 'Лёша на полке клопа нашёл ';
const stri3 = '1 кефир, 0.5 батона';
// Проверка длины строки
function checkStrinLength(str, lgth) {
  return str.length <= lgth;
}
checkStrinLength(stri1, 20);
// проверка что строка палиндром
function checkPalindrom (str){
  const strCheck = str.replaceAll(' ','').toLowerCase();
  const strCheckPal = str.replaceAll(' ','').toLowerCase().split('').reverse().join('');
  return strCheck === strCheckPal;
}
checkPalindrom(stri2);
// Выделение чисел из строк и чисел
function extractNumbers (str) {
  str = String(str);
  const checkArr = str.replaceAll(' ', '').split('');
  let numStr = '';
  for (const elem of checkArr){
    if (!isNaN(Number(elem))){
      numStr += Number(elem);
    }
  }
  return Number(numStr) || NaN;
}

extractNumbers(stri3);
