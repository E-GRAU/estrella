// ==UserScript==
// @name         isthatinthebible Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://isthatinthebible.wordpress.com/*/*/*/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wordpress.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...

    const notes = {}
    $("article span").each((i, span) => {


        const html = $(span).html()
        const note = html.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/) && html.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/)[0]
        if (note) {

            if (notes[note]) {
                notes[note].push(span)
            } else {

                notes[note] = [span]
            }
        }
    })

    for (const i in notes) {
        console.log(i, notes)
        if (notes[i].length === 2) {
            const $index = $(notes[i][0])
            const $note = $(notes[i][1])

            const ii = `<i style="color:red" data-note="${$note.text()}" title="${$note.text()}">${i}</i>`;

            $index.html($index.html().replace(i, ii))

        }



    }

    console.log("notes", notes)
})();
