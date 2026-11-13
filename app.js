//SELECT ELEMENTS
// .............2ND..........
const productsEL = document.querySelector(".products");

//...........12TH.......
const cartItemsEl = document.querySelector(".cart-items");

//......19TH.....
const subtotalEl = document.querySelector(".subtotal");

//.......21....
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");



//RENDER PRODUCTS
//....................3RD.........
        //we are using += below because we do not want to override productsEL 
        // innerHtml but we want to keep the last rendered product. we are using
        //  the backticks so that we can use the multiplying strength
//........4TH......Change img src and alt that has the product name price, and description
//......5th....add an onclick event addToCart() instead of an event listener on add-to-cart


    function renderProducts() {
    productsEL.innerHTML = "";

    products.forEach((product) => {
        productsEL.innerHTML += `
            <div class="item">
                <div class="item-container">

                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>

                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2>$${product.price.toFixed(2)}</h2>
                        <p>${product.description}</p>
                    </div>

                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="Add to wishlist">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})" >
                        <img src="./icons/bag-plus.png" alt="Add to cart">
                    </div>

                </div>
            </div>
        `;
    });
}

renderProducts();
// ........7TH....When we click on the add to cart image/button on a product
//  we want to add the product object in a new array called cart

//CART ARRAY
//let cart = [];
//........24TH.......we want when we refresh the page the items to remain on the page
// so we need to get the cart from local storage and render the cart
//the cart now is being retrieved from localStorage without checking whether anything has been saved yet,
//When this is the first visit, localStorage.getItem("CART") returns null,
//  Your cart should instead start as an empty array and that is why we include ( || [] ).
let cart = JSON.parse(localStorage.getItem("CART")) || [];
//....24TH...we are using update function below because it will call our rendercart() and renderSubtotal()
updateCart();

//ADD TO CART
function addToCart(id){
//.....9TH....CHECK IF PRODUCT ALREADY EXIST IN CART
if(cart.some((item) => item.id === id)){
changeNumberOfUnits("plus", id);      // ........19TH......we no longer want the notification once we add the same item to cart alert("product already in cart!") we only want to change the number changeNumberOfUnits("plus", id)
return; 

} else {
const item = products.find(
    (product) => product.id === id
);

    cart.push({
        ...item,
        numberOfUnits: 1,
    });

}

updateCart();

}

// update cart......13th....
function updateCart(){
    renderCartItems();
    renderSubtotal();          //.......19TH.....
      
//....23RD... SAVE TO CART LOCAL STORAGE, we can say the key is CART WHICH WE WILL HAVE TO SPECIFY TO GET THE ITEM 
// and value will be the cart itself
localStorage.setItem( "CART", JSON.stringify(cart));
}

//...19TH.........Calculate and render subtotal
function renderSubtotal(){
    let totalPrice = 0,
    totalItems = 0;


cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
});
//......19TH...NB ONE OF THE SIGN $ BELOW IS TO REPRESENT THE CURRENCY
//.......20TH....toFixed.....below...
subtotalEl.innerHTML = ` subtotal (${totalItems} items) : $${totalPrice.toFixed(2)} `

//.....21ST......
totalItemsInCartEl.innerHTML = totalItems;
}
// render cart items...13th
function renderCartItems(){
    cartItemsEl.innerHTML = "";   //.....14TH...TO CLEAR THE ITEMS THAT WERE IN THE CART BEFORE
    cart.forEach((item)=>{
        cartItemsEl.innerHTML += `
        <div class="cart-item">
                    <div class="item-info" onClick = "removeItemFromCart(${item.id})">     
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onClick="changeNumberOfUnits('minus', ${item.id})">-</div>   
                        <div class="number">${item.numberOfUnits}</div>     
                        <div class="btn plus" onClick="changeNumberOfUnits('plus', ${item.id})">+</div>  
                    </div>
                </div>
                `
    }) 
}

//........22ND....REMOVE ITEM FOM CART
//....22ND... CALL THE FUNCTION  BY ADDING AN EVENT LISTENER ABOVE... <div class="item-info" onClick = "removeItemFromCart(${item.id})"> 
function removeItemFromCart (id){
    cart = cart.filter((item)=> item.id !== id);

    updateCart();
}


// //....15TH...Add onclick event to change numberOfUnits in the cart .... onClick="changeNumberOfUnits('plus', ${item.id})
// ...15TH...onClick="changeNumberOfUnits('MINUS', ${item.id})
//.....16TH... change number of units for an item

function changeNumberOfUnits(action, id){
    cart = cart.map((item) =>{
let numberOfUnits = item.numberOfUnits;

if(item.id === id){
    if (action === "minus" && numberOfUnits >1){          //....18TH.... DECRAESE NUMBER OF UNITS IF ITS GREATER THAN 1  ( && numberOfUnits >1)
        oldNumberOfUnits--;
    }
    else if (action === "plus" && numberOfUnits < item.instock){     //......18TH...INCREASE numberOfUnits if item is in stock (&& numberOfUnits < item.instock)
        numberOfUnits++;
    }
}
return{
    ...item,
    numberOfUnits:numberOfUnits,
};
    });

    updateCart();   //......17TH.......
}
//..............16TH....... to add or minus we will go into the cart look for the item with the same ID the change number 
// of units based on the (action either plus or minus).....we will use (.map) to run throught every object in the array,
//  in the end it will retun a new updated array which is ( ....item, ) if nothing has changed (numberOfUnits:oldNumber of units,)
//return{
// ...item,
//numberOfUnits:oldNumber of units,}
//......8TH... use ( .find ) to check if the product has been added to the cart array... 
// here we are identifying the product using variable const item ....
// const item = products.find ((product) => product.id===id);...
// console.log (item); ....to check if it registers on the console
// now save it into the new array which is the cart using (push)... cart.push(item);
//then console.log(cart);...click on the product you want to add and open your console, 
//you will see the cart array with the objects which in this case are the products
// when you add a product to the cart twice we can see it appears twice and we dont want that.
//  so we use ...( if ) to check if the product has been added to cart and ( .some )
//........9TH......( .some )... we want an alert when the product had already been added
// and continue to add it but in terms of quantity not the whole image again so we use ( .some )
//if(cart.some((item) => item.id === id)){alert("product already in cart!")}
//once checked add item/product to cart using ( else )....
// else {
// const item = products.find
// ((product) => product.id===id);}
// cart.push(item);
// console.log(cart);}

//............10TH...........we now want to add (number of units) property to the product object
//  when we add a product to the cart FOR THIS CASE SPECIFICALLY BUT WE NORMALLY GET IT IN THE DATABASE.
//so instead of pushing the item with the old properties, 
// we are going to desturucture our item sing the ( ... ) the add the new property
//called numberOfUnits which is set to 1 
//cart.push({...item, numberOfUnits:1,});
//.....11TH....WE NOW WANT TO INCREASE AND DECREASE numberOfUnits, and remove the earlier alert
// first get rid of the part console.log(cart);}
//CREATE A NEW FUNCTION to update the cart after the products and subtotal has been rendered before... updateCart();
//it will look like this
// function updateCart(){
// renderCartItems();
// renderSubtotal)();} 

// so lets first render the cart items....renderCartItems(); CUT/REMOVE the code in index.html 
// that contains  item in cart curretnly ( class="cart-item) and paste it in app.js as demonstrated
//
//......6TH...................ADD TO CART ...this is a demonstration to see if renders 
// on the console
// ADD TO CART
//  function addToCart(id)
//{console.log(id);}