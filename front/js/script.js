//JAVASCRIPT POUR LA PAGE D'ACCUEIL DU SITE

function afficherProduits(value) {
    let produits ="";
        for(let valeurs of value){ 
            produits += `<a href="./product.html?id=${valeurs._id}">
                            <article>
                                <img src="${valeurs.imageUrl}" alt="${valeurs.altTxt}">
                                <h3 class="productName">${valeurs.name}</h3>
                                <p class="productDescription">${valeurs.description}</p>
                            </article>
                        </a>`;

        }
        document.getElementById('items').innerHTML = produits;
}


//Fonction permettant d'afficher les produits sur la page d'accueil
function recupererProduits() {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        afficherProduits(value);
    })
    .catch(function(err) {
        console.log("L'erreur est la suivante : " + err);
    });
}

//Lancement de la fonction
recupererProduits();
