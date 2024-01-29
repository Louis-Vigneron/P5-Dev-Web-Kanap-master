// Récupération des données du serveur

fetch("http://localhost:3000/api/products")

  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    cart(value);
  })
  .catch(function (err) {
    console.log(err);
    // Une erreur est survenue
  });

//Récupération des données stocker sur le Local Storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

function cart(arrayCart) {
  //Afficher les élements du panier contenu dans le Local Storage
  let cartProduct = document.getElementById("cart__items");

  console.log(produitLocalStorage);

  //Affichage d'un panier vide
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p> Panier vide </p>`;
    cartProduct.innerHTML = emptyCart;
    cartProduct.style.fontSize = "40px";
    cartProduct.style.textAlign = "center";
    document.getElementById("totalQuantity").textContent = "0";
    document.getElementById("totalPrice").textContent = "0";
  }

  else {
    //Ajout des éléments manquants au array du Local Storage afin d'afficher tout les éléments correctement
    produitLocalStorage.forEach(elLS => {
      arrayCart.forEach(elAPI => {
        if (elAPI._id === elLS.Id_produit) {
          elLS.name = elAPI.name;
          elLS.price = elAPI.price;
          elLS.imageUrl = elAPI.imageUrl;
          elLS.altTxt = elAPI.altTxt;
        }
      });
    });

    //Création des fiches produits de la page panier
    produitLocalStorage.forEach(CartProductLS => {
      cartProduct.innerHTML += `
      <article class="cart__item" data-id="${CartProductLS.Id_produit}" data-color="${CartProductLS.option}">
        <div class="cart__item__img">
          <img src="${CartProductLS.imageUrl}" alt="${CartProductLS.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${CartProductLS.name}</h2>
            <p>${CartProductLS.option}</p>
            <p>${CartProductLS.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${CartProductLS.quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> 
      `;
    })
  };

  calculation(produitLocalStorage);
  quantityProductCart(produitLocalStorage);
  deleteProduct(produitLocalStorage);
}

// Fonction de modification de la quantité d'un produit du panier

function quantityProductCart() {

  let btn_quantite = document.querySelectorAll('.itemQuantity');

  for (let y = 0; y < btn_quantite.length; y++) {
    btn_quantite[y].addEventListener("change", (e) => {

      let updateQuantity = btn_quantite[y].value;
      let upadteIdProduct = e.target.closest("article").getAttribute("data-id");
      let upadteColorProduct = e.target.closest("article").getAttribute("data-color");
      let index = produitLocalStorage.findIndex(p => p.Id_produit === upadteIdProduct && p.option === upadteColorProduct);
      produitLocalStorage[index].quantite = updateQuantity;
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      calculation(produitLocalStorage);
    })
  };
}

// Fonction de suppression d'un produit du panier

function deleteProduct() {

  let btn_delete = document.querySelectorAll('.deleteItem');
  let cartProduct = document.getElementById("cart__items");

  for (let x = 0; x < btn_delete.length; x++) {
    let id_produit_supprimer = produitLocalStorage[x].Id_produit;
    let color_produit_supprimer = produitLocalStorage[x].option;

    btn_delete[x].addEventListener("click", () => {
      produitLocalStorage = produitLocalStorage.filter(el => (el.Id_produit !== id_produit_supprimer || el.option !== color_produit_supprimer));
      let articleDelete = document.querySelector(`article[data-id="${id_produit_supprimer}"][data-color="${color_produit_supprimer}"]`);
      articleDelete.remove();
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      calculation(produitLocalStorage);

      if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p> Panier vide </p>`;
        cartProduct.innerHTML = emptyCart;
        cartProduct.style.fontSize = "40px";
        cartProduct.style.textAlign = "center";
      }
    })
  };
}

// Fonction fr calcul du total panier (quantité et prix)

function calculation() {
  let totalQuantityCart = document.getElementById("totalQuantity");
  let totalPriceCart = document.getElementById("totalPrice");
  let totalProductCart = 0;
  let totalPrice = 0;

  for (let z = 0; z < produitLocalStorage.length; z++) {
    totalProductCart += parseInt(produitLocalStorage[z].quantite);
    totalPrice += parseInt(produitLocalStorage[z].quantite) * parseInt(produitLocalStorage[z].price);
  }

  totalPriceCart.textContent = totalPrice;
  totalQuantityCart.textContent = totalProductCart;
}

// Traitement des données saisie par l'utilisateur dans le formulaire de commande 
const btn_order = document.getElementById("order");

// Fonction du contrôle du formulaire
function checkInput(nodeDuChamp, regex, message) {
  if (!nodeDuChamp.value || !regex.test(nodeDuChamp.value)) {
    displayError(message);
    return true;
  }
  else {
    hideError(message);
    return false;
  }
}

// Fonction pour afficher le message d'erreur
function displayError(message) {
  message.textContent = "Veuillez remplir correctement ce champ";
}

// Fonction pour cacher le message d'erreur
function hideError(message) {
  message.textContent = "";
}

// Définition des variables pour le formulaire
//Sélection de la valeur de l'input
let user_firstName = document.getElementById("firstName");
let user_lastName = document.getElementById("lastName");
let user_address = document.getElementById("address");
let user_city = document.getElementById("city");
let user_email = document.getElementById("email");

//Sélection des message d'erreur pour l'affichage
const error_firstName = document.getElementById("firstNameErrorMsg");
const error_lastName = document.getElementById("lastNameErrorMsg");
const error_address = document.getElementById("addressErrorMsg");
const error_city = document.getElementById("cityErrorMsg");
const error_email = document.getElementById("emailErrorMsg");

//Définition des conditions de contrôle du formulaire
let regexFirstName = /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/;
let regexLastName = /^[A-Za-z]{3,20}$/;
let regexAddress = /^[A-Za-z0-9\s]{5,50}$/;
let regexCity = /^[A-Za-z\s]{3,20}$/;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Gestion du bouton Commander
btn_order.addEventListener("click", (event) => {
  event.preventDefault();

  //Test des données du formulaires
  checkInput(user_firstName, regexFirstName, error_firstName);
  checkInput(user_lastName, regexLastName, error_lastName);
  checkInput(user_address, regexAddress, error_address);
  checkInput(user_city, regexCity, error_city);
  checkInput(user_email, regexEmail, error_email);

  //Vérification qu'il n'y est pas d'erreur 
  if (!checkInput(user_firstName, regexFirstName, error_firstName)
    && !checkInput(user_lastName, regexLastName, error_lastName)
    && !checkInput(user_address, regexAddress, error_address)
    && !checkInput(user_city, regexCity, error_city)
    && !checkInput(user_email, regexEmail, error_email)) {

    //Contrôle d'un panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0) {
      alert("Votre panier est vide ! Veuillez sélectionner au moins un produit");
    }
    else {
      sendToServer();
    }
  }
});

// Fonction de création de la requête serveur et de récupération de la réponse
function sendToServer() {

  let cartID = [];

  for (let z = 0; z < produitLocalStorage.length; z++) {
    let id = produitLocalStorage[z].Id_produit;
    cartID.push(id);
  };

  //Création de l'objet à envoyer à 'API
  const order = {
    contact: {
      firstName: user_firstName,
      lastName: user_lastName,
      address: user_address,
      city: user_city,
      email: user_email
    },
    products: cartID,
  };

  //Envoie de la requête au serveur et gestion de la réponse reçu
  const promise = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(order),
  });
  console.log(promise);

  promise.then(async (response) => {
    try {
      const contenu = await response.json();
      console.log(contenu.orderId);  
       // Vide du LS
      localStorage.removeItem("produit", JSON.stringify(produitLocalStorage));
      window.location = `confirmation.html?${contenu.orderId}`;
    }
    catch (e) {
      console.log(e);
    }
  })

 
}