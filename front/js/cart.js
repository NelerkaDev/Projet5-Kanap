//JAVASCRIPT POUR LA PAGE PANIER

let products = JSON.parse(localStorage.getItem('canapes'));
let prenomValide;
let nomValide;
let adresseValide;
let villeValide;
let emailValide;
let inputPrenom = document.getElementById('firstName');
let inputNom = document.getElementById('lastName');
let inputAdresse = document.getElementById('address');
let inputVille = document.getElementById('city');
let inputEmail = document.getElementById('email');

//Fonction permettant d'afficher les produits sur la page Panier
function afficherProduitsPanier() {

    let productsHtml = "";

    if(products != null) {

        products.forEach((productCart, index) => {
                
            
            fetch('http://localhost:3000/api/products/' + productCart.id)
            .then(function(res) {
                if(res.ok) {
                    return res.json();
                }
            })
            .then(function(product) {
                productsHtml += `<article class="cart__item" id="itemArticle-${index}" data-id="${productCart.id}" data-color="${productCart.color}">
                                    <div class="cart__item__img">
                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                        <div class="cart__item__content__description">
                                            <h2>${product.name}</h2>
                                            <p>${productCart.color}</p>
                                            <p class="price" index="${index}">${product.price} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                                <p>Qté : </p>
                                                <input type="number" id="itemQuantity-${index}" class="itemQuantity" onchange="inputChange(${index})" name="itemQuantity" min="1" max="100" value="${productCart.qte}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem" onclick="deleteProduct(${index})">Supprimer</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>`;    
                document.getElementById("cart__items").innerHTML = productsHtml;  
                calculTotal();                
            })
            .catch(function(err) {
                console.log("L'erreur est la suivante : " + err);
            })            
        });
    } else {
        alert("Votre panier est vide !");
    }
}

//Fonction permettant de modifier les quantités des produits en mettant à jour le localStorage
function inputChange(index){

    products[index].qte = parseInt(document.getElementById(`itemQuantity-${index}`).value);
    window.localStorage.setItem('canapes', JSON.stringify(products));
    calculTotal();
}

//Fonction permettant de supprimer le produit désiré en mettant à jour le localStorage
function deleteProduct(index){

    products.splice(index, 1);
    window.localStorage.setItem('canapes', JSON.stringify(products));
    document.getElementById(`itemArticle-${index}`).remove();
    calculTotal();
}

//Fonction affichant le nombre d'article total ainsi que le prix total du panier
function calculTotal(){

    let priceElements = document.querySelectorAll('.price');
    let totalPrice = 0;
    let quantiteTotale = 0;

    priceElements.forEach(element => {
        let index = element.getAttribute("index");
        let quantite = parseInt(document.getElementById(`itemQuantity-${index}`).value);
        quantiteTotale += quantite;
        totalPrice+= quantite*(parseInt(element.innerText.replace(" €", "")));
    })

    document.getElementById("totalPrice").innerText = totalPrice;
    document.getElementById("totalQuantity").innerText = quantiteTotale;
}

//Fonction permettant de vérifier l'input avec la regex et affiche le message d'erreur lorsque celui-ci est nécéssaire
function checkInputPrenom(){
    let regexPrenom = /([A-zÀ-ÿ\-])/g;
    let erreurPrenom = document.getElementById('firstNameErrorMsg');
    if(regexPrenom.test(inputPrenom.value)){
        console.log("Le prénom rentre bien dans la regex définie");
        prenomValide = document.getElementById('firstName').value;
        erreurPrenom.innerHTML = "";
        return true;
    }else{
        console.log("Le prénom ne rentre pas dans la regex définie");
        erreurPrenom.innerHTML = "Saisissez votre prénom."
        return false;
    }
}

//Fonction permettant de vérifier l'input avec la regex et affiche le message d'erreur lorsque celui-ci est nécéssaire
function checkInputNom(){
    let regexNom = /([A-zÀ-ÿ\-])/g;
    let erreurNom = document.getElementById('lastNameErrorMsg');
    if(regexNom.test(inputNom.value)){
        console.log("Le nom rentre bien dans la regex définie");
        nomValide = document.getElementById('lastName').value;
        erreurNom.innerHTML = "";
        return true;
    }else{
        console.log("Le nom ne rentre pas dans la regex définie");
        erreurNom.innerHTML = "Saisissez votre nom."
        return false;
    }
}

//Fonction permettant de vérifier l'input avec la regex et affiche le message d'erreur lorsque celui-ci est nécéssaire
function checkInputAdresse(){
    let regexAdresse = /([A-zÀ-ÿ0-9\-])/g;
    let erreurAdresse = document.getElementById('addressErrorMsg');
    if(regexAdresse.test(inputAdresse.value)){
        console.log("L'adresse rentre bien dans la regex définie");
        adresseValide = document.getElementById('address').value;
        erreurAdresse.innerHTML = "";
        return true;
    }else{
        console.log("L'adresse ne rentre pas dans le regex définie");
        erreurAdresse.innerHTML = "Saisissez votre adresse."
        return false;
    }
}

//Fonction permettant de vérifier l'input avec la regex et affiche le message d'erreur lorsque celui-ci est nécéssaire
function checkInputVille(){
    let regexVille = /([A-zÀ-ÿ\-])/g;
    //let villeValide = "";
    let erreurVille = document.getElementById('cityErrorMsg');
    if(regexVille.test(inputVille.value)){
        console.log("La ville rentre bien dans la regex définie");
        villeValide = document.getElementById('city').value;
        erreurVille.innerHTML = "";
        return true;
    }else{
        console.log("La ville ne rentre pas dans la regex définie");
        erreurVille.innerHTML = "Saisissez votre ville."
        return false;
    }
}

//Fonction permettant de vérifier l'input avec la regex et affiche le message d'erreur lorsque celui-ci est nécéssaire
function checkInputEmail(){
    let regexEmail = /[A-z0-9](([_\.\-]?[A-z0-9]+)*)@([A-z0-9]+)(([_\.\-]?[A-z0-9]+)*)\.([A-z]{2,})/;
    //let emailValide = "";
    let erreurEmail = document.getElementById('emailErrorMsg');
    if(regexEmail.test(inputEmail.value)){
        console.log("L'adresse mail rentre bien dans la regex définie");
        emailValide = document.getElementById('email').value;
        erreurEmail.innerHTML = "";
        return true;
    }else{
        console.log("L'adresse mail ne rentre pas dans le regex définie");
        erreurEmail.innerHTML = "Saisissez votre adresse mail."
        return false;
    }
}

//Fonction permettant à l'utilisateur de saisir ses coordoonées et de passer commande
function saisirInfo(){

    inputPrenom.addEventListener('change', function(){
        checkInputPrenom();
    });    

    inputNom.addEventListener('change', function(){
        checkInputNom();
    });    

    inputAdresse.addEventListener('change', function(){
        checkInputAdresse();
    });    

    inputVille.addEventListener('change', function(){
        checkInputVille();
    });    

    inputEmail.addEventListener('change', function(){
        checkInputEmail();
    });
    

    document.getElementById('formulaire').addEventListener('submit', function(e){
        e.preventDefault();
        if(checkInputEmail() && checkInputVille() && checkInputAdresse() && checkInputNom() && checkInputPrenom()){
            let userInfo = {
                'firstName' : prenomValide,
                'lastName' : nomValide,
                'address' : adresseValide,
                'city' : villeValide,
                'email' : emailValide
            };
            let productsList = products.map(product => product.id);

            fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact : userInfo,
                    products : productsList
                })
            })
            .then(function(res) {
                if(res.ok) {
                    return res.json();
                }
            })
            .then(function(order) {
                window.location = "confirmation.html?orderId=" + order.orderId;
            })
        }
    })
}

afficherProduitsPanier();
saisirInfo();