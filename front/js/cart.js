fetch("http://localhost:3000/api/products")

.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);   
    cart(value);   
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  let produitLocalStorage = JSON.parse (localStorage.getItem ("produit"));
  console.table(produitLocalStorage);


  function cart(arrayCart){
  
  let cartProduct = document.getElementById("cart__items");

  if (produitLocalStorage === null){
    const emptyCart = `<p> Panier vide </p>`;
    cartProduct.innerHTML = emptyCart;
  }

  else {
    produitLocalStorage.forEach(elLS => {
      
      arrayCart.forEach(elAPI => {
        if(elAPI._id === elLS.Id_produit){
          elLS.name = elAPI.name;
          elLS.price = elAPI.price;
          elLS.imageUrl = elAPI.imageUrl;
          elLS.altTxt = elAPI.altTxt;

          console.table(elLS);
        }
      });
    });
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
   
  }
  let btn_delete = document.querySelectorAll(".deleteItem");
  console.log(btn_delete);
  btn_delete.forEach(element => {
    let id_produit_supprimer = CartProductLS[element].Id_produit;
    element.addEventListener("click", (event) =>{
      produitLocalStorage = produitLocalStorage.filter( el => el.Id_produit !==id_produit_supprimer);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    });
    alert("Le produit a été supprimé !");
    
  });


  