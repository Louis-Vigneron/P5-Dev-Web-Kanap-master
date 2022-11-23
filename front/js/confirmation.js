//Récupération du numéro de commande contenu dans l'URL

const search_id = window.location.search;
const Id = search_id.slice(1);
console.log(Id);

// Affichage du numéro de commande

let idCommand = document.getElementById("orderId");
idCommand.textContent = Id;