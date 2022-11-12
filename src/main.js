const cards = document.querySelector(".clothesCards");


const items = [
    {   
        id: 1,
        price: 14.00,
        category: "Hoodies",
        img: "https://academlo-store.netlify.app/assets/img/featured1.png",
        quantity: 10,
    },

    {   
        id: 2,
        price: 24.00,
        category: "Shirts",
        img: "https://academlo-store.netlify.app/assets/img/featured2.png",
        quantity:15,
    },

    {   
        id: 3,
        price: 24.00,
        category: "Sweartshirts",
        img: "https://academlo-store.netlify.app/assets/img/featured3.png",
        quantity: 20,
    }
    
];

let str = '';

items.forEach(product => {
    str += `<div class="cardFull">
            <div class="button" data-idUser='${product.id}'>+</div>
                    <div class="card">
                    <img src="${product.img}" alt="" srcset="">
                    </div>
                    <div class="cardFooter">
                    <div class="priceContainer">
                        <div class="price">$${product.price}.00</div>
                        <div class="priceSeparator"></div>
                        <div class="stock">stock: ${product.quantity}</div>
                    </div>
                    <div class="typeClothes">${product.category}</div>
                </div>
            </div>`;
});

cards.innerHTML = str;

const pusrchase = {}
const purchaseCart = document.querySelector(".cartMainEverything");
const totalP = document.querySelector('.alignContainer')

let cartCar = `<div class="imageCart">
     <img src="https://academlo-store.netlify.app/assets/img/empty-cart.png">
 </div> 
 <h2>You card is empaty</h2>
 `
purchaseCart.innerHTML = cartCar



let buyProducts = []

document.addEventListener('click', function (event) {
    if (event.target.classList.contains("button")) {
        const idClothes = event.target.dataset.iduser;

        let currentClothes = null;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(idClothes)) {
                currentClothes = items[i];
            }
        }

        if (pusrchase[currentClothes.id]) {
            pusrchase[currentClothes.id].amount++;
        } else {
            pusrchase[currentClothes.id] = currentClothes;
            pusrchase[currentClothes.id].amount = 1;
        }

        const order = Object.values(pusrchase)
        const amount = document.querySelector('#amount');
        amount.textContent = Object.entries(pusrchase).length;

        let array = '';

        
        order.forEach(product => {
            array += `<div class="shopContent">
            <div class="imgCartShop">
            <img src="${product.img}" alt="">
            </div>
            <div class="infoClothes">
            <div class="ProductInfo">
            <div class="clothesName">${product.category}</div>
            <div class="clothesprice">Stock: ${product.quantity} | $${product.price}.00</div>
            <div class="subTotal">Subtotal: $${(parseInt(product.price) * (product.amount))}.00</div>
            </div>
            <div class="btnCart">
            <div data-id="${product.id}" class="operator remove">-</div>
            <div class="quantify">${product.amount} units</div>
            <div data-id="${product.id}" class="operator add">+</div>
            <i data-id="${product.id}" class=" trash fi fi-rr-trash"></i>
            <i class="bx bx-trash-alt cart__amount-trash" data-id="2"></i>
            </div>
            </div>
            </div>`
        });
        
        buyProducts = order;
       
        purchaseCart.innerHTML = array

    };

    if (event.target.classList.contains("add")) {
        let elementFinded = buyProducts.find((elementErase) =>
            elementErase.id == event.target.dataset.id
        )

        console.log(elementFinded.amount++)
        let array = '';

        buyProducts.forEach(product => {
            array += `<div class="shopContent">
               <div class="imgCartShop">
               <img src="${product.img}" alt="">
               </div>
               <div class="infoClothes">
                   <div class="ProductInfo">
                       <div class="clothesName">${product.category}</div>
                       <div class="clothesprice">Stock: ${product.quantity} | $${product.price}.00</div>
                       <div class="subTotal">Subtotal: $${(parseInt(product.price) * (product.amount))}.00</div>
                   </div>
                   <div class="btnCart">
                       <div data-id="${product.id}" class="operator remove">-</div>
                       <div class="quantify">${product.amount} units</div>
                       <div data-id="${product.id}" class="operator add">+</div>
                       <i data-id="${product.id}" class=" trash fi fi-rr-trash"></i>
                   </div>
               </div>
           </div>`
        });

        purchaseCart.innerHTML = array
    }

    if (event.target.classList.contains("remove")) {
        let elementFinded = buyProducts.find((elementErase) =>
            elementErase.id == event.target.dataset.id)

        if (elementFinded.amount == 0) {
            console.log('hola')
            buyProducts.splice(buyProducts.findIndex((elementErase) =>
                elementErase.id == event.target.dataset.id
            ),1) }

            console.log(elementFinded.amount--)
        let array = '';

        buyProducts.forEach(product => {
            array += `<div class="shopContent">
               <div class="imgCartShop">
               <img src="${product.img}" alt="">
               </div>
               <div class="infoClothes">
                   <div class="ProductInfo">
                       <div class="clothesName">${product.category}</div>
                       <div class="clothesprice">Stock: ${product.quantity} | $${product.price}.00</div>
                       <div class="subTotal">Subtotal: $${(parseInt(product.price) * (product.amount))}.00</div>
                   </div>
                   <div class="btnCart">
                       <div data-id="${product.id}" class="operator remove">-</div>
                       <div class="quantify">${product.amount} units</div>
                       <div data-id="${product.id}" class="operator add">+</div>
                       <i data-id="${product.id}" class=" trash fi fi-rr-trash"></i>
                   </div>
               </div>
           </div>`
        });

        purchaseCart.innerHTML = array
    }

    function totalValue() {
        let total = 0;
        buyProducts.forEach((valueTotal) => total += (valueTotal.price * valueTotal.amount))
        
        let dataTotalAmount = `<div id="totalPay" class="total">$Total  ${total}</div>
        <button><i class='bx bxs-check-shield'></i>Checkout</button>`
        
        totalP.innerHTML = dataTotalAmount
        console.log(dataTotalAmount)
    }
    
    
    if (event.target.classList.contains("trash")){
        buyProducts.splice(buyProducts.findIndex((elementErase) =>
        elementErase.id == event.target.dataset.id
        ),1)

        let array = '';

        buyProducts.forEach(product => {
            array += `<div class="shopContent">
               <div class="imgCartShop">
               <img src="${product.img}" alt="">
               </div>
               <div class="infoClothes">
                   <div class="ProductInfo">
                       <div class="clothesName">${product.category}</div>
                       <div class="clothesprice">Stock: ${product.quantity} | $${product.price}.00</div>
                       <div class="subTotal">Subtotal: $${(parseInt(product.price) * (product.amount))}.00</div>
                   </div>
                   <div class="btnCart">
                       <div data-id="${product.id}" class="operator remove">-</div>
                       <div class="quantify">${product.amount} units</div>
                       <div data-id="${product.id}" class="operator add">+</div>
                       <i data-id="${product.id}" class=" trash fi fi-rr-trash"></i>
                   </div>
               </div>
           </div>`
        });

        purchaseCart.innerHTML = array
    }

    totalValue();
});

const sun = document.querySelector('.sol');
const moon = document.querySelector('.luna');
const body = document.querySelector('body')

let dark = moon.addEventListener('click', function switchDarkMode() {
    moon.classList.toggle("hidden");
    if (moon.classList.contains("hidden")) {
        sun.classList.remove("hidden");
        body.classList.add("dark")
    }
});

let light =sun.addEventListener('click', function switchLightMode() {
    sun.classList.toggle("hidden");
    if (sun.classList.contains("hidden")) {
        moon.classList.remove("hidden");
        body.classList.remove("dark");
    }
});


const clothesCardsContainer = document.querySelector('.cartClothesContainer')
const shopping = document.querySelector('.svgContainer')
const closeTag = document.querySelector('.closeTag')

shopping.addEventListener('click', function () {
    clothesCardsContainer.classList.add('show_cartClothesContainer')
});

closeTag.addEventListener('click', function () {
    clothesCardsContainer.classList.remove('show_cartClothesContainer')
})
