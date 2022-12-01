//Récupération du numéro de commande contenu dans l'URL

const search_id = window.location.search;
const Id = search_id.slice(1);
console.log(Id);

// Récupération des données du serveur

fetch(`http://localhost:3000/api/products/${Id}`)

  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    OneProduct(value);
    console.log(value);

  })
  .catch(function (err) {
    console.log(err);
    // Une erreur est survenue
  });

// affichage des éléments du produit

function OneProduct(kanap) {

  const structureimg = `
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;

  let photo = document.querySelector(".item__img");
  photo.innerHTML = structureimg;

  let title = document.getElementById('title');
  title.innerHTML = kanap.name;

  let price = document.getElementById('price');
  price.innerHTML = kanap.price;

  let description = document.getElementById('description');
  description.innerHTML = kanap.description;

  kanap.colors.forEach(colors => {
    let color = document.getElementById('colors');
    let optioncolor = `<option value="${colors}">${colors}</option>`;
    color.innerHTML += optioncolor;
  });

}

// Sélection des choix de l'utilisateur

const ChoixOption = document.getElementById('colors');
const Quantite = document.getElementById('quantity');

// Création des éléments pour les messages d'erreurs 
const erreurColors = document.createElement("span");
let error1 = document.querySelector(".item__content__settings__color");
error1.appendChild(erreurColors);
erreurColors.style.color = "#000000";

const erreurQuantity = document.createElement("span");
let error2 = document.querySelector(".item__content__settings__quantity");
error2.appendChild(erreurQuantity);
erreurQuantity.style.color = "#000000";

// Gestion du bouton pour l'ajout au panier
const btnPanier = document.getElementById('addToCart');
btnPanier.addEventListener('click', (event) => {

  event.preventDefault();

  const ChoixForm = ChoixOption.value;
  const ChoixQuantite = Quantite.value;

  let ProduitSelectionner = {
    Id_produit: Id,
    option: ChoixForm,
    quantite: ChoixQuantite,
  }

  console.table(ProduitSelectionner);

  // Affichage de message d'erreur en cas de mauvaise saisie de l'utilisateur
  var erreur1 = "";
  var erreur2 = "";

  if (!ChoixForm) {
    erreur1 = "Choisissez une couleur !";
  }

  if (ChoixQuantite < 1) {
    erreur2 = "Choisissez une quantité !";
  }

  if (erreur1 || erreur2) {
    erreurColors.innerHTML = `<br> ${erreur1}`;
    erreurQuantity.innerHTML = `<br> ${erreur2}`;
    btnPanier.innerText = "Ajouter au panier";
    btnPanier.style.color = "#FFFFFF";
  }

  else {

    erreurColors.innerHTML = `<br> ${erreur1}`;
    erreurQuantity.innerHTML = `<br> ${erreur2}`;
    btnPanier.innerText = "Produit ajouté !";
    btnPanier.style.color = "#00a000";

    // Ajout de l'objet ProduitSelectionner au Local Storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    // Gestion des quantités et des choix fait pas l'utilisateur pour un produit
    if (produitLocalStorage == null) {
      produitLocalStorage = [];
      produitLocalStorage.push(ProduitSelectionner);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    }

    else {
      let index = produitLocalStorage.findIndex(p => p.Id_produit === Id && p.option === ChoixForm);
      if (index >= 0) {
        produitLocalStorage[index].quantite = parseInt(produitLocalStorage[index].quantite) + parseInt(ChoixQuantite);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      }
      else {
        produitLocalStorage.push(ProduitSelectionner);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      }
    }

  }
});


