const search_id = window.location.search;
const Id = search_id.slice(1);
console.log(Id);

let idCommand = document.getElementById("orderId");
idCommand.textContent = Id;