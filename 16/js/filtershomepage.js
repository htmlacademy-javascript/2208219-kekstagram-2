import { clearPictures, initPictures } from './picturecreator.js';
import { debounce, randomFilterSort } from './utils.js';
import { COUNTPHOTOSFORFILTER } from './constants.js';

export function initFiltersHomepage(data) {
  const filtersContainer = document.querySelector('.img-filters');
  const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

  filtersContainer.classList.remove('img-filters--inactive');

  const applyFilter = debounce((filterId) => {
    clearPictures();

    let filteredData = [];

    switch (filterId) {
      case 'filter-random':
        filteredData = randomFilterSort(data, COUNTPHOTOSFORFILTER);
        break;

      case 'filter-discussed':
        filteredData = data
          .slice()
          .sort((a, b) => b.comments.length - a.comments.length);
        break;

      default:
        filteredData = data;
    }

    initPictures(filteredData);
  }, 500);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) =>
        btn.classList.remove('img-filters__button--active')
      );

      button.classList.add('img-filters__button--active');
      applyFilter(button.id);
    });
  });
}
