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

  function cart(arrayCart){

  // afficher les élements du panier contenu dans le Local Storage
  let cartProduct = document.getElementById("cart__items");

  if (produitLocalStorage === null || produitLocalStorage == 0){
    const emptyCart = `<p> Panier vide </p>`;
    cartProduct.innerHTML = emptyCart;
    cartProduct.style.fontSize = "40px";
    cartProduct.style.textAlign = "center";
  }

  else {
    produitLocalStorage.forEach(elLS => {
      
      arrayCart.forEach(elAPI => {
        if(elAPI._id === elLS.Id_produit){
          elLS.name = elAPI.name;
          elLS.price = elAPI.price;
          elLS.imageUrl = elAPI.imageUrl;
          elLS.altTxt = elAPI.altTxt;
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
    calculation(produitLocalStorage);

    console.table(produitLocalStorage);
  // modifier la quantité de produit via le panier

  var btn_quantite = document.querySelectorAll('.itemQuantity');
  console.log(btn_quantite);
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

  // supprimer un produit du panier 
  let btn_delete = document.querySelectorAll('.deleteItem');

  for (let x = 0; x < btn_delete.length; x++){

    let id_produit_supprimer = produitLocalStorage[x].Id_produit;
    let color_produit_supprimer = produitLocalStorage[x].option;

    btn_delete[x].addEventListener("click", () =>{
    produitLocalStorage = produitLocalStorage.filter( el => (el.Id_produit !==id_produit_supprimer || el.option !== color_produit_supprimer));
    let articleDelete = document.querySelector(`article[data-id="${id_produit_supprimer}"][data-color="${color_produit_supprimer}"]`);
    articleDelete.remove();
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

    alert("Le produit a été supprimé !"); 
    console.table(produitLocalStorage);
    console.log(id_produit_supprimer);
    console.log(color_produit_supprimer);

    calculation(produitLocalStorage);

    if (produitLocalStorage === null || produitLocalStorage == 0){
      const emptyCart = `<p> Panier vide </p>`;
      cartProduct.innerHTML = emptyCart;
      cartProduct.style.fontSize = "40px";
      cartProduct.style.textAlign = "center";
    }
    })
  };

  };

// Calcul du total panier (quantité et prix)
  function calculation(){
  
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