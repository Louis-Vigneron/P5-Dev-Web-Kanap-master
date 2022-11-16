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
  
  function cart(arrayCart){
  let produitLocalStorage = JSON.parse (localStorage.getItem ("produit"));
  console.table(produitLocalStorage);

  let recap = produitLocalStorage.concat(arrayCart);
  console.table(recap);

  let cartProduct = document.getElementById("cart__items");

  if (produitLocalStorage === null){
    const emptyCart = `<p> Panier vide </p>`;
    cartProduct.innerHTML = emptyCart;
  }

  else {
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    produitLocalStorage.forEach(produit => {
    cartProduct.innerHTML += `
      <article class="cart__item" data-id="${produit.Id_produit}" data-color="${produit.option}">
      <div class="cart__item__img">
        <img src="${produit.imageURL}" alt="${produit._id}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${produit.name}</h2>
          <p>${produit.option}</p>
          <p>${produit.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article> 
    `;
    });
   
  }
}
  
