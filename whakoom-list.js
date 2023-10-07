// ==UserScript==
// @name         whakoom-list Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.whakoom.com/*/lists/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whakoom.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...

  async function htmlComics() {
    const comics = Array.from($("li[data-item-type=comic]:not(.nhtml)"));

    comics.forEach((comic) => $(comic).addClass("nhtml"));

    for (const comic of comics) {
      // $(comic).addClass("nhtml")

      const url = $(comic).find("a").prop("href");
      console.log("url", url);
      await $.get(url).then((res) => {
        const title = $(res).find("h1[itemprop=name]").text();
        $(comic).append(`<span>${title}</span>`);

        $(comic).attr("title", title);

        $(comic)
          .css("border", "1px solid blue")
          .css("padding", "5px")
          .css("fontWeight", "bold");
      });
    }
  }

  $(document).ready(function () {
    setInterval(htmlComics, 5000);
  });
})();
