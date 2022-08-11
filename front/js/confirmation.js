//JAVASCRIPT POUR LA PAGE CONFIRMATION

//Récupère l'URL de la page actuelle de manière "brute"
let urlCourante = window.location.href;

//On transforme l'url "brute" en url 
let url = new URL(urlCourante);

//On récupère l'orderId présente dans l'url
let orderIdUrl = url.searchParams.get('orderId');

//On modifie le DOM pour lui ajouter le numéro de commande
document.getElementById('orderId').innerHTML = orderIdUrl;

//On vide le localStorage
localStorage.clear();