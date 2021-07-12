const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchdata();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito();   
    } 
});

cards.addEventListener('click',e => {addCarrito(e)});
items.addEventListener('click',e => {btnAccion(e)})

const fetchdata = async() => {
    try {
        const resp = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM178498');
        const data = await resp.json();
        // let result = data.results;  
        console.log(data);
        //console.log(result);
        data.forEach(element => {
        templateCard.querySelector('img').setAttribute("src",element.imagen);
        templateCard.querySelector('h5').textContent = element.nombre;
        templateCard.querySelector('p').textContent = `${element.precio}`;
        templateCard.querySelector('.btn-dark').dataset.id = element.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
        });
        cards.appendChild(fragment);
    }   catch (error) {
            console.log(error);
        }
};

fetchdata();