"use strict";
var c= console;

window.menu = (function(){

//var xhr = new XMLHttpRequest();
function ajax(url, method, data) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = "text";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        //c.log(xhr.responseText);
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
      //gets the item by name
    function getItem(name, callback){
        var promise = ajax("http://localhost/DinerAppAPI/api/Menu/"+name+"/", "GET", null);
         promise.then(function (data){
            callback(JSON.parse(data));
        })
    };

var getMenu = function (callback){
var promise = ajax("http://localhost/DinerAppAPI/api/Menu", "GET",null);
 promise.then(function (data)
 {
   callback(JSON.parse(data));
 });
};

function addItem(item, price,cat_id, callback){
//creats strings of object
          var  Item = "\"{'menu_id': 0, 'cat_id': "+cat_id+",'name': '" + item + "', 'price': " + Number.parseFloat(price) +"}\"";
          c.log(Item);
            var promise = ajax("http://localhost/DinerAppAPI/api/Menu", "POST", Item);
              promise.then(function () {
                  //once post is done
               callback();
              });
    };

    //update a menu item of an item
    function updateItem(name,price,cat_id, callback){
        var item = "\"{'name': '"+name+"','price':'"+price+"', 'cat_id':"+Number.parseInt(cat_id)+"}\"";
        var promise = ajax("http://localhost/DinerAppAPI/api/Menu", "PUT", item);
        promise.then (function (){
            callback();
        })
    };

//removes item from menu
    function removeItem(name, callback){
            var promise = ajax("http://localhost/DinerAppAPI/api/Menu/"+name+"/", "DELETE", null);
            promise.then(function (data){
                callback();
            }); 
    };


return {
      getMenu:getMenu,
      addItem:addItem,
      updateItem:updateItem,
      removeItem:removeItem,
      getItem: getItem
        };
})();