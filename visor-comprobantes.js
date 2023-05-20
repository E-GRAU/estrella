// ==UserScript==
// @name         Visor Factura/Boleta Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://comprobantes.facturactiva.com/Losayyick/visorComprobantes?tipo=factura
// @match        https://comprobantes.facturactiva.com/Losayyick/visorComprobantes?tipo=boleta
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facturactiva.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.7/dayjs.min.js
// @require      https://e-grau.github.io/estrella/visor-comprobantes.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...

    const params = new URLSearchParams(window.location.search)
    const tipo = params.get("tipo")
    console.log("tipo", tipo)

    $("#select-document-type").val("03")
    $("#document-serial").val("B001")

    if (tipo === "factura") {
        $("#select-document-type").val("01")
        $("#document-serial").val("F001")
    }



    $("#emission-date").val(dayjs().format("DD/MM/YYYY"))



    $("#document-total").attr("type", "number").on("keydown", function(e) {
        const key = e.which;

        if (key == 38 || key == 40) {
            $("#document-correlative").trigger("focus")
        }

        if (key == 13) {
            $("#search-document")[0].click()

        }

    })


    $("#document-correlative").attr("type", "number").on("keydown", function(e) {
        const key = e.which;

        if (key == 38 || key == 40 || key == 13) {
            $("#document-total").trigger("focus")
        }

    })


    $("#document-correlative").trigger("focus")
})();
