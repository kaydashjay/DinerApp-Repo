"use strict";
var c= console;

window.User = (function(){
    function ajax(url, method, data) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            //xhr.responseType = 'text';
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

            xhr.send(JSON.stringify(data));
        });
    }
    function getUser(callback){
        var promise = ajax("http://localhost/DinerAppAPI/api/User/kurt/", "GET", null);
        promise.then(function (data) {
            callback(JSON.parse(data));
        });
    
    };

    function authenticate(user, pwd, callback){
        var promise = ajax("http://localhost/DinerAppAPI/api/User/AuthenticateUser/"+user+"/"+pwd+"/", "GET", null);
        promise.then(function(data){
            callback(JSON.parse(data));
        })
    }

   
    return {
        getUser: getUser,
        authenticate: authenticate
    };
    
})();