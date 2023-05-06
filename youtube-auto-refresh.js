// ==UserScript==
// @name         Youtube Auto-Refresh Userscript
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com*
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

// cdn https://e-grau.github.io/estrella/youtube-auto-refresh.js
(function() {
    'use strict';

    // Your code here...

    let counter = 0;
    let href = window.location.href;


    function isVideo() {
        const params = new URLSearchParams(window.location.search);
        return params.get("v");
    }

    function refreshPage() {
        const params = new URLSearchParams(window.location.search);

        params.delete("t");
        params.delete("list");
        params.delete("start_radio");
        window.location.search = params.toString()
    }

    function redirectToMain() {
        window.location.href = "https://www.youtube.com/";
    }


    window.onload = function() {

        setInterval(() => {

            counter++;
            //console.log("counter: " + counter)
            console.log(`time: ${Math.round(counter/60)}m ${counter%60}s counter: ${counter}`)
            //4 14

            if (href !== window.location.href) {
                href = window.location.href;
                counter = 0;
            }

            if (counter < 40 * 60) return;

            if (!isVideo()) {
                console.log("not video")
                return;
            }
            let title = document.title.toLowerCase();
            if (title.includes("cumpleaños") || title.includes("birthday")) {

                redirectToMain();
                return;
            }

            refreshPage();


        }, 1 * 1000)
    }
})();
