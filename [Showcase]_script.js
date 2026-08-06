/*

        Final Project
        Claudia's Kithchen

        Author: Jose Cazares
        Date:   May 7, 2026
         
        Filename: [Showcase]_script.js
    
  

*/


if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}



let interationTimer;
const header = document.querySelector('h1');
const idleTime = 3000; // Main logo/h1 time before hidden in millisec

function showHeader() {
    header.classList.remove('h1-hidden');
    resetTimer();
}

function hideHeader() {
    header.classList.add('h1-hidden'); //Main Logo/h1 hides
}

function resetTimer() {
    clearTimeout(interationTimer);
    interationTimer = setTimeout(hideHeader, idleTime);
}

// Events indicating user interaction
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    window.addEventListener(event, showHeader, { passive: true});
});

// Starts initial timer
resetTimer();

let navTimer;
const navbar = document.querySelector('.navbar');
console.log("Navbar element found:", navbar);
const idleLimit = 3000; // 3 seconds of inactivity

function showNav() {
    navbar.classList.remove('nav-hidden');
    resetNavTimer();
}

function hideNav() {
    navbar.classList.add('nav-hidden');
}

function resetNavTimer() {
    clearTimeout(navTimer);
    navTimer = setTimeout(hideNav, idleLimit);
}

// Track user interactions to keep nav visible
['mousemove', 'scroll', 'keydown', 'touchstart'].forEach(event => {
    window.addEventListener(event, showNav, { passive: true});
});

// Start the timer when the page loads
resetNavTimer();

console.log("Javascript is linked!");

let cart = [];
let total = 0;

// Find all buttons and click
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () =>{
        const name = button.getAttribute('data-name');

        // Add to Fake data
        cart.push({name, price});
        total += price;

        updateCartUI();
    });
});

function updateCartUI() {
    const list = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-tota');

    //Clear list
    list.innerHTML = "";

    // Add each item back
    cart.forEach((item, index) => {
        list.innerHTML += `<li>${item.name} - $${item.price}</li>`;
    });

    totalDisplay.innerText = total.toFixed(2);
}

   function checkoutAlert() {
    alert("Thank you for your fake order!");
   }

   // Grab DOM elements
const orderForm = document.getElementById('order-form');
const quantityInput = document.getElementById('quantity');
const totalPriceSpan = document.getElementById('total-price');
const orderSummary = document.getElementById('order-summary');

// Function to compute live total price
function calculateTotal() {
  const selectedItem = document.querySelector('input[name="menuChoice"]:checked');
  const price = parseFloat(selectedItem.value);
  const quantity = parseInt(quantityInput.value) || 1;

  const total = (price * quantity).toFixed(2);
  totalPriceSpan.textContent = total;
}

// Add Event Listeners for real-time total updates
orderForm.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

// Handle Form Submission
orderForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents page reload

  const selectedItem = document.querySelector('input[name="menuChoice"]:checked');
  const itemLabel = selectedItem.nextElementSibling.innerText;
  const quantity = quantityInput.value;
  const finalTotal = totalPriceSpan.textContent;

  // Display completion confirmation message
  orderSummary.classList.remove('hidden');
  orderSummary.innerHTML = `
    <strong>Order Confirmed! 🎉</strong><br>
    <strong>Item:</strong> ${itemLabel}<br>
    <strong>Quantity:</strong> ${quantity}<br>
    <strong>Total Billed:</strong> $${finalTotal}
  `;
});