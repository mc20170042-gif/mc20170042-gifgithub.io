const products=[
{id:1,c:"Camisetas",n:"Essential Oversize Black",p:24.99,o:34.99,b:"BESTSELLER",i:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"},
{id:2,c:"Camisetas",n:"Heavyweight White Tee",p:22.99,o:29.99,b:"NUEVO",i:"https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85"},
{id:3,c:"Camisetas",n:"Street Graphic Tee",p:27.99,o:39.99,b:"-30%",i:"https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85"},
{id:4,c:"Camisetas",n:"Minimal Logo Tee",p:19.99,o:24.99,b:"",i:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85"},
{id:5,c:"Zapatillas",n:"Urban Runner 01",p:69.99,o:89.99,b:"NUEVO",i:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"},
{id:6,c:"Zapatillas",n:"Classic Court White",p:64.99,o:79.99,b:"BESTSELLER",i:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85"},
{id:7,c:"Zapatillas",n:"Street Runner Grey",p:74.99,o:99.99,b:"-25%",i:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85"},
{id:8,c:"Zapatillas",n:"Clean Sneaker",p:59.99,o:74.99,b:"",i:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=900&q=85"}
];
let cart=[],cat="Todos",selected=null;
const $=s=>document.querySelector(s),money=n=>n.toFixed(2).replace(".",",")+" €";
function render(){
 let q=$("#search").value.toLowerCase(), a=products.filter(x=>(cat==="Todos"||x.c===cat)&&(x.n.toLowerCase().includes(q)));
 let sort=$("#sort").value;if(sort==="low")a.sort((x,y)=>x.p-y.p);if(sort==="high")a.sort((x,y)=>y.p-x.p);
 $("#grid").innerHTML=a.map(x=>`<article class="card"><div class="pic">${x.b?`<span class="badge">${x.b}</span>`:""}<button class="heart" onclick="fav(this)">♡</button><img src="${x.i}"></div><div class="info"><small>${x.c}</small><h3>${x.n}</h3><div class="prices"><span class="price">${money(x.p)}</span>${x.o?`<span class="old">${money(x.o)}</span>`:""}</div><button class="quick" onclick="openProduct(${x.id})">Ver producto</button></div></article>`).join("")||"<p>No encontramos productos.</p>";
}
function fav(b){b.textContent=b.textContent==="♡"?"♥":"♡"}
function openProduct(id){selected=products.find(x=>x.id===id);$("#mImg").src=selected.i;$("#mCat").textContent=selected.c;$("#mName").textContent=selected.n;$("#mPrice").textContent=money(selected.p);$("#modal").classList.add("open")}
function add(id){cart.push(products.find(x=>x.id===id));drawCart();$("#modal").classList.remove("open");$("#drawer").classList.add("open")}
function drawCart(){$("#count").textContent=cart.length;$("#items").innerHTML=cart.length?cart.map((x,i)=>`<div class="cartItem"><img src="${x.i}"><div><b>${x.n}</b><p>${money(x.p)}</p><button onclick="del(${i})">Eliminar</button></div></div>`).join(""):"<p>Tu bolsa está vacía.</p>";$("#total").textContent=money(cart.reduce((s,x)=>s+x.p,0))}
function del(i){cart.splice(i,1);drawCart()}
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");cat=b.dataset.cat;render()});
$("#search").oninput=render;$("#sort").onchange=render;$("#cartBtn").onclick=()=>$("#drawer").classList.add("open");$("#closeCart").onclick=()=>$("#drawer").classList.remove("open");$("#closeModal").onclick=()=>$("#modal").classList.remove("open");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("open")};$("#modalAdd").onclick=()=>add(selected.id);$("#checkout").onclick=()=>alert("Aquí conectaremos tu sistema de pago.");document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();$("#search").focus()}});render();drawCart();