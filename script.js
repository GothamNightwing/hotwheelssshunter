const products = [
  {
    id: 1,
    name: "McLaren Elva",
    type: "mainline",
    label: "Mint Condition",
    price: 399,
    stock: 1,
    image1: "PHOTO1",
    image2: "PHOTO2"
  },
  {
    id: 2,
    name: "'73 Honda Civic Custom",
    type: "mainline",
    label: "Mint Condition",
    price: 349,
    stock: 1,
    image1: "PHOTO3",
    image2: "PHOTO4"
  },
  {
    id: 3,
    name: "1995 Mazda RX-7",
    type: "mainline",
    label: "Mint Condition",
    price: 399,
    stock: 2,
    image1: "PHOTO5",
    image2: "PHOTO6"
  },
  {
    id: 4,
    name: "'17 Audi RS 6 Avant",
    type: "mainline",
    label: "Mint Condition",
    price: 299,
    stock: 1,
    image1: "PHOTO7",
    image2: "PHOTO8"
  },
  {
    id: 5,
    name: "Formula 1 Pack",
    type: "mainline",
    label: "Mint Condition",
    price: 850,
    stock: 1,
    image1: "PHOTO9",
    image2: "PHOTO10"
  },
  {
    id: 6,
    name: "Ford Mustang",
    type: "mainline",
    label: "Mint Condition",
    price: 249,
    stock: 1,
    image1: "PHOTO11",
    image2: "PHOTO12"
  },
  {
    id: 7,
    name: "Barbie Dream Camper",
    type: "mainline",
    label: "Mint Condition",
    price: 249,
    stock: 1,
    image1: "PHOTO13",
    image2: "PHOTO14"
  },
  {
    id: 8,
    name: "Custom Otto",
    type: "mainline",
    label: "Mint Condition",
    price: 199,
    stock: 1,
    image1: "PHOTO15",
    image2: "PHOTO16"
  }
];

let cart = JSON.parse(localStorage.getItem("hwhCart") || "[]");

const productsEl = document.getElementById("products");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

function render() {
  const q = search.value.toLowerCase();
  const f = filter.value;

  const list = products.filter(
    p =>
      (f === "all" || f === p.type) &&
      p.name.toLowerCase().includes(q)
  );

  productsEl.innerHTML = list.map(p => `
    <article class="product">
      <div class="pic" style="display:flex;gap:5px;padding:8px;">
        <img src="${p.image1}" alt="${p.name} front"
          style="width:50%;height:100%;object-fit:contain;">
        <img src="${p.image2}" alt="${p.name} back"
          style="width:50%;height:100%;object-fit:contain;">
      </div>

      <div class="info">
        <h3>${p.name}</h3>

        <div class="meta">
          ${p.label} • ${p.stock} available
        </div>

        <div class="price">
          ₹${p.price.toLocaleString("en-IN")}
        </div>

        <button class="buy" onclick="addToCart(${p.id})">
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");

  document.getElementById("empty").classList.toggle(
    "hidden",
    list.length > 0
  );
}

function save() {
  localStorage.setItem("hwhCart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  document.getElementById("cartCount").textContent =
    cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  const currentQty = item ? item.qty : 0;

  if (currentQty >= product.stock) {
    alert("Only " + product.stock + " available.");
    return;
  }

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: id,
      qty: 1
    });
  }

  save();
  openCart();
}

function openCart() {
  renderCart();
  document.getElementById("overlay").classList.remove("hidden");
}

function closeCart(e) {
  if (!e || e.target.id === "overlay") {
    document.getElementById("overlay").classList.add("hidden");
  }
}

function renderCart() {
  const el = document.getElementById("cartItems");

  if (!cart.length) {
    el.innerHTML = "<p class='note'>Your cart is empty.</p>";
    document.getElementById("total").textContent = "₹0";
    return;
  }

  let total = 0;

  el.innerHTML = cart.map(i => {
    const p = products.find(x => x.id === i.id);

    total += p.price * i.qty;

    return `
      <div class="cart-row">
        <div class="thumb">
          <img src="${p.image1}"
            style="width:100%;height:100%;object-fit:contain;">
        </div>

        <div>
          <strong>${p.name}</strong>
          <small>
            ₹${p.price.toLocaleString("en-IN")} × ${i.qty}
          </small>
        </div>

        <button class="remove"
          onclick="removeItem(${p.id})">
          Remove
        </button>
      </div>
    `;
  }).join("");

  document.getElementById("total").textContent =
    "₹" + total.toLocaleString("en-IN");
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  save();
  renderCart();
}

function checkout() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("checkoutModal").classList.remove("hidden");
}

function placeOrder(e) {
  e.preventDefault();

  alert(
    "Checkout form works. Payment is not connected yet."
  );
}

function toggleNav() {
  document.getElementById("nav").classList.toggle("open");
}

search.addEventListener("input", render);
filter.addEventListener("change", render);

render();
updateCount();