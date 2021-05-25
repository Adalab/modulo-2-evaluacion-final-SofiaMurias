"use strict";
let inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const resultUserShows = document.querySelector(".js-list-preview");
const listShowsFavorites = document.querySelector(".list-favorites");
const removeBtn = document.querySelector(".js-list-preview-btn");
const btnResetAll = document.querySelector(".js-btn-reset");

let arr = [];
let favorites = [];

function getInfoApi() {
  let inputValue = inputElement.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      arr = data;
      paintShowFromApi(arr);
      console.log(data);
    });
}

btnElement.addEventListener("click", getInfoApi);

//PINTAR LAS LISTAS DE LAS SERIES DESPUÉS DE QUE DEVUELVA LOS DATOS DEL API

function paintShowFromApi(data) {
  let htmlCode = "";
  htmlCode += `<h2 class ="title-result" > Estos son los resultados de tu búsqueda: </h2>`;
  for (let i = 0; i < data.length; i++) {
    const isPresent = favorites.find(
      (favoriteId) => favoriteId.show.id === data[i].show.id
    );

    if (isPresent === undefined) {
      htmlCode += `<li  class="js-list-preview-item list" data-id="${data[i].show.id}">`;
    } else {
      htmlCode += `<li  class="js-list-preview-item list list-favorites" data-id="${data[i].show.id}">`;
    }

    htmlCode += `<h3 class="js-list-preview-title list-title">${data[i].show.name}</h3>`;
    if (data[i].show.image === null) {
      htmlCode += `<img class="js-list-preview-img list-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      htmlCode += `<img class="js-list-preview-img list-img" src="${data[i].show.image.medium}">`;
    }

    htmlCode += `</li>`;
  }

  resultUserShows.innerHTML = htmlCode;
  listenClickLi();
}

// las series en las que haya hecho click pintar las  listas en la seccion de favoritos

function paintShowsFavorites(favorites) {
  let htmlCode = "";
  htmlCode += `<h3 class "title-result"> Estas son tus series favoritas: </h3>`;
  for (let i = 0; i < favorites.length; i++) {
    htmlCode += `<li  class="js-list-preview-item list-fav" data-id="${favorites[i].show.id}">`;
    htmlCode += `<h4 class="js-list-preview-title list-title-fav">${favorites[i].show.name}</h4>`;
    if (favorites[i].show.image === null) {
      htmlCode += `<img class="js-list-preview-img list-img-fav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      htmlCode += `<img class="js-list-preview-img list-img-fav" src="${favorites[i].show.image.medium}">`;
    }
    htmlCode += `<button class="js-list-preview-btn list-btn-fav"  type="reset"> X </button>`;

    htmlCode += `</li>`;
  }
  listShowsFavorites.innerHTML = htmlCode;
  listenClickLi();
}

//CAMBIAR FONDO y fuente A LAS LISTAS AL HACER CLICK

function changeClassFavorites(event) {
  //event.currentTarget.classList.toggle("list-favorites");
  console.log(event.currentTarget);

  const idShows = event.currentTarget.dataset.id;

  const isPresent = favorites.find(
    (favoriteId) => favoriteId.show.id === parseInt(idShows)
  );

  if (isPresent === undefined) {
    const seletectElement = arr.find(
      (showId) => showId.show.id === parseInt(idShows)
    );

    favorites.push(seletectElement);
  } else {
    favorites = favorites.filter(
      (favoritesId) => favoritesId.show.id !== parseInt(idShows)
    );
  }

  paintShowFromApi(arr);
  paintShowsFavorites(favorites);
  saveInLocalStorage();
}

function listenClickLi() {
  const listElement = document.querySelectorAll(".js-list-preview-item");
  for (const listLi of listElement) {
    listLi.addEventListener("click", changeClassFavorites);
  }
}

function saveInLocalStorage() {
  localStorage.setItem("showFavorites", JSON.stringify(favorites));
}

function getFavoritesStorage() {
  favorites = JSON.parse(localStorage.getItem("showFavorites"));

  console.log(getFavoritesStorage);

  paintShowsFavorites(favorites);
}
getFavoritesStorage();

//borrar un favorito dando a la X

function handlerRemoveBtn() {
  // localStorage.removeItem("showFavorites");
}
removeBtn.addEventListener(`click`, handlerRemoveBtn);

//boton de reset y limpia todo

function handlerResetAllBtn() {}

btnResetAll.addEventListener(`click`, handlerResetAllBtn);
