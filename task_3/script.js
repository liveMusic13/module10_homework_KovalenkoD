"use strict";

const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const button = document.querySelector('.button');
const buttonGeo = document.querySelector('.button-geo');
const input = document.querySelector('input');
const chat = document.querySelector('.chat-window');

let websocket;

document.addEventListener('DOMContentLoaded', function () {
  websocket = new WebSocket(wsUrl);
  websocket.onopen = function (evt) {
    writeToSkreen('connected');
  };
  websocket.onclose = function (evt) {
    writeToSkreen('disconnected');
  };
  websocket.onmessage = function (evt) {
    writeToSkreen('<span style="color: blue;"> response:' + evt.data + '</span>');
  };
  websocket.onerror = function (evt) {
    writeToSkreen('<span style="color: red;"> error:' + evt.data + '</span>');
  }

  button.addEventListener('click', function () {
    let message = input.value;
    writeToSkreen('you:' + message);
    websocket.send(message);
  });

  function writeToSkreen(message) {
    let pre = document.createElement('p');
    pre.style.wordWrap = 'break-word';
    pre.style.color = 'black';
    pre.innerHTML = message;
    chat.appendChild(pre);
  }

  buttonGeo.addEventListener('click', () => {
    let link = document.createElement('a');
    link.href = '';
    link.textContent = '';

    if (!navigator.geolocation) {
      link.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
      navigator.geolocation.getCurrentPosition(result, error);
    }

    function writeGeo() {
      link.style.wordWrap = 'break-word';
      link.style.color = 'purple';
      chat.appendChild(link);
    }
    function error() {
      link.textContent = 'Невозможно получить ваше местоположение';
    }

    function result(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      link.textContent = `Геолокация`;
      link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      writeGeo();
    }
  })
});