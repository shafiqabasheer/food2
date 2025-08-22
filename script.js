/* ========= LocalStorage Cart ========= */
const CART_KEY = "fe_cart_v1";

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function cartCount(cart){ return cart.reduce((n,i)=> n + (i.quantity||1), 0); }

function findItem(cart, name){
  return cart.find(it => it.name === name);
}

/* Add item to cart (name, price, img optional) */
function addToCart(name, price, img){
  const cart = getCart();
  const existing = findItem(cart, name);
  if(existing){
    existing.quantity += 1;
  }else{
    cart.push({ name, price, quantity: 1, img: img || null });
  }
  saveCart(cart);
  updateCartBadges();
  showToast(`${name} added to cart 🛒`);
}

/* Remove item by index */
function removeFromCart(index){
  const cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  updateCartBadges();
}

/* Update quantity by index (+1 / -1) */
function updateQty(index, delta){
  const cart = getCart();
  const item = cart[index];
  if(!item) return;
  item.quantity = Math.max(1, (item.quantity||1) + delta);
  saveCart(cart);
  updateCartBadges();
}

/* ========= Badges / Count ========= */
function updateCartBadges(){
  const count = cartCount(getCart());
  const el = document.getElementById("cart-count");
  const el2 = document.getElementById("cart-count-mobile");
  if(el) el.textContent = count;
  if(el2) el2.textContent = count;
}

/* ========= Toast ========= */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove("show"), 1600);
}

/* ========= Mobile Drawer ========= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();

  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("mobileDrawer");
  if(toggle && drawer){
    toggle.addEventListener("click", ()=>{
      const open = drawer.style.display === "block";
      drawer.style.display = open ? "none" : "block";
    });
  }
});
// Smooth scroll effect for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Small cart notification popup
function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Example usage for Add to Cart
function addToCart(item) {
  showToast(item + " added to cart 🛒");
}

// Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(name + " added to cart 🛒"); // use toast instead of alert
}

// Update Cart Count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// Run on Load
document.addEventListener("DOMContentLoaded", updateCartCount);

// Smooth scroll effect for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Small cart notification popup
function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
