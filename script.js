const products=[
 {id:1,name:"Nissan Skyline GT-R",type:"mainline",label:"Mainline",price:149,emoji:"🏎️"},
 {id:2,name:"Toyota Supra",type:"mainline",label:"Mainline",price:149,emoji:"🚗"},
 {id:3,name:"Porsche 911",type:"premium",label:"Premium",price:399,emoji:"🏁"},
 {id:4,name:"Treasure Hunt",type:"th",label:"TH",price:299,emoji:"🔥"},
 {id:5,name:"Super Treasure Hunt",type:"sth",label:"STH",price:999,emoji:"💎"},
 {id:6,name:"JDM Street Racer",type:"mainline",label:"Mainline",price:179,emoji:"🚘"}
];
let cart=JSON.parse(localStorage.getItem("hwhCart")||"[]");
const productsEl=document.getElementById("products"), search=document.getElementById("search"), filter=document.getElementById("filter");
function render(){
 const q=search.value.toLowerCase(), f=filter.value;
 const list=products.filter(p=>(f==="all"||p.type===f)&&p.name.toLowerCase().includes(q));
 productsEl.innerHTML=list.map(p=>`<article class="product"><div class="pic">${p.emoji}</div><div class="info"><h3>${p.name}</h3><div class="meta">${p.label} • Sealed</div><div class="price">₹${p.price.toLocaleString("en-IN")}</div><button class="buy" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("");
 document.getElementById("empty").classList.toggle("hidden",list.length>0);
}
function save(){localStorage.setItem("hwhCart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function addToCart(id){let x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({id,qty:1});save();openCart()}
function openCart(){renderCart();document.getElementById("overlay").classList.remove("hidden")}
function closeCart(e){if(!e||e.target.id==="overlay")document.getElementById("overlay").classList.add("hidden")}
function renderCart(){
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML="<p class='note'>Your cart is empty.</p>";document.getElementById("total").textContent="₹0";return}
 let total=0;
 el.innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-row"><div class="thumb">${p.emoji}</div><div><strong>${p.name}</strong><small>₹${p.price.toLocaleString("en-IN")} × ${i.qty}</small></div><button class="remove" onclick="removeItem(${p.id})">Remove</button></div>`}).join("");
 document.getElementById("total").textContent="₹"+total.toLocaleString("en-IN");
}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
function checkout(){if(!cart.length){alert("Your cart is empty.");return}document.getElementById("overlay").classList.add("hidden");document.getElementById("checkoutModal").classList.remove("hidden")}
function placeOrder(e){e.preventDefault();alert("Checkout form works. Payment is not connected yet. Later, this button will connect to your payment gateway.");}
function toggleNav(){document.getElementById("nav").classList.toggle("open")}
search.addEventListener("input",render);filter.addEventListener("change",render);render();updateCount();
