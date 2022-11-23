// Récupération des données du serveur

fetch("http://localhost:3000/api/products")

.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    cart(value);   
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

//Récupération des données stocker sur le Local Storage
let produitLocalStorage = JSON.parse (localStorage.getItem ("produit"));

function cart(arrayCart){

//Afficher les élements du panier contenu dans le Local Storage
let cartProduct = document.getElementById("cart__items");

//Affichage d'un panier vide
if (produitLocalStorage === null || produitLocalStorage == 0)
{
  const emptyCart = `<p> Panier vide </p>`;
  cartProduct.innerHTML = emptyCart;
  cartProduct.style.fontSize = "40px";
  cartProduct.style.textAlign = "center";
  calculation(produitLocalStorage);
}

else 
{
  //Ajout des éléments manquants au array du Local Storage afin d'afficher tout les éléments correctement
  produitLocalStorage.forEach(elLS => {
    arrayCart.forEach(elAPI => {
    if(elAPI._id === elLS.Id_produit)
    {
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
`;})
};

calculation(produitLocalStorage);

console.table(produitLocalStorage);

//Option de modification de la quantité de produit via le panier

var btn_quantite = document.querySelectorAll('.itemQuantity');

for (let y = 0; y < btn_quantite.length; y++){

btn_quantite[y].addEventListener("change", () =>{
  let updateQuantity = btn_quantite[y].value;
  produitLocalStorage[y].quantite = updateQuantity;
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  console.log("ok quantité modifiée");
  console.log(updateQuantity);
  console.table(produitLocalStorage);
  console.table(produitLocalStorage[y].quantite);
  calculation(produitLocalStorage);

})

};

//Option de suppression d'un produit du panier 
let btn_delete = document.querySelectorAll('.deleteItem');

for (let x = 0; x < btn_delete.length; x++){

let id_produit_supprimer = produitLocalStorage[x].Id_produit;
let color_produit_supprimer = produitLocalStorage[x].option;

btn_delete[x].addEventListener("click", () =>{
produitLocalStorage = produitLocalStorage.filter( el => (el.Id_produit !==id_produit_supprimer || el.option !== color_produit_supprimer));
let articleDelete = document.querySelector(`article[data-id="${id_produit_supprimer}"][data-color="${color_produit_supprimer}"]`);
articleDelete.remove();
localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
calculation(produitLocalStorage);

if (produitLocalStorage === null || produitLocalStorage == 0)
{
  const emptyCart = `<p> Panier vide </p>`;
  cartProduct.innerHTML = emptyCart;
  cartProduct.style.fontSize = "40px";
  cartProduct.style.textAlign = "center";
}
})
};

}

//Calcul du total panier (quantité et prix)
function calculation()
{
  let totalQuantityCart = document.getElementById("totalQuantity");
  let totalPriceCart = document.getElementById("totalPrice");
  let totalProductCart = 0;
  let totalPrice = 0;
  for (let z = 0; z < produitLocalStorage.length; z++){
    totalProductCart += parseInt(produitLocalStorage[z].quantite);
    totalPrice += parseInt(produitLocalStorage[z].quantite) * parseInt(produitLocalStorage[z].price);
  }
  totalPriceCart.textContent = totalPrice;
  totalQuantityCart.textContent = totalProductCart;
}

//Traitement des données saisie par l'utilisateur dans le formulaire de commande 
const btn_order = document.getElementById("order");

//Sélection de l'input
const user_firstName = document.getElementById ("firstName");
const user_lastName = document.getElementById ("lastName");
const user_address = document.getElementById ("address");
const user_city = document.getElementById ("city");
const user_email = document.getElementById ("email");

//Sélection des message d'erreur pour l'affichage
const error_firstName = document.getElementById ("firstNameErrorMsg");
const error_lastName = document.getElementById ("lastNameErrorMsg");
const error_address = document.getElementById ("addressErrorMsg");
const error_city = document.getElementById ("cityErrorMsg");
const error_email = document.getElementById ("emailErrorMsg");


//Gestion du bouton Commander
btn_order.addEventListener("click", (event)=>{
  event.preventDefault();
  let entered_data_user_firstName = user_firstName.value;
  let entered_data_user_lastName = user_lastName.value;
  let entered_data_user_address = user_address.value;
  let entered_data_user_city = user_city.value;
  let entered_data_user_email = user_email.value;

  let contact = {
    firstName : entered_data_user_firstName,
    lastName : entered_data_user_lastName,
    address : entered_data_user_address,
    city : entered_data_user_city,
    email : entered_data_user_email
  }

  var error_entered_data_user_firstName = "";
  var error_entered_data_user_lastName = "";
  var error_entered_data_user_address = "";
  var error_entered_data_user_city = "";
  var error_entered_data_user_email = "";

  //Vérification des données rentrées par l'utilisateur
  if(!entered_data_user_firstName || !/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(entered_data_user_firstName))
  {
    error_entered_data_user_firstName = "Veuillez remplir ce champ";
  }

  if(!entered_data_user_lastName || !/^[A-Za-z]{3,20}$/.test(entered_data_user_lastName))
  {
    error_entered_data_user_lastName = "Veuillez remplir ce champ";
  }

  if(!entered_data_user_address|| !/^[A-Za-z0-9\s]{5,50}$/.test(entered_data_user_address))
  {
    error_entered_data_user_address = "Veuillez remplir ce champ";
  }

  if(!entered_data_user_city || !/^[A-Za-z\s]{3,20}$/.test(entered_data_user_city))
  {
    error_entered_data_user_city = "Veuillez remplir ce champ";
  }

  if(!entered_data_user_email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(entered_data_user_email))
  {
    error_entered_data_user_email = "Veuillez remplir ce champ";
  }

  //Affichage des champs mal remplie par l'utilisateur
  if(error_entered_data_user_firstName || error_entered_data_user_lastName || error_entered_data_user_city || error_entered_data_user_address || error_entered_data_user_email)
  {
    error_firstName.textContent = error_entered_data_user_firstName;
    error_lastName.textContent = error_entered_data_user_lastName;
    error_address.textContent = error_entered_data_user_address;
    error_city.textContent = error_entered_data_user_city;
    error_email.textContent = error_entered_data_user_email;
  }

  else 
  {
    error_firstName.textContent = error_entered_data_user_firstName;
    error_lastName.textContent = error_entered_data_user_lastName;
    error_address.textContent = error_entered_data_user_address;
    error_city.textContent = error_entered_data_user_city;
    error_email.textContent = error_entered_data_user_email;

    //Envoie des données de l'utilisateur sur le local storage
    /* let userInformationLocalStorage = JSON.parse (localStorage.getItem ("user_information"));
    userInformationLocalStorage =[];
    userInformationLocalStorage.push(contact);
    localStorage.setItem("user_information", JSON.stringify(userInformationLocalStorage)); */

    console.table(contact);

    let cartID = [];

    console.table(produitLocalStorage);

    for(let z = 0; z < produitLocalStorage.length; z++) 
    {
      let id = produitLocalStorage[z].Id_produit;
      cartID.push(id);
    };

    //Création de l'objet à envoyer à 'API
    const order = {
      contact,
      products: cartID,
    };

    //Contrôle d'un panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0){
      
    alert("Votre panier est vide ! Veuillez sélectionner au moins un produit");

    } 
    else 
    {
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


    promise.then(async(response)=>{
      try{
        const contenu = await response.json();
        console.log(contenu.orderId);
        window.location = `confirmation.html?${contenu.orderId}`;
      }
      catch(e){
        console.log(e);
      }
    })}
  }
});

