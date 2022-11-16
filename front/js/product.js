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

const erreurColors = document.createElement("span");
let error1 = document.querySelector(".item__content__settings__color");
error1.appendChild(erreurColors);
erreurColors.style.color = "#000000";

const erreurQuantity = document.createElement("span");
let error2 = document.querySelector(".item__content__settings__quantity");
error2.appendChild(erreurQuantity);
erreurQuantity.style.color = "#000000";

// bouton
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

console.table(ProduitSelectionner);


// Affichage message si erreur utilisateur et validation

var erreur1 ="";
var erreur2 ="";

if (!ChoixForm){
  erreur1 = "Choisissez une couleur !";
}

if (ChoixQuantite < 1)
{
  erreur2 = "Choisissez une quantité !";
}

if(erreur1 || erreur2){
alert ('Nah pas bon')
console.log(erreur1);
console.log(erreur2);
erreurColors.innerHTML = `<br> ${erreur1}`;
erreurQuantity.innerHTML = `<br> ${erreur2}`;

}

else
{
  alert("Good Good")
  erreurColors.innerHTML = `<br> ${erreur1}`;
  erreurQuantity.innerHTML = `<br> ${erreur2}`;
  // Local storage
  let produitLocalStorage = JSON.parse (localStorage.getItem ("produit"));
  
  console.log(produitLocalStorage);
  
  if (produitLocalStorage){
    if(Id===Id && ChoixForm===ChoixForm)
    {
      produitLocalStorage.push(ProduitSelectionner);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      console.log("ok modification du nombre");
    }
    else{
    produitLocalStorage.push(ProduitSelectionner);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    console.log("ok création new produit");
  }

  }

  else{
    produitLocalStorage =[];
    produitLocalStorage.push(ProduitSelectionner);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

  }

}



});


