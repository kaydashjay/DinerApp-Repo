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

    xhr.send(JSON.parse(data));
  });
}
var getMenu = function (callback){

    var promise = ajax("http://localhost/DinerAppAPI/api/Menu", "GET",null);
 promise.then(function (data)
 {
   callback(data);
 });

//     $.ajax("http://localhost/DinerAppAPI/api/Menu",{
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