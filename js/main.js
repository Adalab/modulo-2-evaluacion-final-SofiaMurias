"use strict";
let inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const resultUserShows = document.querySelector(".js-list-preview");

function getInfoApi() {
  let inputValue = inputElement.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      paintShowFromApi(data);
      console.log(data);
    });
}

btnElement.addEventListener("click", getInfoApi);

//PINTAR LAS LISTAS DE LAS SERIES DESPUÉS DE QUE DEVUELVA LOS DATOS DEL API

function paintShowFromApi(data) {
  let htmlCode = "";
  htmlCode += `<h2 class "title-result" > Estos son los resultados de tu búsqueda: </h2>`;
  for (let i = 0; i < data.length; i++) {
    htmlCode += `<li  class="js-list-preview-item list" data-id="${data[i].show.id}">`;
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

const listShowsFavorites = document.querySelector(".list-favorites");
let listFavorites = [];

function paintShowsFavorites(listFavorites) {
  let htmlCode = "";
  htmlCode += `<h3 class "title-result"> Estas son tus series favoritas: </h3>`;
  for (let i = 0; i < listFavorites.length; i++) {
    htmlCode += `<li  class="js-list-preview-item list" data-id="${listFavorites[i].show.id}">`;
    htmlCode += `<h4 class="js-list-preview-title list-title">${listFavorites[i].show.name}</h4>`;
    if (listFavorites[i].show.image === null) {
      htmlCode += `<img class="js-list-preview-img list-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      htmlCode += `<img class="js-list-preview-img list-img" src="${listFavorites[i].show.image.medium}">`;
    }
    htmlCode += `<button class="js-list-preview-btn list-btn"  type="reset"> X </button>`;

    htmlCode += `</li>`;
  }
  listShowsFavorites.innerHTML = htmlCode;
  listenClickLi();
}

//CAMBIAR FONDO y fuente A LAS LISTAS AL HACER CLICK

function changeClassFavorites(event) {
  event.currentTarget.classList.toggle("list-favorites");
  console.log(event.currentTarget);

  const idShows = event.currentTarget.dataset.id;
  console.log(idShows);

  const isPresent = listFavorites.find((favoriteId) => favoriteId === idShows);

  /*if (isPresent === undefined) {
    //no está la paleta donde la usuaria ha hecho click no está dentro del array
    listFavorites.push(idShows);
  } 
  
  else {
    listFavorites.filter((favoritesId) => favoritesId !== idShows);
  }
 */
  paintShowsFavorites(listFavorites);
}

function listenClickLi() {
  const listElement = document.querySelectorAll(".js-list-preview-item");
  for (const listLi of listElement) {
    listLi.addEventListener("click", changeClassFavorites);
  }
}
