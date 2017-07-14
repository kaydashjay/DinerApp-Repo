"use strict";
var c= console;
var d = document;
(window.main = function(User, Menu, Cart){
    c.log("mainmodule running");

    window.onload = function (){
        var menu = d.getElementById("menu");
        var cart=d.getElementById("cart");
        var checkoutButton = d.getElementById("checkout");
        var userinfo=d.getElementById("userinfo");
        var apps = d.getElementById("apps");
        var salads = d.getElementById("salads");
        var chicken = d.getElementById("chicken");
        var burgers = d.getElementById("burgers");

        var total=d.getElementById("total");
        total.innerText="$0.00"; //set initial value of total

      Menu.getMenu(function (data) {
          //show appetizers
          for (var i = 0; i < data.length; i++){
              if (data[i].Type == "Appetizers") {
                  var name = data[i].Name;
                  var price = data[i].Price;
                  apps.appendChild(createMenuLi(name, price));
              }
                  //show salads
              if (data[i].Type == "Salads") {
                  var name = data[i].Name;
                  var price = data[i].Price;
                  salads.appendChild(createMenuLi(name, price));
              }
              //show chicken dishes
              if (data[i].Type == "Chicken") {
                  var name = data[i].Name;
                  var price = data[i].Price;
                  chicken.appendChild(createMenuLi(name, price));
              }
              //show burgers
              if (data[i].Type == "Burgers") {
                  var name = data[i].Name;
                  var price = data[i].Price;
                  burgers.appendChild(createMenuLi(name, price));
              }

              
            }
            
      });

   //gets user information from user.js
    User.getUser(function (data){
        var userText = "Welcome "+ data.fname+"! Here is your cart!<br> Your shipping address is: <br>"+data["address[streetAddress]"]+"<br>"+data["address[city]"]+", "+data["address[state]"]+" "+data["address[zipcode]"];
        userinfo.innerHTML=userText;
    });

    //creates menu items and all of its components and event handling
function createMenuLi(item, cost){
    var li = d.createElement("li");
    li.style = "font-family: 'Anton', sans-serif;color: #EDF5E1; background-color: #05386B;";
    li.className=" row list-group-item";
    var food=d.createTextNode(item);
    var price=d.createTextNode(cost);
    var price2 = d.createTextNode(price.nodeValue);
    price2.nodeValue = "$"+price2.nodeValue;//adds the $ sign while keeping the original price value as a number
    var message = d.getElementById("msg");

//creates amount input element for the quantity
    var amount = d.createElement("input");
    amount.type = "number";
    amount.value = 0;
    amount.style = "width :2em;margin-left: 15px; color: #343434;";
    amount.min = 0;
    amount.max=20

//creat a span element to hold the priceNode and the amount element for the quantity
    var span = d.createElement("span");
    span.style = "float: right; padding-right: 15px;";// right alingment and spacing from the addButton
    span.appendChild(price2);
    span.appendChild(amount);

//creat addButton with its styling
    var addButton = d.createElement("button");
    addButton.innerText="Add to Cart";
    addButton.className = "btn btn-success";
    addButton.style="float: right;background-color: #379683;";
    
    li.appendChild(food); //appends the food text to li
    li.appendChild(addButton); //appends the addButton to li
    li.appendChild(span); //appends the span of price and quantity to li

     //handles click event when a list item is clicked
    li.addEventListener("click", function(event){
        //event handling for add button of each newly added item
        if (event.target.innerText == "Add to Cart"){
            if (amount.value == 0){
            alert("Enter amount");
        }
        else {
           if (Cart.inCart(food.nodeValue)){
                alert("Item already in cart. If you want more than one, please update amount in Cart.");
                amount.value=0;
                }    
           else{
            //add item to cart array
                Cart.addItem(food.nodeValue,price.nodeValue, amount.value);
                cart.appendChild(createCartLi(food.nodeValue));
                amount.value=0;
                message.style.display = "none";
                checkoutButton.disabled=false;
                }
        }  
        }  
        });
   return li;
}

function createCartLi(item){
    var li = d.createElement("li"); //creates the actual list item element
    li.className=" row list-group-item";
    li.style = "font-family: 'Anton', sans-serif;color: #EDF5E1; background-color: #05386B;";
    var listItem = Cart.getItem (item);//get's the item with its keys and values
    var message = d.getElementById("msg"); //"Cart is empty" message
    var checkoutButton = d.getElementById("checkout");
    total.innerText="$"+Cart.getTotal(); //display the updated total when item added to cart

    var food=d.createTextNode(listItem.name);
    var price=d.createTextNode(listItem.price);
    var price2=d.createTextNode(price.nodeValue);
    price2.nodeValue = "$"+price2.nodeValue; //adds the $ sign while keeping the original price value as a number

    //creates input element for the quantity
    var amount = d.createElement("input");
    amount.type = "number";
    amount.value = listItem.quantity;
    amount.style = "width :2em;margin-left: 15px; color: #343434;";
    amount.min = 1;
    amount.max=20;
    
     // creates span tag to hold the  price node and the amount input element
    var span = d.createElement("span");
    span.style = "float: right; padding-right: 15px;";
    span.appendChild(price2);
    span.appendChild(amount);

    //creates the deleteButton that deletes the item from the cart
    //assigns styling
    var deleteButton = d.createElement("button");
    deleteButton.innerText="Delete";
    deleteButton.className = "btn btn-danger";
    deleteButton.style="float: right; background-color: #E27D60;";//right alignment

//creates update button and styles it
    var updateButton = d.createElement("button");
    updateButton.innerText="Update";
    updateButton.className = "btn btn-default";
    updateButton.style="float: right; margin-right: 15px;";
   
     li.appendChild(food); //appends the food name to li
     li.appendChild(deleteButton); //appends the delete Button to li
     li.appendChild(updateButton); //appends the updateButton to li
     li.appendChild(span); //appends the span of price ans quantity of each item to li
    
//handles event for when the entire list item is clicked
    li.addEventListener("click", function (event){
//event handling for delete button of each newly added item
        if (event.target.innerText == "Delete"){
            if (confirm("Click OK if you are sure you want to delete "+ food.nodeValue + "?")){
                Cart.removeItem(food.nodeValue); //deletes item from cart array
                event.currentTarget.remove(); //removes from display
                total.innerText="$"+Cart.getTotal();//update the displayed total 
            }
        if (Cart.isEmpty()){
           message.style.display = "block";//display message if caret empty
           checkoutButton.disabled=true; 
        }
    }
     //event handling for update button of each newly added item
    if (event.target.innerText == "Update"){
        Cart.updateItem(food.nodeValue, amount.value); //updates cart array
        updateButton.className="btn btn-default"; 
        total.innerText="$"+Cart.getTotal(); //update displayed total
    }
});
//event handling for when the quantity changes of each newly added item
 li.addEventListener("change", function (event){
        updateButton.className="btn btn-success"; //changes color when you change the quantity
    })
   return li;
;}
    };

 })( window.User, window.menu, window.cart /*making sure this function is aware of it*/ || ({})); //IIFE fu n