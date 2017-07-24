"use strict";
var c = console;
var d = document;
(window.main = function (User, Menu, Cart) {
    c.log("mainmodule running");

    window.onload = function () {
        var menu = d.getElementById("menu");
        var cart = d.getElementById("cart");
        var checkoutButton = d.getElementById("checkout");
        var userinfo = d.getElementById("userinfo");
        var apps = d.getElementById("apps");
        var salads = d.getElementById("salads");
        var chicken = d.getElementById("chicken");
        var burgers = d.getElementById("burgers");
        var checkoutButton = d.getElementById("checkout");
        var message = d.getElementById("msg"); //"Cart is empty" message
    
        var totalP = d.getElementById("total");
        total.innerText = "$0.00"; //set initial value of total

        function inDOMcart(name) {
            for (var i = 3; i < cart.childNodes.length; i++) {
                if (cart.childNodes[i].firstChild.nodeValue == name) {
                    return true;
                }
            }
            return false;
        }

        function getDOMcartItem(name) {
            for (var i = 3; i < cart.childNodes.length; i++) {
                if (cart.childNodes[i].firstChild.nodeValue == name) {
                    return cart.childNodes[i];
                }
            }
            c.log("Cant find " + name + " in cart DOM");
        }
        //grabs the menu from json file
        Menu.getMenu(function (data) {
            //show appetizers     
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat == 1) {
                    var name = data[i].name;
                    var price = data[i].price;
                    apps.appendChild(createMenuLi(name, price));
                }
                //show salads
                if (data[i].cat == 4) {
                    var name = data[i].name;
                    var price = data[i].price;
                    salads.appendChild(createMenuLi(name, price));
                }
                //show chicken dishes
                if (data[i].cat == 2) {
                    var name = data[i].name;
                    var price = data[i].price;
                    chicken.appendChild(createMenuLi(name, price));
                }
                //show burgers
                if (data[i].cat == 3) {
                    var name = data[i].name;
                    var price = data[i].price;
                    burgers.appendChild(createMenuLi(name, price));
                }
            }
        });

        //gets user information from user.js
        User.getUser(function (data) {

            var userText = "Welcome " + data[0].fname + "! Here is your cart!<br> Your shipping address is: <br>" + data[0].street + "<br>" + data[0].city + ", " + data[0].state + " " + data[0].zip;
            userinfo.innerHTML = userText;
        });

        //getCart Test
         Cart.getCart(function (data) {
             for (var i = 0; i < data.length; i++) {
                 cart.appendChild(createCartLit(data[i].name, data[i].price, data[i].quantity));

             }
         });
        function createCartLit(item, price, quantity) {
            var li = CreateLi(item,price );//creats the list item
            Cart.getTotal(function (total){
                 totalP.innerHTML = "$" + total}); //display the updated total when item added to cart
            var amount = li.childNodes[2].childNodes[1]//grabs amount input element    
            amount.value = quantity;
            amount.min = 1;

            //grabs the deleteButton that deletes the item from the cart
            //assigns styling
            var deleteButton = li.childNodes[1];
            deleteButton.innerText = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.style = "float: right; background-color: #E27D60;";//right alignment

            //creates update button and styles it
            var updateButton = d.createElement("button");
            updateButton.innerText = "Update";
            updateButton.className = "btn btn-default";
            updateButton.style = "float: right; margin-right: 15px;";

            //inserts the update button in the list item
            li.insertBefore(updateButton, li.childNodes[2]); //appends the updateButton to li
            message.style.display = "none";
            checkoutButton.disabled = false;
            return li;
            
        }
        //creates the list items
        function CreateLi(item, cost) {
            var li = d.createElement("li");//creates the actual list item element
            li.style = "font-family: 'Anton', sans-serif;color: #EDF5E1; background-color: #05386B;";
            li.className = " row list-group-item";
            var food = d.createTextNode(item);
            var price = d.createTextNode(cost);

            //creates amount input element for the quantity    
            var amount = d.createElement("input");
            amount.type = "number";
            amount.style = "width :2em;margin-left: 15px; color: #343434;";
            amount.min = 0;
            amount.max = 20;

            //creat a span element to hold the priceNode and the amount element for the quantity    
            var span = d.createElement("span");
            span.style = "float: right; padding-right: 15px;";// right alingment and spacing from the addButton
            span.appendChild(price);
            span.appendChild(amount);

            //create addButton with its styling
            var Button = d.createElement("button");
            Button.className = "btn";
            Button.style = "float: right;background-color: #379683;";

            li.appendChild(food); //appends the food text to li
            li.appendChild(Button); //appends the addButton to li
            li.appendChild(span); //appends the span of price and quantity to li

            return li;
        }
        function getItemData(data){
            return data;
        }

        //creates menu items and all of its components and event handling
        function createMenuLi(item, cost) {
            var li = CreateLi(item, cost);
            var amount = li.childNodes[2].childNodes[1];
            var food = li.childNodes[0].nodeValue;
            var price = li.childNodes[2].childNodes[0].nodeValue;
            amount.value = 0;
            var addButton = li.childNodes[1];
            addButton.innerText = "Add to Cart";
            li.childNodes[2].childNodes[0].nodeValue = "$" + price; //adds the $ sign while keeping the original price value as a number

            return li;
        }
        //creats cart list items
        function createCartLi(listItem) {
         c.log(listItem);
          var li = CreateLi(listItem[0]['name'], listItem[0].price);//creats the list item
           Cart.getTotal(function (total){
                 totalP.innerText = "$" + total;
            }); //display the updated total when item added to cart
            var amount = li.childNodes[2].childNodes[1]//grabs amount input element    
            amount.value = listItem[0].quantity;
            amount.min = 1;

            //grabs the deleteButton that deletes the item from the cart
            //assigns styling
            var deleteButton = li.childNodes[1];
            deleteButton.innerText = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.style = "float: right; background-color: #E27D60;";//right alignment

            //creates update button and styles it
            var updateButton = d.createElement("button");
            updateButton.innerText = "Update";
            updateButton.className = "btn btn-default";
            updateButton.style = "float: right; margin-right: 15px;";

            //inserts the update button in the list item
            li.insertBefore(updateButton, li.childNodes[2]); //appends the updateButton to li 
           return li;
        }

        //CART EVENT HANDLING
        //handles event for when the entire cart is clicked
        cart.addEventListener("click", function (event) {
            //event handling for delete button of each newly added item
            var food = event.target.parentNode.childNodes[0];
            if (event.target.innerText == "Delete") {
                if (confirm("Click OK if you are sure you want to delete " + food.nodeValue + "?")) {
                    Cart.removeItem(food.nodeValue, function (){
                        Cart.getTotal(function (total){
                        totalP.innerText = "$" + total;}); //deletes item from cart array and then gets the total
                        event.target.parentNode.remove(); //removes from display
                    
            });//update the displayed total 
                }
                if (Cart.isEmpty()) {
                    message.style.display = "block";//display message if caret empty
                    checkoutButton.disabled = true;
                }
            }
            //event handling for update button of each newly added item
            if (event.target.innerText == "Update") {
                var amount = event.target.parentNode.childNodes[3].childNodes[1];
                //updates cart DB
                Cart.updateItem(food.nodeValue, amount.value, function (){
                    ;
                }); 
                var updateButton = event.target.parentNode.childNodes[2];
                updateButton.className = "btn btn-default";
                Cart.getTotal(function (total){
                    totalP.innerText = "$" + total;}); //update displayed total
                
            }
        });

        //event handling for when the quantity changes of each newly added item
        cart.addEventListener("change", function (event) {
            var updateButton = event.target.parentNode.parentNode.childNodes[2];
            updateButton.className = "btn btn-success"; //changes color when you change the quantity
        });

        //MENU EVENT HANDLING
        //for click
        menu.addEventListener("click", function (event) {
            //event handling for add button of each newly added item
            if (event.target.innerText == "Add to Cart") {
                var amount = event.target.parentNode.childNodes[2].childNodes[1];
                var food = event.target.parentNode.childNodes[0];
                var price = event.target.parentNode.childNodes[2].childNodes[0];
                price = price.nodeValue.replace("$", "");
                if (amount.value == 0) {
                    alert("Enter amount");
                }
                else {
                    if (Cart.inCart(food.nodeValue)) {
                        Cart.addItem(food.nodeValue, price, amount.value);
                        var cartItem = getDOMcartItem(food.nodeValue);
                        var cartQ = Number.parseInt(cartItem.childNodes[3].childNodes[1].value);
                        var quantity = Number.parseInt(amount.value);
                        cartItem.childNodes[3].childNodes[1].value = quantity + cartQ;
                        Cart.getTotal(function (total){
                            totalP.innerText = "$" + total;}); //display the updated total when item added to cart
                        amount.value = 0;
                    }
                    else {
                        
                        //add item to cart array
                        Cart.addItem(food.nodeValue, price, amount.value, function () {
                            // cart.childNodes.forEach( function (item){
                            //     item.remove();
                            Cart.getCart(function (c) {
                            //go through cart array and add to DOM
                            c.forEach(function (item, i) {
                               // if item already in DOM and the quantity in DOM and cart are different, make DOM = cart quantity
                                   if (inDOMcart(item["name"])){
                                        var li = getDOMcartItem(item["name"]);
                                        //if (Number.parseInt(li.childNodes[3].childNodes[1].value)!=item["quantity"]){
                                            var q = Number.parseInt(li.childNodes[3].childNodes[1].value);
                                            q+=amount.value;
                                            li.childNodes[3].childNodes[1].value =q;
                                        //}
                                    }
                                 else {
                                    Cart.getItem (item["menu_id"], function(data){
                                        cart.appendChild(createCartLi(data));//append the new items that aren't in the cart array

                                    });
                                }
                            }, this);
                        });        
                            });
                            
                      
                amount.value = 0;
                            message.style.display = "none";
                            checkoutButton.disabled = false;
                    }
                }
            }
        });
    };

})(window.User, window.menu, window.cart /*making sure this function is aware of it*/ || ({})); //IIFE fu n