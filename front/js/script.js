fetch("http://localhost:3000/api/products")


.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);
    value.forEach(element => {
      buildProduct(element);

    });
  })
  .catch(function(err) {
    // Une erreur est survenue
  });


function buildProduct(product){
console.log(product);
let a = document.createElement ("a");
a.href = "./product.html" + product._id;
document.getElementById('items').appendChild(a);

let article = document.createElement ("article");
a.appendChild(article);


let img = document.createElement("img");
img.src = product.imageUrl;
img.alt = product.altTxt;
article.appendChild(img);
img.innerHTML = product.imageUrl;

let h3 = document.createElement("h3");
article.appendChild(h3);
h3.innerHTML = product.name;
h3.classList.add("productName");

let p = document.createElement("p");
article.appendChild(p);
p.innerHTML = product.description;
p.classList.add("productDescription");
}


//let elt = document.getElementById('items');
//elt.innerHTML = "<a href=./product.html?id=42><article><img src=.../product01.jpgalt=Lorem ipsum dolor sit amet, Kanap name1><h3 class=productName>Kanap name1</h3><p class=productDescription>Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>";



