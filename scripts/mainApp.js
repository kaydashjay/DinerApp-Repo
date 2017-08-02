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
        var saveMenuItemModal = d.getElementById("addMenuItem");
        var editMEnuItemModal = d.getElementById("editMenuItemModal");
        // var user = d.getElementById("user");
        // var pwd = d.getElementById("pwd");
        // var main = d.getElementById("main");
        // var form = d.getElementById("signinForm");
         
    //     form.addEventListener("submit", function (event){
    //        main.style = "display:block;";
    //       //c.log(event.target.innerText);
    //         //if (event.target.innerText == "Sign in"){
                
    //             User.authenticate(user.value, pwd.value, function (data){
    //             c.log(data);
    //             if (data == null){
    //                 alert("Username or Password is incorrect");
    //             }
    //             else if (data.username == "admin"){
    //                 c.log("hello");
    //                 main.style = "display:block;";
    //             }
    //             else{

    //             }
    //     });
    //        // }
        
    //     })
        
    // }
        var totalP = d.getElementById("total");
        totalP.innerText = "$0.00"; //set initial value of total

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
        getMenu();
        function getMenu(){
            Menu.getMenu(function (data) {
            //show appetizers     
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat == 1) {
                    var name = data[i].name;
                    var price = data[i].price.toFixed(2);
                    apps.appendChild(createMenuLi(name, price));
                }
                //show salads
                if (data[i].cat == 4) {
                    var name = data[i].name;
                    var price = data[i].price.toFixed(2);
                    salads.appendChild(createMenuLi(name, price));
                }
                //show chicken dishes
                if (data[i].cat == 2) {
                    var name = data[i].name;
                    var price = data[i].price.toFixed(2);
                    chicken.appendChild(createMenuLi(name, price));
                }
                //show burgers
                if (data[i].cat == 3) {
                    var name = data[i].name;
                    var price = data[i].price.toFixed(2);
                    burgers.appendChild(createMenuLi(name, price));
                }
            }
        });
        }
        
        
 /******************ADD MENU ITEM******************** */
        saveMenuItemModal.addEventListener("click", function (event) {
        if (event.target.innerText == "Save changes"){
            var name = d.getElementById("Name");
            var price = d.getElementById("Price");
            var category = d.getElementById("category");
            var alert = d.getElementById("addAlert");     

                if (isNaN(Number.parseFloat(price.value))){
                    alert.className = " alert alert-warning";
                    alert.innerHTML = "<strong>Warning!</strong> '"+price.value+"' is not a number";
                    alert.style = "display:block;"; 

                }
                else{
                    Menu.addItem(name.value, price.value, category.value, function (){
                    alert.className = "alert alert-success";
                    alert.innerHTML = "<strong>Success!</strong> You have updated '"+name.innerText+"'";
                    alert.style = "display:block;";                    switch (category.value){
                        case 1: 
                            apps.appendChild(createMenuLi(name.value, price.value));;
                        case 2:
                            chicken.appendChild(createMenuLi(name.value, price.value));
                        case 3:
                            burgers.appendChild(createMenuLi(name.value, price.value));
                        case 4:
                            salads.appendChild(createMenuLi(name.value, price.value));
                    }
                });
                }
                
         }
        });
         /******************EDIT MENU ITEM******************** */
        editMEnuItemModal.addEventListener("click", function (){
            var name = d.getElementById("editItemLabel");
            var price = d.getElementById("editPrice");
            var category = d.getElementById("editCategory");
            var alert = d.getElementById("editAlert");
            var changedPrice;
            var changedCategory;

            if (event.target.innerText == "Save changes"){
                changedPrice = d.getElementById("editPrice");
                changedCategory = d.getElementById("editCategory");

                if (isNaN(Number.parseFloat(price.value))){
                   alert.className = " alert alert-warning";
                    alert.innerHTML = "<strong>Warning!</strong> '"+price.value+"' is not a number";
                    alert.style = "display:block;";
                }
                else{
                     Menu.updateItem(name.innerText.toString(),changedPrice.value, changedCategory.value, function (){
                    alert.className = "alert alert-success";
                    alert.innerHTML = "<strong>Success!</strong> You have updated '"+name.innerText+"'";
                    alert.style = "display:block;";
                  });
                }
            }
            if (event.target.innerText == "Close"){
                alert.style = "display:none;"
                
                     while (apps.hasChildNodes()) {
                    apps.removeChild(apps.lastChild);
                }
                while (burgers.hasChildNodes()) {
                    burgers.removeChild(burgers.lastChild);
                }
                while (chicken.hasChildNodes()) {
                    chicken.removeChild(chicken.lastChild);
                }
                while (salads.hasChildNodes()) {
                    salads.removeChild(salads.lastChild);
                }
                getMenu();
                
               
            }  
                          
           
            
        });
        //gets user information from user.js
        User.getUser(function (data) {

            var userText = "Welcome " + data.fname + "! Here is your cart!<br> Your shipping address is: <br>" + data.street + "<br>" + data.city + ", " + data.state + " " + data.zip;
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
                 totalP.innerHTML = "$" + total;}); //display the updated total when item added to cart
            var amount = li.childNodes[2].childNodes[1]//grabs amount input element    
            amount.value = quantity;
            amount.min = 1;

            var price = li.childNodes[2].childNodes[0].nodeValue;
            li.childNodes[2].childNodes[0].nodeValue = "$"+price;

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
            amount.style = "width :3em;margin-left: 15px; color: #343434;";
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
       

        //creates menu items and all of its components and event handling
        function createMenuLi(item, cost) {
            var li = CreateLi(item, cost);
            var amount = li.childNodes[2].childNodes[1];
            var food = li.childNodes[0].nodeValue;
            var price = li.childNodes[2].childNodes[0].nodeValue;
            var editButton = d.createElement("button");
            editButton.className="btn btn-success";
            editButton.setAttribute("data-toggle", "modal");
            editButton.setAttribute("data-target", "#editMenuItemModal");
            editButton.innerText = "Edit";
            editButton.style = "float: left; margin-right: 15px;"
            li.insertBefore(editButton, li.childNodes[0]);
            var price = li.childNodes[3].childNodes[0].nodeValue;

            amount.value = 0;
            var addButton = li.childNodes[2];
            addButton.innerText = "Add to Cart";
            li.childNodes[3].childNodes[0].nodeValue = "$" + price; //adds the $ sign while keeping the original price value as a number

            return li;
        }
        //creats cart list items
        function createCartLi(listItem) {
            c.log(listItem);
          var li = CreateLi(listItem.name, listItem.price);//creats the list item
           Cart.getTotal(function (total){
                 totalP.innerText = "$" + total;
            }); //display the updated total when item added to cart
            var amount = li.childNodes[2].childNodes[1]//grabs amount input element    
            amount.value = listItem.quantity;
            amount.min = 1;

            var price = li.childNodes[2].childNodes[0].nodeValue;
            li.childNodes[2].childNodes[0].nodeValue = "$" + price; //adds the $ sign while keeping the original price value as a number

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
            var food = event.target.parentNode.childNodes[0];

 /**************************UPDATE**********************/
            //event handling for update button of each newly added item
            if (event.target.innerText == "Update") {
                var amount = event.target.parentNode.childNodes[3].childNodes[1];
                //updates cart DB
                Cart.updateItem(food.nodeValue, amount.value, function (){
                    Cart.getTotal(function (total){
                    totalP.innerText = "$" + total;
                })
                });
       
                var updateButton = event.target.parentNode.childNodes[2];
                    updateButton.className = "btn btn-default";
            }
            /*****************DELETE************************* */
            //event handling for delete button of each newly added item
            if (event.target.innerText == "Delete") {
                if (confirm("Click OK if you are sure you want to delete " + food.nodeValue + "?")) {
                    Cart.removeItem(food.nodeValue, function (){
                        Cart.getTotal(function (total){
                            totalP.innerText = "$" + total; //deletes item from cart array and then gets the total
                        event.target.parentNode.remove(); //removes from display 
            });//update the displayed total 
            Cart.getCart(function (data){
            if (data.length ==0){
                message.style.display = "block";//display message if caret empty
                checkoutButton.disabled = true;
            }
          });  
                });
       
            
                }
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
            
            /************EDIT BUTTON************** */
            if (event.target.innerText == "Edit") {
                var item =  event.target.nextSibling.nodeValue;
                d.getElementById("editItemLabel").innerText = item
                Menu.getItem(item, function (data){
                    var price = d.getElementById("editPrice");
                    var category = d.getElementById("editCategory");
                    price.value=data.price;
                    category.value = data.cat;
                });
            }
            /*****************ADD TO CART********************* */
            //event handling for add button of each newly added item
            if (event.target.innerText == "Add to Cart") {
                var amount = event.target.parentNode.childNodes[3].childNodes[1];
                var food = event.target.parentNode.childNodes[1];
                //var price = event.target.parentNode.childNodes[3].childNodes[0];
                //price = price.nodeValue.replace("$", "");
                if (amount.value == 0) {
                    alert("Enter amount");
                }
                else {
                    Menu.getItem(food.nodeValue, function (menuItem){
                     Cart.addItem(menuItem.name, menuItem.price, amount.value, function () {
                            Cart.getCart(function (data) {
                            //go through cart array and add to DOM
                            for(var i = 0 ; i<data.length; i++){
                               // if item already in DOM and the quantity in DOM and cart are different, make DOM = cart quantity
                               if(data[i].name == menuItem.name){
                                   if (inDOMcart(menuItem.name) ){
                                        var li = getDOMcartItem(menuItem.name);
                                            var q = Number.parseInt(li.childNodes[3].childNodes[1].value);
                                            var a = Number.parseInt(amount.value);
                                            q+=a;
                                            if (q>20){
                                                alert("Your amount exceeds 20; You can only get 20 of each item. YOUR ITEM WILL BE SET TO 20.");
                                                q=20;
                                            }
                                            li.childNodes[3].childNodes[1].value =q;
                                            amount.value = 0;
                                        message.style.display = "none";
                                        checkoutButton.disabled = false;
                                         Cart.getTotal(function (total){
                                            totalP.innerText = "$" + total;}); //update displayed total
                                            break;
                                    }
                        
                                else{
                                    Cart.getItem (data[i]["menu_id"], function(data){
                                        cart.appendChild(createCartLi(data));//append the new items that aren't in the cart array
                                        amount.value = 0;
                                        message.style.display = "none";
                                        checkoutButton.disabled = false;
                                    });
                                }
                                
                               }
                                   
                            }

                        });
                });
                        //add item to cart array
                               
                            });
                            
                      
                
                    
                }
            }
        });
    };

})(window.User, window.menu, window.cart /*making sure this function is aware of it*/ || ({})); //IIFE