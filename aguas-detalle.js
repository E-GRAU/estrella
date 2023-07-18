// ==UserScript==
// @name         Aguas Detalle Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.aguasdelimanorte.com/consultaweb/viewCodigo.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aguasdelimanorte.com
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...


    const Months = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
    ]

    const Clients = {
        "1317": "Grau",
        ".": "Estrella 28 219",
        ".": "Estrella 28 223",
    }


    function formatTable() {
        if ($("#ultimos-recibos").hasClass("ndev")) return;

        const client = $(".box-title:first").text().trim().split(" ")[0]
        const Client = Clients[client]

        console.log("client", client)
        console.log("Client", Client)
        $("#ultimos-recibos tbody tr").each((i, tr) => {




            const date = $(tr).find("td").eq(3).text().trim()
            console.log("date", date)

            const year = date.split("/")[2]
            const month = date.split("/")[1]
            const day = date.split("/")[0]

            console.log("year", year)
            console.log("month", month)
            console.log("day", day)


            const Month = Months[+month - 1];

            console.log("Month", Month)
            const file = `${Client} - Aguas ${year}-${month}-${day} (${Month} ${year})`;

            console.log("file", file)

            $(tr).on("click", function() {
                $(tr).toggleClass("clicked")

                new nstring(file).copy2()
                console.log("file", file)
            })
        })

        $("#ultimos-recibos").addClass("ndev")
    }
    $(document).ready(function() {
        setInterval(formatTable, 3000)

        $("li a:contains(Recibos)")[0].click()

        $("body").append(`
        <style>
         .clicked{
          font-weight: bold;
         }

        </style>

        `)
    })
})();
