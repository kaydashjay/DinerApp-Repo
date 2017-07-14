"use strict";
var c= console;

window.cart = (function(){
    var cart=[];
    
//gets the item object
    function getItem(name){
        for (var i=0; i<cart.length;i++){
            if(cart[i]["name"]==name)
            {
                return  cart[i];
            }
        }
       c.log(name + " Not in cart");
    };

//checks if item is in the cart array
    function inCart(item){
        for (var i=0; i<cart.length;i++){
            if(cart[i]["name"]==item)
            {
                return true;
            }
        }
        return false;
    }

//checks if cart is empty
    function isEmpty(){
        if (cart.length==0){
            return true;
        }
        else{
            return false;
        }
    }
//adds item to cart array
    function addItem(item, price, amount){
    var Item={}; //creats item object
    Item={"name": null,"price": null, "quantity": null}; //creates null object for each item
    Item["name"]=item;
    Item["price"]=Number.parseFloat(price);
    Item["quantity"]=Number.parseInt(amount);

    cart.push(Item);//pushes object in cart array
    };

//returns cart array
    function getCart (callback){
        return callback(cart);
    };

//update the quantity of an item
    function updateItem(name, quantity){
        var item = getItem(name); //gets item object
            item["quantity"]=quantity; //updates quantity
    };

//removes item from array
    function removeItem(name){
        var item = getItem(name); //gets item object
        var i = cart.indexOf(item); //gets the objects index in the cart array
        cart.splice(i,1);//at position i delete 1 
    };

//loads cart
    function loadCart(){
         for (var i = 0; i<cart.length;i++)
        {
            c.log(cart[i]);
        }
    }

//     function updateCart(callback){
//        var promise = ajax(posturl, "POST", cart);
//  promise.then(function (data)
//  {
//    c.log(data);
//    callback(data);
//  });
//     };

    //returns the total
    function getTotal(){
        var total=0;
        for (var i = 0; i<cart.length; i++){
            total += (cart[i]["price"] * cart[i]["quantity"]);
        }
        return total.toFixed(2);  
    }
    
    return {
        addItem:addItem,
        getCart:getCart,
        removeItem:removeItem,
        getItem:getItem, 
        //loadCart:loadCart,
        updateItem:updateItem,
        inCart:inCart,
        getTotal:getTotal,
        isEmpty:isEmpty
    }
    
})();