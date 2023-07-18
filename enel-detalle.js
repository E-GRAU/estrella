// ==UserScript==
// @name         ENEL Detalle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.enel.pe/es/private-area/MisCuentas/Detalle_cuenta.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=enel.pe
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
        "1540702": "Grau",
        "1545219": "Estrella 28 219",
        "1545223": "Estrella 28 223",
    }

    function start() {

        $('[data-actionitem-id="historical-invoices"]')[0].click()

        const year = $(".tablinksBill.active")
            .text()
            .trim()
        const client = $("#clientCodeS")
            .text()
            .trim();
        const Client = Clients[client]

        $("#DataTables_Table_2 > tbody > tr")
            .each((i, tr) => {


                const emmited = $(tr)
                    .find("td:first")
                    .clone() //clone the element
                    .children() //select all the children
                    .remove() //remove all the children
                    .end() //again go back to selected element
                    .text();

                const month = emmited.split("/")[1]

                const day = emmited.split("/")[0]
                console.log("emmited", emmited)
                console.log("day", day)
                const Month = Months[+month - 1];
                const file = `${Client} - Enel ${year}-${month}-${day} (${Month} ${year})`;
                console.log(file)

                $(tr)
                    .on("contextmenu", function() {
                        new nstring(file)
                            .copy2()
                        console.log(file)

                        $(tr)
                            .css("font-weight", "bold")
                    })

            })
    }

    $(document)
        .ready(function() {

            setTimeout(start, 5000)
        })
})();
