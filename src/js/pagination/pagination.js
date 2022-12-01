import { createGallery } from '../main.js/main-render';
import { findName } from '../main.js/main-render';
let getEl = selector => document.querySelector(selector);

let currentPage = 1;
let maxPage = 100;
let pageCount = 2;
let query = '';

getEl('.pagination').addEventListener('click', handlePagination);

function handlePagination(e) {
  if (Number(e.target.dataset.index)) {
    currentPage = Number(e.target.textContent);
    render(currentPage);
    createGallery(currentPage);
    return;
  } else if (e.target.dataset.index == 'first') {
    currentPage = 1;
    render(currentPage);
    createGallery(currentPage);
    return;
  } else if (e.target.dataset.index == 'last') {
    currentPage = maxPage;
    render(currentPage);
    createGallery(currentPage);
    return;
  } else if (e.target.dataset.index == 'right') {
    currentPage = Math.min(currentPage + 1, 100);
    render(currentPage);
    createGallery(currentPage);
    return;
  } else if (e.target.dataset.index == 'left') {
    currentPage = Math.max(currentPage - 1, 1);
    render(currentPage);
    createGallery(currentPage);
    return;
  }
}
// getEl('.form').addEventListener('submit', findByName);

// function findByName(e){
  
// }

function firstPage() {
  currentPage = 1;
  render(currentPage);
}

let btns = document.querySelectorAll('.pagination__btn');

function render(pageNumber) {
  let startPage = Math.max(1, pageNumber - pageCount);
  let pagesList = [];
  // console.log(pageNumber);
  if (startPage + pageCount * 2 > maxPage) {
    startPage = maxPage - pageCount * 2;
  }

  for (let i = startPage; i < startPage + 5; ++i) {
    pagesList.push(i);
  }

  getEl('[data-index="1"]').textContent = pagesList[0];
  getEl('[data-index="2"]').textContent = pagesList[1];
  getEl('[data-index="3"]').textContent = pagesList[2];
  getEl('[data-index="4"]').textContent = pagesList[3];
  getEl('[data-index="5"]').textContent = pagesList[4];

  getEl('.arrow-left').hidden = pageNumber <= 1;
  getEl('.arrow-right').hidden = pageNumber >= maxPage;

  getEl('.dots-left').hidden = pageNumber <= pageCount + 2;
  getEl('.first-button').hidden = getEl('.dots-left').hidden;

  getEl('.dots-after').hidden = pageNumber >= maxPage - pageCount - 1;
  getEl('.last-button').hidden = getEl('.dots-after').hidden;

  btns.forEach(el => el.classList.remove('pagination__btn-current'));
  btns.forEach(el => {
    if (el.textContent == pageNumber) {
      el.classList.add('pagination__btn-current');
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

firstPage();
