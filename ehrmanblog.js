// ==UserScript==
// @name         EhrmanBlog Article Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ehrmanblog.org/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ehrmanblog.org
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    $(document).ready(function(){
        const $prev =$("a[rel=prev]");
        const $next =$("a[rel=next]");


           $.get($prev.prop("href")).then(res=>{
          const title =$(res).find("h1").text()
          const date = $(res).find(".custom_archives").text()
          $prev.text(`${title} (${date})`)
        })

        $.get($next.prop("href")).then(res=>{
          const title =$(res).find("h1").text()
          const date = $(res).find(".custom_archives").text()
          $next.text(`${title} (${date})`)
        })

    })
})();
