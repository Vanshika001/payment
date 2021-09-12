// Product-images 
var productImg = document.getElementById("productImage");
var smallImg = document.getElementsByClassName("smallImage");

smallImg[0].onclick = function () {
    productImg.src = smallImg[0].src;
}
smallImg[1].onclick = function () {
    productImg.src = smallImg[1].src;
}
smallImg[2].onclick = function () {
    productImg.src = smallImg[2].src;
}
smallImg[3].onclick = function () {
    productImg.src = smallImg[3].src;
}

const openModalButtons = document.querySelectorAll('[data-modal-target]')
console.log(openModalButtons)
const closeModalButtons = document.querySelectorAll('[data-close-button]')
console.log(closeModalButtons)
const overlay = document.getElementById('overlay')
console.log(overlay);

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('remove-button');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        console.log(button);
        button.addEventListener("click", removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        console.log(input);
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        console.log(button);
        button.addEventListener('click', addToCartClicked);
    }
    var purchaseItem = document.getElementsByClassName('purchase-button')[0];
    if (purchaseItem) {
        purchaseItem.addEventListener('click', purchaseClicked);
        console.log(purchaseItem);
    }
}

function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    alert("Thank you for your purchase");
}

function addToCartClicked(event) {
    var button = event.target;
    console.log(button);
    var shopItem = button.parentElement.parentElement.parentElement.parentElement;
    console.log(shopItem);
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            return;
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn remove-button" type="button">REMOVE</button>
                </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('remove-button')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
    console.log("Done");

}


function removeCartItem(event) {
    var buttonClicked = event.target;
    console.log(buttonClicked);
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}
function quantityChanged(event) {
    var input = event.target;
    console.log(input);
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var qualityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''));
        var quantity = qualityElement.value;
        total = total + (price * quantity);
    }
    // total = Math.round(total * 100) / 100;
    total = Math.floor(total);
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs.' + total;
}
