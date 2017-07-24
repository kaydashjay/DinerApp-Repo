"use strict";
var c= console;

window.cart = (function(){
    var cart = [];
    var count = 0;
    function ajax(url, method, data) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = "text";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(Error(xhr.status + " " + xhr.statusText));
                    }
                }
            };
            xhr.onerror = function () {
                reject(Error("Network Error"));
            };

            xhr.send(data);
        });
    }

//gets the item by menuID
    function getItem(id, callback){
        var promise = ajax("http://localhost/DinerAppAPI/api/Cart/"+id+"/", "GET", null);
         promise.then(function (data){
            callback(JSON.parse(data));
        })
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
    function addItem(item, price, amount, callback){
            //creats strings of object
          var  Item = "\"{ 'cart_id': 0, 'name': '" + item + "', 'price': " + Number.parseFloat(price) + ", 'quantity': " + Number.parseFloat(amount)+"}\"";
            var promise = ajax("http://localhost/DinerAppAPI/api/Cart", "POST", Item);
              promise.then(function () {
                  //once post is done
               callback();
              });
    };

//returns cart array
    function getCart(callback) {
        var promise = ajax("http://localhost/DinerAppAPI/api/Cart", "GET", null);
        promise.then(function (data) {
            callback(JSON.parse(data));
        });
        
    };

//update the quantity of an item
    function updateItem(name, quantity){
        var item = getItem(name); //gets item object
            item["quantity"]=quantity; //updates quantity
    };

//removes item from array
    function removeItem(name){
        
            var promise = ajax("http://localhost/DinerAppAPI/api/Cart/"+name+"/", "DELETE", null);
            // promise.then(function (data){
            //     c.log(data);
            // });
        
       
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