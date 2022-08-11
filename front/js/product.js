//JAVASCRIPT POUR LA PAGE DES PRODUITS

//Récupère l'URL de la page actuelle de manière "brute"
let urlCourante = window.location.href;

//On transforme l'url "brute" en url 
let url = new URL(urlCourante);

//On récupère l'id présente dans l'url
let idUrl = url.searchParams.get('id');

function miseAJourProduit(product) {
    let imgProduit = "";
        let couleurs = "";
        imgProduit = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        //boucle permettant d'ajouter à la variable "couleurs" les différentes couleurs du produit actuel
        for (let i = 0; i < product.colors.length; i++){
            couleurs += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        }

        document.getElementById('title').innerHTML = product.name;
        document.getElementById('price').innerHTML = product.price;      
        document.getElementById('colors').innerHTML = couleurs;
        document.getElementById('description').innerHTML = product.description;  

        document.getElementsByClassName("item__img")[0].innerHTML = imgProduit;

        document.getElementsByTagName('title')[0].innerHTML = product.name;
}

//Fonction permettant d'afficher le produit et ses informations sur la page du produit associé
function recupererProduits () {
    fetch('http://localhost:3000/api/products/' + idUrl)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    //Ajout des informations au DOM
    .then(function(product) {
        miseAJourProduit(product);
    })
    .catch(function(err) {
        alert("Le produit n'existe pas");
        console.log("L'erreur est la suivante : " + err);
    });
}

document.getElementById("addToCart").addEventListener('click', function(){
    ajouterAuPanier();
});

//Fonction permettant d'ajouter les différents produits au localStorage et au panier
function ajouterAuPanier(){    
    let produitColor = document.getElementById("colors").value;
    let produitQuantity = document.getElementById("quantity").value;
    let canapes = JSON.parse(localStorage.getItem('canapes'));
    let indice = 0;
    let canape;

    if(canapes != null) {
        for(canape of canapes) {
            if(canape.id == idUrl && canape.color == document.getElementById("colors").value) {       
                let quantiteProvisoire = parseInt(canape.qte, 10) + parseInt(produitQuantity, 10);
                canape.qte = quantiteProvisoire;
                break;
            } else {
                indice++;
                canape = {
                    'id' : idUrl,
                    'color' : produitColor,
                    'qte' : parseInt(produitQuantity, 10)
                };
            }
        }
    } else { 
        canapes = [];
            canape = {
            'id' : idUrl,
            'color' : produitColor,
            'qte' : parseInt(produitQuantity, 10)
        };
    }
console.log(canape);

    canapes.splice(indice, 1, canape);
    localStorage.setItem('canapes', JSON.stringify(canapes));
}

//Lancement de la fonction
recupererProduits();

