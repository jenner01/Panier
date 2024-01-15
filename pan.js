//cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//pour ajouter
cartIcon.onclick = () => {

    cart.classList.add("active");
}
//fonction pour fermer
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//cart sur le quel on boss
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);

} else {
    ready();
}

//la fonction pour marquer
function ready() {
    //suprimer des element de la cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //ajouter une cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //bouton achat
    document.getElementsByClassName('bnt-bay')[0].addEventListener('click', bayButtonclicked);
}

//quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();


}

// boutton acheter
function bayButtonclicked() {
    alert('votre commade est faite');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//suprimer des element de la cart
function removeCartItem(event) {
    var buttonCliked = event.target;
    buttonCliked.parentElement.remove();
    updatetotal();
}


//ajouter a la cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduit = button.parentElement;
    var title = shopProduit.getElementsByClassName('product-title')[0].innerText
    var prix = shopProduit.getElementsByClassName('prix')[0].innerText
    var produtImg = shopProduit.getElementsByClassName('product-img')[0].src
    aadProductToCart(title, prix, produtImg);
    updatetotal();
}
function aadProductToCart(title, prix, produtImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-produit-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("Vous avez déjà ajouté ce produit dans votre panier");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartBoxContent = `
        <img src="${produtImg}" alt="" class="cart-img">
        <div class="daitail-box">
            <div class="cart-produit-title">${title}</div>
            <div class="cart-prix">${prix}</div>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" onclick="decreaseQuantity(this)">-</button>
                <input type="number" value="1" class="cart-quantity" readonly>
                <button class="quantity-btn increase" onclick="increaseQuantity(this)">+</button>
            </div>
           <!-- <input type="number" value="1" class="cart-quantity">-->
        </div>
        <!-- supprimer -->
        <i class=' bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;

    cartItems.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);

    updatetotal();
}


//mettre a jours la somme total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var prixElement = cartBox.getElementsByClassName('cart-prix')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var prix = parseFloat(prixElement.innerText.replace("Fcfa", ""));

        var quantity = quantityElement.value;
        total = total + (prix * quantity);
    }
    //la somme des prix
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-prix')[0].innerText = total + 'Fcfa';

}
//le coeur
document.addEventListener('DOMContentLoaded', function () {
    var likeButtons = document.querySelectorAll('.coeur');

    likeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Vérifiez si le cœur est déjà cliqué
            if (button.classList.contains('add-like')) {
                // Si oui, retirez la classe 'add-like' pour annuler le clic
                button.classList.remove('add-like');
                // Mettez à jour la couleur du cœur
                button.style.color = 'red'; // Couleur initiale des cœurs
            } else {
                // Si non, ajoutez la classe 'add-like' pour indiquer le clic
                button.classList.add('add-like');
                // Mettez à jour la couleur du cœur
                button.style.color = 'blue'; // Nouvelle couleur des cœurs lorsqu'ils sont cliqués
            }
        });
    });
});

// ...

function decreaseQuantity(button) {
    var quantityInput = button.nextElementSibling;
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
        updatetotal();
    }
}

function increaseQuantity(button) {
    var quantityInput = button.previousElementSibling;
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updatetotal();
}

// ...
