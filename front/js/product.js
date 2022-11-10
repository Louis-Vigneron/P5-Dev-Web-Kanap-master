const search_id = window.location.search;
const Id = search_id.slice(1);
console.log(Id);

fetch(`http://localhost:3000/api/products/${Id}`)

.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    OneProduct(value);    
    console.log(value);

  })
  .catch(function(err) {
    // Une erreur est survenue
  });

// affichage des éléments du produit

function OneProduct(kanap){

  const structureimg = `
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;

  let photo = document.querySelector(".item__img");
  photo.innerHTML = structureimg ;



  let title = document.getElementById('title');
  title.innerHTML = kanap.name;

  let price = document.getElementById('price');
  price.innerHTML = kanap.price;

  let description = document.getElementById('description');
  description.innerHTML = kanap.description;


  //for (let i = 0; i < Kanap.colors.length; i++)
  //{
  //  let color = document.getElementById('colors');
  //  let optioncolor = `<option value="${Kanap.colors[i]}">${Kanap.colors[i]}</option>`;
  //  color.innerHTML += optioncolor ;
  //}

  kanap.colors.forEach(colors => {
    let color = document.getElementById('colors');
    let optioncolor = `<option value="${colors}">${colors}</option>`;
    color.innerHTML += optioncolor ;
  });

}

// Ajout des données récupéré dans le locale Storage

const ChoixOption = document.getElementById('colors');
const Quantite = document.getElementById('quantity');

const btnPanier = document.getElementById('addToCart');
btnPanier.addEventListener ('click',(event)=>{
event.preventDefault();
  
const ChoixForm = ChoixOption.value;
const ChoixQuantite = Quantite.value;

let ProduitSelectionner = {
  Id_produit: Id,
  option: ChoixForm,
  quantite: ChoixQuantite,
}

console.log(ProduitSelectionner);

});

