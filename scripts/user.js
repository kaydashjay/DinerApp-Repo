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
        var customer = {
     "fname": "Kurtwood",
    "lname": "Greene, Jr.",
    "address": {"streetAddress":"1810 Lind Street", 
            "city":"Quincy",
            "state": "IL",
            "zipcode": "62301"
    },
    "userId": 1
};

        var promise = ajax("http://localhost/DinerAppAPI/api/User", "GET", null);
        promise.then(function (data) {
            callback(JSON.parse(data));
        });
    
    };
    return {
        getUser: getUser
    };
    
})();