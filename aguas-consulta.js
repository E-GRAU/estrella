// ==UserScript==
// @name         Aguas consulta Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.aguasdelimanorte.com/consultaweb/home.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aguasdelimanorte.com
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const Months = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
    ]

    const Clients = {
        "1317": "Grau",
        "15001": "Centenario 304",
        ".": "Estrella 28 219",
        ".": "Estrella 28 223",
    }
    const id = $("h3:first").text().split("»")[0].trim()

    const Client = Clients[id];

    $("div.box:contains(Cuenta Corriente) table:first tbody tr").each((i, tr) => {

        const date = $(tr).find("td:eq(3)").text()

        const [day, month, year] = date.split("/")
        if (!year) return;
        const Month = Months[month - 1];

        const file = `${Client} - ${id} - Aguas ${year}-${month}-${day} (${Month} ${year})`

        console.log(file)
        $(tr).addClass("ncopy").data("copy", file)


    })

    $(".ncopy").on("click", function() {

        const copy = $(this).data("copy")

        new nstring(copy).copy2();

        console.log("copy", copy)
        $(this).toggleClass("ncopied")

    })


    $("body").append(`
<style>
    .ncopied {
       font-weight: bold;
    }
</style>
`)

    // Your code here...
})();
