"use strict";
let inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const ListElement = document.querySelectorAll(".js-list-preview-item");
const resultUserShows = document.querySelector(".js-list-preview");

function getInfoApi() {
  let inputValue = inputElement.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      paintShowFromApi();
      console.log(data);
    });
}

btnElement.addEventListener("click", getInfoApi);

//PINTAR LAS LISTAS DE LAS SERIES DESPUÉS DE QUE DEVUELVA LOS DATOS DEL API

function paintShowFromApi() {
  let htmlCode = "holis";
  // for (let i = 0; i < data.length; i++)
  //   htmlCode += `<li  class="js-list-preview-item list data-id=${data.show.id}>`;
  // if (data[i].show.image === null) {
  //   htmlCode += `<img class="js-list-preview-img list-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
  // } else {
  //   htmlCode += `<img class="js-list-preview-img list-img" src="${data[i].show.image.medium}>`;
  // }
  // htmlCode += `<h3 class="js-list-preview-title list-title">${data[i].show.name}</h3>`;
  // htmlCode += `</li>`;

  resultUserShows.innerHTML = htmlCode;
}

// pintar las listas en la seccion de favoritos, las series que haya hecho click

//CAMBIAR FONDO A LAS LISTAS AL HACER CLICK

/* function changeClassFavorites(event) {
  //AÑADIR UNA CLASE A LAS LISTAS PINTADAS CON LAS SERIES PARA QUE EL COLOR DE FONDO CAMBIE
  ListElement.classList.add("list-favorites");
}

ListElement.addEventListener("click", changeClassFavorites);
*/
