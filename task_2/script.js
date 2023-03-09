"use strict";

const button = document.querySelector('.button');

button.addEventListener('click', function () {
  alert(`width :${window.innerWidth}, height: ${window.innerHeight}`);
  alert(`Размеры экрана: width: ${window.screen.width}, height: ${window.screen.height}`);
  alert(`Без учета прокрутки: width: ${document.documentElement.clientWidth}, height: ${document.documentElement.clientHeight}`)
});


