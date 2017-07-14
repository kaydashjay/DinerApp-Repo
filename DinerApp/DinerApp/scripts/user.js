"use strict";
var c= console;

window.User = (function(){
    var user=[];
    var posturl = "http://jsonplaceholder.typicode.com/posts";

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

$.ajax(posturl,{
    method: "POST",
    data: customer
}).then(function(data){
    callback(data);
});
    
    };
    return {
        getUser: getUser
    };
    
})();