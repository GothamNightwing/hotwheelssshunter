const products = [
  {
    id: 1,
    name: "McLaren Elva",
    type: "exotics",
    label: "Mint Condition",
    price: 399,
    stock: 1,
    image1: "./0F5359FC-E5DD-40B8-8F15-2A7750CEF570.png",
    image2: "./12B64CFF-C0B0-4017-BC9C-985E025CDE51.png"
  },
  {
    id: 2,
    name: "’73 Honda Civic Custom",
    type: "vintage-club",
    label: "Mint Condition",
    price: 349,
    stock: 1,
    image1: "./1A6DAA59-D4D1-436A-A678-BE2EBC8224E9.png",
    image2: "./2ACDBFEF-1346-4703-84B2-58814935CDB4.png"
  },
  {
    id: 3,
    name: "1995 Mazda RX-7",
    type: "fast-furious-silver-series",
    label: "Mint Condition",
    price: 399,
    stock: 2,
    image1: "./34B64E38-91CA-4415-A182-60B8F5617530.png",
    image2: "./43723499-37FD-46FC-9D8D-2136C953D917.png"
  },
  {
    id: 4,
    name: "’17 Audi RS 6 Avant",
    type: "mainline",
    label: "Mint Condition",
    price: 299,
    stock: 1,
    image1: "./47419579-3F9B-4A23-902B-31432C3A76EE.png",
    image2: "./49055DF6-201A-4140-9814-A23DA03EBB94.png"
  },
  {
    id: 5,
    name: "Formula 1 Pack",
    type: "formula-1",
    label: "Mint Condition",
    price: 850,
    stock: 1,
    image1: "./5B762D5A-1C63-4B1F-9E52-9F958EBF5C66.png",
    image2: "./61A0BA9F-D761-4522-A871-4B489074ADD4.png"
  },
  {
    id: 6,
    name: "Ford Mustang",
    type: "mainline",
    label: "Mint Condition",
    price: 249,
    stock: 1,
    image1: "./678EDAF0-8CF8-4625-971A-4C05031AD9D4.png",
    image2: "./704104B9-2398-4278-B429-E16017440192.png"
  },
  {
    id: 7,
    name: "Barbie Dream Camper",
    type: "mainline",
    label: "Mint Condition",
    price: 249,
    stock: 1,
    image1: "./7D31908B-3D5E-4845-BB94-EA3B7015636F.png",
    image2: "./9CBEC50F-EF65-4D38-9135-1F150238A678.png"
  },
  {
    id: 8,
    name: "Custom Otto",
    type: "mainline",
    label: "Mint Condition",
    price: 199,
    stock: 1,
    image1: "./A4299B56-BA4A-4499-8B3C-8C65AC21C989.png",
    image2: "./D66DB3C9-012E-4C59-850A-11CB4DAF7AE5.png"
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