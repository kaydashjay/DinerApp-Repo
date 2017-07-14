"use strict";
var c= console;

window.menu = (function(){
var posturl = "http://jsonplaceholder.typicode.com/posts";
var Posturl = "https://reqres.in/api/users";


var geturl = "http://jsonplaceholder.typicode.com/posts/1";
var Geturl = "http://localhost:54746/api/menu";


    
  
//var xhr = new XMLHttpRequest();
function ajax(url, method, data) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    //xhr.responseType = 'text';
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 ||xhr.status === 201 ) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error(xhr.status + " " +xhr.statusText));
        }
      }
    };
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };
    
    xhr.send(JSON.stringify(data));
  });
}
var getMenu = function (callback){

// var menuItems = {
//     "Appetizers":[
//         {"name": "Boneless Wings",
//         "price" : 10.49},
//         {"name": "Salsa Verde Beef Nachos",
//         "price" : 9.99},
//         {"name": "Chicken Quesadilla",
//         "price" : 8.29},
//         {"name": "Steak Quesadilla",
//         "price" : 9.29},
//         {"name": "Mozzerella Sticks",
//         "price" : 8.29}
//     ],
//     "Salads": [
//         {"name": "Thai Shrimp Salad",
//         "price": 11.29},
//         {"name": "Grilled Chicken Caesar Salad",
//         "price": 10.79},
//         {"name": "Oriental Chicken Salad",
//         "price": 10.99},
//         {"name": "Crispy Chicken 'N Cornbread Salad",
//         "price": 10.99},
//         {"name": "Southwest Grilled Chicken Salad",
//         "price": 10.29}
//     ],
//     "Chicken":[
//         {"name": "NEW Caprese Mozzarella Chicken",
//         "price": 10.99},
//         {"name": "Cedar Grilled Lemon Chicken",
//         "price": 11.29},
//         {"name": "Chicken Tenders Platter",
//         "price": 11.29},
//         {"name": "Bourbon Street Chicken + Shrimp",
//         "price": 13.49},
//         {"name": "Fiesta Lime Chicken",
//         "price": 12.49}
//     ],
//     "Burgers": [
//         {"name": "NEW Whisky Bacon Burger",
//         "price": 10.99},
//         {"name": "All-day Brunch Burger",
//         "price": 10.99},
//         {"name": "NEW Caprese Mozzarella Burger",
//         "price": 10.99},
//         {"name": "Quesadilla Burger",
//         "price": 10.69},
//         {"name": "The American Standard",
//         "price": 9.99}
//     ]
// };



    var promise = ajax("http://localhost:54746/api/Menu", "GET",null);
 promise.then(function (data)
 {
   callback(data);
 });


//     $.ajax("http://localhost:54746/api/Menu",{
//     method: "GET",
//     //data: menuItems
// }).then(function(data){
//     callback(data);
// });

};


return {
      getMenu:getMenu
        };
})();