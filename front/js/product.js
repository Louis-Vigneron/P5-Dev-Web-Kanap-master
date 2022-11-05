const search_id = window.location.search;
const Id = search_id.slice(1);
console.log(Id);

fetch("http://localhost:3000/api/products/" + Id)

.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);
    OneProduct(value);    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });


function OneProduct(Kanap){

const structureimg = `
    <img src="${Kanap.imageUrl}" alt="${Kanap.altTxt}">
`;
//'<img src= $Kanap.imageUrl alt= $Kanap.altTxt>';

let photo = document.querySelector(".item__img");
photo.innerHTML = structureimg ;



let title = document.getElementById('title');
title.innerHTML = Kanap.name;

let price = document.getElementById('price');
price.innerHTML = Kanap.price;

let description = document.getElementById('description');
description.innerHTML = Kanap.description;


for (let i = 0; i < Kanap.colors.length; i++)
{
let color = document.getElementById('colors');
let optioncolor = `<option value="${Kanap.colors[i]}">${Kanap.colors[i]}</option>`;
color.innerHTML += optioncolor ;
}

}

