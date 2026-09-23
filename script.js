const products = [

  {
    id: 1,
    name: "McLaren Elva",
    type: "exotics",
    series: "Hot Wheels Exotic",
    mrp: 499,
    price: 399,
    stock: 1,
    image1: "5B762D5A-1C63-4B1F-9E52-9F958EBF5C66.png",
    image2: "34B64E38-91CA-4415-A182-60B8F5617530.png"
  },

  {
    id: 2,
    name: "’73 Honda Civic Custom",
    type: "vintage-club",
    series: "Hot Wheels Vintage Club",
    mrp: 399,
    price: 325,
    stock: 1,
    image1: "1A6DAA59-D4D1-436A-A678-BE2EBC8224E9.png",
    image2: "47419579-3F9B-4A23-902B-31432C3A76EE.png"
  },

  {
    id: 3,
    name: "1995 Mazda RX-7",
    type: "fast-furious-silver-series",
    series: "Hot Wheels Silver Series",
    mrp: 449,
    price: 379,
    stock: 2,
    image1: "61A0BA9F-D761-4522-A871-4B489074ADD4.png",
    image2: "A4299B56-BA4A-4499-8B3C-8C65AC21C989.png"
  },

  {
    id: 4,
    name: "’17 Audi RS 6 Avant",
    type: "mainline",
    series: "Hot Wheels Mainline",
    mrp: 399,
    price: 249,
    stock: 1,
    image1: "678EDAF0-8CF8-4625-971A-4C05031AD9D4.png",
    image2: "7D31908B-3D5E-4845-BB94-EA3B7015636F.png"
  },

  {
    id: 5,
    name: "Formula 1 Pack",
    type: "formula-1",
    series: "Hot Wheels 5 Pack",
    mrp: 899,
    price: 779,
    stock: 1,
    image1: "49055DF6-201A-4140-9814-A23DA03EBB94.png",
    image2: "9CBEC50F-EF65-4D38-9135-1F150238A678.png"
  },

  {
    id: 6,
    name: "Ford Mustang",
    type: "mainline",
    series: "Hot Wheels Mainline",
    mrp: 339,
    price: 269,
    stock: 1,
    image1: "12B64CFF-C0B0-4017-BC9C-985E025CDE51.png",
    image2: "43723499-37FD-46FC-9D8D-2136C953D917.png"
  },

  {
    id: 7,
    name: "Barbie Dream Camper",
    type: "mainline",
    series: "Hot Wheels Mainline",
    mrp: 279,
    price: 225,
    stock: 1,
    image1: "2ACDBFEF-1346-4703-84B2-58814935CDB4.png",
    image2: "704104B9-2398-4278-B429-E16017440192.png"
  },

  {
    id: 8,
    name: "Custom Otto",
    type: "mainline",
    series: "Hot Wheels Mainline",
    mrp: 225,
    price: 189,
    stock: 1,
    image1: "D66DB3C9-012E-4C59-850A-11CB4DAF7AE5.png",
    image2: "0F5359FC-E5DD-40B8-8F15-2A7750CEF570.png"
  }

];


let cart = JSON.parse(
  localStorage.getItem("hwhCart") || "[]"
);

let activeCategory = "all";
let currentProduct = null;

const productsEl = document.getElementById("products");
const search = document.getElementById("search");

const money = n =>
  "₹" + n.toLocaleString("en-IN");


function render() {

  const q = search.value.trim().toLowerCase();

  const list = products.filter(p =>
    (activeCategory === "all" ||
     p.type === activeCategory) &&
  (
  p.name.toLowerCase().includes(q) ||
  p.series.toLowerCase().includes(q)
)
  );

  productsEl.innerHTML = list.map(p => `

    <article class="product-card"
             onclick="openProduct(${p.id})">

      <div class="product-photo">
        <img src="${p.image1}"
             alt="${p.name}">
      </div>

      <div class="product-card-info">

        <h3>${p.name}</h3>

        <div class="price">
          <s>${money(p.mrp)}</s>
          <strong>${money(p.price)}</strong>
        </div>

      </div>

    </article>

  `).join("");

  document
    .getElementById("empty")
    .classList.toggle(
      "hidden",
      list.length > 0
    );

  document
    .getElementById("clearFilter")
    .classList.toggle(
      "hidden",
      activeCategory === "all"
    );
}


function setCategory(type) {

  activeCategory = type;

  document
    .getElementById("stock")
    .scrollIntoView({
      behavior: "smooth"
    });

  render();
}


function clearFilters() {

  activeCategory = "all";
  render();

}


search.addEventListener("input", () => {
  render();

  if (search.value.trim()) {
    document.querySelector(".categories").classList.add("hidden");
    document.getElementById("stock").classList.add("searching");
  } else {
    document.querySelector(".categories").classList.remove("hidden");
    document.getElementById("stock").classList.remove("searching");
  }
});


function save() {

  localStorage.setItem(
    "hwhCart",
    JSON.stringify(cart)
  );

  updateCount();

}


function updateCount() {

  const n = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  document.getElementById(
    "cartCount"
  ).textContent = n;

  document.getElementById(
    "detailCartCount"
  ).textContent = n;

}


function addToCart(id, qty = 1) {

  const p = products.find(
    x => x.id === id
  );

  if (!p) return;

  let item = cart.find(
    x => x.id === id
  );

  if (item) {

    item.qty = Math.min(
      item.qty + qty,
      p.stock
    );

  } else {

    cart.push({
      id,
      qty: Math.min(qty, p.stock)
    });

  }

  save();

  showMessage("Added to cart");

}


function openProduct(id) {

  currentProduct =
    products.find(p => p.id === id);

  if (!currentProduct) return;

  document
    .getElementById("productPage")
    .classList.remove("hidden");

  document.body.classList.add(
    "no-scroll"
  );

  renderProductDetail();

document.getElementById("productPage").scrollTop = 0;

}


function closeProduct() {

  document
    .getElementById("productPage")
    .classList.add("hidden");

  document.body.classList.remove(
    "no-scroll"
  );

  currentProduct = null;

}


function renderProductDetail() {

  const p = currentProduct;

  const inCart = cart.find(
    i => i.id === p.id
  );

  const qty = inCart?.qty || 1;

  document.getElementById(
    "productDetail"
  ).innerHTML = `

    <div class="detail-gallery">

      <div class="gallery-track"
           id="galleryTrack">

        <img src="${p.image1}"
             alt="${p.name} front">

        <img src="${p.image2}"
             alt="${p.name} back">

      </div>

      <button class="gallery-prev"
              onclick="galleryMove(-1,event)">
        ‹
      </button>

      <button class="gallery-next"
              onclick="galleryMove(1,event)">
        ›
      </button>

      <div class="dots">
        <i class="active"></i>
        <i></i>
      </div>

    </div>


    <section class="detail-info">

      <h1>${p.name}</h1>

      <p class="series">
        ${p.series}
      </p>

      <div class="detail-price">
        <s>${money(p.mrp)}</s>
        <strong>${money(p.price)}</strong>
      </div>


      <div class="qty">

        <button onclick="changeDetailQty(-1)">
          −
        </button>

        <span id="detailQty">
          ${qty}
        </span>

        <button onclick="changeDetailQty(1)">
          +
        </button>

      </div>


      <button class="add-cart snipcart-add-item"
        data-item-id="${p.id}"
        data-item-name="${p.name}"
        data-item-price="${p.price}"
        data-item-description="${p.series} - Mint Condition"
        data-item-image="https://gothamnightwing.github.io/hotwheelssshunter/${p.image1}"
        data-item-url="https://gothamnightwing.github.io/hotwheelssshunter/">
        Add to Cart
      </button>


      <div class="specs">

        <p>
          <b>Condition</b>
          <span>Mint Condition</span>
        </p>

        <p>
          <b>Country of Origin</b>
          <span>As marked on packaging</span>
        </p>

        <p>
          <b>Series</b>
          <span>${p.series}</span>
        </p>

        <p>
          <b>Stock</b>
          <span>${p.stock} available</span>
        </p>

      </div>

    </section>


    <section class="recommend">

      <div class="section-title">
        <h2>You May Also Like</h2>
      </div>

      <div class="recommend-grid">

        ${
          products
            .filter(x => x.id !== p.id)
            .slice(0, 4)
            .map(x => `

              <button onclick="openProduct(${x.id})">

                <img src="${x.image1}"
                     alt="${x.name}">

                <strong>
                  ${x.name}
                </strong>

                <span>
                  <s>${money(x.mrp)}</s>
                  ${money(x.price)}
                </span>

              </button>

            `)
            .join("")
        }

      </div>

    </section>

  `;


  enableSwipe();

}


function galleryMove(dir, e) {

  e.stopPropagation();

  const track =
    document.getElementById(
      "galleryTrack"
    );

  const showBack = dir === 1;

  track.style.transform =
    showBack
      ? "translateX(-50%)"
      : "translateX(0)";

  document
    .querySelectorAll(".dots i")
    .forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        (showBack ? 1 : 0) === i
      );

    });

}


function enableSwipe() {

  const gallery =
    document.querySelector(
      ".detail-gallery"
    );

  if (!gallery) return;

  let startX = 0;

  gallery.addEventListener(
    "touchstart",
    e => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  gallery.addEventListener(
    "touchend",
    e => {

      const endX =
        e.changedTouches[0].clientX;

      const difference =
        startX - endX;

      if (Math.abs(difference) < 40)
        return;

      if (difference > 0)
        galleryMove(1, e);
      else
        galleryMove(-1, e);

    },
    { passive: true }
  );

}


function changeDetailQty(delta) {

  const el =
    document.getElementById(
      "detailQty"
    );

  let q =
    Number(el.textContent) + delta;

  q = Math.max(
    1,
    Math.min(
      q,
      currentProduct.stock
    )
  );

  el.textContent = q;

}


function addCurrentToCart() {

  const qty =
    Number(
      document.getElementById(
        "detailQty"
      ).textContent
    );

  addToCart(
    currentProduct.id,
    qty
  );

}


function openCart() {

  renderCart();

  document
    .getElementById("overlay")
    .classList.remove("hidden");

}


function closeCart(e) {

  if (
    !e ||
    e.target.id === "overlay"
  ) {

    document
      .getElementById("overlay")
      .classList.add("hidden");

  }

}


function renderCart() {

  const el =
    document.getElementById(
      "cartItems"
    );

  if (!cart.length) {

    el.innerHTML =
      "<p class='note'>Your cart is empty.</p>";

    document.getElementById(
      "total"
    ).textContent = "₹0";

    return;

  }


  let total = 0;

  el.innerHTML = cart.map(item => {

    const p =
      products.find(
        x => x.id === item.id
      );

    total +=
      p.price * item.qty;

    return `

      <div class="cart-row">

        <img src="${p.image1}"
             alt="${p.name}">

        <div>

          <strong>${p.name}</strong>

          <small>
            ${money(p.price)} × ${item.qty}
          </small>

        </div>

        <button class="remove"
                onclick="removeItem(${p.id})">
          Remove
        </button>

      </div>

    `;

  }).join("");


  document.getElementById(
    "total"
  ).textContent = money(total);

}


function removeItem(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  save();
  renderCart();

}


function checkout() {

  if (!cart.length) {

    showMessage(
      "Your cart is empty"
    );

    return;

  }

  showMessage(
    "Checkout will be connected here"
  );

}


function toggleNav() {

  document
    .getElementById("nav")
    .classList.toggle("open");

}


function showMessage(text) {

  const message =
    document.getElementById(
      "message"
    );

  message.textContent = text;

  message.classList.remove(
    "hidden"
  );

  setTimeout(() => {

    message.classList.add(
      "hidden"
    );

  }, 1800);

}

function openMenuPage(page) {
  toggleNav();

  if (page === "login") {
    openAccount();
  } else {
    showMessage("This section is coming soon");
  }
}

function openAccount() {
  document.getElementById("accountPage").classList.remove("hidden");
  document.body.classList.add("no-scroll");
  showLogin();
  document.getElementById("accountPage").scrollTop = 0;
}

function closeAccount() {
  document.getElementById("accountPage").classList.add("hidden");
  document.body.classList.remove("no-scroll");
}

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("createAccountForm").classList.add("hidden");
}

function showCreateAccount() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("createAccountForm").classList.remove("hidden");
}

function createAccount() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!name || !email || !password || !confirm) {
    showMessage("Please fill in all fields");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters");
    return;
  }

  if (password !== confirm) {
    showMessage("Passwords do not match");
    return;
  }

  showMessage("Account created");
  showLogin();
}

function signIn() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showMessage("Enter your email and password");
    return;
  }

  showMessage("Sign in system will be connected soon");
}

render();
updateCount();